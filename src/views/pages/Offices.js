import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Checkbox, FormControlLabel, Grid, IconButton, Link, makeStyles, Paper, TextField, Typography, withStyles } from "@material-ui/core";
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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Calendar, momentLocalizer, Views, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "../../style.css";
import Popper from '@material-ui/core/Popper';
import { callCreateReservationAPI, callDeleteReservationAPI, callGetDoctorOfficeRerservationsList, callCreateMultipleReservationAPI } from "../../core/modules/calendarAPICalls";
import ApartmentIcon from '@material-ui/icons/Apartment';
import { callAPIHandler } from "../../core/modules/refreshToken";
import { setSessionStorage } from '../../core/modules/storageManager';
import  { Redirect } from 'react-router-dom';
//import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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

const callEditOfficeAPI = async (officeid, data, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "PUT", url: `/auth/office-detail/${officeid}/`, data: data }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callDeleteOfficeAPI = async (officeid, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "DELETE", url: `/auth/office-detail/${officeid}/` }, true, isRemembered);
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
            backgroundColor: "#f9f9f9",
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
        //position: 'relative',
        //zIndex: 10,
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
            backgroundColor: "#f9f9f9",
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
    submitButton2: {
        textTransform: "none",
        backgroundColor: 'rgba(42, 172, 61, 0.6)',
        padding: '0.5em 2em',
        margin: '1em 0em 1em 0em',
       // minWidth: '12em',
        "&:hover": {
            backgroundColor: 'rgba(19, 145, 34, 0.7)',
        },
    },
    cancelButton2: {
        textTransform: "none",
        backgroundColor: "#bdc1c5",
        padding: '0.5em 2em',
        margin: '1em 0em 1em 0em',
        //minWidth: '12em',
        "&:hover": {
            backgroundColor: "#9099A1",
        },
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
}));

