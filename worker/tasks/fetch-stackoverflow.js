let Parser = require('rss-parser');

var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://stackoverflow.com/jobs/feed?r=true';

console.log('Fetching StackOverflow...');

let parser = new Parser({
    customFields: {
        item: [
            ['a10:author', 'author', {keepArray: true}],
            ['location', 'location']
        ],
    }
});

async function fetchStackOverflow() {

    let feed = await parser.parseURL(baseURL);
    const jobs = feed.items;
    console.log('Got ', jobs.length, ' jobs');

    feed.items.forEach(item => {
        item.author = JSON.stringify(item.author[0]).split(/"/)[3];
    });

    // Set in Redis
    const success = await setAsync('stackoverflow', JSON.stringify(jobs));
    console.log({ success });

};


fetchStackOverflow();

module.exports = fetchStackOverflow;