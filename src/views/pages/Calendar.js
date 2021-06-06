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
import { setLocalStorage } from '../../core/modules/storageManager';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
}

const calendar_views = {
    month: 'month',
    week: 'week',
    day: 'day',   
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
    },
}));

const ViewProfile = (username) => {
    setLocalStorage({ isvieweddoctor: 'true', viewedusername: username });
}

// const EventButton = ({ children }) => {
//     return (
//     <Button 
//         style={{width: "100%", marginBottom: '0.1em', marginTop: '0.2em', padding: 0}} 
//         component={Link} 
//         to="/view-profile">
//         {children}
//     </Button>)
// }

function CalendarPage({ isRemembered }) {
    const classes = useStyles();
    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,30,0);  
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [view, setView] = useState(calendar_views.agenda);
    const [events, setEvents] = useState(null);
    const [range, setRange] = useState(null);
    const [minVisitDuration, setMinVisitDuration] = useState(30);

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
                // const first_start = getDateElements(response.payload[0].start_time);
                // const first_end = getDateElements(response.payload[0].end_time);
                let minimum_visit_time = response.payload.length > 0 ? moment(response.payload[0].end_time).diff(moment(response.payload[0].start_time), 'minutes') : 30;
                response.payload.forEach(element => {
                    const diff = moment(element.end_time).diff(moment(element.start_time), 'minutes');
                    minimum_visit_time = minimum_visit_time > diff ? diff : minimum_visit_time;
                });
                setMinVisitDuration(minimum_visit_time);
                // console.log(minimum_visit_time);
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
                console.log(range_data.end.getMonth());
            }
            else if (view === calendar_views.week) {
                setStartDate(range_data[0]);
                setEndDate(range_data[6]);
            }
            else if (view === calendar_views.day) {
                setStartDate(range_data[0]);
                setEndDate(moment(range_data[0]).add(1, 'days').toDate());
            }
        }
    }

    const handleEventProp = (event) => {
        if (view === 'month') return (
            {
                style: {
                    backgroundColor: "#90ee90",
                    borderColor: "#252e7f",
                    height: event.height,
                    alignItems: 'start',
                    justifyContent: 'start',
                    alignSelf: 'start',
                    justifySelf: 'start',
                    borderRadius: '5px'
                }
            }
        );
        else if (view === 'week' || view === 'day') return (
            {
                style: {
                    backgroundColor: "#90ee90",
                    borderColor: "#252e7f",
                    height: event.height,
                    alignSelf: 'start',
                    justifySelf: 'start',
                    textAlign: 'start'
                }
            }
        );
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
                                views={[calendar_views.month, calendar_views.week, calendar_views.day]}
                                onView={(event) => {setView(event); console.log(event);}}
                                onRangeChange={(event) => {setRange(event); console.log(event);}}
                                events={
                                    events ? events.map((event) => {
                                    const start_date_obj = getDateElements(event.start_time);
                                    const end_date_obj = getDateElements(event.end_time);
                                    return {
                                        'start': new Date(
                                            start_date_obj.year,
                                            start_date_obj.month - 1,
                                            start_date_obj.day,
                                            start_date_obj.hour,
                                            start_date_obj.minute,
                                        ),
                                        'end': new Date(
                                            end_date_obj.year,
                                            end_date_obj.month - 1,
                                            end_date_obj.day,
                                            end_date_obj.hour,
                                            end_date_obj.minute,
                                        ),
                                        'allDay': false,
                                        'title': `Visit time set with Dr.${event.doctor.user.first_name} ${event.doctor.user.last_name}`,
                                        'resource': {
                                            docotor_username: event.doctor.user.username,
                                        }
                                    }
                                }) : []
                                }
                                step={30}
                                showMultiDayTimes
                                min={minTime}
                                max={maxTime} 
                                startAccessor="start"
                                endAccessor="end"
                                // components={{
                                //     eventWrapper: EventButton,
                                // }}
                                eventPropGetter={handleEventProp}
                                onSelectEvent={(event) => {ViewProfile(event.resource.docotor_username);}}
                                popup
                                tooltipAccessor={(event) => {
                                    const sh = event.start.getHours();
                                    const sm = event.start.getMinutes();
                                    const eh = event.end.getHours();
                                    const em = event.end.getMinutes();
                                    return `${event.title}\nTime: ${sh < 10 ? `0${sh}` : sh}:${sm < 10 ? `0${sm}` : sm}-${eh < 10 ? `0${eh}` : eh}:${em < 10 ? `0${em}` : em}`;                                    
                                }}
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