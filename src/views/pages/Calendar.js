import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
    },
}));
let allViews = Object.keys(Views).map(k => Views[k]);

export default function CalendarPage() {
    const classes = useStyles();
    const localizer = momentLocalizer(moment);
    return (
        <div style={{ backgroundColor: '#8ab6d6', minHeight: '100vh' }}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Calendar</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', padding: '2em' }}>
                            <React.Fragment>
                                <div>
                                    <Calendar
                                        localizer={localizer}
                                        events={[
                                            {
                                                'title': 'My event',
                                                'allDay': false,
                                                'start': new Date(2021, 5, 19, 10, 0), // 10.00 AM
                                                'end': new Date(2021, 5, 19, 14, 0), // 2.00 PM 
                                            },
                                            {
                                                'title': 'your event',
                                                'allDay': false,
                                                'start': new Date(2021, 20, 2, 17, 0), // 10.00 AM
                                                'end': new Date(2021, 20, 2, 17.5, 0), // 2.00 PM 
                                            }
                                        ]}
                                        step={60}
                                        showMultiDayTimes
                                        
                                        views={allViews}
                                        date={new Date(Date().toLocaleString())}
                                    />
                                </div>
                            </React.Fragment>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}