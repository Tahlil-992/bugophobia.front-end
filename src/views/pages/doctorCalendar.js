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
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { callAPIHandler } from "../../core/modules/refreshToken";

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
    setLocalStorage({ isvieweddoctor: 'true', viewedusername: username });
}

const EventButton = ({ children }) => {
    return (
        <Button
            style={{ width: "100%", marginBottom: '0.1em', marginTop: '0.2em', padding: 0 }}
            component={Link}
            to="/view-profile">
            {children}
        </Button>)
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

    useEffect(() => {
        handleRangeAndViewChange(view, range);
    }, [view, range]);

    const [offices, setoffices] = useState([]);
    const [officeState, setofficeState] = useState(0);
    const [a, seta] = useState(0);
    const handleOfficeChange = (event) => {
        setofficeState(event.target.value);
    };
    const [Doctorid, setDoctorid] = useState(0);
    const callGetAPI = async () => {
        try {
            const response = await callProfileAPI(isRemembered);
            if (response.status === 200) {
                let payload = response.payload;
                setDoctorid(payload.user.id);
                callGetOffice(payload.user.id);
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
    const callGetOffice = async (id) => {
        try {
            const response = await callGetOfficeAPI(id, isRemembered);
            if (response.status === 200) {
                response.payload.map((office) => {
                    offices.push([office.title, office.id]);
                })
                seta(a+1);
            }
        }
        catch (error) {
            console.log(error);
        }
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
                            <Calendar style={{ height: '37rem' }}
                                localizer={localizer}
                                view={view}
                                onView={(event) => { setView(event); console.log(event); }}
                                onRangeChange={(event) => { setRange(event); console.log(event); }}
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
                                step={60}
                                showMultiDayTimes
                                min={minTime}
                                max={maxTime}
                                startAccessor="start"
                                endAccessor="end"
                                components={{
                                    eventWrapper: EventButton,
                                }}
                                onSelectEvent={(event) => { ViewProfile(event.resource.docotor_username); }}
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
        </div >
    );
}

export default connect(
    state => ({ isRemembered: state.authReducer.authData.remember_me }),
    null)(DoctorCalendarPage);