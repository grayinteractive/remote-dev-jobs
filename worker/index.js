var CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-github');
const fetchStackOverflow = require('./tasks/fetch-stackoverflow');

new CronJob('0 * * * *', fetchGithub, null, true, 'America/Los_Angeles');
new CronJob('0 * * * *', fetchStackOverflow, null, true, 'America/Los_Angeles');