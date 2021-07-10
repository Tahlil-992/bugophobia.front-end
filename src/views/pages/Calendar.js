import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useHistory } from "react-router-dom";
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
import { setSessionStorage } from '../../core/modules/storageManager';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
}

const calendar_views = {
    month: 'month',
    week: 'week',
    day: 'day',
    agenda: 'agenda',  
}

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
    },
}));

const ViewProfile = (event) => {
    setSessionStorage(
        { isvieweddoctor: 'true', 
        from: '/Calendar/',
        viewedusername: event.resource.doctor_username, 
        viewedOffice: event.resource.office.id, 
        viewedEvent: event.resource.event_id,
        viewedEventDate: event.resource.event_date});

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

const specializationMap = (spec) => {
    switch (spec) {
        case 'C': return 'Cardiologist';
        case 'D': return 'Dermatologist';
        case 'G': return 'General Practitioner';
        case 'GY': return 'Gynecologist';
        case 'I': return 'Internist';
        case 'N': return 'Neurologist';
        case 'O': return 'Obstetrician';
        case 'OP': return 'Ophthalmologist';
        case 'OT': return 'Otolaryngologist';
        case 'P': return 'Pediatrician';
        case 'PS': return 'Psychiatrist';
        case 'U': return 'Urologist';
        default: return '';
    }
}

const specStr = (spec) => spec !== '' ? `, ${spec}` : '';

function EventAgenda({ event }) {
    return (
      <span style={{lineHeight: "0.75em"}}>
        <em style={{ color: event.resource.bgColor }}>Visit time with Dr.{event.resource.doctor_fname} {event.resource.doctor_lname}{specStr(specializationMap(event.resource.spec))}</em>
        <br/>
        <em>At office : {event.resource.office.title}</em>
        <br/>
        <em>Located at : {event.resource.office.address}.</em>
      </span>
    )
}

function TimeAgenda({ event }) {
    const sh = event.start.getHours();
    const sm = event.start.getMinutes();
    const eh = event.end.getHours();
    const em = event.end.getMinutes();
    return ( 
    <span>
        <em>{
        `${sh < 10 ? `0${sh}` : sh}:${sm < 10 ? `0${sm}` : sm}-${eh < 10 ? `0${eh}` : eh}:${em < 10 ? `0${em}` : em}`}</em>
    </span>);    
}

const colorArr = [
    "#CF6464", "#C5C533", "#2CB32C", "#00FF00", "#33A0A0", "#4DC9C9", "#BA4FBA", "#FF31FF"
]

function getRandomColor(colorNum, colorsArr) {
    let colors = [];
    for (let i = 0; i < colorNum; i++)
    {
        const color = colorArr[Math.floor(Math.random() * colorArr.length)]
        if (!colorsArr.includes(color) && !colors.includes(color)) {
            colors.push(color);
        }
        else {
            i--;
        }
    }
    return colors;
}

function CalendarPage({ isRemembered }) {
    const classes = useStyles();
    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,30,0);  
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [view, setView] = useState(calendar_views.month);
    const [events, setEvents] = useState(null);
    const [range, setRange] = useState(null);
    const [minVisitDuration, setMinVisitDuration] = useState(30);
    const [doctorColors, setDoctorColors] = useState([]);

    const history = useHistory();

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
            if(response.status === 200) {
                setEvents(response.payload);
            }
        }
        catch (e)
        {
            console.log("error on get reserve\n", e);
        }    
    }

    useEffect(() => {
        if (events) {
            let Ids = [];
            doctorColors.forEach(el => {Ids.push(el.username)});
            let colorIds = [];
            doctorColors.forEach(el => {colorIds.push(el.color)});
            let newIds = [];
            let minimum_visit_time = events.length > 0 ? 
                moment(events[0].end_time).diff(moment(events[0].start_time), 'minutes') : 
                30;
            events.forEach(element => {
                const diff = moment(element.end_time).diff(moment(element.start_time), 'minutes');
                minimum_visit_time = minimum_visit_time > diff ? 
                    diff : 
                    minimum_visit_time;
                if (!Ids.includes(element.doctor.user.username) && !newIds.includes(element.doctor.user.username)) {
                    newIds.push(element.doctor.user.username);
                }
            });
            let newColors = doctorColors;
            getRandomColor(newIds.length, colorIds).forEach((color, index) => {
                newColors.push({username: newIds[index], color: color});
            })
            console.log(newColors);
            setDoctorColors(newColors);
            setMinVisitDuration(minimum_visit_time);
        }
        else {
            setDoctorColors([]);
            setMinVisitDuration(30);
        }
    }, [events])

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
                    backgroundColor: doctorColors.length > 0 ? 
                        doctorColors[doctorColors.findIndex(x => x.username === event.resource.doctor_username)].color : 
                        "#e0e0e0",
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
                    backgroundColor: doctorColors.length > 0 ? 
                        doctorColors[doctorColors.findIndex(x => x.username === event.resource.doctor_username)].color : 
                        "#e0e0e0",
                    borderColor: "#252e7f",
                    height: event.height,
                    alignSelf: 'start',
                    justifySelf: 'start',
                    textAlign: 'start'
                }
            }
        );
        else return (
            {
                style: {
                    fontStyle: "Italic",
                    color: "black",
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

    useEffect(() => {
        const date = new Date(), y = date.getFullYear(), m = date.getMonth();
        const firstDay = new Date(y, m, 1);
        const lastDay = new Date(y, m + 1, 0);
        setStartDate(firstDay);
        setEndDate(lastDay);
        getPatientReservationsList(firstDay, lastDay);
    }, []);
    
    return (
        <div style={{minWidth:'50rem', backgroundColor: '#8ab6d6', minHeight: '100vh' }}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Calendar</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <div style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', padding: '2em', minHeight: '37.1em',  }}>
                            <Calendar style={{ minHeight : '79.5vh', fontFamily: `'Josefin Sans', sans-serif`, }}
                                localizer={localizer}
                                view={view}
                                views={[calendar_views.month, calendar_views.week, calendar_views.day, calendar_views.agenda]}
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
                                        'title': view === calendar_views.day || view === calendar_views.agenda ?
                                            `Visit time set with Dr.${event.doctor.user.first_name} ${event.doctor.user.last_name} at office : ${event.office.title}, located at : ${event.office.address}`:
                                            (view === calendar_views.month ? `Dr.${event.doctor.user.first_name} ${event.doctor.user.last_name}, ${event.office.title}` : ''),
                                        'resource': {
                                            doctor_username: event.doctor.user.username,
                                            doctor_fname: event.doctor.user.first_name,
                                            doctor_lname: event.doctor.user.last_name,
                                            doctor_id: event.doctor.user.id,
                                            office: event.office,
                                            bgColor: doctorColors.length > 0 ? 
                                                doctorColors[doctorColors.findIndex(x => x.username === event.doctor.user.username)].color : 
                                                "#90ee90",
                                            spec: event.doctor.filed_of_specialization,
                                            event_id: event.id,
                                            event_date: event.start_time,
                                        }
                                    }
                                }) : []
                                }
                                step={minVisitDuration}
                                showMultiDayTimes
                                min={minTime}
                                max={maxTime} 
                                startAccessor="start"
                                endAccessor="end"
                                components={{
                                    // eventWrapper: EventButton,
                                    agenda: {
                                        event: EventAgenda,
                                        time: TimeAgenda,
                                        
                                    }
                                }}
                                // dayPropGetter={{style: {fontSyle: "italic"}}}
                                eventPropGetter={handleEventProp}
                                onSelectEvent={(event) => {ViewProfile(event); history.push("/view-profile")}}
                                popup
                                tooltipAccessor={(event) => {
                                    const sh = event.start.getHours();
                                    const sm = event.start.getMinutes();
                                    const eh = event.end.getHours();
                                    const em = event.end.getMinutes();
                                    return view === calendar_views.month ?
                                        `${event.title}\nTime: ${sh < 10 ? `0${sh}` : sh}:${sm < 10 ? `0${sm}` : sm}-${eh < 10 ? `0${eh}` : eh}:${em < 10 ? `0${em}` : em}`:
                                        (view === calendar_views.week ? `Dr.${event.resource.doctor_fname} ${event.resource.doctor_lname}, ${event.resource.office.title}`: '');                                    
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