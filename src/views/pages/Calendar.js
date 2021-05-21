import React, { useState } from 'react';
import "../../style.css";
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
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
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
                            <Calendar style={{ outlineColor: 'red' }}
                                localizer={localizer}
                                events={[
                                    {
                                        'title': 'visit 1',
                                        'allDay': false,
                                        'start': new Date(2021, 5, 19, 10, 0),
                                        'end': new Date(2021, 5, 19, 14, 0),
                                    },
                                    {
                                        'title': 'visit 2',
                                        'allDay': false,
                                        'start': new Date(2021, 5, 19, 17, 0),
                                        'end': new Date(2021, 5, 19, 18, 0),
                                    }
                                ]}
                                step={60}
                                showMultiDayTimes
                                min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
                                max={new Date(2008, 0, 1, 23, 0)} // Max will be 6.00 PM!z
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