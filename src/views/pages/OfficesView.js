import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, IconButton, makeStyles, Paper, TextareaAutosize, TextField, Typography, withStyles } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ApartmentIcon from '@material-ui/icons/Apartment';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Calendar, momentLocalizer, Views, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../style.css";
import { callListAllReservationsAvailableToPatients } from '../../core/modules/calendarAPICalls';
import { callUnreserveAPI, callGetReservationAPI } from '../../core/modules/calendarAPICalls';
import { callListPatientReservations } from '../../core/modules/calendarAPICalls';
import { callAPIHandler } from "../../core/modules/refreshToken";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const MyTextField = withStyles({
    root: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "rgba(0, 0, 0, 1)" // (default alpha is 0.38)
        },
    }
})(TextField);

const callGetOfficeAPI = async (doctorid, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: `/auth/office-list/${doctorid}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const getNotificationAPI = ({ patient }, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: `/schedule/get-notification/${patient}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const deleteNotificationAPI = ({ id }, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "DELETE", url: `/schedule/delete-notification/${id}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const locales = {
    'en-US': require('date-fns/locale/en-US'),
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        padding: '1em',
        backgroundColor: '#f6f6f6',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#fff',
            //boxShadow: '0px 10px 10px rgba(36, 36, 36, 0.3)',
            transition: 'all 0.3s ease',
            color: '#000',
        },
    },
    cardbutton: {
        padding: '0em',
        margin: '0em 0em',
        textTransform: 'none',
        width: '100%',
        transition: 'all 0.3s ease',
    },
    title: {
        fontSize: 15,
        fontWeight: 500,
    },
    text: {
        fontSize: 13,
        fontWeight: 400,
    },
    subtext: {
        fontSize: 10,
        //fontWeight: 300,
    },
    officegrid: {
        width: '100%',
        //minHeight: '30em',
        marginLeft: '0%',
        marginRight: '0%',
        borderBottom: '1px solid #aaa',
    },
    backicon: {
        //marginBottom: '0.1em',
        backgroundColor: 'rgba(36, 36, 128, 0.3)',
        position: 'sticky',
        top: '0%',
        alignSelf: 'flex-start',
        transition: 'all 0.1s ease',
        '&:hover': {
            backgroundColor: 'rgba(36, 36, 128, 1)',
            boxShadow: '0px 0px 20px rgba(36, 36, 128, 1)',
            color: '#fff',
        },
    },
    sidebar: {
        borderBottom: '1px solid #aaa',
        marginBottom: '1em',
    },
    textfield: {
        width: '100%',
        marginLeft: "0%",
        marginRight: '0%',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f3f3f3",
            transition: 'all 0s, width 0s',
        },
    },
    textarea: {
        width: '100%',
        marginLeft: "0%",
        marginRight: '0%',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f3f3f3",
            transition: 'all 0s, width 0s',
        },
        "& .MuiInputAdornment-positionStart": {
            alignSelf: 'flex-start',
        },
        "& .MuiInputAdornment-root": {
            display: 'unset',
        },
    },
    container: {
        paddingTop: theme.spacing(4),
    },
    button2: {
        backgroundColor: '#40bad5',
        padding: window.innerWidth < 500 ? '2em 2.8em 2em 2.8em' : '2em 4em 2em 4em',
        margin: '1em 0em 1em 0em',
        textAlign: 'center',
        borderRadius: '5px',
        textTransform: 'none',
        height: '2.5em',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
    },
}));

function WeekEvent(props) {
    return (
        <div >{props.event.title}</div>
    );
}

export default function OfficesView(props) {

    const isRemembered = props.isRemembered;
    const VisitTimeDuration = props.VisitTimeDuration;
    const doctorid = props.doctorid;
    const got = props.got;
    const mainUsername = props.mainUsername;
    const [fullscreenMode, setFullscreenMode] = [props.fullscreenMode, props.setFullscreenMode];
    const [officeIndex, setOfficeIndex] = [props.officeIndex, props.setOfficeIndex];
    const [calendarMode, setCalendarMode] = [props.calendarMode, props.setCalendarMode];
    const [viewCalendar, setViewCalendar] = [props.viewCalendar, props.setViewCalendar];
    const [date, setDate] = [props.date, props.setDate];
    const [officeid, setOfficeid] = [props.officeid, props.setOfficeid];
    const [title, setTitle] = [props.title, props.setTitle];
    const [address, setAddress] = [props.address, props.setAddress];
    const [phoneNos, setPhoneNos] = [props.phoneNos, props.setPhoneNos];
    const [isChanged, setIsChanged] = [props.isChanged, props.setIsChanged];
    const [paperElav, setPaperElav] = [props.paperElav, props.setPaperElav];
    const [monthEvents, setMonthEvents] = [props.monthEvents, props.setMonthEvents];
    const [monthEventsMapper, setMonthEventsMapper] = [props.monthEventsMapper, props.setMonthEventsMapper];
    const [currentEvents, setCurrentEvents] = [props.currentEvents, props.setCurrentEvents];
    const [offices, setOffices] = [props.offices, props.setOffices];
    const [re, setRe] = [props.re, props.setRe];

    const classes = useStyles();

    const [a, seta] = useState(0);
    const [redirected, setRedirected] = useState(0);
    const bottomRef = useRef();

    useEffect(() => {
        seta(0);
    }, [a])

    const callGetOffice = async () => {
        try {
            const response = await callGetOfficeAPI(doctorid, isRemembered);
            if (response.status === 200) {
                const payload = response.payload;
                var newOffices = [];
                payload.map((office, index) => {
                    var newOffice = {};
                    newOffice.id = office.id;
                    newOffice.title = office.title;
                    newOffice.address = office.address;
                    var newPhone = [];
                    office.phone.map((phone, index) => {
                        newPhone.push(phone.phone);
                    });
                    newOffice.phone = newPhone;
                    newOffices.push(newOffice);
                });
                setOffices(newOffices);
                setPaperElav(paperElav - 1);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const callUnreserve = async (event) => {
        try {
            const response = await callUnreserveAPI({ id: event.id }, isRemembered);
            if (response.status === 200) {
                const payload = response.payload;
                event.id = payload.id;
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (got) {
            callGetOffice();
        }
    }, [got]);

    const TwoDigits = (number) => {
        //if (number > 31) number = 30;
        const str = number.toString();
        if (str.length === 1)
            return "0" + str;
        else
            return str;
    }

    const toDay = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        return (year) + (month)
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

    const RedMaker = () => {
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
                        'color': 'rgba(199,37,0,0.25)',
                        'textColor': 'rgba(213,39,0,0.7)',
                        'borderColor': 'red',
                    }
                );
                minutes += VisitTimeDuration;
            }
            const mydate = new Date(year, month, day, 6, 0);
            const index = '' + mydate.getFullYear() + TwoDigits(mydate.getMonth()) + TwoDigits(mydate.getDate());
            monthEvents[j] = ({
                'title': 'Unavailable',
                'allDay': false,
                'start': new Date(year, month, day, 6, 0),
                'end': new Date(year, month, day, 23, 30),
                'AvailableState': false,
                'id': -1,
                'greens': 0,
                'events': newEvents,
                'color': 'rgba(199,37,0,0.25)',
                'textColor': 'rgba(213,39,0,0.7)',
                'borderColor': 'red',
                'height': '5em',
            });
            monthEventsMapper[index] = j;
            day += 1;
        }
        seta(a + 1);
    }

    const Updater = (payload) => {
        const base = (6 * 60) + 0;
        payload.map((reserve) => {
            var sd0 = getDateElements(reserve.start_time);
            var sd = new Date(sd0.year, sd0.month - 1, sd0.day, sd0.hour, sd0.minute);
            const start = (sd.getHours() * 60) + sd.getMinutes();
            const startIndex = (start - base) / VisitTimeDuration;
            var ed0 = getDateElements(reserve.end_time);
            var ed = new Date(ed0.year, ed0.month - 1, ed0.day, ed0.hour, ed0.minute);
            var index = monthEventsMapper['' + sd.getFullYear() + TwoDigits(sd.getMonth()) + TwoDigits(sd.getDate())];
            if (index !== undefined) {
                if (monthEvents[index].events[startIndex].AvailableState === false) {
                    if (monthEvents[index].greens === 0) {
                        monthEvents[index].title = 'Available';
                        monthEvents[index].AvailableState = true;
                        monthEvents[index].color = 'rgba(35,199,0,0.17)';
                        monthEvents[index].textColor = 'rgba(124,196,107,1)';
                        monthEvents[index].borderColor = 'green';
                    }
                    monthEvents[index].greens += 1;
                    monthEvents[index].events[startIndex] = ({
                        'title': '',
                        'titleweek': '✔',
                        'allDay': false,
                        'start': sd,
                        'end': ed,
                        'AvailableState': true,
                        'id': reserve.id,
                        'events': [],
                        'color': 'rgba(35,199,0,0.17)',
                        'textColor': 'rgba(124,196,107,1)',
                        'borderColor': 'green',
                    });
                }
            }
        });
        //seta(a+1); 
    }

    const patientReserveUpdater = (payload, officeid) => {
        const base = (6 * 60) + 0;
        payload.map((reserve) => {
            if (reserve.office.id === officeid) {
                var sd0 = getDateElements(reserve.start_time);
                var sd = new Date(sd0.year, sd0.month - 1, sd0.day, sd0.hour, sd0.minute);
                const start = (sd.getHours() * 60) + sd.getMinutes();
                const startIndex = (start - base) / VisitTimeDuration;
                var ed0 = getDateElements(reserve.end_time);
                var ed = new Date(ed0.year, ed0.month - 1, ed0.day, ed0.hour, ed0.minute);
                var index = monthEventsMapper['' + sd.getFullYear() + TwoDigits(sd.getMonth()) + TwoDigits(sd.getDate())];
                if (index !== undefined) {
                    monthEvents[index].events[startIndex] = ({
                        'title': 'Reserved by you',
                        'titleweek': 'Reserved',
                        'allDay': false,
                        'start': sd,
                        'end': ed,
                        'AvailableState': null,
                        'id': reserve.id,
                        'events': [],
                        'color': '#8ab6d6',
                        'borderColor': 'blue',
                    });
                }
            }
        });
        //seta(a+1); 
    }

    const callTakeReserve = (id) => {
        try {
            const response = callGetReservationAPI({ id: id }, isRemembered);
        }
        catch (error) {

        }
    }
    const callRemoveReserve = (id) => {
        try {

        }
        catch (error) {

        }
    }

    const callProfileAPI = async (isRemembered) => {
        try {
            const response = callAPIHandler({ method: "GET", url: `/profile/patient/` }, true, isRemembered);
            return response;
        }
        catch (e) {
            throw e;
        }
    }

    const callGetDoctorRerserve = async (officeid) => {
        RedMaker();
        try {
            const response = await callListAllReservationsAvailableToPatients({ office_id: officeid }, isRemembered);
            if (response.status === 200) {
                Updater(response.payload);
                await getPatientReservationsList(officeid);
                seta(a + 1);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const getPatientReservationsList = async (officeid) => {
        const toDay = 30;
        var start_date = new Date();
        var end_date = new Date();
        end_date.setDate(end_date.getDate() + toDay);
        const start_month = start_date.getMonth() + 1;
        const end_month = end_date.getMonth() + 1;
        const start_day = start_date.getDate();
        const end_day = end_date.getDate();
        const from_date = `${start_date.getFullYear()}${start_month < 10 ? `0${start_month}` : start_month}${start_day < 10 ? `0${start_day}` : start_day}`;
        const to_date = `${end_date.getFullYear()}${end_month < 10 ? `0${end_month}` : end_month}${end_day < 10 ? `0${end_day}` : end_day}`;
        try {
            const response = await callListPatientReservations({ from_date: from_date, to_date: to_date }, isRemembered);
            if (response.status === 200) {
                patientReserveUpdater(response.payload, officeid);
            }
        }
        catch (e) {
            console.log("error on get reserve\n", e);
        }
    }

    const [ReserveEvent, setReserveEvent] = useState();
    const [UnreserveEvent, setUnreserveEvent] = useState();
    const ChangeEventState = (event) => {
        if (viewCalendar !== 'month') {
            if (event.AvailableState) {
                if (event.id !== -1) {
                    setReserveEvent(event);
                    handleReserveConfirmOpen(event.id);
                }
            }
            if (event.AvailableState === null) {
                setUnreserveEvent(event);
                handleUnreserveConfirmOpen(event.id);
            }
        }
        if (viewCalendar === 'month') {
            handleOnView('day');
            handleOnNavigate(event.start);
            handleOnRangeChange([event.start]);
        }
    }

    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(23, 30, 0);

    const goToOffice = (index) => {
        setOfficeid(offices[index].id);
        setTitle(offices[index].title);
        setAddress(offices[index].address);
        setPhoneNos(offices[index].phone);
        setOfficeIndex(index);
        callGetDoctorRerserve(offices[index].id);
    };

    const backToList = () => {
        if (calendarMode) {
            setCalendarMode(false);
            setFullscreenMode(false);
            setCurrentEvents(monthEvents);
            setViewCalendar('month');
        }
        else {
            setPaperElav(-1);
            setOfficeIndex(-1);
        }
    };

    const formats = {
        eventTimeRangeFormat: () => {
            return null;
        },
    };

    const handleOnView = (view) => {
        setViewCalendar(view);
    }

    const handleOnNavigate = (date, view) => {
        setDate(date);
    }

    const handleOnDrilldown = (date, view) => {

        handleOnView(view);
        handleOnRangeChange([date]);
        setDate(date);
    }

    const handleOnRangeChange = (dates) => {

        if (!dates.length) {
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
                    //newEvents = [...newEvents, ...monthEvents[index].events];
                    newEvents = newEvents.concat(monthEvents[index].events)
                }
            }
            setCurrentEvents(newEvents);
        }
    }

    const handleTitleAccessor = (event) => {
        if (viewCalendar === 'month') {
            if (event.greens > 0) {
                return event.title;// + '(' + event.greens + ')';
            }
            else {
                return event.title;
            }
        }
        else if (viewCalendar === 'week') {
            return event.titleweek;
        }
        else if (viewCalendar === 'day') {
            return event.title;
        }
    }

    const blockMaker = (date) => {
        const hour = date.getHours();
        if (hour < 10) {
            return 'start';
        }
        else if (hour < 18) {
            return 'center';
        }
        else {
            return 'end';
        }
    }

    if (re) {
        if (redirected === 0 && sessionStorage.getItem("viewedOffice") && officeIndex >= 0) {
            setRedirected(1);
            goToOffice(officeIndex);
        }

        if (redirected === 1 && sessionStorage.getItem("viewedOffice") && officeIndex >= 0) {
            setRedirected(2);
            const md = getDateElements(sessionStorage.getItem("viewedEventDate"));
            const myDate = new Date(md.year, md.month - 1, md.day, md.hour, md.minute);
            handleOnRangeChange([myDate]);
            handleOnView('day');
            handleOnNavigate(myDate);
        }

        if (redirected === 2 && sessionStorage.getItem("viewedOffice") && bottomRef.current) {
            setRedirected(3);
            setRe(false);
            const md = getDateElements(sessionStorage.getItem("viewedEventDate"));
            const myDate = new Date(md.year, md.month - 1, md.day, md.hour, md.minute);
            bottomRef.current.scrollIntoView({
                behavior: "smooth",
                block: blockMaker(myDate),
            });
        }
    }

    const [ReserveConfirmOpen, setReserveConfirmOpen] = useState(0);
    const handleReserveConfirmOpen = (id) => {
        setReserveConfirmOpen(id);
    };
    const handleReserveConfirmClose = () => {
        setReserveConfirmOpen(0);
        setReserveEvent(null);
    };
    const [UnreserveConfirmOpen, setUnreserveConfirmOpen] = useState(0);
    const handleUnreserveConfirmOpen = (id) => {
        setUnreserveConfirmOpen(id);
    }
    const handleUnreserveConfirmClose = () => {
        setUnreserveConfirmOpen(0);
        setUnreserveEvent(null);
    }

    const handleEventProp = (event) => {
        if (viewCalendar === 'month') return (
            {
                style: {
                    backgroundColor: event.color,
                    //borderColor: event.borderColor,
                    color: event.textColor,
                    height: event.height,
                    //fontSize: '0.9em',
                    borderRadius: '5px',
                }
            }
        );
        else if (viewCalendar === 'week' || viewCalendar === 'day') return (
            {
                style: {
                    backgroundColor: event.color,
                    //borderColor: event.borderColor,
                    color: event.textColor,
                    height: event.height,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    textAlign: 'center'
                }
            }
        );
    }
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const [notifications, setnotifications] = useState([]);
    const callgetNotificationAPI = async (patient) => {
        try {
            const response = await getNotificationAPI({ patient }, isRemembered);
            if (response.status === 200) {
                setnotifications(response.payload);
            }
        }
        catch (error) {
            console.log(error);
        }
        seta(a + 1);
    }
    const callDeleteNotificationAPI = async (id, index) => {
        try {
            const response = await deleteNotificationAPI({ id: id }, isRemembered);
            if (response.status === 204) {
                notifications.splice(index, 1);
                seta(a + 1);
            }
        }
        catch (error) {
            console.error("notification couldn't be deleted!");
        }
    }
    const callGetAPI = async () => {
        try {
            const response = await callProfileAPI(isRemembered);
            if (response.status === 200) {
                let payload = response.payload;
                callgetNotificationAPI(payload.user.id);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        callGetAPI();
    }, [])

    const [smallscreen, setsmallscreen] = useState(window.innerWidth < 500);

    return (officeIndex === -1 ?
        <>
            <Typography
                className={classes.title}
                style={{ margin: '1em 0em' }}
                align='center'
            >
                {offices.length !== 0 ? 'Please choose the office you want to take visit time' : 'There is no office to choose'}
            </Typography>
            <Grid container direction='row' justify='center' alignItems='center'>
                {offices.map((office, index) => (
                    <Grid item xs={12} style={{ padding: '0.5em 1em' }}>
                        <Button className={classes.cardbutton} onClick={() => goToOffice(index)} key={index}>
                            <Paper className={classes.paper}
                                onMouseEnter={() => setPaperElav(index)}
                                onMouseLeave={() => setPaperElav(-1)}
                                elevation={paperElav === index ? 10 : 1}
                            >
                                <Typography className={classes.title} align='center'>{office.title}</Typography>
                            </Paper>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </>
        :
        <Grid container spacing={1} direction='row' className={classes.officegrid} justify='center'>
            <Grid item xs={12} container direction='row' className={classes.sidebar} justify='flex-start' alignItems='center' spacing={1}>
                <Grid item>
                    <IconButton
                        onClick={backToList}
                        className={classes.backicon}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Grid>
                {calendarMode ?
                    <Grid item>
                        {window.innerWidth >= 500 &&
                            <IconButton
                                onClick={() => setFullscreenMode(!fullscreenMode)}
                                className={classes.backicon}
                            >
                                {fullscreenMode ? <FullscreenExitIcon /> : <FullscreenIcon />}
                            </IconButton>
                        }
                    </Grid>
                    :
                    <></>
                }
            </Grid>
            {!calendarMode ?
                <Grid item xs={11} container direction='row' spacing={2} style={{ marginTop: '0em' }}>
                    <Grid item xs={12}>
                        <Box >
                            <MyTextField
                                variant='outlined'
                                value={title}
                                label='Title'
                                fullWidth
                                disabled
                                className={classes.textfield}
                                inputProps={{
                                    style: { textAlign: 'center', fontSize: 15 },
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <MyTextField
                            variant='outlined'
                            value={address}
                            label='Address'
                            fullWidth
                            disabled
                            multiline
                            rows={6}
                            className={classes.textarea}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ApartmentIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    {phoneNos.map((phone, index) => (
                        <Grid item xs={12} md={6}>
                            <MyTextField
                                variant='outlined'
                                value={phone}
                                fullWidth
                                disabled
                                label={'Phone No.' + (index + 1)}
                                className={classes.textfield}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneAndroidIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </Grid>
                    ))}
                    <Grid item xs={12} container justify='center'>
                        <Button
                            className={classes.button2}
                            onClick={() => {
                                setCalendarMode(true)
                                if (window.innerWidth < 500)
                                    setFullscreenMode(true);
                            }
                            }
                        >
                            {window.innerWidth < 500 ? "Take a visit time" : "Take a visit time from this office"}
                        </Button>
                    </Grid>
                </Grid>
                :
                <>
                    <Grid item xs container justify='center'>
                        <TextField style={{ width: '100%', marginBottom: '1em', maxWidth: '20em', minWidth: window.innerWidth<500 ? '18em' : "", marginLeft: window.innerWidth<500 ?'2.8em' : "" }}
                            className={classes.margin}
                            id="input-with-icon-textfield"
                            value={"  " + VisitTimeDuration}
                            variant='standard'
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccessTimeIcon />
                                        <span>&nbsp;&nbsp;</span>Visit Time Duration :
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        minutes
                                    </InputAdornment>
                                )
                            }}
                            SelectProps={{
                                native: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.container} ref={bottomRef}>
                        <Calendar style={{ minWidth: smallscreen && calendarMode ? '50rem' : "", minHeight: '37rem', fontFamily: `'Josefin Sans', sans-serif`}}
                            formats={viewCalendar === 'week' ? formats : {}}
                            titleAccessor={handleTitleAccessor}
                            localizer={localizer}
                            views={['month', 'week', 'day']}
                            view={viewCalendar}
                            date={date}
                            events={currentEvents}
                            step={VisitTimeDuration}
                            min={minTime}
                            max={maxTime}
                            onSelectEvent={ChangeEventState}
                            onSelectSlot={slotInfo => { }}
                            onView={handleOnView}
                            onNavigate={handleOnNavigate}
                            onDrillDown={handleOnDrilldown}
                            onRangeChange={handleOnRangeChange}
                            eventPropGetter={handleEventProp}
                            selectable={false}
                            popup
                            timeslots={2}
                            defaultView='month'
                            showMultiDayTimes
                            startAccessor="start"
                            endAccessor="end"
                        //titleAccessor={(event) => {return event.title + '\n' + event.color}}
                        //drilldownView='day'
                        />
                        {ReserveEvent &&
                            <Dialog fullWidth open={ReserveConfirmOpen} TransitionComponent={Transition} keepMounted onClose={handleReserveConfirmClose}>
                                <DialogTitle>{"Reserve Confirmation"}</DialogTitle>
                                <DialogContent><DialogContentText>Are you sure you want to take a visit time on {ReserveEvent.start.toLocaleString()} ?</DialogContentText></DialogContent>
                                <DialogActions>
                                    <Button onClick={handleReserveConfirmClose} style={{ textTransform: 'none', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginBottom: '0.5em' }}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => {
                                        ReserveEvent.title = 'Reserved by you';
                                        ReserveEvent.titleweek = 'Reserved';
                                        ReserveEvent.color = '#8ab6d6';
                                        ReserveEvent.textColor = '';
                                        ReserveEvent.borderColor = 'blue';
                                        ReserveEvent.AvailableState = null;
                                        callTakeReserve(ReserveConfirmOpen);
                                        handleReserveConfirmClose();
                                    }}
                                        style={{ textTransform: 'none', backgroundColor: 'rgba(42,172,61,0.7)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginRight: '1em', marginBottom: '0.5em' }}>
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        }
                        {UnreserveEvent &&
                            <Dialog fullWidth open={UnreserveConfirmOpen} TransitionComponent={Transition} keepMounted onClose={handleUnreserveConfirmClose}>
                                <DialogTitle>{"Unreserve Confirmation"}</DialogTitle>
                                <DialogContent><DialogContentText>Are you sure you want to cancel your visit time on {UnreserveEvent.start.toLocaleString()} ?</DialogContentText></DialogContent>
                                <DialogActions>
                                    <Button onClick={handleUnreserveConfirmClose} style={{ textTransform: 'none', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginBottom: '0.5em' }}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => {
                                        UnreserveEvent.title = ' ';
                                        UnreserveEvent.titleweek = '✔';
                                        UnreserveEvent.color = 'rgba(35,199,0,0.17)';
                                        UnreserveEvent.textColor = 'rgba(124,196,107,1)';
                                        UnreserveEvent.borderColor = 'green';
                                        UnreserveEvent.AvailableState = true;
                                        callRemoveReserve(UnreserveConfirmOpen);
                                        handleUnreserveConfirmClose();
                                        callUnreserve(UnreserveEvent);
                                        notifications.map((notif, index) => {
                                            if (notif.reservation === UnreserveEvent.id)
                                                callDeleteNotificationAPI(notif.id, index);
                                        })
                                    }}
                                        style={{ textTransform: 'none', backgroundColor: 'rgba(42,172,61,0.7)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginRight: '1em', marginBottom: '0.5em' }}>
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        }
                    </Grid>
                </>
            }
        </Grid>
    );
}