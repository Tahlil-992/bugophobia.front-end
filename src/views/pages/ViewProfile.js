import React, { useEffect, useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppBar, Avatar, Button, Chip, Container, IconButton, Link, makeStyles, Paper, Toolbar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { callAPIHandler } from "../../core/modules/refreshToken";
import DoctorImage from "../../assets/images/doctor.png";
import PatientImage from "../../assets/images/patient.png";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import CommentSection from './commentSection';
import StarRating from "./RatingComponent/rating";
import Modal from "@material-ui/core/Modal";
// import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from "@material-ui/core/Snackbar";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import About from './About'
import OfficesView from './OfficesView';

const SUCCESS_COLOR = "#1e4620";
const SUCCESS_BACKGROUND = "#c2fcc2";
const ERROR_COLOR = "#611a15";
const ERROR_BACKGROUND = "#f9a099";

export const Severity = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const callProfileAPI = async (data, is_viewed_doctor, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "POST", url: (is_viewed_doctor ? "/profile/doctor/public/" : "/profile/patient/public/"), data: data }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callProfilePictureAPI = async (mainUsername, is_doctor, isRemembered) => {
    try {
        const urlAddress = is_doctor ? "doctor" : "patient";
        const response = callAPIHandler({ method: "GET", url: `/profile/${urlAddress}/update/${mainUsername}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callSaveProfileAPI = async (data, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "POST", url: "/profile/save/", data: data }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callRemoveSaveProfileAPI = async (id, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "DELETE", url: `/profile/remove_save/${id}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callGetSaveProfileAPI = async (isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: "/profile/save/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const getRatingDetailCallAPI = ({ doctor_id }, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: `/auth/rate-detail/${doctor_id}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const getRateListCallAPI = (isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: "/auth/rate-list/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const newRateCallAPI = ({ doctor_id, amount }, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "POST", data: { amount: amount, doctor_id: doctor_id }, url: "/auth/rate-list/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(16),
        height: theme.spacing(16),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    grid: {
        marginTop: "0rem",
    },
    onetab: {
        //backgroundColor: 'rgba(138, 182, 214, 0.57)',
        //border: "1px solid #C5CAEA",
        color: "#555",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        borderBottom: "3px solid #16E",
        fontSize: 9,
        iconSize: 30,
        minWidth: 0,
        transition: 'all 0.15s linear, border 0s',
        '&:hover': {
            backgroundColor: '#c0c0c0',
            transition: 'all 0s',
            fontSize: 9,
            fontWeight: 900,
            color: "#000",
        }
    },
    seltab: {
        backgroundColor: "#ebebeb",
        //border: "3px solid #16E",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        borderTop: "3px solid #16E",
        borderRight: "3px solid #16E",
        borderLeft: "3px solid #16E",
        color: "#16e",
        minWidth: 0,
        fontSize: 10,
        fontWeight: 900,
        transition: 'all 0.15s linear, border 0s',
    },
    tabpanel: {
        backgroundColor: "#ebebeb",
        borderRight: "3px solid #16E",
        borderLeft: "3px solid #16E",
        borderBottom: "3px solid #16E",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        marginBottom: "2rem",
        minHeight: '30em',
    },
    button: {
        backgroundColor: '#40bad5',
        padding: '1em 6.3em 1em 6.3em',
        margin: '1em 0em 0em 0em',
        textAlign: 'center',
        borderRadius: '5px',
        textTransform: 'none',
        height: '2.5em',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
    },
    rateButton: {
        textTransform: "none",
        backgroundColor: 'rgba(246, 174, 40, 0.9)',
        "&:hover": {
            backgroundColor: 'rgba(208, 138, 8, 0.9)',
        },
    },
    submitButton: {
        textTransform: "none",
        backgroundColor: 'rgba(42, 172, 61, 0.6)',
        "&:hover": {
            backgroundColor: 'rgba(19, 145, 34, 0.7)',
        },
    },
    cancelButton: {
        textTransform: "none",
        backgroundColor: "#bdc1c5",
        "&:hover": {
            backgroundColor: "#9099A1",
        },
    },
    modal: {
        position: 'absolute',
        width: 'auto',
        backgroundColor: '#c2fcc2',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    subtext: {
        fontSize: 11,
        color: "#222",
    },
    text: {
        fontSize: 15,
        color: "#000",
        fontWeight: 500,
    },
    container: {
        padding: theme.spacing(4),
        paddingBottom: 0,
        minHeight: "100vh",
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        marginBottom: 0,
    },
}));

export default function Profile() {

    const classes = useStyles();

    var isDoctor = false;
    var isRemembered = false;

    if (localStorage.getItem("isdoctor") == null) {
        isDoctor = ((sessionStorage.getItem("isdoctor") === "true") ? true : false);
        isRemembered = false;
    }
    else {
        isDoctor = ((localStorage.getItem("isdoctor") === "true") ? true : false);
        isRemembered = true;
    }

    const str = isDoctor ? "doctor" : "patient";

    const [isViewedDoctor, setIsViewedDoctor] = useState(((localStorage.getItem("isvieweddoctor") === "true") ? true : false));
    const [viewedUsername, setViewedUsername] = useState((localStorage.getItem("viewedusername")));

    const [isSaved, setIsSaved] = useState(false);
    const [id, setId] = useState(0);

    const [tabValue, setTabValue] = useState(0);
    const [officetab, setOfficetab] = useState(false);

    const [onRateSubmit, setOnRateSubmit] = useState(false);
    const [newRateValue, setNewRateValue] = useState(3);
    const [onReloadRate, setOnReloadRate] = useState(true);
    const [rateCount, setRateCount] = useState(0);
    const [rateAvg, setRateAvg] = useState(0);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [onVote, setOnVote] = useState(false);

    useEffect(() => {
        if (onRateSubmit) {
            callSubmitNewRateAPI();
        }
        setOnRateSubmit(false);
    }, [onRateSubmit])

    useEffect(() => {
        if (onReloadRate) {
            callGetDetailRatingAPI();
        }
        setOnReloadRate(false);
    }, [onReloadRate])

    useEffect(() => {
        if (!officetab && tabValue === 1) {
            setOfficetab(true);
        }
    }, [tabValue])

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

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

    const insuranceMap = (insur) => {
        switch (insur) {
            case 'O': return 'Omr';
            case 'H': return 'Havades';
            case 'T': return 'Takmili';
            default: return '';
        }
    }

    const genderMap = (gen) => {
        switch (gen) {
            case 'M': return 'Male';
            case 'F': return 'Female';
            default: return '';
        }
    }

    const nullCheck = (exp) => {
        if (exp == null) {
            return "";
        }
        else {
            return exp;
        }
    }

    const [profileImage, setProfileImage] = useState(isViewedDoctor ? DoctorImage : PatientImage);

    const [doctorid, setDoctorid] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [gmcNumber, setGmcNumber] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [insurance, setInsurance] = useState("");

    const [VisitTimeDuration, setVisitTimeDuration] = useState(30);

    useEffect(() => {
        callGetDetailRatingAPI();
    }, [doctorid])

    const [got, setGot] = useState(false);

    const callGetAPI = async () => {
        try {
            const data = { username: viewedUsername };
            const response = await callProfileAPI(data, isViewedDoctor, isRemembered);
            if (response.status === 200) {
                let payload = response.payload;
                setDoctorid(nullCheck(payload.user.id))
                setFirstName(nullCheck(payload.user.first_name));
                setLastName(nullCheck(payload.user.last_name));
                setEmail(nullCheck(payload.user.email));
                setUsername(nullCheck(payload.user.username));
                setGender(nullCheck(payload.user.gender));
                setAge(nullCheck(payload.user.age));
                setPhoneNumber(nullCheck(payload.user.phone_number));
                setCity(nullCheck(payload.user.city));
                if (isViewedDoctor) {
                    setGmcNumber(nullCheck(payload.gmc_number));
                    setSpecialization((payload.filed_of_specialization));
                    setExperience(nullCheck(payload.work_experience));
                    if (!payload.visit_duration_time) {
                        setVisitTimeDuration(30);
                    }
                    else {
                        setVisitTimeDuration(payload.visit_duration_time);
                    }
                }
                else {
                    setInsurance((payload.insurance_type));
                }
                setGot(true);
            }
        }
        catch (error) {
            console.log(error);

        }
    }

    const callProfilePictureGetAPI = async () => {
        try {
            const response = await callProfilePictureAPI(username, isViewedDoctor, isRemembered);
            if (response.status === 200) {
                let pro_picture = response.payload.pro_picture;
                if (pro_picture === null) {
                    setProfileImage(isDoctor ? DoctorImage : PatientImage);
                }
                else {
                    setProfileImage(pro_picture);
                }
            }
        }
        catch (error) {
            console.log(error);

        }
    }

    const callGetSaveAPI = async () => {
        try {
            const response = await callGetSaveProfileAPI(isRemembered);
            if (response.status === 200) {
                let payload = response.payload;
                payload.map((doctor) => {
                    if (doctor.doctor.user.username === viewedUsername) {
                        setIsSaved(true);
                        setId(doctor.id);
                    }
                })
            }
        }
        catch (error) {
            console.log(error);

        }
    }

    const [sent, setSent] = useState(false);
    if (!sent) {
        //callGetAPI();
        //callGetSaveAPI();
        setSent(true);
    }

    useEffect(() => {
        callGetAPI();
        callGetSaveAPI();
    }, []);

    useEffect(() => {
        if (got) {
            callProfilePictureGetAPI();
        }
    }, [got]);

    const saveButtonHandler = async () => {
        try {
            const data = { doctor: viewedUsername };
            const response = await callSaveProfileAPI(data, isRemembered);
            if (response.status === 201) {
                setIsSaved(true);
                setId(response.payload.id);
            }
        }
        catch (error) {
            console.log(error);
            if (error.status === 406) {
                //alert("user has already saved the profile!")
            }

        }
    }

    const deleteButtonHandler = async () => {
        try {
            const response = await callRemoveSaveProfileAPI(id, isRemembered);
            if (response.status === 204) {
                setIsSaved(false);
                setId(5);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const callSubmitNewRateAPI = async () => {
        try {
            const response = await newRateCallAPI({ doctor_id: doctorid, amount: Number(newRateValue) }, isRemembered);
            if (response.status === 201 || response.status === 200) {
                setMessage({ type: Severity.SUCCESS, text: "Your given score was successfully submitted!" });
                setOnVote(false);
                setOnReloadRate(true);
            }
        }
        catch {
            setMessage({ type: Severity.ERROR, text: "Something went wrong while trying to submit your score!" });
            setOnVote(false);
        }
    }

    const callGetDetailRatingAPI = async () => {
        const temp = rateAvg;
        setRateAvg(newRateValue);
        try {
            const response = await getRatingDetailCallAPI({ doctor_id: doctorid });
            // console.log(response);
            if (response.status == 200) {
                const payload = response.payload;
                setRateCount(payload.number);
                setRateAvg(payload.avg);
            }
        }
        catch (e) {
            setRateAvg(temp);
            console.log(e);
        }
    }

    useEffect(() => {
        if (message.type !== "") {
            setOpenSnackBar(true);
        }
    }, [message])

    const handleCloseSnackbar = () => {
        // console.log("MESSAGE = " + message.text);
        // console.log("TYPE = " + message.type);
        setOpenSnackBar(false);
    }

    useEffect(() => {
        if (!openSnackBar) {
            setMessage({ type: "", text: "" });
        }
    }, [openSnackBar])

    const [selectedDate, setSelectedDate] = useState(new Date(Date().toLocaleString()));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [VisitTimeClick, setVisitTimeClick] = useState(false);
    const defaultMaterialTheme = createMuiTheme({
        palette: {
            primary: blue,
        },
    });

    const [fullscreenMode, setFullscreenMode] = useState(false);
    const [officeIndex, setOfficeIndex] = useState(-1);
    const [calendarMode, setCalendarMode] = useState(false);
    const [viewCalendar, setViewCalendar] = useState('month');
    const [date, setDate] = useState(new Date());
    const [officeid, setOfficeid] = useState(0);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNos, setPhoneNos] = useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const [paperElav, setPaperElav] = useState(-1);
    const [monthEvents, setMonthEvents] = useState([]);
    const [monthEventsMapper, setMonthEventsMapper] = useState({});
    const [currentEvents, setCurrentEvents] = useState([]);
    

    return (
        <div style={{ backgroundColor: '#8ab6d6' }}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link href={`/${str}/explore/`}><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>View Profile</Typography>
                </Toolbar>
            </AppBar>
            {fullscreenMode ? 
            <Container maxWidth="lg" className={classes.container}>
            <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', minHeight: 'inherit', padding: '2em' }}>
                <OfficesView 
                    isRemembered={isRemembered} 
                    VisitTimeDuration={VisitTimeDuration} 
                    doctorid={doctorid} 
                    got={got}
                    mainUsername={viewedUsername}
                    fullscreenMode={fullscreenMode}             setFullscreenMode={setFullscreenMode}
                    officeIndex={officeIndex}                   setOfficeIndex={setOfficeIndex}
                    calendarMode={calendarMode}                 setCalendarMode={setCalendarMode}
                    viewCalendar={viewCalendar}                 setViewCalendar={setViewCalendar}
                    date={date}                                 setDate={setDate}
                    officeid={officeid}                         setOfficeid={setOfficeid}
                    title={title}                               setTitle={setTitle}
                    address={address}                           setAddress={setAddress}
                    phoneNos={phoneNos}                         setPhoneNos={setPhoneNos}
                    isChanged={isChanged}                       setIsChanged={setIsChanged}
                    paperElav={paperElav}                       setPaperElav={setPaperElav}
                    monthEvents={monthEvents}                   setMonthEvents={setMonthEvents}
                    monthEventsMapper={monthEventsMapper}       setMonthEventsMapper={setMonthEventsMapper}
                    currentEvents={currentEvents}               setCurrentEvents={setCurrentEvents}
                />
            </div>
            </Container>
            :
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', minHeight: 'inherit' }}>
                    <Grid container className={classes.grid} direction="row" spacing={0} alignItems="flex-start" justify="space-around" margin="1rem">
                        <Grid item md={4} xs style={{ marginTop: '1em' }} >
                            <Grid item container justify='center' direction="row" style={{ backgroundColor: "#E0E0E0", marginTop: "1rem", borderRadius: "10px", paddingRight: '0.5rem' }}>
                                <Grid item container xs={9} justify='center' alignItems='center' direction='column' style={{ marginBottom: '1em' }}>
                                    <Grid item xs>
                                        <Avatar className={classes.large} src={profileImage}></Avatar>
                                    </Grid>
                                    {isViewedDoctor && !isDoctor ?
                                        <Grid item xs>
                                            {isSaved ?
                                                <Chip
                                                    icon={<BookmarkIcon />}
                                                    size="small"
                                                    color="secondary"
                                                    label={"Saved"}
                                                    variant={"default"}
                                                    onDelete={deleteButtonHandler}
                                                />
                                                :
                                                <Chip
                                                    icon={<BookmarkBorderIcon />}
                                                    clickable
                                                    size="small"
                                                    color="secondary"
                                                    label={"Save This Account"}
                                                    variant={"outlined"}
                                                    onClick={saveButtonHandler}
                                                />
                                            }

                                        </Grid>
                                        :
                                        <></>
                                    }
                                    {/* <TextField style={{ width: '100%', marginBottom: '0.5em', marginTop: '1em' }}
                                        className={classes.margin}
                                        id="input-with-icon-textfield"
                                        value={"  " + VisitTimeDuration}
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
                                    /> */}
                                    {isViewedDoctor && !VisitTimeClick ?
                                        <Grid item xs>
                                            <Button 
                                                disabled={isDoctor} 
                                                onClick={() => setTabValue(1)} 
                                                className={classes.button} 
                                                >
                                                    Take a Visit Time
                                            </Button>
                                        </Grid>
                                        :
                                        <></>
                                    }
                                    {VisitTimeClick &&
                                        <MuiPickersUtilsProvider Toolbar={{ backgroundColor: 'red' }} utils={DateFnsUtils}>
                                            <Grid container style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <KeyboardDatePicker
                                                        style={{ width: '55%', headerColor: 'red' }}
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Date"
                                                        format="MM/dd/yyyy"
                                                        value={selectedDate}
                                                        disablePast={true}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                    <KeyboardTimePicker
                                                        style={{ width: '45%' }}
                                                        margin="normal"
                                                        id="time-picker"
                                                        label="Time"
                                                        disablePast={true}
                                                        ampm={true}
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                        minutesStep={5}
                                                    />
                                                </ThemeProvider>
                                                <Grid display="flex" alignItems="center" justifyContent="space-between" style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Button onClick={() => setVisitTimeClick(false)} className={classes.button} className={classes.submitButton} style={{ width: '49%', marginRight: '1%' }}>Submit</Button>
                                                    <Button onClick={() => setVisitTimeClick(false)} className={classes.button} className={classes.cancelButton} style={{ width: '49%', marginLeft: '1%' }}>Cancel</Button>
                                                </Grid>
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    }
                                </Grid>
                                <Grid item xs={9}>
                                    {isViewedDoctor ? (
                                        <Box >
                                            <hr />
                                            <Typography className={classes.subtext} >{"Name:"}</Typography>
                                            <Typography className={classes.text}  >{firstName + " " + lastName}</Typography>
                                            <hr />
                                            <Typography className={classes.subtext} >{"Specialization:"}</Typography>
                                            <Typography className={classes.text}  >{specializationMap(specialization)}</Typography>
                                            <hr />
                                            <Typography className={classes.subtext} >{"Rating:"}</Typography>
                                            <Box
                                                style={{ marginTop: "0.5em" }}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="flex-start">
                                                {!onVote &&
                                                    <Rating
                                                        name="rating-star"
                                                        defaultValue={0}
                                                        precision={0.1}
                                                        readOnly={true}
                                                        value={rateAvg} />}
                                                {onVote &&
                                                    <Rating
                                                        name="rating-star"
                                                        defaultValue={0}
                                                        precision={1}
                                                        readOnly={false}
                                                        value={newRateValue}
                                                        emptyIcon={<StarBorderIcon />}
                                                        onChange={(event) => setNewRateValue(event.target.value)} />}
                                                <VisibilityIcon style={{ fontSize: "1.25em", color: "gray", marginLeft: '0.5em' }} />
                                                <Typography style={{ fontSize: "1em", marginLeft: "0.2em" }}>{rateCount}</Typography>
                                            </Box>
                                            { !isDoctor &&
                                                <Box marginTop="1em">
                                                    {!onVote &&
                                                        <Button className={classes.rateButton} style={{ width: "100%" }} onClick={() => setOnVote(true)}>
                                                            Rate This Doctor
                                                    </Button>}
                                                    {onVote &&
                                                        <Grid display="flex" alignItems="center" justifyContent="space-between" style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <Button className={classes.submitButton} onClick={() => setOnRateSubmit(true)} style={{ width: '49%', marginRight: '1%' }}>
                                                                Submit
                                                        </Button>
                                                            <Button className={classes.cancelButton} onClick={() => setOnVote(false)} style={{ width: '49%', marginLeft: '1%' }}>
                                                                Cancel
                                                        </Button>
                                                        </Grid>}
                                                </Box>
                                            }
                                            <hr />
                                        </Box>
                                    )
                                        :
                                        (
                                            <Box>
                                                <hr />
                                                {firstName || lastName ?
                                                    <div>
                                                        <Typography className={classes.subtext} >{"Name:"}</Typography>
                                                        <Typography className={classes.text}  >{firstName + " " + lastName}</Typography>
                                                        <hr />
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                                <Typography className={classes.subtext} >{"Username:"}</Typography>
                                                <Typography className={classes.text}  >{username}</Typography>
                                                <hr />
                                                <Typography className={classes.subtext} >{"Email Address:"}</Typography>
                                                <Typography className={classes.text} >{email}</Typography>
                                                <hr />
                                            </Box>

                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="column" style={{ marginTop: '2em', marginRight: '2em' }} >
                            <Grid item style={{ width: "inherit" }}>
                                {isViewedDoctor ?
                                    <Tabs
                                        value={tabValue}
                                        onChange={handleChange}
                                        indicatorColor="inherit"
                                        style={{ width: "inherit" }}
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="About" {...a11yProps(0)} className={(tabValue === 0) ? classes.seltab : classes.onetab} />
                                        <Tab label="Offices" {...a11yProps(1)} className={(tabValue === 1) ? classes.seltab : classes.onetab} style={officetab ? {minWidth: '50%'} : {display: 'none'}} />
                                        <Tab label="Comments" {...a11yProps(2)} className={(tabValue === 2) ? classes.seltab : classes.onetab} />
                                    </Tabs>
                                    :
                                    <Tabs
                                        value={tabValue}
                                        onChange={handleChange}
                                        indicatorColor="inherit"
                                        style={{ width: "inherit" }}
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="About" {...a11yProps(0)} className={(tabValue === 0) ? classes.seltab : classes.onetab} />
                                    </Tabs>
                                }
                            </Grid>
                            <Grid item className={classes.tabpanel}>
                                <TabPanel value={tabValue} index={0}>
                                    <About 
                                        isDoctor={isViewedDoctor}
                                        viewProfile={true} 
                                        setSent={setSent}
                                        firstName={firstName}               setFirstName={setFirstName}
                                        lastName={lastName}                 setLastName={setLastName}
                                        email={email}                       setEmail={setEmail}
                                        username={username}                 setUsername={setUsername}
                                        gender={gender}                     setGender={setGender}
                                        age={age}                           setAge={setAge}
                                        phoneNumber={phoneNumber}           setPhoneNumber={setPhoneNumber}
                                        city={city}                         setCity={setCity}
                                        gmcNumber={gmcNumber}               setGmcNumber={setGmcNumber}
                                        specialization={specialization}     setSpecialization={setSpecialization}
                                        experience={experience}             setExperience={setExperience}
                                        insurance={insurance}               setInsurance={setInsurance}
                                        isEmailValid={true}
                                        isUsernameValid={true}
                                        />
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                    <OfficesView 
                                        isRemembered={isRemembered} 
                                        VisitTimeDuration={VisitTimeDuration} 
                                        doctorid={doctorid} 
                                        got={got}
                                        mainUsername={viewedUsername}
                                        fullscreenMode={fullscreenMode}             setFullscreenMode={setFullscreenMode}
                                        officeIndex={officeIndex}                   setOfficeIndex={setOfficeIndex}
                                        calendarMode={calendarMode}                 setCalendarMode={setCalendarMode}
                                        viewCalendar={viewCalendar}                 setViewCalendar={setViewCalendar}
                                        date={date}                                 setDate={setDate}
                                        officeid={officeid}                         setOfficeid={setOfficeid}
                                        title={title}                               setTitle={setTitle}
                                        address={address}                           setAddress={setAddress}
                                        phoneNos={phoneNos}                         setPhoneNos={setPhoneNos}
                                        isChanged={isChanged}                       setIsChanged={setIsChanged}
                                        paperElav={paperElav}                       setPaperElav={setPaperElav}
                                        monthEvents={monthEvents}                   setMonthEvents={setMonthEvents}
                                        monthEventsMapper={monthEventsMapper}       setMonthEventsMapper={setMonthEventsMapper}
                                        currentEvents={currentEvents}               setCurrentEvents={setCurrentEvents}
                                        />
                                </TabPanel>
                                <TabPanel value={tabValue} index={2}>
                                    <Box display="flex" flex={1} position="relative">
                                        <CommentSection username={viewedUsername} />
                                    </Box>
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>}
            {
                openSnackBar && <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={openSnackBar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    resumeHideDuration={0}
                >
                    <Paper style={{
                        backgroundColor: message.type === Severity.SUCCESS ? SUCCESS_BACKGROUND : ERROR_BACKGROUND
                        , borderRadius: "7px"
                    }} elevation={3}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            px={"1em"} py={"1em"}>
                            {message.type === Severity.ERROR && <ErrorOutlineIcon style={{
                                color: message.type === Severity.SUCCESS ? SUCCESS_COLOR : ERROR_COLOR
                                , marginRight: "0.5em"
                            }} />}
                            {message.type === Severity.SUCCESS && <CheckCircleIcon />}
                            <Box>
                                <Typography style={{ color: message.type === Severity.SUCCESS ? SUCCESS_COLOR : ERROR_COLOR }} display="block">{message.text}</Typography>
                            </Box>
                            <IconButton anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClick={handleCloseSnackbar}>
                                <CloseIcon style={{ color: message.type === Severity.SUCCESS ? SUCCESS_COLOR : ERROR_COLOR }} />
                            </IconButton>
                        </Box>
                    </Paper>
                </Snackbar>
            }
        </div >
    );
}