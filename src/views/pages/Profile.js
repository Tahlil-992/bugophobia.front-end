import React, { useEffect, useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppBar, Avatar, Badge, Button, Chip, Container, Link, makeStyles, Menu, MenuItem, MenuList, Popover, Toolbar, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WcIcon from '@material-ui/icons/Wc';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BuildIcon from '@material-ui/icons/Build';
import WorkIcon from '@material-ui/icons/Work';
import AlarmIcon from '@material-ui/icons/Alarm';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SecurityIcon from '@material-ui/icons/Security';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CloseIcon from '@material-ui/icons/Close';
import { callAPIHandler } from "../../core/modules/refreshToken";
import DoctorImage from "../../assets/images/doctor.png";
import PatientImage from "../../assets/images/patient.png";
import CommentSection from "./commentSection";
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StarRating from "./RatingComponent/rating";
import Paper from '@material-ui/core/Paper';
import { HorizontalSplit } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Select from '@material-ui/core/Select';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MailIcon from '@material-ui/icons/Mail';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

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
                <Box p={3}>
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
        //marginRight: theme.spacing(4),
        //marginLeft: 'em',
        /* "&:hover": {
          width: theme.spacing(18),
          height: theme.spacing(18),
          margin: theme.spacing(1),
        } */
    },
    tab2: {
        //width: "100vmin",
        //marginLeft: "10%",
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
        transition: 'background-color 0.15s linear',
        '&:hover': {
            backgroundColor: 'rgba(138, 182, 214, 0.5)',
            transition: 'background-color 0s',
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
        color: "#31C",
        minWidth: 0,
        fontSize: 10,
        fontWeight: 900,
    },
    tabpanel: {
        backgroundColor: "#ebebeb",
        borderRight: "3px solid #16E",
        borderLeft: "3px solid #16E",
        borderBottom: "3px solid #16E",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        marginBottom: "2rem",
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
    dis: {
        '&:hover': {
            color: "#31c",
        },
        '&$focused': {
            backgroundColor: "#f0f0f0",
            color: "#1ee",
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

    },
    applyButton: {
        textTransform: "none",
        backgroundColor: "#bdc1c5",
        "&:hover": {
            backgroundColor: "#9099A1",
        },
    },
    chip2: {
        '&:hover': {
            variant: 'default',
        }
    },
}));

