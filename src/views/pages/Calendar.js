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
import { Calendar, momentLocalizer, Views, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "../../style.css";

const locales = {
    'en-US': require('date-fns/locale/en-US'),
}
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
    },
}));
export default function CalendarPage() {
    const classes = useStyles();
    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,30,0);  
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
                        <div style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', padding: '2em', minHeight: '37.1em' }}>
                            <Calendar style={{ height : '37rem' }}
                                localizer={localizer}
                                events={[
                                    {
                                        'title': 'visit 1',
                                        'allDay': false,
                                        'start': new Date(2021, 4, 19, 10, 0),
                                        'end': new Date(2021, 4, 19, 11, 0),
                                    },
                                    {
                                        'title': 'visit 2',
                                        'allDay': false,
                                        'start': new Date(2021, 4, 19, 18, 0),
                                        'end': new Date(2021, 4, 19, 18, 45),
                                    },
                                    {
                                        'title': 'visit 3',
                                        'allDay': false,
                                        'start': new Date(2021, 4, 21, 17, 0),
                                        'end': new Date(2021, 4, 21, 17, 30),
                                    },
                                ]}
                                step={60}
                                showMultiDayTimes
                                min={minTime}
                                max={maxTime} 
                                startAccessor="start"
                                endAccessor="end"
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}