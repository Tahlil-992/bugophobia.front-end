import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Link, makeStyles, Paper, TextField, Typography, withStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TitleIcon from '@material-ui/icons/Title';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Calendar, momentLocalizer, Views, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../style.css";
import Popper from '@material-ui/core/Popper';
import { callCreateReservationAPI, callDeleteReservationAPI, callGetDoctorOfficeRerservationsList, callCreateMultipleReservationAPI } from "../../core/modules/calendarAPICalls";
import ApartmentIcon from '@material-ui/icons/Apartment';
import { callAPIHandler } from "../../core/modules/refreshToken";
import { setLocalStorage } from '../../core/modules/storageManager';
import  { Redirect } from 'react-router-dom';
//import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const locales = {
    'en-US': require('date-fns/locale/en-US'),
}

const MyTextField = withStyles({
    root: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "rgba(0, 0, 0, 1)" // (default alpha is 0.38)
        },
    }
})(TextField);

const callAddOfficeAPI = async (data, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "POST", url: `/auth/office-list/`, data: data }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
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

const callEditOfficeAPI = async (data, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "PUT", url: `/auth/office-list/`, data: data }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
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
    pluspaper: {
        width: '100%',
        padding: '1em',
        backgroundColor: 'rgba(42, 172, 61, 0.6)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(19, 145, 34, 0.7)',
            //boxShadow: '0px 10px 10px rgba(19, 145, 34, 0.4)',
            transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
            color: '#000',
        },
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
    button: {
        width: '40%',
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: 12,
    },
    buttongrid: {
        width: '40%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    addicon: {
        width: '1em',
        height: '1em',
        //margin: '30%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    officegrid: {
        width: '100%',
        //minHeight: '30em',
        marginLeft: '0%',
        marginRight: '0%',
        borderBottom: '1px solid #aaa',
        marginBottom: '1em',
        marginTop: '1em',
    },
    backicon: {
        //margin: '0.5em',
        backgroundColor: 'rgba(36, 36, 128, 0.3)',
        position: 'sticky',
        top: '0%',
        '&:hover': {
            backgroundColor: 'rgba(36, 36, 128, 1)',
            boxShadow: '0px 0px 20px rgba(36, 36, 128, 1)',
            color: '#fff',
        },
    },
    doneicon: {
        //margin: '0.5em',
        backgroundColor: 'rgba(36, 128, 36, 0.3)',
        position: 'sticky',
        top: '0%',
        '&:hover': {
            backgroundColor: 'rgba(36, 128, 36, 1)',
            boxShadow: '0px 0px 20px rgba(36, 128, 36, 1)',
            color: '#fff',
        },
    },
    cancelicon: {
        //margin: '0.5em',
        backgroundColor: 'rgba(128, 36, 36, 0.3)',
        position: 'sticky',
        top: '0%',
        '&:hover': {
            backgroundColor: 'rgba(128, 36, 36, 1)',
            boxShadow: '0px 0px 20px rgba(128, 36, 36, 1)',
            color: '#fff',
        },
    },
    availableicon: {
        backgroundColor: 'rgba(36, 128, 36, 0.3)',
        transition: 'all 0.1s ease',
        '&:hover': {
            backgroundColor: 'rgba(36, 128, 36, 0.3)',
        },
    },
    availableiconactive: {
        backgroundColor: 'rgba(36, 128, 36, 1)',
        boxShadow: '0px 0px 20px rgba(36, 128, 36, 1)',
        color: '#fff',
        transition: 'all 0.1s ease',
        '&:hover': {
            backgroundColor: 'rgba(36, 128, 36, 1)',
            boxShadow: '0px 0px 20px rgba(36, 128, 36, 1)',
            color: '#fff',
        },
    },
    unavailableicon: {
        backgroundColor: 'rgba(128, 36, 36, 0.3)',
        transition: 'all 0.1s ease',
        '&:hover': {
            backgroundColor: 'rgba(128, 36, 36, 0.3)',
        },
    },
    unavailableiconactive: {
        backgroundColor: 'rgba(128, 36, 36, 1)',
        boxShadow: '0px 0px 20px rgba(128, 36, 36, 1)',
        color: '#fff',
        transition: 'all 0.1s ease',
        '&:hover': {
            backgroundColor: 'rgba(128, 36, 36, 1)',
            boxShadow: '0px 0px 20px rgba(128, 36, 36, 1)',
            color: '#fff',
        },
    },
    fullscreenicon: {
        //margin: '0.5em',
        backgroundColor: 'rgba(128, 36, 128, 0.3)',
        position: 'sticky',
        top: '0%',
        '&:hover': {
            backgroundColor: 'rgba(128, 36, 128, 1)',
            boxShadow: '0px 0px 20px rgba(128, 36, 128, 1)',
            color: '#fff',
        },
    },
    sidebar: {
        borderRight: '1px solid #aaa',
        borderLeft: '1px solid #aaa',
        borderBottom: '1px solid #aaa',
        borderTop: '1px solid #aaa',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        //marginLeft: '1em',
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
        maxWidth: '100%',
        minWidth: '100%',
        maxHeight: '16em',
        minHeight: '8em',
        borderRadius: '3px',
        marginLeft: '0%',
        marginRight: '0%',
        backgroundColor: 'inherit',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f3f3f3",
            transition: 'all 0s, width 0s',
        },
    },
    container: {
        paddingTop: theme.spacing(4),
    },
    popover: {
        pointerEvents: 'none',
        //transition: 'all 0.01s ease',
        position: 'absolute',
        top: '0em',
    },
    popoverpaper: {
        padding: '0.5em 1em',
        //transition: 'all 0.3s ease',
        zIndex: -5000,
    },
    arrow: {
        backgroundColor: '#fff',
        position: 'absolute',
        transform: 'rotate(45deg)',
        top: '-1em',
        width: '2em',
        height: '2em',
        fontSize: '7px',
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
    button2: {
        backgroundColor: '#40bad5',
        padding: '2em 4em 2em 4em',
        margin: '1em 0em 1em 0em',
        textAlign: 'center',
        borderRadius: '5px',
        textTransform: 'none',
        height: '2.5em',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
    },
    submitButton: {
        textTransform: "none",
        backgroundColor: 'rgba(42, 172, 61, 0.6)',
        padding: '1em 4em 1em 4em',
        margin: '1em 0em 1em 0em',
        minWidth: '12em',
        "&:hover": {
            backgroundColor: 'rgba(19, 145, 34, 0.7)',
        },
    },
    cancelButton: {
        textTransform: "none",
        backgroundColor: "#bdc1c5",
        padding: '1em 4em 1em 4em',
        margin: '1em 0em 1em 0em',
        minWidth: '12em',
        "&:hover": {
            backgroundColor: "#9099A1",
        },
    },
}));

