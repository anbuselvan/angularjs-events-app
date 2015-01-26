# angularjs-events-app
A light weight web scrapper to extract event data from popular events listing websites.


```javascript
// Sample data 
var websites = [
    {
        domain: 'events.stanford.edu',
        config: {
            url: 'http://events.stanford.edu',
            item: '.postcard-link',
            title: 'h3',
            link: 'this',
            link_attr: 'href',
            link_prefix: 'http://events.stanford.edu',
            image_url: '',
            image_url_prefix: '',
            date: 'p strong',
            date_regex: /\w+, \w+ \d, \d+/,
            time: 'p strong',
            time_regex: /(\d+):(\d+) \w+/
        }
    },
    {
        domain: 'www.eventbrite.com',
        config: {
            url: 'https://www.eventbrite.com',
            item: '.event-cards .g-cell',
            title: 'h4',
            link: '.js-xd-preferred-link',
            link_attr: 'href',
            link_prefix: '',
            image_url: '',
            image_url_prefix: '',
            date: '.event-poster__date',
            date_regex: '',
            time: '',
            time_regex: ''
        }
    },
    {
        domain: 'www.sfmoma.org',
        config: {
            url: 'http://www.sfmoma.org',
            item: '.mod-link',
            title: '.title',
            link: 'this',
            link_attr: 'data-url',
            link_prefix: 'http://www.sfmoma.org',
            image_url: '',
            image_url_prefix: '',
            date: '.dtstart',
            date_regex: '',
            time: '',
            time_regex: ''
        }
    },
    {
        domain: 'www.meetup.com',
        config: {
            url: 'http://www.meetup.com/find/events/?allMeetups=true&radius=5&userFreeform=Redwood+City%2C+CA&mcId=z94061&mcName=Redwood+City%2C+CA',
            item: '.event-listing',
            title: 'span[itemprop="name"]',
            link: '.event-title',
            link_attr: 'href',
            link_prefix: '',
            image_url: '',
            image_url_prefix: '',
            date: '',
            date_regex: '',
            time: 'time[itemProp="startDate"]',
            time_regex: ''
        }
    }
];
```

