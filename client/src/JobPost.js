import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/paper';
import moment from 'moment';

export default function JobPost({ job, onClick }) {

    // Clean job title
    if(job.title) {
    job.title = job.title.split(' at')[0].toLowerCase();

    let findStrings = ["engineer ", "developer ", "manager ", "administrator ", "architect "];

    for (let i = 0; i < findStrings.length; i++) {
        var index = job.title.indexOf(findStrings[i]);
        cleanTitle(findStrings[i], index);
    }

    function cleanTitle(s, i) {
        if (i !== -1) {
            job.title = job.title.substring(0, i + s.length);
        }
    }

    let findStates = ["NY", "DC", "MA", "OH", "OK", "SC", "NC", "SD", "ND", "CA", "CO", "AK", "MT", "TN", "VA", "IL", "MN", "MD", "IN", "AZ", "NV", "TX"];

    if(job.location) {
        for (let i = 0; i < findStates.length; i++) {
            if(job.location.indexOf(findStates[i]) > -1) {
                job.country = "us";
            }
        }
        if(job.location.indexOf('Australia') > -1) {
            job.country = 'au';
        }
        if(job.location.indexOf('Canada') > -1) {
            job.country = 'ca';
        }
        if(job.location.indexOf('UK') > -1) {
            job.country = 'gb';
        }
        if(job.location.indexOf('Italy') > -1) {
            job.country = 'it';
        }
        if(job.location.indexOf('Germany') > -1) {
            job.country = 'de';
        }
        if(job.location.indexOf('Switzerland') > -1) {
            job.country = 'sw';
        }
        if(job.location.indexOf('Belgium') > -1) {
            job.country = 'be';
        }
        if(job.location.indexOf('Norway') > -1) {
            job.country = 'no';
        }
        if(job.location.indexOf('Sweden') > -1) {
            job.country = 'se';
        }
        if(job.location.indexOf('Spain') > -1) {
            job.country = 'es';
        }
        if(job.location.indexOf('France') > -1) {
            job.country = 'fr';
        }
        if(job.location.indexOf('Remote') > -1) {
            job.country = 'world';
        }
    }

    return (
        <Paper onClick={onClick} className="job-post">
            <div className="title-container">
                <Typography variant="h6">{job.title.toUpperCase()}</Typography>
                <Typography>{job.company || job.author}</Typography>
                {job.country ? <img src={`images/flag-${job.country}.png`} className="country-icon" /> : null}
                <Typography>{job.location ? job.location : null}</Typography>
                <Typography>{job.type ? job.type : null}</Typography>
            </div>
            {job.categories ? <div className="tags-container">
                <span className="tag">{job.categories[0]}</span>
                {job.categories[1] ? <span className="tag">{job.categories[1]}</span> : null}
                {job.categories[2] ? <span className="tag">{job.categories[2]}</span> : null}
            </div> : null}
            <div className="date-container">
                <Typography>
                    {job.created_at ? moment(job.created_at).fromNow(job.created_at) : moment(job.pubDate).fromNow(job.created_at)}
                </Typography>
            </div>
        </Paper>
    )
    }
    else {
        return null;
    }
}
