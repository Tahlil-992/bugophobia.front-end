import React, { useEffect, useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppBar, Avatar, Button, Chip, Container, IconButton, Link, makeStyles, MenuItem, Popover, Snackbar, Toolbar, } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { callAPIHandler } from "../../core/modules/refreshToken";
import DoctorImage from "../../assets/images/doctor.png";
import PatientImage from "../../assets/images/patient.png";
import CommentSection from "./commentSection";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarRating from "./RatingComponent/rating";
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import About from './About';
import ChangePassword from './ChangePassword';
import Offices from './Offices';
import { callChangeVisitDurationTimeAPI } from "../../core/modules/calendarAPICalls";
import { callCreateReservationAPI } from "../../core/modules/calendarAPICalls";

function TabPanel2(props) {
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
                <Box p={1}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel2.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps2(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const callProfileAPI = async (is_doctor, isRemembered) => {
    try {
        const urlAddress = is_doctor ? "doctor" : "patient";
        const response = callAPIHandler({ method: "GET", url: `/profile/${urlAddress}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callEditProfileAPI = async (mainUsername, data, is_doctor, isRemembered) => {
    try {
        const urlAddress = is_doctor ? "doctor" : "patient";
        const response = callAPIHandler({ method: "PUT", url: `/profile/${urlAddress}/update/${mainUsername}/`, data: data }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callChangePasswordAPI = async (data, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "PUT", url: `/profile/change_password/`, data: data }, true, isRemembered);
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

const callProfilePictureEditAPI = async (mainUsername, data, is_doctor, isRemembered) => {
    try {
        const urlAddress = is_doctor ? "doctor" : "patient";
        const response = callAPIHandler({ method: "PUT", url: `/profile/${urlAddress}/update/${mainUsername}/`, data: data }, true, isRemembered);
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
        marginBottom: theme.spacing(0.5),
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
    grid: {
        marginTop: "0rem",
    },
    button: {
        backgroundColor: '#40bad5',
        border: '0px solid #10217d',
        padding: '1em 4em 1em 4em',
        margin: '1em 0em 1em 0em',
        textAlign: 'center',
        fontSize: '0.9em',
        borderRadius: '10px',
        textTransform: 'none',
        height: '45px',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
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
    subtext: {
        fontSize: 11,
        color: "#222",
    },
    text: {
        fontSize: 15,
        color: "#000",
        fontWeight: 500,
    },
    poptext: {
        fontSize: 13,
        fontWeight: 700,
    },
    applyButton: {
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
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
    chip2: {
        '&:hover': {
            variant: 'default',
        }
    },
}));

const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
const userNameRegex = RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

const SUCCESS_COLOR = "#1e4620";
const SUCCESS_BACKGROUND = "#c2fcc2";
const ERROR_COLOR = "#611a15";
const ERROR_BACKGROUND = "#f9a099";

const fileTypes = '.png, .jpg, .jpeg, .gif, .ico, .svg';
const fileTypesList = ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg'];

export default function Profile() {

    const classes = useStyles();

    const callGetDetailRatingAPI = async () => {
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
            console.log(e);
        }
    }

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

    const [tabValue2, setTabValue2] = useState(0);

    const handleChange2 = (event, newValue) => {
        setTabValue2(newValue);
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

    const [profileImage, setProfileImage] = useState(isDoctor ? DoctorImage : PatientImage);
    const [isProfileImageSet, setIsProfileImageSet] = useState(false);

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

    const [mainName, setMainName] = useState("");
    const [mainUsername, setMainUsername] = useState("");
    const [mainEmail, setMainEmail] = useState("");

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [detailChange, setDetailChange] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordConfirmError, setNewPasswordConfirmError] = useState(false);

    const [emailhelper, setemailhelper] = useState("");
    const [userhelper, setuserhelper] = useState("");
    const [passhelper, setpasshelper] = useState("");

    useEffect(() => {
        callGetDetailRatingAPI();
    }, [doctorid])

    const [got, setGot] = useState(false);

    const callGetAPI = async () => {
        try {
            const response = await callProfileAPI(isDoctor, isRemembered);
            if (response.status === 200) {
                let payload = response.payload;
                setDoctorid(nullCheck(payload.user.id))

                setFirstName(nullCheck(payload.user.first_name));
                setLastName(nullCheck(payload.user.last_name));
                setMainName(nullCheck(payload.user.first_name) + ' ' + nullCheck(payload.user.last_name));

                setEmail(nullCheck(payload.user.email));
                setMainEmail(nullCheck(payload.user.email));

                setUsername(nullCheck(payload.user.username));
                setMainUsername(nullCheck(payload.user.username));

                setGender((payload.user.gender));
                setAge(nullCheck(payload.user.age));
                setPhoneNumber(nullCheck(payload.user.phone_number));
                setCity(nullCheck(payload.user.city));
                if (isDoctor) {
                    setGmcNumber(nullCheck(payload.gmc_number));
                    setSpecialization((payload.filed_of_specialization));
                    setExperience(nullCheck(payload.work_experience));
                    if (!payload.visit_duration_time) {
                        callChangeVisitDurationTimeAPI({ visit_duration_time: 30 }, isRemembered);
                    }
                    else {
                        setMainVisitTimeDuration(payload.visit_duration_time);
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
            const response = await callProfilePictureAPI(mainUsername, isDoctor, isRemembered);
            if (response.status === 200) {
                let pro_picture = response.payload.pro_picture;
                if (pro_picture === null) {
                    setProfileImage(isDoctor ? DoctorImage : PatientImage);
                    setIsProfileImageSet(false);
                }
                else {
                    setProfileImage(pro_picture);
                    setIsProfileImageSet(true);
                }
            }
        }
        catch (error) {
            console.log(error);

        }
    }

    const [sent, setSent] = useState(false);
    if (!sent) {
        //callGetAPI();
        setSent(true);
    }
    useEffect(() => {
        callGetAPI();
    }, []);

    useEffect(() => {
        if (got) {
            callProfilePictureGetAPI();
        }
    }, [got]);

    useEffect(() => {
        if (got) {
            if (!emailRegex.test(email)) {
                setemailhelper("Please enter in valid pattern: example@email.com");
                setMessage("Invalid Pattern for email address!");
                setIsEmailValid(false);
            }
            else {
                setIsEmailValid(true);
            }
        }
    }, [email]);

    useEffect(() => {
        if (got) {
            if (!userNameRegex.test(username)) {
                setuserhelper("Please enter in valid pattern");
                setMessage("Invalid Pattern for username!");
                setIsUsernameValid(false);
            }
            else {
                setIsUsernameValid(true);
            }
        }
    }, [username]);

    useEffect(() => {
        if (got) {
            setOldPasswordError(false);
        }
    }, [oldPassword]);

    useEffect(() => {
        if (got) {
            if (newPassword && !passwordRegex.test(newPassword)) {
                setpasshelper("Password should be at least 8 characters including lowercase and uppercase letters and numbers.");
                setNewPasswordError(true);
            }
            else {
                setpasshelper('');
                setNewPasswordError(false);
            }
        }
    }, [newPassword]);

    useEffect(() => {
        if (got) {
            if (newPasswordConfirm === newPassword) {
                setNewPasswordConfirmError(false);
            }
            else {
                setNewPasswordConfirmError(true);
            }
        }
    }, [newPasswordConfirm]);

    const callEditAPI = async () => {
        if (isEmailValid && isUsernameValid) {
            try {
                const data = isDoctor ?
                    {
                        email: email,
                        username: username,
                        phone_number: phoneNumber,
                        city: city
                    }
                    :
                    {
                        email: email,
                        username: username,
                        first_name: firstName,
                        last_name: lastName,
                        gender: gender,
                        age: age ? age : 0,
                        phone_number: phoneNumber,
                        city: city
                    }
                const response = await callEditProfileAPI(mainUsername, data, isDoctor, isRemembered);
                if (response.status === 200) {
                    setMessage("Your profile updated successfully!");
                    setSnackColor([SUCCESS_BACKGROUND, SUCCESS_COLOR]);
                    setOpenSnackBar(true);
                    setDetailChange(false);
                    setemailhelper("");
                    setuserhelper("");
                    setSent(false);
                }
            }
            catch (error) {
                if (error.status === 400) {
                    if (error.payload.username) {
                        setMessage("User with such username already exist; Please choose another username.");
                        setSnackColor([ERROR_BACKGROUND, ERROR_COLOR]);
                        setOpenSnackBar(true);
                    }
                    else if (error.payload.email) {
                        setMessage("User with such email address already exist; Please enter another email.");
                        setSnackColor([ERROR_BACKGROUND, ERROR_COLOR]);
                        setOpenSnackBar(true);
                    }
                }
                console.log(error);
            }
        }
        else {
            setSnackColor([ERROR_BACKGROUND, ERROR_COLOR]);
            setOpenSnackBar(true);
        }
    }

    const callProfilePictureSendAPI = async (data) => {
        try {
            const response = await callProfilePictureEditAPI(mainUsername, data, isDoctor, isRemembered);
            if (response.status === 200) {

            }
        }
        catch (error) {
            console.log(error);

        }
    }

    const callChangePassword = async () => {
        try {
            if (newPassword === newPasswordConfirm && newPassword && newPasswordConfirm) {
                if (!passwordRegex.test(newPassword)) {
                    setMessage(passhelper);
                    setSnackColor([ERROR_BACKGROUND, ERROR_COLOR]);
                    setOpenSnackBar(true);
                    return;
                }
                const data = {
                    new_password: newPassword,
                    old_password: oldPassword,
                }
                const response = await callChangePasswordAPI(data, isRemembered);
                if (response.status === 200) {
                    setMessage('Your password updated successfully!');
                    setSnackColor([SUCCESS_BACKGROUND, SUCCESS_COLOR]);
                    setOpenSnackBar(true);
                    setOldPassword('');
                    setNewPassword('');
                    setNewPasswordConfirm('');
                }
            }
            else {
                if (!newPassword) {
                    setMessage("New password should not be empty!");
                    setSnackColor([ERROR_BACKGROUND, ERROR_COLOR]);
                    setNewPasswordError(true);
                    setOpenSnackBar(true);
                }
                else {
                    setMessage("Confirm password doesn't matches new password!");
                    setSnackColor([ERROR_BACKGROUND, ERROR_COLOR]);
                    setNewPasswordConfirmError(true);
                    setOpenSnackBar(true);
                }

            }
        }
        catch (error) {
            if (error.status === 400) {
                setMessage("Current old password is wrong! Please check again.");
                setSnackColor([ERROR_BACKGROUND, ERROR_COLOR]);
                setOldPasswordError(true);
                setOpenSnackBar(true);
            }
            console.log(error);

        }
    }

    const [rateAvg, setRateAvg] = useState(0);
    const [rateCount, setRateCount] = useState(0);

    const onFileChange = event => {
        try {
            if (event.target.files) {
                const allowedExtensions = fileTypesList;
                const { name: fileName, size: fileSize } = event.target.files[0];
                const fileExtension = fileName.split(".").pop();
                if (allowedExtensions.includes(fileExtension.toLowerCase())) {
                    let form_data = new FormData();
                    form_data.append('pro_picture', event.target.files[0], event.target.files[0].name);
                    form_data.append('username', mainUsername);
                    form_data.append('email', mainEmail);
                    setProfileImage(URL.createObjectURL(event.target.files[0]));
                    setIsProfileImageSet(true);
                    callProfilePictureSendAPI(form_data);
                }
                else {
                    setMessage('Please upload files with common image extentions!');
                    setSnackColor([ERROR_BACKGROUND, ERROR_COLOR]);
                    setOpenSnackBar(true);
                    setProfileImage(isDoctor ? DoctorImage : PatientImage);
                    setIsProfileImageSet(false);
                }
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const onDeleteFile = () => {
        setProfileImage(isDoctor ? DoctorImage : PatientImage);
        setIsProfileImageSet(false);
        const data = {
            username: username,
            email: email,
            pro_picture: null,
        }
        callProfilePictureSendAPI(data);
    }

    const onFileReset = (event) => {
        event.target.value = null;
    }

    const [mainVisitTimeDuration, setMainVisitTimeDuration] = useState(30);

    const callChangeVisitDurationTime = async (VisitTimeDuration) => {
        try {
            const response = await callChangeVisitDurationTimeAPI({ visit_duration_time: VisitTimeDuration }, isRemembered);
            if (response.status === 200) {
                setMainVisitTimeDuration(VisitTimeDuration);
                setMessage("Visit duration time changed successfully!");
                setSnackColor([SUCCESS_BACKGROUND, SUCCESS_COLOR]);
                setOpenSnackBar(true);
            }
        }
        catch(error) {

        }
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const popoverClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const popoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [message, setMessage] = useState("");
    const [snackColor, setSnackColor] = useState("");

    const snackClose = () => {
        setOpenSnackBar(false);
        setMessage("");
    }

    const [fullscreenMode, setFullscreenMode] = useState(false);
    const [officeIndex, setOfficeIndex] = useState(-1);
    const [calendarMode, setCalendarMode] = useState(false);
    const [viewCalendar, setViewCalendar] = useState('month');
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNos, setPhoneNos] = useState([]);
    const [isChanged, setIsChanged] = useState(false);
    const [paperElav, setPaperElav] = useState(-1);
    const [monthEvents, setMonthEvents] = useState(Array(90));
    const [monthEventsMapper, setMonthEventsMapper] = useState({});
    const [currentEvents, setCurrentEvents] = useState([]);
    const [selectable, setSelectable] = useState(0);
    const [weekSchedule, setWeekSchedule] = useState([true, true, true, true, true, true, true]);
    const [daySchedule, setDaySchedule] = useState([new Date(2021, 1, 1, 6, 0), new Date(2021, 1, 1, 23, 30)]);

    return (
        <div style={{ backgroundColor: '#8ab6d6', padding: '0rem' }}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link href={`/${str}/explore/`}><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Profile</Typography>
                </Toolbar>
            </AppBar>
            {fullscreenMode ? 
            <Container maxWidth="lg" className={classes.container}>
            <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', minHeight: 'inherit' }}>
                <Offices 
                    isRemembered={isRemembered} 
                    mainVisitTimeDuration={mainVisitTimeDuration}
                    callChangeVisitDurationTime={callChangeVisitDurationTime} 
                    doctorid={doctorid} 
                    got={got}
                    mainUsername={mainUsername}
                    fullscreenMode={fullscreenMode}             setFullscreenMode={setFullscreenMode}
                    officeIndex={officeIndex}                   setOfficeIndex={setOfficeIndex}
                    calendarMode={calendarMode}                 setCalendarMode={setCalendarMode}
                    viewCalendar={viewCalendar}                 setViewCalendar={setViewCalendar}
                    date={date}                                 setDate={setDate}
                    title={title}                               setTitle={setTitle}
                    address={address}                           setAddress={setAddress}
                    phoneNos={phoneNos}                         setPhoneNos={setPhoneNos}
                    isChanged={isChanged}                       setIsChanged={setIsChanged}
                    paperElav={paperElav}                       setPaperElav={setPaperElav}
                    monthEvents={monthEvents}                   setMonthEvents={setMonthEvents}
                    monthEventsMapper={monthEventsMapper}       setMonthEventsMapper={setMonthEventsMapper}
                    currentEvents={currentEvents}               setCurrentEvents={setCurrentEvents}
                    selectable={selectable}                     setSelectable={setSelectable}
                    weekSchedule={weekSchedule}                 setWeekSchedule={setWeekSchedule}
                    daySchedule={daySchedule}                   setDaySchedule={setDaySchedule}
                />
            </div>
            </Container>
            :
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', minHeight: 'inherit' }}>
                    <Grid container className={classes.grid} direction="row" spacing={0} alignItems="flex-start" justify="space-around" margin="1rem">
                        <Grid item md={4} xs style={{/*maxWidth: "40vmax"*/ }} >
                            <Grid item container justify='center' direction="row" style={{ backgroundColor: "#E0E0E0", marginTop: "2em", borderRadius: "10px", paddingRight: "0.5rem" }}>
                                <Grid item container xs justify='center' alignItems='center' direction='column' style={{ marginBottom: '1em' }}>
                                    <Grid item xs>
                                        <Avatar alt={(isDoctor ? DoctorImage : PatientImage)} className={classes.large} src={profileImage} />
                                    </Grid>
                                    <Grid item xs>
                                        <Chip
                                            icon={<CreateIcon />}
                                            clickable
                                            size="small"
                                            color="secondary"
                                            label="Edit"
                                            variant="default"
                                            aria-describedby={id}
                                            onClick={popoverClick}
                                        />
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={popoverClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >

                                            <label htmlFor="myInput">
                                                <MenuItem onClick={(event) => { popoverClose(); }} >
                                                    <Typography className={classes.poptext}>Upload a photo...</Typography>
                                                </MenuItem>
                                            </label>
                                            {isProfileImageSet ?
                                                <MenuItem onClick={(event) => { onDeleteFile(); popoverClose(); }} >
                                                    <Typography className={classes.poptext}>Remove photo</Typography>
                                                </MenuItem>
                                                :
                                                <></>
                                            }
                                        </Popover>
                                        <input id="myInput" type="file" accept={fileTypes} onChange={onFileChange} onClick={onFileReset} style={{ marginBottom: "1em", display: 'none' }} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={9} >
                                    {isDoctor ? (
                                        <Box >
                                            <hr />
                                            <Typography className={classes.subtext} >{"Name:"}</Typography>
                                            <Typography className={classes.text}  >{mainName}</Typography>
                                            <hr />
                                            <Typography className={classes.subtext} >{"Specialization:"}</Typography>
                                            <Typography className={classes.text}  >{specializationMap(specialization)}</Typography>
                                            <hr />
                                            <Typography className={classes.subtext} >{"Rating:"}</Typography>
                                            <Box display="flex" flexDirection="row" style={{ marginTop: "0.5em" }} alignItems="center" justifyContent="flex-start">
                                                <Paper elevation={0} style={{ backgroundColor: "#E0E0E0", display: 'flex', flexDirection: 'row' }}>
                                                    <StarRating val={rateAvg} />
                                                    <VisibilityIcon style={{ color: "gray", marginLeft: '0.5em', marginRight: '0.2em' }} />
                                                    <Typography>{rateCount}</Typography>
                                                </Paper>
                                            </Box>
                                            <hr />
                                        </Box>
                                    )
                                        :
                                        (
                                            <Box>
                                                <hr />
                                                {mainName ?
                                                    <div>
                                                        <Typography className={classes.subtext} >{"Name:"}</Typography>
                                                        <Typography className={classes.text}  >{mainName}</Typography>
                                                        <hr />
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                                <Typography className={classes.subtext} >{"Username:"}</Typography>
                                                <Typography className={classes.text}  >{mainUsername}</Typography>
                                                <hr />
                                                <Typography className={classes.subtext} >{"Email Address:"}</Typography>
                                                <Typography className={classes.text} >{mainEmail}</Typography>
                                                <hr />
                                            </Box>
                                        )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="column" style={{ marginTop: '2em', marginRight: '2em' }}>
                            <Grid item style={{ width: "inherit" }}>
                                {isDoctor ?
                                    <Tabs
                                        value={tabValue2}
                                        onChange={handleChange2}
                                        indicatorColor="inherit"
                                        style={{ width: "inherit" }}
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="About"  {...a11yProps2(0)} className={(tabValue2 === 0) ? classes.seltab : classes.onetab} />
                                        <Tab label="Comments"  {...a11yProps2(1)} className={(tabValue2 === 1) ? classes.seltab : classes.onetab} />
                                        <Tab label="Change Password"  {...a11yProps2(2)} className={(tabValue2 === 2) ? classes.seltab : classes.onetab} />
                                        <Tab label="Offices"  {...a11yProps2(3)} className={(tabValue2 === 3) ? classes.seltab : classes.onetab} />
                                        <Tab label="Notifications"  {...a11yProps2(4)} className={(tabValue2 === 4) ? classes.seltab : classes.onetab} />
                                    </Tabs>
                                    :
                                    <Tabs
                                        value={tabValue2}
                                        onChange={handleChange2}
                                        indicatorColor="inherit"
                                        style={{ width: "inherit" }}
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="About" {...a11yProps2(0)} className={(tabValue2 === 0) ? classes.seltab : classes.onetab} />
                                        <Tab label="Change Password" {...a11yProps2(1)} className={(tabValue2 === 1) ? classes.seltab : classes.onetab} />
                                        {/*<Tab label="Saved Profiles" {...a11yProps2(2)} className={(tabValue2 === 2) ? classes.seltab : classes.onetab} />*/}
                                    </Tabs>
                                }
                            </Grid>
                            <Grid item className={classes.tabpanel}>
                                <TabPanel2 value={tabValue2} index={0} >
                                    <About
                                        isDoctor={isDoctor}
                                        callEditAPI={callEditAPI}
                                        setSent={setSent}
                                        firstName={firstName} setFirstName={setFirstName}
                                        lastName={lastName} setLastName={setLastName}
                                        email={email} setEmail={setEmail}
                                        username={username} setUsername={setUsername}
                                        gender={gender} setGender={setGender}
                                        age={age} setAge={setAge}
                                        phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                                        city={city} setCity={setCity}
                                        gmcNumber={gmcNumber} setGmcNumber={setGmcNumber}
                                        specialization={specialization} setSpecialization={setSpecialization}
                                        experience={experience} setExperience={setExperience}
                                        insurance={insurance} setInsurance={setInsurance}
                                        detailChange={detailChange} setDetailChange={setDetailChange}
                                        isEmailValid={isEmailValid} emailhelper={emailhelper}
                                        isUsernameValid={isUsernameValid} userhelper={userhelper}
                                    />
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={1} width="100%">
                                    {isDoctor ?
                                        <Box display="flex" flex={1} position="relative">
                                            <CommentSection username={username} />
                                        </Box>
                                        :
                                        <ChangePassword
                                            oldPassword={oldPassword} setOldPassword={setOldPassword}
                                            newPassword={newPassword} setNewPassword={setNewPassword}
                                            newPasswordConfirm={newPasswordConfirm} setNewPasswordConfirm={setNewPasswordConfirm}
                                            oldPasswordError={oldPasswordError}
                                            newPasswordError={newPasswordError}
                                            newPasswordConfirmError={newPasswordConfirmError}
                                            passhelper={passhelper}
                                            callChangePassword={callChangePassword}
                                        />
                                    }
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={2}>
                                    {isDoctor ?
                                        <ChangePassword
                                            oldPassword={oldPassword} setOldPassword={setOldPassword}
                                            newPassword={newPassword} setNewPassword={setNewPassword}
                                            newPasswordConfirm={newPasswordConfirm} setNewPasswordConfirm={setNewPasswordConfirm}
                                            oldPasswordError={oldPasswordError}
                                            newPasswordError={newPasswordError}
                                            newPasswordConfirmError={newPasswordConfirmError}
                                            passhelper={passhelper}
                                            callChangePassword={callChangePassword}
                                        />
                                        :
                                        <Typography>Calendar</Typography>
                                    }
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={3}>
                                    {isDoctor ?
                                        <Offices 
                                            isRemembered={isRemembered} 
                                            mainVisitTimeDuration={mainVisitTimeDuration}
                                            callChangeVisitDurationTime={callChangeVisitDurationTime}  
                                            doctorid={doctorid} 
                                            got={got}
                                            mainUsername={mainUsername}
                                            fullscreenMode={fullscreenMode}             setFullscreenMode={setFullscreenMode}
                                            officeIndex={officeIndex}                   setOfficeIndex={setOfficeIndex}
                                            calendarMode={calendarMode}                 setCalendarMode={setCalendarMode}
                                            viewCalendar={viewCalendar}                 setViewCalendar={setViewCalendar}
                                            date={date}                                 setDate={setDate}
                                            title={title}                               setTitle={setTitle}
                                            address={address}                           setAddress={setAddress}
                                            phoneNos={phoneNos}                         setPhoneNos={setPhoneNos}
                                            isChanged={isChanged}                       setIsChanged={setIsChanged}
                                            paperElav={paperElav}                       setPaperElav={setPaperElav}
                                            monthEvents={monthEvents}                   setMonthEvents={setMonthEvents}
                                            monthEventsMapper={monthEventsMapper}       setMonthEventsMapper={setMonthEventsMapper}
                                            currentEvents={currentEvents}               setCurrentEvents={setCurrentEvents}
                                            selectable={selectable}                     setSelectable={setSelectable}
                                            weekSchedule={weekSchedule}                 setWeekSchedule={setWeekSchedule}
                                            daySchedule={daySchedule}                   setDaySchedule={setDaySchedule}
                                            />
                                        :
                                        <Typography>Notifications</Typography>
                                    }
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={4}>
                                    {isDoctor ?
                                        <Typography>Notifications</Typography>
                                        :
                                        <></>
                                    }
                                </TabPanel2>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackBar}
                message={
                    <Box display="flex" alignItems="center">
                        <ErrorOutlineIcon style={{ color: snackColor[1], marginRight: "0.5em" }} />
                        <Typography style={{ color: snackColor[1] }}>{message}</Typography>
                        <IconButton anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <CloseIcon onClick={snackClose} style={{ color: snackColor[1] }} />
                        </IconButton>
                    </Box>}
                ContentProps={{ style: { backgroundColor: snackColor[0] } }}
                autoHideDuration={6000}
                onClose={snackClose}
                resumeHideDuration={0}>
            </Snackbar>
        </div>
    );
}