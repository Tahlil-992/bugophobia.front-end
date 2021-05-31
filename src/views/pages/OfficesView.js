import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, makeStyles, Paper, TextareaAutosize, TextField, Typography, withStyles } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ApartmentIcon from '@material-ui/icons/Apartment';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Calendar, momentLocalizer, Views, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "../../style.css";
import { callListAllReservationsAvailableToPatients } from '../../core/modules/calendarAPICalls';
import { callGetDoctorRerservationsList } from '../../core/modules/calendarAPICalls';
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

export default function Offices(props) {

    const VisitTimeDuration = props.VisitTimeDuration;
    const doctorid = props.doctorid;
    const isRemembered = props.isRemembered;
    const got = props.got;

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

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNos, setPhoneNos] = useState([]);
    
    const [paperElav, setPaperElav] = useState(-1);
    const [officeIndex, setOfficeIndex] = useState(-1);
    const [calendarMode, setCalendarMode] = useState(false);

    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,30,0);

    const goToOffice = (index) => {
        setTitle(offices[index].title);
        setAddress(offices[index].address);
        setPhoneNos(offices[index].phone);
        setOfficeIndex(index);
    };

    const backToList = () => {
        if (calendarMode) {
            setCalendarMode(false);
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
        getAvailableTimes();
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
        getReservedTimes();
    }, [])

    

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
                        <Calendar style={{ height : '37rem' }}
                            localizer={localizer}
                            events={[]}
                            step={60}
                            showMultiDayTimes
                            min={minTime}
                            max={maxTime} 
                            startAccessor="start"
                            endAccessor="end"
                            titleAccessor='title'
                            /* components={{
                                event: WeekEvent,
                            }} */
                            formats={{ eventTimeRangeFormat: () => null }}
                            /* eventPropGetter={{style: {backgroundColor: '#f00'}}} */
                        />
                    </Grid>
                </>
            }
        </Grid>
    );
}