export default function Offices(props) {

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
    const [title, setTitle] = [props.title, props.setTitle];
    const [address, setAddress] = [props.address, props.setAddress];
    const [phoneNos, setPhoneNos] = [props.phoneNos, props.setPhoneNos];
    const [isChanged, setIsChanged] = [props.isChanged, props.setIsChanged];
    const [paperElav, setPaperElav] = [props.paperElav, props.setPaperElav];
    const [monthEvents, setMonthEvents] = [props.monthEvents, props.setMonthEvents];
    const [monthEventsMapper, setMonthEventsMapper] = [props.monthEventsMapper, props.setMonthEventsMapper];
    const [currentEvents, setCurrentEvents] = [props.currentEvents, props.setCurrentEvents];
    const [selectable, setSelectable] = [props.selectable, props.setSelectable];
    const [weekSchedule, setWeekSchedule] = [props.weekSchedule, props.setWeekSchedule];
    const [daySchedule, setDaySchedule] = [props.daySchedule, props.setDaySchedule];

    const classes = useStyles();

    const [offices, setOffices] = useState([]);
    const [a, seta] = useState(0);
    const [page, setPage] = useState(0);

    const callAddOffice = async (data) => {
        try {
            const response = await callAddOfficeAPI( data, isRemembered);
            if (response.status === 201) {
                //alert(response.payload.id);
                offices[offices.length - 1].id = response.payload.id;
                callCreateNewReservations(response.payload.id);
                
            }
        }
        catch (error) {
            console.log(error);

        }
    }

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

    const callEditOffice = async (data) => {
        try {
            const response = await callEditOfficeAPI( data, isRemembered);
            if (response.status === 201) {
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

    const [autoFocus, setAutoFocus] = useState(false);

    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(23, 30, 0);

    const TwoDigits = (number) => {
        const str = number.toString();
        if (str.length === 1)
            return "0" + str;
        else
            return str;
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

    const callCreateReserve = async (year, month, day, hours, minutes, officeid, event=null, event2=null) => {
        const mydate1 = new Date(year, month+1, day, hours, minutes);
        try {
            const response = await callCreateReservationAPI({ start_time: mydate1.getFullYear() + " " + mydate1.getMonth() + " " + mydate1.getDate() + " " + mydate1.getHours() + " " + mydate1.getMinutes(), office: officeid}, isRemembered);
            if (response.status === 201) {
                var reserveid = response.payload.id;
                if (event) {
                    event.id = reserveid;
                }
            }
        }
        catch (error) {
            console.log(error);
            //throw error;
            if (event) {
                event.title = event.id === -1 ? 'Unavailable' : '';
                event.titleweek = '✘';
                event.color = '#fb3640';
                event.borderColor = 'red';
                event.AvailableState = false;
                seta(a + 1);
            }
            if (event2) {
                event2.greens = event2.greens - 1;
                if (event2.greens === 0) {
                    event2.title = `Unavailable`;
                    event2.color = '#fb3640';
                    event2.borderColor = 'red';
                    event2.AvailableState = false;
                }
                else {
                    event2.title = `Available`;
                }
                seta(a + 1);
            }
        }
    }

    const callCreateMultipleReserve = async (startDate, endDate, officeid) => {
        try {
            const start_time = startDate.getFullYear() + " " + (startDate.getMonth()+1) + " " + startDate.getDate() + " " + startDate.getHours() + " " + startDate.getMinutes();
            const end_time = endDate.getFullYear() + " " + (endDate.getMonth()+1) + " " + endDate.getDate() + " " + endDate.getHours() + " " + endDate.getMinutes();
            const response = await callCreateMultipleReservationAPI({ start_time: start_time, end_time: end_time, office: officeid}, isRemembered);
            if (response.status === 200) {
                callUpdateDoctorRerserve(officeid, startDate);
            }
        }
        catch (error) {
            console.log(error);
            callUpdateDoctorRerserve(officeid, startDate);
        }
    }

    const callDeleteReserve = async (id, event=null, event2=null) => {
        try {
            const response = await callDeleteReservationAPI({id: id}, isRemembered);
            if (response.status === 204) {
                if (event) {
                    event.id = -2;
                }
            }
        }
        catch (error) {
            console.log(error);
            if (event) {
                event.title = event.id === -1 ? 'Available' : '';
                event.titleweek = '✔';
                event.color = 'lightgreen';
                event.borderColor = 'green';
                event.AvailableState = true;
                seta(a + 1);
            }
            if (event2) {
                event2.greens = event2.greens + 1;
                event2.title = `Available`;
                event2.color = 'lightgreen';
                event2.borderColor = 'green';
                event2.AvailableState = true;
                seta(a + 1);
            }
        }
    }

    const callGetDoctorRerserve = async (officeid, start=0, end=90) => {
            var newMonthEvents = new Array(end);
            var newMonthEventsMapper = {};
            var date = new Date();
            var year = date.getFullYear(); 
            var month = date.getMonth();
            var day = date.getDate() + start;
            for (var j = start; j < end; j++) {
                var newEvents = [];
                var hours = 6;
                var minutes = 0;
                var Greens = 0;
                try {
                    const DAY = new Date(year, month, day);
                    const from_date = '' + DAY.getFullYear() + TwoDigits(DAY.getMonth()+1) + TwoDigits(DAY.getDate());
                    const DAY2 = new Date(year, month, day+1);
                    const to_date = '' + DAY2.getFullYear() + TwoDigits(DAY2.getMonth()+1) + TwoDigits(DAY2.getDate());
                    const response = await callGetDoctorOfficeRerservationsList({ office_id: officeid, from_date: from_date, to_date: to_date }, isRemembered)
                    if (response.status === 200) {
                        const length = Math.floor((18 * 60) / VisitTimeDuration) - 1;
                        const base = (6*60) + 0;
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
                        
                        var minutes = 0;
                        response.payload.map((reserve, index) => {
                            var sd0 = getDateElements(reserve.start_time);
                            var sd = new Date(sd0.year, sd0.month-1, sd0.day, sd0.hour, sd0.minute);
                            const startDate = sd;
                            const start = (startDate.getHours()*60) + startDate.getMinutes();
                            const startIndex = (start - base) / VisitTimeDuration;
                            var ed0 = getDateElements(reserve.end_time);
                            var ed = new Date(ed0.year, ed0.month-1, ed0.day, ed0.hour, ed0.minute);
                            const patient = reserve.patient;
                            if (!patient) {
                                Greens += 1;
                            }
                            newEvents[startIndex] = patient ?
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
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
                const mydate = new Date(year, month, day, 6, 0);
                const index = '' + mydate.getFullYear() + TwoDigits(mydate.getMonth()) + TwoDigits(mydate.getDate());
                newMonthEvents[j] = Greens === 0 ? 
                (
                    {
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
                    }
                ) 
                : 
                (
                    {
                        'title': `Available`,
                        'allDay': false,
                        'start': new Date(year, month, day, 6, 0),
                        'end': new Date(year, month, day, 23, 30),
                        'AvailableState': true,
                        'id': -1,
                        'greens': Greens,
                        'events': newEvents,
                        'color': 'lightgreen',
                        'borderColor': 'green',
                        'height': '5em',
                    }
                );
                //alert(j + ' ' + newEvents.length);
                newMonthEventsMapper[index] = j;
                day += 1;
                setCurrentEvents(newMonthEvents);
                seta(a+1);
            }
            setMonthEvents((newMonthEvents));
            setMonthEventsMapper(newMonthEventsMapper);
            setCurrentEvents((newMonthEvents));
    }

    const callUpdateDoctorRerserve = async (officeid, date) => {
        var year = date.getFullYear(); 
        var month = date.getMonth();
        var day = date.getDate();
        var newEvents = [];
        var hours = 6;
        var minutes = 0;
        var Greens = 0;
        try {
            const DAY = new Date(year, month, day);
            const from_date = '' + DAY.getFullYear() + TwoDigits(DAY.getMonth()+1) + TwoDigits(DAY.getDate());
            const DAY2 = new Date(year, month, day+1);
            const to_date = '' + DAY2.getFullYear() + TwoDigits(DAY2.getMonth()+1) + TwoDigits(DAY2.getDate());
            const response = await callGetDoctorOfficeRerservationsList({ office_id: officeid, from_date: from_date, to_date: to_date }, isRemembered)
            if (response.status === 200) {
                const length = Math.floor((18 * 60) / VisitTimeDuration) - 1;
                const base = (6*60) + 0;
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
                
                var minutes = 0;
                response.payload.map((reserve, index) => {
                    var sd0 = getDateElements(reserve.start_time);
                    var sd = new Date(sd0.year, sd0.month-1, sd0.day, sd0.hour, sd0.minute);
                    const startDate = sd;
                    const start = (startDate.getHours()*60) + startDate.getMinutes();
                    const startIndex = (start - base) / VisitTimeDuration;
                    var ed0 = getDateElements(reserve.end_time);
                    var ed = new Date(ed0.year, ed0.month-1, ed0.day, ed0.hour, ed0.minute);
                    console.log(sd + ' ' + ed);
                    const patient = reserve.patient;
                    if (!patient) {
                        Greens += 1;
                    }
                    newEvents[startIndex] = patient ?
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
                });
            }
        }
        catch (error) {
            console.log(error);
        }
        const mydate = date;
        const index = monthEventsMapper['' + mydate.getFullYear() + TwoDigits(mydate.getMonth()) + TwoDigits(mydate.getDate())];
        if (index === undefined) {
            monthEvents.push(Greens === 0 ? 
            ({
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
            }) 
            : 
            (
                {
                    'title': 'Available',
                    'allDay': false,
                    'start': new Date(year, month, day, 6, 0),
                    'end': new Date(year, month, day, 23, 30),
                    'AvailableState': true,
                    'id': -1,
                    'greens': Greens,
                    'events': newEvents,
                    'color': 'lightgreen',
                    'borderColor': 'green',
                    'height': '5em',
                }
            ));
            monthEventsMapper['' + mydate.getFullYear() + TwoDigits(mydate.getMonth()) + TwoDigits(mydate.getDate())] = monthEvents.length - 1;
        }
        else {
            monthEvents[index] = Greens === 0 ? 
            ({
                'title': 'Unavailable',
                'allDay': false,
                'start': new Date(year, month, day, 6, 0),
                'end': new Date(year, month, day, 23, 30),
                'AvailableState': false,
                'id': -1,
                'events': newEvents,
                'color': '#fb3640',
                'borderColor': 'red',
                'height': '5em',
            }) 
            : 
            (
                {
                    'title': 'Available',
                    'allDay': false,
                    'start': new Date(year, month, day, 6, 0),
                    'end': new Date(year, month, day, 23, 30),
                    'AvailableState': true,
                    'id': -1,
                    'events': newEvents,
                    'color': 'lightgreen',
                    'borderColor': 'green',
                    'height': '5em',
                }
            );
        }
        seta(a+1);
    }

    const weekdayMap = {
        'Sun': 0,
        'Mon': 1,
        'Tue': 2,
        'Wed': 3,
        'Thu': 4,
        'Fri': 5,
        'Sat': 6,
    }

    const callCreateNewReservations = async (officeid) => {
        const startHour = daySchedule[0].getHours();
        const startMinute = daySchedule[0].getMinutes();
        const endHour = daySchedule[1].getHours();
        const endMinute = daySchedule[1].getMinutes();
        if ((startHour*60 + startMinute) >= (endHour*60 + endMinute)) {
            return;
        }
        var date = new Date();
        var year = date.getFullYear(); 
        var month = date.getMonth();
        var day = date.getDate();
        for (var j = 0; j < 90; j++) {
            const start = new Date(year, month, day, startHour, startMinute);
            const weekday = start.toDateString().split(' ')[0];
            //alert(weekday + ' ' + weekdayMap[weekday] + ' ' + weekSchedule[weekdayMap[weekday]]);
            if (weekSchedule[weekdayMap[weekday]]) {
                const end = new Date(year, month, day, endHour, endMinute);
                callCreateMultipleReserve(start, end, officeid);
            }
            else {
                callUpdateDoctorRerserve(officeid, start);
            }
            day += 1;
        }
    }

    const ChangeEventState = (event) => {
        if (event.AvailableState === null || event.username) {
            ViewProfile(event.username);
            setPage(2);
            return;
        }
        if (event.id === -1) {
            if (selectable === 0) {
                handleOnView('day');
                handleOnRangeChange([event.start]);
                handleOnNavigate(event.start);
            }
            else if (selectable === 1) {
                event.color = 'lightgreen';
                event.borderColor = 'green';
                event.AvailableState = true;
                event.events.map((e, index) => {
                    if (e.AvailableState === false) {
                        e.AvailableState = true;
                        event.greens = event.greens + 1;
                        event.title = `Available`;
                        callCreateReserve(e.start.getFullYear(), e.start.getMonth(), e.start.getDate(), e.start.getHours(), e.start.getMinutes(), offices[officeIndex].id, e, event);
                        e.title = '';
                        e.titleweek = '✔';
                        e.color = 'lightgreen';
                        e.borderColor = 'green';
                    }
                });
                setPaperElav(paperElav + 1);
            }
            else {
                event.title = 'Unavailable';
                event.color = '#fb3640';
                event.borderColor = 'red';
                event.AvailableState = false;
                event.greens = 0;
                event.events.map((e, index) => {
                    if (e.AvailableState) {
                        e.AvailableState = false;
                        callDeleteReserve(e.id, e, event);
                        e.title = '';
                        e.titleweek = '✘';
                        e.color = '#fb3640';
                        e.borderColor = 'red';
                        e.id = -2;
                        setPaperElav(paperElav + 1);
                    }
                });
            }
        }
        else if (event.id === -2) {
            if (selectable === 1) {
                event.title = '';
                event.titleweek = '✔';
                event.color = 'lightgreen';
                event.borderColor = 'green';
                event.AvailableState = true;
                const startDate = event.start;
                const index = monthEventsMapper['' + startDate.getFullYear() + TwoDigits(startDate.getMonth()) + TwoDigits(startDate.getDate())];
                if (monthEvents[index].greens === 0) {
                    monthEvents[index].title = 'Available';
                    monthEvents[index].color = 'lightgreen';
                    monthEvents[index].borderColor = 'green';
                }
                monthEvents[index].greens += 1;
                callCreateReserve(event.start.getFullYear(), event.start.getMonth(), event.start.getDate(), event.start.getHours(), event.start.getMinutes(), offices[officeIndex].id, event, monthEvents[index]);
            }
        }
        else {
            if (selectable === 2) {
                event.title = '';
                event.titleweek = '✘';
                event.color = '#fb3640';
                event.borderColor = 'red';
                event.AvailableState = false;
                const startDate = event.start;
                const index = monthEventsMapper['' + startDate.getFullYear() + TwoDigits(startDate.getMonth()) + TwoDigits(startDate.getDate())];
                monthEvents[index].greens -= 1;
                if (monthEvents[index].greens === 0) {
                    monthEvents[index].title = 'Unavailable';
                    monthEvents[index].color = '#fb3640';
                    monthEvents[index].borderColor = 'red';
                }
                callDeleteReserve(event.id, event, monthEvents[index]);
            }
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [arrowRef, setArrowRef] = useState(null);
    const [popperText, setPopperText] = useState('');
    const popoverOpen = Boolean(anchorEl);

    const handlePopoverOpen = (event, text) => {
        setAnchorEl(event.currentTarget);
        setPopperText(text);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleArrowRef = node => (
        setArrowRef(node)
    );

    const addOffice = () => {
        if (page === 0) {
            setPage(1);
            return;
        }
        const index = offices.length;
        var newOffices = offices;
        newOffices.push({
            id: 0,
            title: 'Office ' + (index + 1),
            address: 'Address',
            phone: ['0'],
        });
        setOffices(newOffices);
        setTitle(offices[index].title);
        setAddress(offices[index].address);
        setPhoneNos(offices[index].phone);
        setOfficeIndex(index);
        const data = {
            doctor: doctorid,
            title: 'Office ' + (index + 1),
            address: 'Address',
            location: 0,
            phone: [
                {phone: '0'},
            ]
        }
        callAddOffice(data);
    };

    const removeOffice = (index) => {
        if (index === -1) {
            setOffices([]);
            setPaperElav(1);
        }
        else {
            let newOffices = offices;
            newOffices.splice(index, 1);
            setOffices(newOffices);
            setPaperElav(offices.length + 1);
        }
        handlePopoverClose();
    };

    const goToOffice = (index) => {
        setTitle(offices[index].title);
        setAddress(offices[index].address);
        setPhoneNos(offices[index].phone);
        setOfficeIndex(index);
        callGetDoctorRerserve(offices[index].id);
    };

    const saveChanges = () => {
        var newOffices = offices;
        if (!title) {
            newOffices[officeIndex].title = 'Office ' + (officeIndex + 1);
            setTitle('Office ' + (officeIndex + 1));
        }
        else {
            newOffices[officeIndex].title = title;
        }
        newOffices[officeIndex].address = address;
        newOffices[officeIndex].phone = phoneNos;
        setOffices(newOffices);
        setIsChanged(false);
        setAutoFocus(false);
        setPaperElav(paperElav + 1);
        handlePopoverClose();
        var phone = [];
        phoneNos.map((ph, index) => {
            phone.push({phone: ph});
        });
        const data = {
            id: offices[officeIndex].id,
            doctor: doctorid,
            title: title,
            address: address,
            location: 0,
            phone: phone,
        }
        callEditOffice(data);
    };

    const cancelChanges = () => {
        setTitle(offices[officeIndex].title);
        setAddress(offices[officeIndex].address);
        setPhoneNos(offices[officeIndex].phone);
        setIsChanged(false);
        setAutoFocus(false);
        setPaperElav(paperElav + 1);
        handlePopoverClose();
    };

    const backToList = () => {
        if (calendarMode) {
            setFullscreenMode(false);
            setCurrentEvents(monthEvents);
            setCalendarMode(false);
            setViewCalendar('month');
            setSelectable(0);
        }
        else {
            setIsChanged(false);
            setAutoFocus(false);
            setPaperElav(-1);
            setOfficeIndex(-1);
            handlePopoverClose();
            setPage(0);
            setMonthEventsMapper({});
            setMonthEvents([]);
            setCurrentEvents([]);
        }
    };

    const changePhone = (index, phone) => {
        var newPhone = [...phoneNos];
        newPhone[index] = phone;
        setPhoneNos(newPhone);
        setIsChanged(true);
        setPaperElav(paperElav + 1);
    };

    const addPhone = () => {
        var newPhone = [...phoneNos];
        newPhone.push('');
        setPhoneNos(newPhone);
        setIsChanged(true);
        setAutoFocus(true);
        setPaperElav(paperElav + 1);
        handlePopoverClose();
    };

    const removePhone = (index) => {
        let newPhone = phoneNos;
        if (index > -1) {
            newPhone.splice(index, 1);
        }
        setPhoneNos(newPhone);
        setIsChanged(true);
        setAutoFocus(false);
        setPaperElav(paperElav + 1);
        handlePopoverClose();
    };

    
    
    
    useEffect(() => {
        if (got) {
            const mydate = new Date();
        }
    }, [got]);
    
    
    const formats = {
        eventTimeRangeFormat: () => {
            return null;
        }
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
                monthEvents[index].events.map((event)=>console.log(event.start.toLocaleString()));
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

    const handleOnSelect = (slotInfo) => {
        if (slotInfo.action === 'click') {
            return;
        }
        if (viewCalendar === 'month') {
            slotInfo.slots.map( async (slot) => {
                const index = monthEventsMapper['' + slot.getFullYear() + TwoDigits(slot.getMonth()) + TwoDigits(slot.getDate())];
                if (index !== undefined) {
                    await ChangeEventState(monthEvents[index]);
                }
            });
        }
        else if (viewCalendar === 'week') {
            if (slotInfo.slots[0].getHours() === 0) {
                slotInfo.slots.map( async (slot) => {
                    const index = monthEventsMapper['' + slot.getFullYear() + TwoDigits(slot.getMonth()) + TwoDigits(slot.getDate())];
                    if (index !== undefined) {
                        await ChangeEventState(monthEvents[index]);
                    }
                });
            }
            else {
                const length = slotInfo.slots.length;
                const startDate = slotInfo.slots[0];
                const start = (startDate.getHours()*60) + startDate.getMinutes();
                const base = (6*60) + 0;
                const startIndex = (start - base) / VisitTimeDuration;
                const endIndex = startIndex + length - 1;
                const index = monthEventsMapper['' + startDate.getFullYear() + TwoDigits(startDate.getMonth()) + TwoDigits(startDate.getDate())];
                for (var i = startIndex; i < endIndex; i++) {
                    if (selectable === 1 && !monthEvents[index].events[i].AvailableState) {
                        ChangeEventState(monthEvents[index].events[i]);
                    }
                    else if (selectable === 2 && monthEvents[index].events[i].AvailableState) {
                        ChangeEventState(monthEvents[index].events[i]);
                    }
                }
            }
        }
        else {
            const length = slotInfo.slots.length;
            const startDate = slotInfo.slots[0];
            const start = (startDate.getHours()*60) + startDate.getMinutes();
            const base = (6*60) + 0;
            const startIndex = (start - base) / VisitTimeDuration;
            const endIndex = startIndex + length - 1;
            const index = monthEventsMapper['' + startDate.getFullYear() + TwoDigits(startDate.getMonth()) + TwoDigits(startDate.getDate())];
            for (var i = startIndex; i < endIndex; i++) {
                if (selectable === 1 && !monthEvents[index].events[i].AvailableState) {
                    ChangeEventState(monthEvents[index].events[i]);
                }
                else if (selectable === 2 && monthEvents[index].events[i].AvailableState) {
                    ChangeEventState(monthEvents[index].events[i]);
                }
            }
        }
    }

    const handleEventProp = (event) => {
        if (viewCalendar === 'month') return(
            {style: {
                backgroundColor: event.color,
                borderColor: event.borderColor,
                height: event.height,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                justifySelf: 'center',
                borderRadius:'5px',
                fontSize: '0.9em',
            }}
        );
        else if (viewCalendar === 'week' || viewCalendar === 'day') return(
            {style: {
                backgroundColor: event.color,
                borderColor: event.borderColor,
                height: event.height,
                alignSelf: 'center',
                justifySelf: 'center',
                textAlign:'center'
            }}
        );
    }

    const handleTitleAccessor = (event) => {
        if (viewCalendar === 'month') {
            if (event.greens > 0) {
                return event.title + '(' + event.greens + ')';
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

    const ViewProfile = (username) => {
        setLocalStorage({ isvieweddoctor: 'false', viewedusername: username });
    }

    useEffect(() => {
        seta(0);
    }, [a])

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thuesday', 'Friday', 'Saturday'];

    const defaultMaterialTheme = createMuiTheme({
        palette: {
            primary: blue,
        },
    });

    const timepickerChange = (date, index) => {
        daySchedule[index] = date;
        seta(a+1);
    }

    const checkboxChange = (event, index) => {
        weekSchedule[index] = !weekSchedule[index];
        seta(a+1);
    }

    if (page === 1) return (
        <Grid container justify='center' alignItems='center' spacing={2} style={{padding: '2em'}}>
            <Grid item xs={12}>
                <Typography className={classes.title} align='center'>Please set your weekly and daily schedule</Typography>
            </Grid>
            <Grid item  xs={8} container spacing={2}>
                <MuiPickersUtilsProvider Toolbar={{ backgroundColor: 'red' }} utils={DateFnsUtils}>
                    <Grid container spacing={4} justify='flex-start' style={{ alignItems: 'center', textAlign: 'center' }}>
                        <Grid item xs={12}>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <KeyboardTimePicker
                                    style={{ width: '45%' }}
                                    margin="normal"
                                    id="time-picker"
                                    label="Start Time"
                                    disablePast={true}
                                    ampm={true}
                                    value={daySchedule[0]}
                                    onChange={(date) => timepickerChange(date, 0)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    minutesStep={5}
                                />
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <KeyboardTimePicker
                                    style={{ width: '45%' }}
                                    margin="normal"
                                    id="time-picker"
                                    label="End Time"
                                    disablePast={true}
                                    ampm={true}
                                    value={daySchedule[1]}
                                    onChange={(date) => timepickerChange(date, 1)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    minutesStep={5}
                                />
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={4} container spacing={1}>
                {weekSchedule.map((week, index) => (
                    <Grid item xs={12} container justify='left'>
                        <FormControlLabel
                            control={<Checkbox checked={week}/>}
                            label={weekdays[index]}
                            onChange={(event) => checkboxChange(event, index)} />
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={6} container justify='flex-end'>
                <Button 
                    className={classes.submitButton}
                    onClick={() => {setPage(3); addOffice();}}
                    >
                        OK
                </Button>
            </Grid>
            <Grid item xs={6} container justify='flex-start'>
                <Button 
                    className={classes.cancelButton}
                    onClick={() => {setPage(0);}}
                    >
                        Cancel
                </Button>
            </Grid>
        </Grid>
    );

    if (page === 2) return (
        <Redirect to='view-profile'/>
    )

    return (officeIndex === -1 ?
        <Grid container direction='row' justify='center' alignItems='center' style={{marginTop: '1em'}}>
            {offices.map((office, index) => (
                <>
                    <Grid item xs={11} style={{ padding: '0.5em 1em' }}>
                        <Button style={{ padding: '0em', margin: '0em 0em', textTransform: 'none', width: '100%' }} onClick={() => goToOffice(index)} key={index}>
                            <Paper className={classes.paper}
                                onMouseEnter={() => setPaperElav(index)}
                                onMouseLeave={() => setPaperElav(-1)}
                                elevation={paperElav === index ? 10 : 1}
                            >
                                <Typography className={classes.title} align='center'>{office.title}</Typography>
                            </Paper>
                        </Button>
                    </Grid>
                    <Grid item xs container justify='center' alignItems='center'>
                        <IconButton
                            onClick={() => removeOffice(index)}
                            onMouseEnter={(event) => handlePopoverOpen(event, 'Remove "' + offices[index].title + '"')}
                            onMouseLeave={handlePopoverClose}
                        >
                            <DeleteIcon style={{ color: "#E03030" }} />
                        </IconButton>
                    </Grid>
                </>
            ))}
            <Grid item xs={11} style={{ padding: '0.5em 1em', borderBottom: '0px' }} >
                <Button style={{ padding: '0em', margin: '0em 0em', width: '100%', textTransform: 'none' }} onClick={addOffice}>
                    <Paper className={classes.pluspaper}
                        onMouseEnter={() => setPaperElav(offices.length)}
                        onMouseLeave={() => setPaperElav(-1)}
                        elevation={paperElav === offices.length ? 10 : 1}
                    >
                        <Typography className={classes.title} align='center'>
                            {paperElav === offices.length ? '+ Add a new office' : '+'}
                        </Typography>
                    </Paper>
                </Button>
            </Grid>
            <Grid item xs container justify='center' alignItems='center'>
                <IconButton
                    onClick={() => removeOffice(-1)}
                    onMouseEnter={(event) => handlePopoverOpen(event, 'Remove All')}
                    onMouseLeave={handlePopoverClose}
                    disabled={offices.length === 0}
                >
                    <DeleteForeverIcon style={{ color: offices.length === 0 ? 'gray' : "#E03030" }} />
                </IconButton>
            </Grid>
            <Popper
                id="mouse-over-popover"
                className={classes.popover}
                placement='bottom-start'
                transition
                modifiers={{
                    arrow: {
                        enable: true,
                        element: arrowRef,
                    }
                }}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
            >
                {
                    true &&
                    <span className={classes.arrow} ref={handleArrowRef} />
                }
                <Paper elevation={5} className={classes.popoverpaper}>
                    <Typography className={classes.text}>{popperText}</Typography>
                </Paper>
            </Popper>
        </Grid>
        :
        <Grid container spacing={1} direction='row' className={classes.officegrid} justify='center'>
            <Grid item xs={12} container direction='row' className={classes.sidebar} justify='flex-start' alignItems='baseline' spacing={1}>
                <Grid item>
                    <IconButton
                        onClick={backToList}
                        className={classes.backicon}
                        onMouseEnter={(event) => handlePopoverOpen(event, 'Back')}
                        onMouseLeave={handlePopoverClose}
                        >
                            <ArrowBackIcon />
                    </IconButton>
                </Grid>
                {calendarMode ?
                    <>
                        <Grid item>
                            <IconButton
                                onClick={() => setFullscreenMode(!fullscreenMode)}
                                className={classes.fullscreenicon}
                                onMouseEnter={
                                    (event) => {
                                        if (fullscreenMode) {
                                            handlePopoverOpen(event, 'Exit Fullscreen')
                                        }
                                        else {
                                            handlePopoverOpen(event, 'Fullscreen');
                                        }
                                    }
                                }
                                onMouseLeave={handlePopoverClose}
                                >
                                    {fullscreenMode ? <FullscreenExitIcon/> : <FullscreenIcon/>}
                            </IconButton>
                        </Grid> 
                        <Grid item>
                            <IconButton
                                onClick={() => setSelectable(selectable === 1 ? 0 : 1)}
                                className={selectable === 1 ? classes.availableiconactive : classes.availableicon}
                                onMouseEnter={(event) => handlePopoverOpen(event, 'Select to set Available')}
                                onMouseLeave={handlePopoverClose}
                                >
                                    <EventAvailableIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={() => setSelectable(selectable === 2 ? 0 : 2)}
                                className={selectable === 2 ? classes.unavailableiconactive : classes.unavailableicon}
                                onMouseEnter={(event) => handlePopoverOpen(event, 'Select to set Unavailable')}
                                onMouseLeave={handlePopoverClose}
                                >
                                    <EventBusyIcon />
                            </IconButton>
                        </Grid>
                    </>
                    :
                    <>
                        <Grid item>
                            <IconButton
                                onClick={saveChanges}
                                className={classes.doneicon}
                                disabled={!isChanged}
                                onMouseEnter={(event) => handlePopoverOpen(event, 'Save changes')}
                                onMouseLeave={handlePopoverClose}
                                >
                                    <DoneIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={cancelChanges}
                                className={classes.cancelicon}
                                disabled={!isChanged}
                                onMouseEnter={(event) => handlePopoverOpen(event, 'Cancel changes')}
                                onMouseLeave={handlePopoverClose}
                                >
                                    <ClearIcon />
                            </IconButton>
                        </Grid>
                    </>
                }
            </Grid>
            {!calendarMode ?
            <Grid item xs={12} md={11} container direction='row' spacing={2}>
                <Grid item xs={12} style={{ textAlign: 'center', }} inputProps={{ min: 0, style: { textAlign: 'center', } }}>
                    <Box >
                        <TextField
                            variant='outlined'
                            value={title}
                            label='Title'
                            fullWidth
                            autoFocus={false}
                            className={classes.textfield}
                            inputProps={{
                                style: { textAlign: 'center', fontSize: 15 },
                                startAdornment: (<InputAdornment position="start"> <TitleIcon /> </InputAdornment>),
                            }}
                            onChange={(event) => { setTitle(event.target.value); setIsChanged(true); }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Box>
                        <MyTextField
                            variant='outlined'
                            value={address}
                            label='Address'
                            fullWidth
                            onChange = {(event) => {setAddress(event.target.value); setIsChanged(true);}}
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
                    </Box>
                </Grid>
                
                        {phoneNos.map((phone, index) => (
                            <Grid item xs={12} md={6}>
                            <Box display='flex' alignItems='center'>
                                <MyTextField
                                    label={"Phone No." + (index+1)}
                                    variant='outlined'
                                    value={phone}
                                    fullWidth
                                    autoFocus={autoFocus}
                                    className={classes.textfield}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneAndroidIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <IconButton
                                                style={{ marginLeft: '0.0em' }}
                                                onClick={() => removePhone(index)}
                                                disabled={phoneNos.length === 1}
                                                onMouseEnter={(event) => handlePopoverOpen(event, 'Remove this phone number')}
                                                onMouseLeave={handlePopoverClose}
                                            >
                                                <RemoveIcon fontSize='small' color={phoneNos.length === 1 ? 'disabled' : 'secondary'} />
                                            </IconButton>
                                        ),
                                    }}
                                    onChange={(event) => changePhone(index, event.target.value)}
                                />
                                
                            </Box>
                            
                </Grid>
                        ))}
                        <Grid item xs={12} md={6}>
                        <IconButton
                            onClick={addPhone}
                            style={{ backgroundColor: '#e0e0e0' }}
                            onMouseEnter={(event) => handlePopoverOpen(event, 'Add a phone number')}
                            onMouseLeave={handlePopoverClose}
                        >
                            <AddIcon fontSize='small' color='primary' />
                        </IconButton>
                        </Grid>
                        <Grid item xs={12} container justify='center'>
                        <Button 
                            className={classes.button2}
                            onClick={() => {setCalendarMode(true); setViewCalendar('month');}}
                            >
                                Office's Calendar
                        </Button>
                    </Grid>
                        
            </Grid>
            :
            <Grid item xs={12} className={classes.container}>
                <Calendar style={{ minHeight: '37rem' }} formats={viewCalendar === 'week' ? formats : {}}
                    titleAccessor = {handleTitleAccessor}
                    localizer={localizer}
                    id='clndr'
                    views={['month', 'week', 'day']}
                    view={viewCalendar}
                    date={date}
                    selectable={selectable}
                    popup
                    onSelectEvent={event => ChangeEventState(event)}
                    onSelectSlot={handleOnSelect}
                    onView={handleOnView}
                    onNavigate={handleOnNavigate}
                    events={currentEvents}
                    step={VisitTimeDuration}
                    timeslots={2}
                    defaultView='month'
                    eventPropGetter={handleEventProp}
                    showMultiDayTimes
                    min={minTime}
                    max={maxTime}
                    startAccessor="start"
                    endAccessor="end"
                    onDrillDown={handleOnDrilldown}
                    //drilldownView='day'
                    onRangeChange={handleOnRangeChange}
                    onMouseUp={(e) => {}}
                    /* components={{
                        eventWrapper: EventButton,
                    }} */
                />

            </Grid>
            }
            <Popper
                id="mouse-over-popover"
                className={classes.popover}
                placement='bottom-start'
                transition
                modifiers={{
                    arrow: {
                        enable: true,
                        element: arrowRef,
                    }
                }}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
            >
                {
                    true &&
                    <span className={classes.arrow} ref={handleArrowRef} />
                }
                <Paper elevation={5} className={classes.popoverpaper}>
                    <Typography className={classes.text}>{popperText}</Typography>
                </Paper>
            </Popper>
        </Grid>
    );
}