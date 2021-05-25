import React, { useState, useEffect } from 'react';
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
import { callListPatientReservations } from '../../core/modules/calendarAPICalls';
import { connect } from "react-redux";
import { getDate } from 'date-fns';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
}

const calendar_views = {
    month: 'month',
    week: 'week',
    work_week: 'work_week',
    day: 'day',
    agenda: 'agenda',    
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
    },
}));

 function CalendarPage({ isRemembered }) {
    const classes = useStyles();
    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,30,0);  
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [view, setView] = useState(calendar_views.day);
    const [events, setEvents] = useState(null);
    const [range, setRange] = useState(null);

    const getPatientReservationsList = async(start_date, end_date) => {
        const start_month = start_date.getMonth() + 1;
        const end_month = end_date.getMonth() + 1;
        const start_day = start_date.getDate();
        const end_day = end_date.getDate();
        const from_date = `${start_date.getFullYear()}${start_month < 10 ? `0${start_month}` : start_month}${start_day < 10 ? `0${start_day}` : start_day}`;
        const to_date = `${end_date.getFullYear()}${end_month < 10 ? `0${end_month}` : end_month}${end_day < 10 ? `0${end_day}` : end_day}`;
        try
        {
            const response = await callListPatientReservations({from_date: from_date, to_date: to_date}, isRemembered);
            console.log(response);
            if(response.status === 200) {
                setEvents(response.payload);
            }
        }
        catch
        {
            console.log("error on get reserve");
        }    
    }

    const handleRangeAndViewChange = (view, range_data) => {
        if (range_data) {
            if (view === calendar_views.month || view === calendar_views.agenda) {
                setStartDate(range_data.start);
                setEndDate(range_data.end);
            }
            else if (view === calendar_views.week) {
                setStartDate(range_data[0]);
                setEndDate(range_data[6]);
            }
            else if (view === calendar_views.day) {
                setStartDate(range_data[0]);
                setEndDate(moment(range_data[0]).add(1, 'days'));
            }
        }
    }

    const getDateElements = (date_time_str) => {
        const date_str = date_time_str.split("T")[0];
        const time_str = (date_time_str.split("T")[1]).split("Z")[0];
        const date_specs = date_str.split("-");
        const year = Number(date_specs[0]);
        const month = Number(date_specs[1]);
        const day = Number(date_specs[2]);
        const time_specs = time_str.split(":");
        const hour = time_specs[0];
        const minute = time_specs[1];
        return {
            year: year,
            month: month,
            day: day,
            hour: hour, 
            minute: minute,
        };
    }

    useEffect(() => {
        handleRangeAndViewChange(view, range);
    }, [view, range]);

    useEffect(() => {
        if (startDate && endDate)
            getPatientReservationsList(startDate, endDate);
    }, [startDate, endDate]);

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
                                view={view}
                                onView={(event) => {setView(event); console.log(event);}}
                                onRangeChange={(event) => {setRange(event); console.log(event);}}
                                events={events ? events.map((event) => {
                                    const start_date_obj = getDateElements(event.start_date);
                                    const end_date_obj = getDateElements(event.end_date);
                                    return {
                                        'start': new Date(
                                            start_date_obj.year,
                                            start_date_obj.month,
                                            start_date_obj.day,
                                            start_date_obj.hour,
                                            start_date_obj.minute,
                                        ),
                                        'end': new Date(
                                            end_date_obj.year,
                                            end_date_obj.month,
                                            end_date_obj.day,
                                            end_date_obj.hour,
                                            end_date_obj.minute,
                                        ),
                                        'allDay': false,
                                        'title': `Visit time set for`,
                                    }
                                }) : []
                                // [
                                //     {
                                //         'title': 'visit 1',
                                //         'allDay': false,
                                //         'start': new Date(2021, 4, 19, 10, 0),
                                //         'end': new Date(2021, 4, 19, 11, 0),
                                //     },
                                // ]
                                }
                                step={60}
                                showMultiDayTimes
                                min={minTime}
                                max={maxTime} 
                                startAccessor={() => {return new Date();}}
                                endAccessor="end"
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default connect(
    state => ({ isRemembered: state.authReducer.authData.remember_me }),
    null)(CalendarPage);