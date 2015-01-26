'use strict';

// Initialize the app packages
var express         = require('express');
var app             = express();
var request         = require('sync-request');
var cheerio         = require('cheerio');
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// Connect to mongo server
mongoose.connect('mongodb://localhost:27017/eventsapp');

// Mongoose schema
var Schema = mongoose.Schema;

// Website model object
var websiteSchema = new Schema({
    domain : String,
    config: {
        url: String,
        item: String,
        title: String,
        link: String,
        link_attr: String,
        link_prefix: String,
        image_url: String,
        image_url_prefix: String,
        date: String,
        date_regex: String,
        time: String,
        time_regex: String
    },
    created: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
});

// Create mongoose website model
var Website = mongoose.model('Website', websiteSchema);

// Configure the express app
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Retrieve parsed/filtered text
var getParsedText = function(text, dotReplace) {
    // Trim to remove leading and trailing white spaces
    text = text.trim();
    // Replace the tab with single space globally
    text = text.replace(/\t/g, ' ');
    // Replace the newline with single space globally
    text = text.replace(/\n/g, ' ');
    // Replace the dots with single space only when necessary like when parsing a date string
    if (dotReplace)
        text = text.replace(/\./g, ' ');
    // Replace the extra white spaces with single white space globally
    text = text.replace(/^\s+|\s+$|\s+(?=\s)/g, "");

    // Return the final text
    return text;
}

// Parse website content to filter the events
var parseUrlForEvents = function(website) {
    console.log(website);
    var events = [];
    var res = request('GET', website.config.url);
    if (res.statusCode === 200) {

        // Use cheerio to parse the dom nodes
        var $ = cheerio.load(res.getBody());

        $(website.config.item).each(function(itemIndex) {

            var event = {};

            // If there will be no title then skip
            var titleFound = false;

            //Title
            if (website.config.title !== '') {
                var titleElement = $(this).find(website.config.title);
                if (titleElement) {
                    var text = titleElement.text();
                    if (text !== null) {
                        text = getParsedText(text, false);
                        if (text !== '') {
                            titleFound = true;
                            event.title = text;
                        }
                    }
                }
            }

            //Link
            if (titleFound && website.config.link !== '') {
                var linkElement = null;
                if (website.config.link === 'this')
                    linkElement = $(this);
                else
                    linkElement = $(this).find(website.config.link);
                if (linkElement) {
                    var text = linkElement.attr(website.config.link_attr);
                    if (text !== null) {
                        event.link = website.config.link_prefix + text;
                    }
                }
            }

            //Date
            if (titleFound && website.config.date !== '') {
                var dateElement = $(this).find(website.config.date);
                if (dateElement) {
                    var text = dateElement.text();
                    if (text !== null) {
                        text = getParsedText(text, true);
                        if (website.config.date_regex !== '') {
                            console.log(website.config.date_regex);
                            var regexp = new RegExp(website.config.date_regex);
                            var m = regexp.exec(text);
                            console.log(m);
                            if (m && m.length > 0)
                                text = m[0];
                        }
                        event.date = text;
                    }
                }
            }

            //Time
            if (titleFound && website.config.time !== '') {
                var timeElement = $(this).find(website.config.time);
                if (timeElement) {
                    var text = timeElement.text();
                    if (text !== null) {
                        text = getParsedText(text, true);
                        if (website.config.time_regex !== '') {
                            var regexp = new RegExp(website.config.time_regex);
                            var m = regexp.exec(text);
                            if (m && m.length > 0)
                                text = m[0];
                        }
                        event.time = text;
                    }
                }
            }

            if (titleFound)
                events.push(event);
        });
    }
    return events;
}

// Load all websites
app.get('/api/websites', function(req, res) {
    Website.find(function(err, websites) {
        if (err) {
            console.log(err);
            res.json({status: 'error'});
        }
        res.json(websites);
    });
});

app.get('/api/website/:website_id', function(req, res) {
    Website.findOne({_id: req.params.website_id}, function(err, website) {
        if (err) {
            console.log(err);
            res.json({status: 'error'});
        }
        res.json(website);
    });
});

app.get('/api/events/:website_id', function(req, res) {
    Website.findOne({_id: req.params.website_id}, function(err, website) {
        if (err) {
            console.log(err);
            res.json({status: 'error'});
        }
        console.log('Requesting events for: ', website.domain);
        var result = {
            domain: website.domain,
            events: parseUrlForEvents(website)
        };
        res.json(result);
    });
});

// Add new website
app.post('/api/website', function(req, res) {
    Website.create({
        domain : req.body.domain,
        config: {
            url: req.body.url,
            item: req.body.item,
            title: req.body.title,
            link: req.body.link,
            link_attr: req.body.link_attr,
            link_prefix: req.body.link_prefix === undefined ? '' : req.body.link_prefix,
            image_url: req.body.image_url === undefined ? '' : req.body.image_url,
            image_url_prefix: req.body.image_url_prefix === undefined ? '' : req.body.image_url_prefix,
            date: req.body.date === undefined ? '' : req.body.date,
            date_regex: req.body.date_regex === undefined ? '' : req.body.date_regex,
            time: req.body.time === undefined ? '' : req.body.time,
            time_regex: req.body.time_regex === undefined ? '' : req.body.time_regex
        }
    }, function(err, website) {
        console.log(website);
        if (err) {
            console.log(err);
            res.json({status: 'error'});
        }
        res.json({status: 'ok'});
    });
});

// Edit website
app.put('/api/website/:website_id', function(req, res) {
    Website.findById(req.params.website_id, function (err, website) {
        website.domain = req.body.domain;
        website.config.url = req.body.url;
        website.config.item = req.body.item;
        website.config.title = req.body.title;
        website.config.link = req.body.link;
        website.config.link_attr = req.body.link_attr;
        website.config.link_prefix = req.body.link_prefix === undefined ? '' : req.body.link_prefix;
        website.config.image_url = req.body.image_url === undefined ? '' : req.body.image_url;
        website.config.image_url_prefix = req.body.image_url_prefix === undefined ? '' : req.body.image_url_prefix;
        website.config.date = req.body.date === undefined ? '' : req.body.date;
        website.config.date_regex = req.body.date_regex === undefined ? '' : req.body.date_regex;
        website.config.time = req.body.time === undefined ? '' : req.body.time;
        website.config.time_regex = req.body.time_regex === undefined ? '' : req.body.time_regex;
        // Ensure updating nested object
        website.markModified('config');
        // Save the changes
        website.save(function(err) {
            if (err) {
                console.log(err);
                res.json({status: 'error'});
            } else {
                res.json({status: 'ok'});
            }
        });
    });
});

// Delete a website
app.delete('/api/website/:website_id', function(req, res) {
    Website.remove({
        _id : req.params.website_id
    }, function(err) {
        if (err) {
            console.log(err);
            res.json({status: 'error'});
        }
        res.json({status: 'ok'});
    });
});

// Load default page
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(3000);
console.log("EventsApp server listening on port 3000");