export default function Offices(props) {

    const isRemembered = props.isRemembered;
    const mainVisitTimeDuration =props.mainVisitTimeDuration;
    const callChangeVisitDurationTime = props.callChangeVisitDurationTime;
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

    const [VisitTimeDuration, setVisitTimeDuration] = useState(mainVisitTimeDuration);

    const callAddOffice = async (data) => {
        try {
            const response = await callAddOfficeAPI( data, isRemembered);
            if (response.status === 201) {
                const index = offices.length;
                var newOffices = offices;
                newOffices.push({
                    id: response.payload.id,
                    title: response.payload.title,
                    address: response.payload.address,
                    phone: response.payload.phone,
                });
                setOffices(newOffices);
                setTitle(offices[index].title);
                setAddress(offices[index].address);
                setPhoneNos(offices[index].phone);
                setOfficeIndex(index);
                setPage(3);
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
                    newOffice.phone = office.phone;
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

    const callEditOffice = async (officeid, data) => {
        try {
            const response = await callEditOfficeAPI(officeid, data, isRemembered);
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
            monthEvents[j] =({
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
        seta(a+1);
    }

    const Updater = (payload) => {
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
                if (!patient && monthEvents[index].events[startIndex].AvailableState !== true) {
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
                else if (patient && monthEvents[index].events[startIndex].AvailableState !== null) {
                    monthEvents[index].events[startIndex] = ({
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
                    });
                }  
            }
        });
        //seta(a+1); 
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
            if (error.status === 500) {
                callCreateReserve(year, month, day, hours, minutes, officeid, event, event2);
            }
            else {
                if (event) {
                    event.title = event.id === -1 ? 'Unavailable' : '';
                    event.titleweek = '✘';
                    event.color = 'rgba(199,37,0,0.25)';
                    event.textColor = 'rgba(213,39,0,0.7)';
                    event.borderColor = 'red';
                    event.AvailableState = false;
                    seta(a + 1);
                }
                if (event2) {
                    event2.greens = event2.greens - 1;
                    if (event2.greens === 0) {
                        event2.title = `Unavailable`;
                        event2.color = 'rgba(199,37,0,0.25)';
                        event.textColor = 'rgba(213,39,0,0.7)';
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
    }

    const callCreateMultipleReserve = async (startDate, endDate, officeid) => {
        try {
            const start_time = startDate.getFullYear() + " " + (startDate.getMonth()+1) + " " + startDate.getDate() + " " + startDate.getHours() + " " + startDate.getMinutes();
            const end_time = endDate.getFullYear() + " " + (endDate.getMonth()+1) + " " + endDate.getDate() + " " + endDate.getHours() + " " + endDate.getMinutes();
            const response = await callCreateMultipleReservationAPI({ start_time: start_time, end_time: end_time, office: officeid}, isRemembered);
            if (response.status === 200) {
                Updater(response.payload);
                seta(a+1);
            }
        }
        catch (error) {
            console.log(error);
            if (error.status === 500) {
                callCreateMultipleReserve(startDate, endDate, officeid);
            }
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
            if (error.status === 500) {
                callDeleteReserve(id, event, event2);
            }
            else {
                if (event) {
                    event.title = event.id === -1 ? 'Available' : '';
                    event.titleweek = '✔';
                    event.color = 'rgba(35,199,0,0.17)';
                    event.textColor = 'rgba(124,196,107,1)';
                    event.borderColor = 'green';
                    event.AvailableState = true;
                    seta(a + 1);
                }
                if (event2) {
                    event2.greens = event2.greens + 1;
                    event2.title = `Available`;
                    event2.color = 'rgba(35,199,0,0.17)';
                    event.textColor = 'rgba(124,196,107,1)';
                    event2.borderColor = 'green';
                    event2.AvailableState = true;
                    seta(a + 1);
                }
            }
        }
    }

    const callGetDoctorRerserve = async (officeid) => {
        const toDay = 30;
        const DAY = new Date();
        const year = DAY.getFullYear();
        const month = DAY.getMonth();
        const day = DAY.getDate();
        RedMaker();
        try {
            const DAY1 = DAY;
            const from_date = '' + DAY1.getFullYear() + TwoDigits(DAY1.getMonth()+1) + TwoDigits(DAY1.getDate());
            const DAY2 = new Date(year, month, day + toDay);
            const to_date = '' + DAY2.getFullYear() + TwoDigits(DAY2.getMonth()+1) + TwoDigits(DAY2.getDate());
            const response = await callGetDoctorOfficeRerservationsList({ office_id: officeid, from_date: from_date, to_date: to_date }, isRemembered)
            if (response.status === 200) {
                Updater(response.payload);
                seta(a+1);
            }
        }
        catch (error) {
            console.log(error);
        }
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
        RedMaker();
        const startHour = daySchedule[0].getHours();
        const startMinute = daySchedule[0].getMinutes();
        const endHour = daySchedule[1].getHours();
        const endMinute = daySchedule[1].getMinutes();
        if ((startHour*60 + startMinute) >= (endHour*60 + endMinute)) {
            return;
        }
        const toDay = 30;
        var date = new Date();
        var year = date.getFullYear(); 
        var month = date.getMonth();
        var day = date.getDate();
        for (var j = 0; j < toDay; j++) {
            const start = new Date(year, month, day, startHour, startMinute);
            const weekday = start.toDateString().split(' ')[0];
            if (weekSchedule[weekdayMap[weekday]]) {
                const end = new Date(year, month, day, endHour, endMinute);
                await callCreateMultipleReserve(start, end, officeid);
            }
            day += 1;
        }
    }

    const ChangeEventState = async (event) => {
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
                event.title = 'Wating...';
                await callCreateMultipleReserve(event.start, event.end ,offices[officeIndex].id);
                if (!event.AvailableState) {
                    event.title = 'Unavailable';
                }
                else {
                    event.title = 'Available';
                }
                seta(a+1);
            }
            else {
                event.title = 'Unavailable';
                event.color = 'rgba(199,37,0,0.25)';
                event.textColor = 'rgba(213,39,0,0.7)';
                event.borderColor = 'red';
                event.AvailableState = false;
                event.greens = 0;
                event.events.map((e, index) => {
                    if (e.AvailableState) {
                        e.AvailableState = false;
                        callDeleteReserve(e.id, e, event);
                        e.title = '';
                        e.titleweek = '✘';
                        e.color = 'rgba(199,37,0,0.25)';
                        e.textColor = 'rgba(213,39,0,0.7)';
                        e.borderColor = 'red';
                        e.id = -2;
                    }
                });
                seta(a+1);
            }
        }
        else if (event.id === -2) {
            if (selectable === 1) {
                event.title = '';
                event.titleweek = '✔';
                event.color = 'rgba(35,199,0,0.17)';
                event.textColor = 'rgba(124,196,107,1)';
                event.borderColor = 'green';
                event.AvailableState = true;
                const startDate = event.start;
                const index = monthEventsMapper['' + startDate.getFullYear() + TwoDigits(startDate.getMonth()) + TwoDigits(startDate.getDate())];
                if (monthEvents[index].greens === 0) {
                    monthEvents[index].title = 'Available';
                    monthEvents[index].color = 'rgba(35,199,0,0.17)';
                    monthEvents[index].textColor = 'rgba(124,196,107,1)';
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
                event.color = 'rgba(199,37,0,0.25)';
                event.textColor = 'rgba(213,39,0,0.7)';
                event.borderColor = 'red';
                event.AvailableState = false;
                const startDate = event.start;
                const index = monthEventsMapper['' + startDate.getFullYear() + TwoDigits(startDate.getMonth()) + TwoDigits(startDate.getDate())];
                monthEvents[index].greens -= 1;
                if (monthEvents[index].greens === 0) {
                    monthEvents[index].title = 'Unavailable';
                    monthEvents[index].color = 'rgba(199,37,0,0.25)';
                    monthEvents[index].textColor = 'rgba(213,39,0,0.7)';
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
            setPaperElav(-1);
            setPage(1);
            return;
        }
        const index = offices.length;
        const data = {
            doctor: doctorid,
            title: 'Office ' + (index + 1),
            address: '-',
            location: 0,
            phone: [
                {phone: '0'},
            ]
        }
        callAddOffice(data);
    };

    const removeOffice = (index) => {
        if (index === -1) {
            offices.map((office) => {
                callDeleteOfficeAPI(office.id, isRemembered);
            });
            setOffices([]);
            setPaperElav(1);
        }
        else {
            callDeleteOfficeAPI(offices[index].id, isRemembered);
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
        setPaperElav(-1);
        callGetDoctorRerserve(offices[index].id);
    };

    const saveChanges = () => {
        var data = {
            id: offices[officeIndex].id,
            doctor: doctorid,
            title: title,
            address: address,
            location: 0,
            phone: phoneNos,
        }
        var newOffices = offices;
        newOffices[officeIndex].title = title;
        newOffices[officeIndex].address = address;
        newOffices[officeIndex].phone = phoneNos;
        if (!title) {
            setTitle('Office ' + (officeIndex + 1));
            data.title = 'Office ' + (officeIndex + 1);
            newOffices[officeIndex].title = 'Office ' + (officeIndex + 1);
        }
        if (!address) {
            setAddress('-');
            data.address = '-';
            newOffices[officeIndex].address = '-';
        }
        var newPhoneNos = [];
        phoneNos.map((ph, index) => {
            if (ph.phone) {
                newPhoneNos.push(ph);
            }
        });
        data.phone = newPhoneNos;
        newOffices[officeIndex].phone = newPhoneNos;
        if (newPhoneNos.length === 0) {
            newPhoneNos = [{phone: '0', id: 0}];
            data.phone = [{phone: '0', id: 0}];
            newOffices[officeIndex].phone = [{phone: '0', id: 0}];
        }
        setPhoneNos(newPhoneNos);
        setOffices(newOffices);
        setIsChanged(false);
        setAutoFocus(false);
        seta(a+1);
        handlePopoverClose();
        callEditOffice(offices[officeIndex].id, data);
    };

    const cancelChanges = () => {
        setTitle(offices[officeIndex].title);
        setAddress(offices[officeIndex].address);
        setPhoneNos(offices[officeIndex].phone);
        setIsChanged(false);
        setAutoFocus(false);
        seta(a+1);
        handlePopoverClose();
    };

    const backToList = () => {
        if (calendarMode) {
            setFullscreenMode(false);
            setCurrentEvents(monthEvents);
            setCalendarMode(false);
            setViewCalendar('month');
            setSelectable(0);
            setDate(new Date());
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
        newPhone[index]['phone'] = phone;
        setPhoneNos(newPhone);
        setIsChanged(true);
        seta(a+1);
    };

    const addPhone = () => {
        var newPhone = [...phoneNos];
        newPhone.push({phone: '0', id: 0});
        setPhoneNos(newPhone);
        setIsChanged(true);
        setAutoFocus(true);
        seta(a+1);
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
        seta(a+1);
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
            slotInfo.slots.map((slot) => {
                const index = monthEventsMapper['' + slot.getFullYear() + TwoDigits(slot.getMonth()) + TwoDigits(slot.getDate())];
                if (index !== undefined) {
                    ChangeEventState(monthEvents[index]);
                    seta(a+1);
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
                //borderColor: event.borderColor,
                height: event.height,
                color: event.textColor,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                justifySelf: 'center',
                borderRadius:'5px',
                //fontSize: '0.9em',
            }}
        );
        else if (viewCalendar === 'week' || viewCalendar === 'day') return(
            {style: {
                backgroundColor: event.color,
                //borderColor: event.borderColor,
                color: event.textColor,
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
                return event.title; // + '(' + event.greens + ')';
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
        setSessionStorage({ isvieweddoctor: 'false', viewedusername: username, viewedOffice: '', viewedEvent: '', viewedEventDate: '', from: '/profile/'});
    }

    useEffect(() => {
        seta(0);
    }, [a])

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thuesday', 'Friday', 'Saturday'];

    const defaultMaterialTheme = createMuiTheme({
        palette: {
            primary: blue,
        },
        typography: {
            fontFamily: `'Josefin Sans', sans-serif`,
        },
    });

    const timepickerChange = (date, index) => {
        var mydate = date;
        if (index === 0) {
            const yourdate = daySchedule[1];
            if (mydate.getHours() < 6) {
                mydate.setHours(6);
                mydate.setMinutes(0);
            }
            else if (mydate.getHours() > yourdate.getHours() || (mydate.getHours() === yourdate.getHours() && mydate.getMinutes() > yourdate.getMinutes())) {
                mydate.setHours(yourdate.getHours());
                mydate.setMinutes(yourdate.getMinutes());
            }
        }
        else if (index === 1) {
            const yourdate = daySchedule[0];
            if (mydate.getHours() < yourdate.getHours() || (mydate.getHours() === yourdate.getHours() && mydate.getMinutes() < yourdate.getMinutes())) {
                mydate.setHours(yourdate.getHours());
                mydate.setMinutes(yourdate.getMinutes());
            }
            else if (mydate.getHours() > 23 || (mydate.getHours() === 23 && mydate.getMinutes() > 30)) {
                mydate.setHours(23);
                mydate.setMinutes(30);
            }
        }
        daySchedule[index] = date;
        seta(a+1);
    }

    const checkboxChange = (event, index) => {
        weekSchedule[index] = !weekSchedule[index];
        seta(a+1);
    }

    const [dialogOpen, setDialogOpen] = useState({});
    
    const handleDialogOpen = (index, title, text) => {
        var item = {
            open: true,
            title: title,
            text: text,
            index: index, 
        }
        setDialogOpen(item);
    };
    
    const handleDialogClose = () => {
        setDialogOpen({});
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

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
                    onClick={() => {addOffice();}}
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
            <Grid item container style={{maxWidth: '24em'}}>
                <Grid item xs={12}>
                    <TextField value={"Visit Time: " + VisitTimeDuration + " minutes"} style={{ width: '73%', height: '1em' }} size="small"
                        InputProps={{
                            className: classes.underline,
                            readOnly: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccessTimeIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <ButtonGroup style={{ width: '25%', height: '90%', paddingTop: '1%' }}>
                        <Button
                            onClick={() => {
                                setVisitTimeDuration(Math.max(VisitTimeDuration - 5, 0));
                            }}>
                            <KeyboardArrowDownIcon fontSize="small" />
                        </Button>
                        <Button
                            onClick={() => {
                                setVisitTimeDuration(VisitTimeDuration + 5);
                            }}>
                            <KeyboardArrowUpIcon fontSize="small" />
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: '1em', marginTop: '0em' }}>
                    <Button className={classes.submitButton2} style={{ width: '49%', marginRight: '1%' }}
                        disabled={VisitTimeDuration === mainVisitTimeDuration}
                        onClick={() => {
                            callChangeVisitDurationTime(VisitTimeDuration);
                        }}>
                        Apply Changes
                    </Button>
                    <Button className={classes.cancelButton2} style={{ width: '49%', marginLeft: '1%' }}
                        disabled={VisitTimeDuration === mainVisitTimeDuration}
                        onClick={() => { setVisitTimeDuration(mainVisitTimeDuration); }}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            <hr  width='100%'/>
            {offices.map((office, index) => (
                <Grid item xs={12} container direction='row' justify='flex-start' display='flex'>
                    <Grid item xs={11} style={{ padding: '0.5em 1em' }}>
                        <Button style={{ padding: '0em', margin: '0em 0em', textTransform: 'none', width: '100%' }} onClick={() => goToOffice(index)} key={index}>
                            <Paper className={classes.paper}
                                onMouseEnter={() => setPaperElav(index)}
                                onMouseLeave={() => setPaperElav(-1)}
                                elevation={paperElav === index ? 3 : 1}
                            >
                                <Typography className={classes.title} align='center'>{office.title}</Typography>
                            </Paper>
                        </Button>
                    </Grid>
                    <Grid item xs={1} container justify='center' alignItems='center'>
                        <IconButton
                            onClick={() => handleDialogOpen(index, offices[index].title, `"${offices[index].title}"`)}
                            onMouseEnter={(event) => handlePopoverOpen(event, 'Remove "' + offices[index].title + '"')}
                            onMouseLeave={handlePopoverClose}
                        >
                            <DeleteIcon style={{ color: "#E03030" }} />
                        </IconButton>
                    </Grid>
                </Grid>
            ))}
            <Grid item xs={12} container direction='row' display='flex'>
                <Grid item xs={11} style={{ padding: '0.5em 1em', borderBottom: '0px' }} >
                    <Button style={{ padding: '0em', margin: '0em 0em', width: '100%', textTransform: 'none' }} onClick={addOffice}>
                        <Paper className={classes.pluspaper}
                            onMouseEnter={() => setPaperElav(offices.length)}
                            onMouseLeave={() => setPaperElav(-1)}
                            elevation={1}
                        >
                            <Typography className={classes.title} align='center'>
                                {paperElav === offices.length ? '+ Add a new office' : '+'}
                            </Typography>
                        </Paper>
                    </Button>
                </Grid>
                <Grid item xs={1} container justify='center' alignItems='center'>
                    <IconButton
                        onClick={() => handleDialogOpen(-1, 'All', 'all your offices')}
                        onMouseEnter={(event) => handlePopoverOpen(event, 'Remove All')}
                        onMouseLeave={handlePopoverClose}
                        disabled={offices.length === 0}
                    >
                        <DeleteForeverIcon style={{ color: offices.length === 0 ? 'gray' : "#E03030" }} />
                    </IconButton>
                </Grid>
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
            {dialogOpen.open ?
                <Dialog fullWidth open={dialogOpen.open} TransitionComponent={Transition} keepMounted onClose={handleDialogClose}>
                    <DialogTitle>{'Remove ' + dialogOpen.title}</DialogTitle>
                    <DialogContent><DialogContentText>{`Are you sure you want to remove ${dialogOpen.text}?`}</DialogContentText></DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} style={{ textTransform: 'none', backgroundColor: '#9099A1', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginBottom: '0.5em' }}>
                            Cancel
                        </Button>
                        <Button onClick={() => {removeOffice(dialogOpen.index); handleDialogClose();}} style={{ textTransform: 'none', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginRight: '1em', marginBottom: '0.5em' }}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                :
                <></>
            }
        </Grid>
        :
        <Grid container spacing={1} direction='row' className={classes.officegrid} justify='center'>
            <Grid item xs={12} container direction='row' className={classes.sidebar} justify='flex-start' alignItems='baseline' spacing={1}>
                <Grid item>
                    <IconButton
                        onClick={() => isChanged && !calendarMode ? handleDialogOpen(1, 'Back', 'Your changes will be lost. Are you want to save your changes?') : backToList()}
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
                                className={classes.backicon}
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
                                onClick={() => handleDialogOpen(0, 'Cancel Changes', 'Are you sure you want to cancel your changes?')}
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
                            InputLabelProps={{
                                style: {position: 'absolute', zIndex: 0},
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
                                    value={phone.phone}
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
                <Calendar style={{ minHeight: '37rem', fontFamily: `'Josefin Sans', sans-serif`, }} 
                    formats={viewCalendar === 'week' ? formats : {}}
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
            {dialogOpen.open ?
                <Dialog fullWidth open={dialogOpen.open} TransitionComponent={Transition} keepMounted onClose={handleDialogClose}>
                    <DialogTitle>{dialogOpen.title}</DialogTitle>
                    <DialogContent><DialogContentText>{dialogOpen.text}</DialogContentText></DialogContent>
                    {dialogOpen.index === 0 ?
                        <DialogActions>
                            <Button onClick={handleDialogClose} style={{ textTransform: 'none', backgroundColor: '#9099A1', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginBottom: '0.5em' }}>
                                Cancel
                            </Button>
                            <Button onClick={() => {cancelChanges(); handleDialogClose();}} style={{ textTransform: 'none', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginRight: '1em', marginBottom: '0.5em' }}>
                                Confirm
                            </Button>
                        </DialogActions>
                        :
                        <DialogActions>
                            <Button onClick={handleDialogClose} style={{ textTransform: 'none', backgroundColor: '#9099A1', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginBottom: '0.5em' }}>
                                Cancel
                            </Button>
                            <Button onClick={() => {cancelChanges(); handleDialogClose(); backToList();}} style={{ textTransform: 'none', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginBottom: '0.5em' }}>
                                Don't Save
                            </Button>
                            <Button onClick={() => {saveChanges(); handleDialogClose(); backToList();}} style={{ textTransform: 'none', backgroundColor: 'rgba(42,172,61,0.7)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginRight: '1em', marginBottom: '0.5em' }}>
                                Save
                            </Button>
                        </DialogActions>
                    }
                </Dialog>
                :
                <></>
            }
        </Grid>
    );
}