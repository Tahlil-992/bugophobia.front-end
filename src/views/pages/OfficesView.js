import React, { useEffect, useState } from 'react';
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
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "../../style.css";
import { callListAllReservationsAvailableToPatients } from '../../core/modules/calendarAPICalls';
import { callGetDoctorRerservationsList, callGetReservationAPI } from '../../core/modules/calendarAPICalls';
//import { callGetReservationAPI } from '../../core/modules/calendarAPICalls';
import { callAPIHandler } from "../../core/modules/refreshToken";

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
    fullscreenicon: {
        //margin: '0.5em',
        backgroundColor: 'rgba(128, 36, 128, 0.3)',
        position: 'sticky',
        top: '0%',
        transition: 'all 0.1s ease',
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

    const classes = useStyles();

    const [offices, setOffices] = useState([]);

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

    const callTakeReserve = (id) => {
        try {
            const response = callGetReservationAPI({id: id}, isRemembered);
        }
        catch(error) {

        }
    }

    const callGetDoctorRerserve = async (officeid) => {
        const dayTo = 10;
        var newMonthEvents = new Array(dayTo);
        var newMonthEventsMapper = {};
        var newEvents = {};
        var Greens = {};
        var date = new Date();
        var year = date.getFullYear(); 
        var month = date.getMonth();
        var day = date.getDate();
        const response = await callListAllReservationsAvailableToPatients({office_id: officeid});
        response.payload.map((reserve, inx) => {
            let st = getDateElements(reserve.start_time);
            let start_time = new Date(st.year, st.month-1, st.day, st.hour, st.minute);
            let et = getDateElements(reserve.end_time);
            let end_time = new Date(et.year, et.month-1, et.day, et.hour, et.minute);
            const index = '' + start_time.getFullYear() + TwoDigits(start_time.getMonth()) + TwoDigits(start_time.getDate());
            if (newEvents[index] === undefined) {
                newEvents[index] = [];
            }
            if (Greens[index] === undefined) {
                Greens[index] = 0;
            }
            newEvents[index].push({
                'title': '✔',
                'allDay': false,
                'start': start_time,
                'end': end_time,
                'AvailableState': true,
                'id': reserve.id,
                'events': [],
                'color': 'lightgreen',
                'borderColor': 'green',
            });
            Greens[index] += 1;
        });
        for (var j = 0; j < dayTo; j++) {
            const mydate = new Date(year, month, day, 6, 0);
            const index = '' + mydate.getFullYear() + TwoDigits(mydate.getMonth()) + TwoDigits(mydate.getDate());
            newMonthEvents[j] = !Greens[index] ? 
            (
                {
                    'title': 'Unavailable',
                    'allDay': false,
                    'start': new Date(year, month, day, 6, 0),
                    'end': new Date(year, month, day, 23, 30),
                    'AvailableState': false,
                    'id': -1,
                    'events': [],
                    'color': '#fb3640',
                    'borderColor': 'red',
                    'height': '5em',
                }
            ) 
            : 
            (
                {
                    'title': `Available(${Greens[index]})`,
                    'allDay': false,
                    'start': new Date(year, month, day, 6, 0),
                    'end': new Date(year, month, day, 23, 30),
                    'AvailableState': true,
                    'id': -1,
                    'events': newEvents[index] ? newEvents[index] : [],
                    'color': 'lightgreen',
                    'borderColor': 'green',
                    'height': '5em',
                }
            );
            day += 1;
            newMonthEventsMapper[index] = j;
            setCurrentEvents(newMonthEvents);
        }
        /* for (var j = 0; j < 10; j++) {
            var newEvents = [];
            var hours = 6;
            var minutes = 0;
            var allred = true;
            try {
                const DAY = new Date(year, month, day);
                const from_date = '' + DAY.getFullYear() + TwoDigits(DAY.getMonth()) + TwoDigits(DAY.getDate());
                const DAY2 = new Date(year, month, day+1);
                const to_date = '' + DAY2.getFullYear() + TwoDigits(DAY2.getMonth()) + TwoDigits(DAY2.getDate());
                const response = await callGetDoctorRerservationsList({ from_date: from_date, to_date: to_date }, isRemembered)
                if (response.status === 200) {
                    const length = Math.floor((18 * 60) / VisitTimeDuration) - 1;
                    const base = (6*60) + 0;
                    for (var i = 0; i < Math.floor((18 * 60) / VisitTimeDuration) - 1; i++) {
                        newEvents.push(
                            {
                                'title': '✘',
                                'allDay': false,
                                'start': new Date(year, month, day, hours, minutes),
                                'end': new Date(year, month, day, hours, minutes + VisitTimeDuration),
                                'AvailableState': false,
                                'id': -1,
                                'events': [],
                                'color': '#fb3640',
                                'borderColor': 'red',
                            }
                        );
                        minutes += VisitTimeDuration; 
                    }
                    
                    var minutes = 0;
                    response.payload.map((reserve, index) => {
                        allred = false;
                        var sd0 = getDateElements(reserve.start_time);
                        var sd = new Date(sd0.year, sd0.month, sd0.day, sd0.hour, sd0.minute);
                        const startDate = sd;
                        const start = (startDate.getHours()*60) + startDate.getMinutes();
                        const startIndex = (start - base) / VisitTimeDuration;
                        //sd.setMonth(sd.getMonth() + 1);
                        var ed0 = getDateElements(reserve.end_time);
                        var ed = new Date(ed0.year, ed0.month, ed0.day, ed0.hour, ed0.minute);
                        //ed.setMonth(ed.getMonth() + 1);
                        console.log(sd + ' ' + ed);
                        newEvents[startIndex] = (
                            {
                                'title': '✔',
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
                    //alert(newEvents[0].start);
                }
            }
            catch (error) {
                console.log(error);
            }
            const mydate = new Date(year, month, day, 6, 0);
            const index = '' + mydate.getFullYear() + TwoDigits(mydate.getMonth()) + TwoDigits(mydate.getDate());
            newMonthEvents[j] = allred ? 
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
            //alert(j + ' ' + newEvents.length);
            newMonthEventsMapper[index] = j;
            day += 1;
            setCurrentEvents(newMonthEvents);
        } */
        setMonthEvents(newMonthEvents);
        setMonthEventsMapper(newMonthEventsMapper);
        setCurrentEvents(newMonthEvents);
}

const ChangeEventState = (event) => {
    if (viewCalendar !== 'month') {
        if (event.AvailableState) {
            event.title = viewCalendar === 'day' ? 'Reserved' : '✘';
            event.color = '#8ab6d6';
            event.borderColor = 'blue';
            event.AvailableState = false;
            if (event.id !== -1) {
                callTakeReserve(event.id);
            }
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
    minTime.setHours(6,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,30,0);

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

    const getAvailableTimes = () => {
        try {
            const response = callListAllReservationsAvailableToPatients({id: doctorid}, isRemembered);
        }
        catch(error) {

        }
    }

    useEffect(() => {
        //getAvailableTimes();
    }, [])

    const getReservedTimes = () => {
        try {
            const td = '20210423';
            const response = callGetDoctorRerservationsList({from_date: td , to_date: '20210521'}, isRemembered);
        }
        catch(error) {

        }
    }

    useEffect(() => {
        //getReservedTimes();
    }, [])

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
            //alert('... ' + index);
            if (index !== undefined) {
                //alert(monthEvents[index].events[0].start + ' ' + monthEvents[index].events[0].end);
                setCurrentEvents(monthEvents[index].events);
                monthEvents[index].events.map((event)=>console.log(event.start.toLocaleString()));
                //alert(monthEvents[index].events[0].start.toString());
                //alert('... ' + monthEvents[index].events[0].start);
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
                fontSize: '0.9em',
            }}
        );
        else if (viewCalendar === 'week' || viewCalendar === 'day') return(
            {style: {
                backgroundColor: event.color,
                borderColor: event.borderColor,
                height: event.height,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '33%',
                marginRight: '22%',
                minWidth: '0%',
                width: '40%',
                maxWidth: '45%',
                alignSelf: 'center',
                justifySelf: 'center',
            }}
        );
    }

    return ( officeIndex === -1 ? 
        <>
            <Typography 
                className={classes.title} 
                style={{margin: '1em 0em'}} 
                align='center'
                >
                    {offices.length !== 0 ? 'Please choose the office you want to take visit time' : 'There is no office to choose'}
                </Typography>
            <Grid container direction='row' justify='center' alignItems='center'>
                {offices.map((office, index) => (
                    <Grid item xs={12} style={{padding: '0.5em 1em'}}>
                        <Button  className={classes.cardbutton} onClick={() => goToOffice(index)} key={index}>
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
        <Grid container  spacing={1} direction='row' className={classes.officegrid} justify='center'>
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
                        <IconButton
                            onClick={() => setFullscreenMode(!fullscreenMode)}
                            className={classes.fullscreenicon}
                        >
                            {fullscreenMode ? <FullscreenExitIcon/> : <FullscreenIcon/>}
                        </IconButton>
                    </Grid> 
                    :
                    <></>
                }
            </Grid>
            {!calendarMode ?
                <Grid item xs={11} container direction='row' spacing={2} style={{marginTop: '0em'}}> 
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
                                label={'Phone No.' + (index+1)}
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
                            onClick={() => setCalendarMode(true)}
                            >
                                Take a visit time from this office
                        </Button>
                    </Grid>
                </Grid>
                :
                <>
                    <Grid item xs container justify='center'>
                        <TextField style={{ width: '100%', marginBottom: '1em', maxWidth: '20em' }}
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
                    <Grid item xs={12} className={classes.container}>
                        <Calendar style={{ minHeight: '37rem' }} formats={viewCalendar === 'week' ? formats : {}}
                            localizer={localizer}
                            views={['month', 'week', 'day']}
                            view={viewCalendar}
                            date={date}
                            events={currentEvents}
                            step={VisitTimeDuration}
                            min={minTime}
                            max={maxTime}
                            onSelectEvent={ChangeEventState}
                            onSelectSlot={slotInfo => {}}
                            onView={handleOnView}
                            onNavigate={handleOnNavigate}
                            onDrillDown={handleOnDrilldown}
                            onRangeChange={handleOnRangeChange}
                            eventPropGetter={handleEventProp}
                            selectable
                            popup
                            timeslots={2}
                            defaultView='month'
                            showMultiDayTimes
                            startAccessor="start"
                            endAccessor="end"
                            //titleAccessor={(event) => {return event.title + '\n' + event.color}}
                            //drilldownView='day'
                        />
                    </Grid>
                </>
            }
        </Grid>
    );
}