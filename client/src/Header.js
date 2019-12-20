import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

export default function Header() {
    const preventDefault = event => event.preventDefault();

    return (
        <header className="header">
            <Typography variant="h3" component="h1">
                Remote Dev Jobs
            </Typography>
        </header>
    )
}