const express = require('express')
const app = express()
const port = 3001

var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {
    const jobs = await getAsync('github');
    const jobsSO = await getAsync('stackoverflow');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');;
    
    let allJobs = jobs.concat(jobsSO);
    allJobs = allJobs.replace('][',',');
    allJobs = allJobs.replace(/}{/g, '},{');

    return res.send(allJobs)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))