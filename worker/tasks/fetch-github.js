var fetch = require('node-fetch');

var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {

    console.log('Fetching Github...');

    let resultCount = 1, onPage = 0;
    const allJobs = [];


    // Fetch all pages
    while(resultCount > 0) {
        const response = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await response.json();
        allJobs.push(...jobs);
        resultCount = jobs.length;
        console.log('Found ', resultCount, ' jobs');
        onPage++;
    }

    console.log('Got ', allJobs.length, ' jobs in total');

    //Filter algorithm
    const remoteJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        const jobLocation = job.location.toLowerCase();
        const jobDescription = job.description.toLowerCase();

        var date = new Date(job.created_at); 
        job.isoDate = date.toISOString();

        if(
            jobLocation.includes('remote') ||
            jobTitle.includes('remote') ||
            jobLocation.includes('worldwide') ||
            jobDescription.includes('distributed company')
            ) {
            return true;
        }
        return false;
    })
    
    console.log('Filtered down to ', remoteJobs.length);

    // Set in Redis
    const success = await setAsync('github', JSON.stringify(remoteJobs));

    console.log({success});
}

fetchGithub();

module.exports = fetchGithub;