import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flex: 'row'
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }));

export default function Filter({ filters, onChildClick }) {
    const classes = useStyles();

    const handleChange = name => event => {
        onChildClick(name, event.target.checked);
    };

    return (
        <div className="filter-container">
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Filter roles</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={filters.backend} onChange={handleChange('backend')} value="fullstack" color="primary" />}
                            label="Back End"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={filters.frontend} onChange={handleChange('frontend')} value="frontend" color="primary" />}
                            label="Front End"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={filters.fullstack} onChange={handleChange('fullstack')} value="fullstack" color="primary" />}
                            label="Full Stack"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={filters.devops} onChange={handleChange('devops')} value="devops" color="primary" />}
                            label="DevOps"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={filters.product} onChange={handleChange('product')} value="product" color="primary" />}
                            label="Product"
                        />
                    </FormGroup>
                </FormControl>
            </div>
        </div>
    )
}