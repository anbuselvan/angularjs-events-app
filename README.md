# angularjs-events-app
A light weight web scrapper to extract event data from popular events listing websites.


```javascript
// Sample data 
var websites = [
    {
        url: 'http://events.stanford.edu',
        config: {
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
        url: 'https://www.eventbrite.com',
        config: {
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
        url: 'http://www.sfmoma.org',
        config: {
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
        url: 'http://www.meetup.com/find/events/?allMeetups=true&radius=5&userFreeform=Redwood+City%2C+CA&mcId=z94061&mcName=Redwood+City%2C+CA',
        config: {
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