const StyledTextField = withStyles((theme) => ({
    root: {
        width: "70%",
        minWidth: '14em',
        marginLeft: "15%",
        backgroundColor: "#f0f0f0",
        color: "#111",
        '&:hover': {
            backgroundColor: "#f3f3f3",
            color: "#1ee",
            width: "74%",
            marginLeft: "13%",
        },
        '&$focused': {
            backgroundColor: "#e9e9e9",
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                //borderColor: '#E5E5E5',
                //background: "linear-gradient(45deg, green 30%, orange 90%)",
            },
            '&:hover fieldset': {
                borderColor: '#5070F0',
            },
            '&.Mui-focused fieldset': {
                //backgroundColor: "#f3f3f3",
                color: "#1ee",
                textEmphasisColor: '#1ee',
            },
        },
    },
}))(TextField);

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

    const [tabValue, setTabValue] = useState(0);
    const [tabValue2, setTabValue2] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChange2 = (event, newValue) => {
        setTabValue2(newValue);
    };

    const list_specialization = [
        { value: 'C', label: 'Cardiologist', },
        { value: 'D', label: 'Dermatologist', },
        { value: 'G', label: 'General Practitioner', },
        { value: 'GY', label: 'Gynecologist', },
        { value: 'I', label: 'Internist', },
        { value: 'N', label: 'Neurologist', },
        { value: 'O', label: 'Obstetrician', },
        { value: 'OP', label: 'Ophthalmologist', },
        { value: 'OT', label: 'Otolaryngologist', },
        { value: 'P', label: 'Pediatrician', },
        { value: 'PS', label: 'Psychiatrist', },
        { value: 'U', label: 'Urologist', }
    ];

    const list_insurance = [
        { value: 'O', label: 'Omr', },
        { value: 'H', label: 'Havades', },
        { value: 'T', label: 'Takmili', }
    ];

    const list_gender = [
        { value: 'M', label: 'Male', },
        { value: 'F', label: 'Female', }
    ];

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

    useEffect(() => {
        callGetDetailRatingAPI();
    }, [doctorid])

    const callGetAPI = async () => {
        try {
            const response = await callProfileAPI(isDoctor, isRemembered);
            if (response.status === 200) {
                let payload = response.payload;
                setDoctorid(nullCheck(payload.user.id))
                setFirstName(nullCheck(payload.user.first_name));
                setLastName(nullCheck(payload.user.last_name));
                setEmail(nullCheck(payload.user.email));
                setUsername(nullCheck(payload.user.username));
                setGender((payload.user.gender));
                setAge(nullCheck(payload.user.age));
                setPhoneNumber(nullCheck(payload.user.phone_number));
                setCity(nullCheck(payload.user.city));
                if (isDoctor) {
                    setGmcNumber(nullCheck(payload.gmc_number));
                    setSpecialization((payload.filed_of_specialization));
                    setExperience(nullCheck(payload.work_experience));
                }
                else {
                    setInsurance((payload.insurance_type));
                }
            }
        }
        catch (error) {
            console.log(error);

        }
    }

    const [sent, setSent] = useState(false);
    if (!sent) {
        callGetAPI();
        setSent(true);
    }

    const [disabled, setDisabled] = useState(-1);

    const [editProfile, setEditProfile] = useState(false);
    const [buttonLable1, setButtonLable1] = useState("Edit Profile");

    const [rateAvg, setRateAvg] = useState(0);
    const [rateCount, setRateCount] = useState(0);

    const fields = isDoctor ?
                    [['First Name', firstName, setFirstName, <DoubleArrowIcon/>, false, [], true],
                    ['Last Name', lastName, setLastName, <DoubleArrowIcon/>, false, [], true],
                    ['Email Address', email, setEmail, <EmailIcon/>, false, [], false],
                    ['Username', username, setUsername, <AccountCircleIcon/>, false, [], false],
                    ['Gender', gender, setGender, <WcIcon/>, false, [], true],
                    ['Age', age, setAge, <AlarmIcon/>, false, [], false],
                    ['Phone Number', phoneNumber, setPhoneNumber, <PhoneAndroidIcon/>, false, [], false],
                    ['City', city, setCity, <ApartmentIcon/>, false, [], false],
                    ['GMC Number', gmcNumber, setGmcNumber, <LocalHospitalIcon/>, false, [], true],
                    ['Filed of Specialization', specializationMap(specialization), setSpecialization, <WorkIcon/>, false, [], true],
                    ['Work Experiece', experience, setExperience, <BuildIcon/>, false, [], true]
                    ]

                :

                [['First Name', firstName, setFirstName, <DoubleArrowIcon style={{color: "inherit"}} />, false, [], false],
                    ['Last Name', lastName, setLastName, <DoubleArrowIcon/>, false, [], false],
                    ['Email Address', email, setEmail, <EmailIcon/>, false, [], false],
                    ['Username', username, setUsername, <AccountCircleIcon/>, false, [], false],
                    ['Gender', gender, setGender, <WcIcon/>, true, list_gender, false],
                    ['Age', age, setAge, <AlarmIcon/>, false, [], false],
                    ['Phone Number', phoneNumber, setPhoneNumber, <PhoneAndroidIcon/>, false, [], false],
                    ['City', city, setCity, <ApartmentIcon/>, false, [], false],
                    ['Insurance Type', insurance, setInsurance, <LocalHospitalIcon/>, true, list_insurance, false]
                    ];

    const buttonHandler1 = () => {
        setButtonLable1(editProfile ? "Edit Profile" : "Save Changes");
        setEditProfile(!editProfile);
    }

    const onFileChange = event => {
        try {
            if (event.target.files) {
                setProfileImage(URL.createObjectURL(event.target.files[0]));
                setIsProfileImageSet(true);
                //event.target.files.set
            }
        }
        catch(e) {
            console.log(e)
        }
    }

    const onDeleteFile = () => {
        setProfileImage(isDoctor ? DoctorImage : PatientImage);
        setIsProfileImageSet(false);
    }

    const [VisitTimeDuration, setVisitTimeDuration] = useState(30);
    const [ChangeVisitTimeDuration, setChangeVisitTimeDuration] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const popoverClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const popoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div style={{ backgroundColor: '#8ab6d6', padding: '0rem' }}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link href={`/${str}/explore/`}><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Profile</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.container}>
                <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', minHeight: 'inherit' }}>
                    <Grid container className={classes.grid} direction="row" spacing={0} alignItems="flex-start" justify="space-around" margin="1rem">
                        <Grid item md={4} xs style={{/*maxWidth: "40vmax"*/ }} >
                            <Grid item container justify='center' direction="row" style={{ backgroundColor: "#E0E0E0", marginTop: "2em", borderRadius: "10px", paddingRight: "0.5rem" }}>
                                <Grid item container xs justify='center' alignItems='center' direction='column' style={{ marginBottom: '1em' }}>
                                    <Grid item xs>
                                        <Avatar alt={(isDoctor ? DoctorImage : PatientImage)} className={classes.large} src={profileImage}  />
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
                                                <MenuItem onClick={(event) => {popoverClose();}} >
                                                    <Typography className={classes.text}>Upload a photo...</Typography>
                                                </MenuItem>
                                            </label>
                                            {isProfileImageSet ?
                                                <MenuItem onClick={(event) => {onDeleteFile(); popoverClose();}} >
                                                    <Typography className={classes.text}>Remove photo</Typography>
                                                </MenuItem>
                                                :
                                                <></>
                                            } 
                                        </Popover>
                                        <input id="myInput" type="file" accept="image/*" onChange={onFileChange} style={{ marginBottom: "1em", display: 'none' }} />
                                    </Grid>
                                </Grid>
                                {isDoctor &&
                                    <Grid item xs={9}>
                                        <TextField value={"Visit Time: " + VisitTimeDuration} style={{ width: '73.3%' }}
                                            InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccessTimeIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end" style={{ color: 'GrayText' }}>
                                                        minutes<span>&nbsp;&nbsp;</span>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <ButtonGroup style={{ width: '25%' }}>
                                            <Button
                                                aria-label="reduce"
                                                onClick={() => {
                                                    setVisitTimeDuration(Math.max(VisitTimeDuration - 5, 0));
                                                    setChangeVisitTimeDuration(true);
                                                }}>
                                                <KeyboardArrowDownIcon fontSize="small" />
                                            </Button>
                                            <Button
                                                aria-label="increase"
                                                onClick={() => {
                                                    setVisitTimeDuration(VisitTimeDuration + 5);
                                                    setChangeVisitTimeDuration(true);
                                                }}>
                                                <KeyboardArrowUpIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>
                                    </Grid>
                                }
                                {isDoctor &&
                                    <Grid item xs={9} style={{ marginBottom: '1em', marginTop: '0.5em' }}>
                                        <Button className={classes.applyButton} style={{ width: '100%' }}
                                            disabled={!ChangeVisitTimeDuration}
                                            onClick={() => { setChangeVisitTimeDuration(false); }}>
                                            Apply Changes
                                        </Button>
                                    </Grid>
                                }
                                <Grid item xs={9} >
                                    {isDoctor ? (
                                        <Box >
                                            <hr />
                                            <Typography className={classes.subtext} >{"Name:"}</Typography>
                                            <Typography className={classes.text}  >{firstName + " " + lastName}</Typography>
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
                                                <Typography className={classes.subtext} >{"Name:"}</Typography>
                                                <Typography className={classes.text}  >{firstName + " " + lastName}</Typography>
                                                <hr />
                                            </Box>
                                        )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs container className={classes.tab2} direction="column" style={{ marginTop: '2em', marginRight: '2em' }}>
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
                                        <Tab label="Calendar"  {...a11yProps2(3)} className={(tabValue2 === 3) ? classes.seltab : classes.onetab} />
                                        <Tab label="Notifications"  {...a11yProps2(4)} className={(tabValue2 === 4) ? classes.seltab : classes.onetab} />
                                        <Tab label="Privacy Policy"  {...a11yProps2(5)} className={(tabValue2 === 5) ? classes.seltab : classes.onetab} />
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
                                        <Tab label="Calendar" {...a11yProps2(2)} className={(tabValue2 === 2) ? classes.seltab : classes.onetab} />
                                        <Tab label="Notifications" {...a11yProps2(3)} className={(tabValue2 === 3) ? classes.seltab : classes.onetab} />
                                        <Tab label="Privacy Policy" {...a11yProps2(4)} className={(tabValue2 === 4) ? classes.seltab : classes.onetab} />
                                    </Tabs>
                                }
                            </Grid>
                            <Grid item className={classes.tabpanel}>
                                <TabPanel2 value={tabValue2} index={0} >
                                    <Grid container alignItems="center" direction="column" spacing={2}>
                                        <Grid item >
                                            <Box display="flex" justifyContent="space-between" >
                                                <Grid container spacing={3} alignItems="center" >
                                                    {fields.map((item, index) => {
                                                        return (
                                                            <Grid item xs={12} key={index.toString()} >
                                                                {/*<Typography style={{paddingLeft: "1rem", paddingBottom: "0.5rem", marginLeft: "15%"}}>{" " + item[0]}</Typography>*/}
                                                                <StyledTextField
                                                                    key={index.toString()}
                                                                    onMouseEnter={() => setDisabled(index)}
                                                                    onMouseLeave={() => setDisabled(-1)}
                                                                    disabled={item[6] && (disabled === index)}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    className={classes.textfield}
                                                                    label={item[0]}
                                                                    value={item[1]}
                                                                    select={item[4]}
                                                                    onChange={event => item[2](event.target.value)}
                                                                    InputProps={{
                                                                        startAdornment: (<InputAdornment position="start" >{item[3]}</InputAdornment>),
                                                                        classes: { root: classes.dis }
                                                                    }}
                                                                >
                                                                    {item[4] ?
                                                                        (
                                                                            item[5].map((option) => (
                                                                                <MenuItem key={option.value} value={option.value}>
                                                                                    {option.label}
                                                                                </MenuItem>
                                                                            )))
                                                                        :
                                                                        (<></>)
                                                                    }
                                                                </StyledTextField>
                                                            </Grid>
                                                        )
                                                    })}
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Button className={classes.button} >Update Your Profile</Button>
                                        </Grid>
                                    </Grid>
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={1} width="100%">
                                    {isDoctor ?
                                        <Box display="flex" flex={1} position="relative">
                                            <CommentSection username={username} />
                                        </Box>
                                        :
                                        <Grid container spacing={3} alignItems="center" justify="center" >

                                            <Grid item xs={12}  >
                                                {/*<Typography style={{paddingLeft: "1rem", paddingBottom: "0.5rem", marginLeft: "15%"}}>{" " + item[0]}</Typography>*/}
                                                <StyledTextField
                                                    variant="outlined"
                                                    fullWidth
                                                    className={classes.textfield}
                                                    label="Old Password"
                                                    type="password"
                                                    InputProps={{
                                                        startAdornment: (<InputAdornment position="start" ><LockOpenIcon /></InputAdornment>),
                                                        classes: { root: classes.dis }
                                                    }}
                                                >
                                                </StyledTextField>
                                            </Grid>
                                            <Grid item xs={12} >
                                                {/*<Typography style={{paddingLeft: "1rem", paddingBottom: "0.5rem", marginLeft: "15%"}}>{" " + item[0]}</Typography>*/}
                                                <StyledTextField
                                                    variant="outlined"
                                                    fullWidth
                                                    className={classes.textfield}
                                                    label="New Password"
                                                    type="password"
                                                    InputProps={{
                                                        startAdornment: (<InputAdornment position="start" ><LockIcon /> </InputAdornment>),
                                                        classes: { root: classes.dis }
                                                    }}
                                                >
                                                </StyledTextField>
                                            </Grid>
                                            <Grid item xs={12}  >
                                                {/*<Typography style={{paddingLeft: "1rem", paddingBottom: "0.5rem", marginLeft: "15%"}}>{" " + item[0]}</Typography>*/}
                                                <StyledTextField
                                                    variant="outlined"
                                                    fullWidth
                                                    className={classes.textfield}
                                                    label="Confirm New Password"
                                                    type="password"
                                                    InputProps={{
                                                        startAdornment: (<InputAdornment position="start" ><LockIcon /> </InputAdornment>),
                                                        classes: { root: classes.dis }
                                                    }}
                                                >
                                                </StyledTextField>
                                            </Grid>
                                            <Grid item>
                                                <Button className={classes.button} style={{ marginTop: '1em' }} >Change Your Password</Button>
                                            </Grid>

                                        </Grid>
                                    }
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={2}>
                                    {isDoctor ?
                                        <Grid container spacing={3} alignItems="center" justify='center' >
                                            <Grid item xs={12}  >
                                                {/*<Typography style={{paddingLeft: "1rem", paddingBottom: "0.5rem", marginLeft: "15%"}}>{" " + item[0]}</Typography>*/}
                                                <StyledTextField
                                                    variant="outlined"
                                                    fullWidth
                                                    className={classes.textfield}
                                                    label="Old Password"
                                                    type="password"
                                                    InputProps={{
                                                        startAdornment: (<InputAdornment position="start" > <LockOpenIcon /> </InputAdornment>),
                                                        classes: { root: classes.dis }
                                                    }}
                                                >
                                                </StyledTextField>
                                            </Grid>
                                            <Grid item xs={12} >
                                                {/*<Typography style={{paddingLeft: "1rem", paddingBottom: "0.5rem", marginLeft: "15%"}}>{" " + item[0]}</Typography>*/}
                                                <StyledTextField
                                                    variant="outlined"
                                                    fullWidth
                                                    className={classes.textfield}
                                                    label="New Password"
                                                    type="password"
                                                    InputProps={{
                                                        startAdornment: (<InputAdornment position="start" > <LockIcon /> </InputAdornment>),
                                                        classes: { root: classes.dis }
                                                    }}
                                                >
                                                </StyledTextField>
                                            </Grid>
                                            <Grid item xs={12}  >
                                                {/*<Typography style={{paddingLeft: "1rem", paddingBottom: "0.5rem", marginLeft: "15%"}}>{" " + item[0]}</Typography>*/}
                                                <StyledTextField
                                                    variant="outlined"
                                                    fullWidth
                                                    className={classes.textfield}
                                                    label="Confirm New Password"
                                                    type="password"
                                                    InputProps={{
                                                        startAdornment: (<InputAdornment position="start" > <LockIcon /> </InputAdornment>),
                                                        classes: { root: classes.dis }
                                                    }}
                                                >
                                                </StyledTextField>
                                            </Grid>
                                            <Grid item >
                                                <Button className={classes.button}  >Change Your Password</Button>
                                            </Grid>
                                        </Grid>
                                        :
                                        <Typography>Calendar</Typography>
                                    }
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={3}>
                                    {isDoctor ?
                                        <Typography>Calendar</Typography>
                                        :
                                        <Typography>Notifications</Typography>
                                    }
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={4}>
                                    {isDoctor ?
                                        <Typography>Notifications</Typography>
                                        :
                                        <Typography>Privacy Policy</Typography>
                                    }
                                </TabPanel2>
                                <TabPanel2 value={tabValue2} index={5}>
                                    {isDoctor ?
                                        <Typography>Privacy Policy</Typography>
                                        :
                                        <></>
                                    }
                                </TabPanel2>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}