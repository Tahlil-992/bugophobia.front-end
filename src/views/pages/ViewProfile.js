import React, { useEffect, useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppBar, Avatar, Badge, Button, IconButton, Link, makeStyles, Paper, Toolbar, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from '@material-ui/icons/Email';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WcIcon from '@material-ui/icons/Wc';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BuildIcon from '@material-ui/icons/Build';
import WorkIcon from '@material-ui/icons/Work';
import AlarmIcon from '@material-ui/icons/Alarm';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
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
        margin: theme.spacing(2),
        /* "&:hover": {
          width: theme.spacing(18),
          height: theme.spacing(18),
          margin: theme.spacing(1),
        } */
    },
    tab: {
        width: 700,
    },
    grid: {
        marginTop: "1rem",
    },
    tab2: {
        width: "75vmax",
        //marginLeft: "10%",
    },
    onetab: {
        backgroundColor: "#C0C0F0",
        //border: "3px solid #16E",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        borderBottom: "3px solid #16E",
        fontSize: 12,
        iconSize: 30,
        '&:hover': {
            backgroundColor: "#D0D0F0",
            fontSize: 14,
        }
    },
    seltab: {
        backgroundColor: "#E0E0E0",
        //border: "3px solid #16E",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        borderTop: "3px solid #16E",
        borderRight: "3px solid #16E",
        borderLeft: "3px solid #16E",
    },
    tabpanel: {
        backgroundColor: "#E0E0E0",
        borderRight: "3px solid #16E",
        borderLeft: "3px solid #16E",
        borderBottom: "3px solid #16E",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        marginBottom: "2rem",
    },
    textfield: {
        width: "70%",
        marginLeft: "15%",
        backgroundColor: "#e5e5e5",
        color: "#111",
        '&:hover': {
            backgroundColor: "#f0f0f0",
            color: "#1ee",
            width: "74%",
            marginLeft: "13%",
        },
        '&$disabled': {
            backgroundColor: "#f00000",
        }
    },
    dis: {
        '&:hover': {
            color: "#000",
        },
    },
    button: {
        backgroundColor: '#40bad5',
        border: '0px solid #10217d',
        padding: '1em 4em 1em 4em',
        margin: '1em 0em 0em 0em',
        textAlign: 'center',
        fontSize: '16px',
        borderRadius: '10px',
        textTransform: 'none',
        height: '45px',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
    },
    rateButton: {
        textTransform: "none",
        backgroundColor: "#F6AE28",
        "&:hover": {
            backgroundColor: "#D08A08",
        },
    },
    submitButton: {
        textTransform: "none",
        backgroundColor: "#2aac3d",
        "&:hover": {
            backgroundColor: "#139122",
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
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: "inherit",
    },
}))(Badge);

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

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setTabValue(index);
    };

    const specializationMap = (spec) => {
        switch (spec) {
            case 'C':
                return 'Cardiologist';
            case 'D':
                return 'Dermatologist';
            case 'G':
                return 'General Practitioner';
            case 'GY':
                return 'Gynecologist';
            case 'I':
                return 'Internist';
            case 'N':
                return 'Neurologist';
            case 'O':
                return 'Obstetrician';
            case 'OP':
                return 'Ophthalmologist';
            case 'OT':
                return 'Otolaryngologist';
            case 'P':
                return 'Pediatrician';
            case 'PS':
                return 'Psychiatrist';
            case 'U':
                return 'Urologist';
            default:
                return '';
        }
    }

    const insuranceMap = (insur) => {
        switch (insur) {
            case 'O':
                return 'Omr';
            case 'H':
                return 'Havades';
            case 'T':
                return 'Takmili';
            default:
                return '';
        }
    }

    const genderMap = (gen) => {
        switch (gen) {
            case 'M':
                return 'Male';
            case 'F':
                return 'Female';
            default:
                return '';
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
    const [city, setCity] = useState("");
    const [gmcNumber, setGmcNumber] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [insurance, setInsurance] = useState("");

    useEffect(() => {
        callGetDetailRatingAPI();
    }, [doctorid])

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
                setGender(genderMap(payload.user.gender));
                setAge(nullCheck(payload.user.age));
                setCity(nullCheck(payload.user.city));
                if (isViewedDoctor) {
                    setGmcNumber(nullCheck(payload.gmc_number));
                    setSpecialization(specializationMap(payload.filed_of_specialization));
                    setExperience(nullCheck(payload.work_experience));
                }
                else {
                    setInsurance(insuranceMap(payload.insurance_type));
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
        callGetAPI();
        callGetSaveAPI();
        setSent(true);
    }

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
            if (response.status === 201) {
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

    const [disabled, setDisabled] = useState(-1);

    const fields = isViewedDoctor ?
        [['First Name', firstName, setFirstName, <DoubleArrowIcon />],
        ['Last Name', lastName, setLastName, <DoubleArrowIcon />],
        ['Email Address', email, setEmail, <EmailIcon />],
        ['Username', username, setUsername, <AccountCircleIcon />],
        ['Gender', gender, setGender, <WcIcon />],
        ['Age', age, setAge, <AlarmIcon />],
        ['City', city, setCity, <ApartmentIcon />],
        ['GMC Number', gmcNumber, setGmcNumber, <LocalHospitalIcon />],
        ['Filed of Specialization', specialization, setSpecialization, <WorkIcon />],
        ['Work Experiece', experience, setExperience, <BuildIcon />]
        ]

        :

        [['First Name', firstName, setFirstName, <DoubleArrowIcon />],
        ['Last Name', lastName, setLastName, <DoubleArrowIcon />],
        ['Email Address', email, setEmail, <EmailIcon />],
        ['Username', username, setUsername, <AccountCircleIcon />],
        ['Gender', gender, setGender, <WcIcon />],
        ['Age', age, setAge, <AlarmIcon />],
        ['City', city, setCity, <ApartmentIcon />],
        ['Insurance Type', insurance, setInsurance, <LocalHospitalIcon />]
        ];

    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [VisitTimeClick, setVisitTimeClick] = useState(false);
    return (
        <div style={{ backgroundColor: '#8ab6d6' }}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link href={`/${str}/explore/`}><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>View Profile</Typography>
                </Toolbar>
            </AppBar>
            <div >
                <Grid container className={classes.grid} direction="column" spacing={0} alignItems="center" justify="center" margin="1rem">
                    <Grid item direction="row">
                        <Box style={{ backgroundColor: "#E0E0E0", marginTop: "1rem", borderRadius: "10px", paddingRight: '0.5rem' }}>
                            <Grid style={{ display: 'flex' }}>
                                <Avatar className={classes.large} src={profileImage}></Avatar>
                                {isViewedDoctor ? (
                                    <Box >
                                        <br />
                                        {isDoctor ? <br /> : <></>}
                                        {!isDoctor ?
                                            <Typography variant="h6" >{"Doctor " + firstName + " " + lastName}
                                                {isSaved ?
                                                    <IconButton onClick={deleteButtonHandler} title="Remove from Favorites">
                                                        <FavoriteIcon color="secondary" fontSize="large" />
                                                    </IconButton>
                                                    :
                                                    <IconButton onClick={saveButtonHandler} title="Add to Favorites">
                                                        <FavoriteBorderIcon color="secondary" fontSize="large" />
                                                    </IconButton>
                                                }
                                            </Typography>
                                            :
                                            <Typography variant="h6" >{"Doctor " + firstName + " " + lastName}</Typography>
                                        }
                                        <Typography variant="subtitle1">{specialization}</Typography>
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
                                            <VisibilityIcon style={{ fontSize: "1.25em", color: "gray" }} />
                                            <Typography style={{ fontSize: "1em", marginLeft: "0.1em" }}>{rateCount}</Typography>
                                        </Box>
                                        <Box marginTop="1em">
                                            {!onVote &&
                                                <Button className={classes.rateButton} style={{ width: "100%" }} onClick={() => setOnVote(true)}>
                                                    Rate This Doctor
                                            </Button>}
                                            {onVote &&
                                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                                    <Box>
                                                        <Button className={classes.submitButton} onClick={() => setOnRateSubmit(true)}>
                                                            Submit
                                                    </Button>
                                                    </Box>
                                                    <Box>
                                                        <Button className={classes.cancelButton} onClick={() => setOnVote(false)}>
                                                            Cancel
                                                    </Button>
                                                    </Box>
                                                </Box>}
                                        </Box>
                                    </Box>
                                )
                                    :
                                    (
                                        <Box>

                                            <br></br><br></br>
                                            <Typography variant="h6">{firstName + " " + lastName}</Typography>
                                            <Typography variant="subtitle1">{"User"}</Typography>
                                        </Box>

                                    )}
                            </Grid>
                            <Grid style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '1rem', paddingLeft: '0.5rem' }}>
                                {isViewedDoctor ?
                                    (
                                        <Button onClick={() => setVisitTimeClick(true)} className={classes.button} >Take a Visit Time</Button>
                                    )
                                    :
                                    <></>
                                }
                                {VisitTimeClick &&
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                            <KeyboardDatePicker
                                                style={{ width: '9em' }}
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Date"
                                                format="MM/dd/yyyy"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                            <KeyboardTimePicker
                                                style={{ width: '8em' }}
                                                margin="normal"
                                                id="time-picker"
                                                label="Time"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>}
                            </Grid>
                            <Grid><br /></Grid>
                        </Box>
                    </Grid>
                    <Grid item container className={classes.tab2} direction="column">
                        <Grid item style={{ width: "inherit" }}>
                            {isViewedDoctor ?
                                <Tabs
                                    value={tabValue}
                                    onChange={handleChange}
                                    indicatorColor="inherit"
                                    textColor="primary"

                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="About" icon={<AccountCircleIcon />} {...a11yProps(0)} className={(tabValue === 0) ? classes.seltab : classes.onetab} />
                                    <Tab label="Comments" icon={<CommentIcon />} {...a11yProps(1)} className={(tabValue === 1) ? classes.seltab : classes.onetab} />
                                </Tabs>
                                :
                                <Tabs
                                    value={tabValue}
                                    onChange={handleChange}
                                    indicatorColor="inherit"
                                    textColor="primary"

                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="About" icon={<AccountCircleIcon />} {...a11yProps(0)} className={(tabValue === 0) ? classes.seltab : classes.onetab} />
                                </Tabs>
                            }
                        </Grid>
                        <Grid item className={classes.tabpanel}>
                            <TabPanel value={tabValue} index={0}>
                                <div>

                                    <Box display="flex" justifyContent="space-between" >
                                        <Grid container spacing={3} alignItems="flex-start">
                                            {fields.map((item, index) => {
                                                return (
                                                    <Grid item xs={12} key={index.toString()}>
                                                        <TextField
                                                            key={index.toString()}
                                                            onMouseEnter={() => setDisabled(index)}
                                                            onMouseLeave={() => setDisabled(-1)}
                                                            disabled={(disabled === index)}
                                                            variant="outlined"
                                                            fullWidth
                                                            label={item[0]}
                                                            value={item[1]}
                                                            className={classes.textfield}
                                                            onChange={event => item[2](event.target.value)}
                                                            InputProps={{
                                                                startAdornment: (<InputAdornment position="start">{item[3]}</InputAdornment>),
                                                                classes: { root: classes.dis }
                                                            }

                                                            }
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Box>

                                </div>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <Box display="flex" flex={1} position="relative">
                                    <CommentSection username={viewedUsername} />
                                </Box>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            {openSnackBar && <Snackbar
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
            </Snackbar>}
        </div>
    );
}