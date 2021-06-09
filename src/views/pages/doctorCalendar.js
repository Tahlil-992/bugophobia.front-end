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
import { getDate, set } from 'date-fns';
import { setLocalStorage } from '../../core/modules/storageManager';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { callAPIHandler } from "../../core/modules/refreshToken";
import { callGetDoctorOfficeRerservationsList } from "../../core/modules/calendarAPICalls";
import { Redirect } from 'react-router-dom';

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

const ViewProfile = (username) => {
    setLocalStorage({ isvieweddoctor: 'false', viewedusername: username, viewedOffice: '', viewedEvent: '', viewedEventDate: '' });
}

const EventButton = ({ children }) => {
    return (
        children.AvailableState === null ?
            <Link
                to="/view-profile">
                {children}
            </Link>
            :
            <div>{children}</div>
    )
}

const callGetOfficeAPI = async (doctorid, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: `/auth/office-list/${doctorid}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callProfileAPI = async (isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: "/profile/doctor/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

function DoctorCalendarPage({ isRemembered }) {
    const classes = useStyles();
    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(23, 30, 0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [view, setView] = useState(calendar_views.month);
    const [events, setEvents] = useState(null);
    const [range, setRange] = useState(null);

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

    const [VisitTimeDuration, setVisitTimeDuration] = useState(30);
    const [monthEvents, setMonthEvents] = useState([]);
    const [monthEventsMapper, setMonthEventsMapper] = useState({});
    const [currentEvents, setCurrentEvents] = useState([]);

    const TwoDigits = (number) => {
        const str = number.toString();
        if (str.length === 1)
            return "0" + str;
        else
            return str;
    }

    const RedMaker = (VisitTimeDuration) => {
        setCurrentEvents(monthEvents);
        const toDay = 30;
        var date = new Date();
        var year = date.getFullYear(); 
        var month = date.getMonth();
        var day = date.getDate();
        for (var j = 0; j < toDay; j++) {
            var newEvents = [];
            var hours = 6;
            var minutes = 0;
            for (var i = 0; i < Math.floor((18 * 60) / VisitTimeDuration) - 1; i++) {
                newEvents.push(
                    {
                        'title': '',
                        'titleweek': '✘',
                        'allDay': false,
                        'start': new Date(year, month, day, hours, minutes),
                        'end': new Date(year, month, day, hours, minutes + VisitTimeDuration),
                        'AvailableState': false,
                        'id': -2,
                        'events': [],
                        'color': '#fb3640',
                        'borderColor': 'red',
                    }
                );
                minutes += VisitTimeDuration; 
            }
            const mydate = new Date(year, month, day, 6, 0);
            const index = '' + mydate.getFullYear() + TwoDigits(mydate.getMonth()) + TwoDigits(mydate.getDate());
            monthEvents[j] =({
                'title': 'Unavailable',
                'allDay': false,
                'start': new Date(year, month, day, 6, 0),
                'end': new Date(year, month, day, 23, 30),
                'AvailableState': false,
                'id': -1,
                'greens': 0,
                'events': newEvents,
                'color': '#fb3640',
                'borderColor': 'red',
                'height': '5em',
            }); 
            monthEventsMapper[index] = j;
            day += 1;
        }
        seta(a+1);
    }

    const Updater = (payload, VisitTimeDuration) => {
        const base = (6*60) + 0;
        payload.map((reserve) => {
            var sd0 = getDateElements(reserve.start_time);
            var sd = new Date(sd0.year, sd0.month-1, sd0.day, sd0.hour, sd0.minute);
            const start = (sd.getHours()*60) + sd.getMinutes();
            const startIndex = (start - base) / VisitTimeDuration;
            var ed0 = getDateElements(reserve.end_time);
            var ed = new Date(ed0.year, ed0.month-1, ed0.day, ed0.hour, ed0.minute);
            var index = monthEventsMapper['' + sd.getFullYear() + TwoDigits(sd.getMonth()) + TwoDigits(sd.getDate())];
            if (index !== undefined) {
                const patient = reserve.patient;
                if (!patient) {
                    if (monthEvents[index].greens === 0) {
                        monthEvents[index].title = 'Available';
                        monthEvents[index].AvailableState = true;
                        monthEvents[index].color = 'lightgreen';
                        monthEvents[index].borderColor = 'green';
                    }
                    monthEvents[index].greens += 1;
                }
                monthEvents[index].events[startIndex] = patient ?
                (
                    {
                        'title': 'Reserved by ' + patient.user.username,
                        'titleweek': 'Reserved',
                        'allDay': false,
                        'start': sd,
                        'end': ed,
                        'AvailableState': null,
                        'username': patient.user.username,
                        'id': reserve.id,
                        'events': [],
                        'color': '#8ab6d6',
                        'borderColor': 'blue',
                    }
                )
                :
                (
                    {
                        'title': '',
                        'titleweek': '✔',
                        'allDay': false,
                        'start': sd,
                        'end': ed,
                        'AvailableState': true,
                        'id': reserve.id,
                        'events': [],
                        'color': 'lightgreen',
                        'borderColor': 'green',
                    }
                );
                
            }
        });
        //seta(a+1); 
    }

    const callGetDoctorRerserve = async (officeid, VisitTimeDuration) => {
        const toDay = 30;
        const DAY = new Date();
        const year = DAY.getFullYear();
        const month = DAY.getMonth();
        const day = DAY.getDate();
        RedMaker(VisitTimeDuration);
        try {
            const DAY1 = DAY;
            const from_date = '' + DAY1.getFullYear() + TwoDigits(DAY1.getMonth()+1) + TwoDigits(DAY1.getDate());
            const DAY2 = new Date(year, month, day + toDay);
            const to_date = '' + DAY2.getFullYear() + TwoDigits(DAY2.getMonth()+1) + TwoDigits(DAY2.getDate());
            const response = await callGetDoctorOfficeRerservationsList({ office_id: officeid, from_date: from_date, to_date: to_date }, isRemembered)
            if (response.status === 200) {
                Updater(response.payload, VisitTimeDuration);
                seta(a+1);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const [date, setdate] = useState(new Date());
    const handleOnView = (view) => {
        setView(view);
        if (view === 'agenda') {
            var newEvents = [];
            monthEvents.map((event) => {
                newEvents.concat(event.events)
            });
            setCurrentEvents(newEvents);
        }
    }

    const handleOnNavigate = (date, view) => {
        setdate(date);
    }

    const handleOnDrilldown = (date, view) => {

        handleOnView(view);
        handleOnRangeChange([date]);
        setdate(date);
    }

    const handleOnRangeChange = (dates) => {

        if (!dates.length && view !== 'agenda') {
            setCurrentEvents(monthEvents);
        }
        else if (dates.length === 1) {
            const index = monthEventsMapper['' + dates[0].getFullYear() + TwoDigits(dates[0].getMonth()) + TwoDigits(dates[0].getDate())];
            if (index !== undefined) {
                setCurrentEvents(monthEvents[index].events);
                monthEvents[index].events.map((event) => console.log(event.start.toLocaleString()));
            }
            else {
                setCurrentEvents([]);
            }
        }
        else if (dates.length === 7) {
            var newEvents = [];
            for (var i = 0; i < 7; i++) {
                let index = monthEventsMapper['' + dates[i].getFullYear() + TwoDigits(dates[i].getMonth()) + TwoDigits(dates[i].getDate())];
                if (index !== undefined) {
                    newEvents = newEvents.concat(monthEvents[index].events)
                }
            }
            setCurrentEvents(newEvents);
        }
    }

    useEffect(() => {
        handleRangeAndViewChange(view, range);
    }, [view, range]);

    const [offices, setoffices] = useState([]);
    const [officeState, setofficeState] = useState(0);
    const [a, seta] = useState(0);
    const handleOfficeChange = (event) => {
        setofficeState(event.target.value);
        callGetDoctorRerserve(event.target.value, VisitTimeDuration);
        setView('month');
    };
    const [Doctorid, setDoctorid] = useState(0);
    const callGetAPI = async () => {
        try {
            const response = await callProfileAPI(isRemembered);
            if (response.status === 200) {
                let payload = response.payload;
                setDoctorid(payload.user.id);
                setVisitTimeDuration(payload.visit_duration_time);
                seta(a + 1);
                callGetOffice(payload.user.id, payload.visit_duration_time);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const [Username, setUsername] = useState((localStorage.getItem("username")));
    useEffect(() => {
        callGetAPI()
    }, []);
    const callGetOffice = async (id, visit_duration_time) => {
        try {
            const response = await callGetOfficeAPI(id, isRemembered);
            if (response.status === 200) {
                response.payload.map((office) => {
                    offices.push([office.title, office.id]);
                })
                callGetDoctorRerserve(response.payload[0].id, visit_duration_time);
                seta(a + 1);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleEventProp = (event) => {
        if (view === 'month') return (
            {
                style: {
                    backgroundColor: event.color,
                    borderColor: event.borderColor,
                    height: event.height,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    borderRadius: '5px'
                }
            }
        );
        else if (view === 'week' || view === 'day') return (
            {
                style: {
                    backgroundColor: event.color,
                    borderColor: event.borderColor,
                    height: event.height,
                    alignSelf: 'center',
                    justifySelf: 'center',
                    textAlign: 'center'
                }
            }
        );
    }
    const ChangeEventState = (event) => {
        if (event.username) {
            ViewProfile(event.username);
            setisRedirct(true);
        }
        else if (event.id === -1) {
            handleOnView('day');
            handleOnRangeChange([event.start]);
            handleOnNavigate(event.start);
        }
    }
    const handleTitleAccessor = (event) => {
        if (view === 'month') {
            if (event.greens > 0) {
                return event.title + '(' + event.greens + ')';
            }
            else {
                return event.title;
            }
        }
        else if (view === 'week') {
            return null;
        }
        else if (view === 'day') {
            return event.title;
        }
    }
    
    useEffect(() => {
        seta(0);
    }, [a]);

    const [isRedirct, setisRedirct] = useState(false);

    if (isRedirct) {
        return (<Redirect to="/view-profile" />);
    }

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
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink >Offices</InputLabel>
                                <Select style={{ marginBottom: '2em', minWidth: '10em' }}
                                    native
                                    value={officeState}
                                    onChange={handleOfficeChange}
                                >
                                    {offices.map((office, index) => (
                                        <option value={office[1]}>
                                            {office[0]}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <Calendar style={{ minHeight: '37rem' }}
                                localizer={localizer}
                                titleAccessor={handleTitleAccessor}
                                view={view}
                                views={['month', 'week', 'day']}
                                date={date}
                                events={currentEvents}
                                step={VisitTimeDuration}
                                showMultiDayTimes
                                min={minTime}
                                max={maxTime}
                                startAccessor="start"
                                endAccessor="end"
                                components={{
                                    eventWrapper: EventButton,
                                }}
                                eventPropGetter={handleEventProp}
                                //onSelectEvent={(event) => { ViewProfile(event.resource.docotor_username); }}
                                onSelectEvent={event => ChangeEventState(event)}
                                onView={handleOnView}
                                onNavigate={handleOnNavigate}
                                onDrillDown={handleOnDrilldown}
                                onRangeChange={handleOnRangeChange}
                                popup
                            /*tooltipAccessor={(event) => {
                                const sh = event.start.getHours();
                                const sm = event.start.getMinutes();
                                const eh = event.end.getHours();
                                const em = event.end.getMinutes();
                                return `${event.title}\nTime: ${sh < 10 ? `0${sh}` : sh}:${sm < 10 ? `0${sm}` : sm}-${eh < 10 ? `0${eh}` : eh}:${em < 10 ? `0${em}` : em}`;
                            }}*/
                            />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default connect(
    state => ({ isRemembered: state.authReducer.authData.remember_me }),
    null)(DoctorCalendarPage);