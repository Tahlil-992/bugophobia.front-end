import React, { useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppBar, Avatar, Badge, Button, ButtonBase, Container, IconButton, Link, makeStyles, Toolbar, withStyles } from '@material-ui/core';
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
        const response = callAPIHandler({method:"POST", url: (is_viewed_doctor ? "/profile/doctor/public/" : "/profile/patient/public/"), data: data}, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callSaveProfileAPI = async (data, isRemembered) => {
    try {
        const response = callAPIHandler({method:"POST", url: "/profile/save/", data: data}, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callRemoveSaveProfileAPI = async (id, isRemembered) => {
    try {
        const response = callAPIHandler({method:"DELETE", url: `/profile/remove_save/${id}/`}, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const callGetSaveProfileAPI = async (isRemembered) => {
    try {
        const response = callAPIHandler({method:"GET", url: "/profile/save/"}, true, isRemembered);
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
      width: theme.spacing(20),
      height: theme.spacing(20),
      margin: theme.spacing(0),
    },
    tab: {
        maxWidth: 500,
    },
    grid: {
        marginTop: "2rem",
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: "inherit",
    },
  }))(Badge);

export default function Profile () {

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

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };
    
      const handleChangeIndex = (index) => {
        setTabValue(index);
      };

    const specializationMap = (spec) => {
        switch(spec) {
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
        switch(insur) {
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
        switch(gen) {
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

    const callGetAPI = async () => {
        try {
            const data = {username: viewedUsername};
            const response = await callProfileAPI(data, isViewedDoctor, isRemembered);
            if (response.status === 200) {
                let payload = response.payload;
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
    if (!sent){
        callGetAPI();
        callGetSaveAPI();
        setSent(true);
    }

    const saveButtonHandler = async () => {
        try {
            const data = {doctor: viewedUsername};
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

    const [disabled, setDisabled] = useState(-1);

    const fields = isViewedDoctor ?
                   [['First Name', firstName, setFirstName, <DoubleArrowIcon/>],
                    ['Last Name', lastName, setLastName, <DoubleArrowIcon/>],
                    ['Email Address', email, setEmail, <EmailIcon/>],
                    ['Username', username, setUsername, <AccountCircleIcon/>],
                    ['Gender', gender, setGender, <WcIcon/>],
                    ['Age', age, setAge, <AlarmIcon/>],
                    ['City', city, setCity, <ApartmentIcon/>],
                    ['GMC Number', gmcNumber, setGmcNumber, <LocalHospitalIcon/>],
                    ['Filed of Specialization', specialization, setSpecialization, <WorkIcon/>],
                    ['Work Experiece', experience, setExperience, <BuildIcon/>]
                    ]

                   :

                   [['First Name', firstName, setFirstName, <DoubleArrowIcon/>],
                    ['Last Name', lastName, setLastName, <DoubleArrowIcon/>],
                    ['Email Address', email, setEmail, <EmailIcon/>],
                    ['Username', username, setUsername, <AccountCircleIcon/>],
                    ['Gender', gender, setGender, <WcIcon/>],
                    ['Age', age, setAge, <AlarmIcon/>],
                    ['City', city, setCity, <ApartmentIcon/>],
                    ['Insurance Type', insurance, setInsurance, <LocalHospitalIcon/>]
                    ];

    return (
        <div>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link href={`/${str}/explore/`}><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>View Profile</Typography>
                </Toolbar>
            </AppBar>
            <div >
                <Grid container className={classes.grid} direction="column" spacing={0} alignItems="center" justify="center" margin="1rem">
                    <Grid item> { isViewedDoctor ?
                        <StyledBadge 
                            badgeContent={isSaved ?
                                <IconButton onClick={deleteButtonHandler} title="Remove from Favorites">
                                    <FavoriteIcon color="secondary" fontSize="large" />
                                </IconButton>
                                :
                                <IconButton onClick={saveButtonHandler} title="Add to Favorites">
                                    <FavoriteBorderIcon color="secondary" fontSize="large" />
                                </IconButton>
                            } 
                            >
                            <Avatar className={classes.large} src={profileImage}></Avatar>
                        </StyledBadge>
                        :
                        <Avatar className={classes.large} src={profileImage}></Avatar>
                    }
                    </Grid>
                    <Grid item>
                            {isViewedDoctor ? (
                                <center>
                                    <h3>{"Doctor " + firstName + " " + lastName}</h3>
                                    <h4>{specialization}</h4>
                                    <h5>*****</h5>
                                </center>
                            )
                            :
                            (
                                <center>
                                    <h2>{firstName + " " + lastName}</h2>
                                    <h3>{"User"}</h3>
                                </center>
                            )}
                    </Grid>
                    <Grid item>
                        {isViewedDoctor ?
                            (
                                <Button class="button" >Take a Visit Time</Button>
                            )
                            :
                            <></>
                        }
                    </Grid>
                    <Grid item>
                        {isViewedDoctor ? 
                            <Tabs
                                value={tabValue}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                className={classes.tab}
                                variant="fullWidth"
                                aria-label="full width tabs example"
                                >
                                    <Tab label="About" icon={<AccountCircleIcon/>} {...a11yProps(0)} />
                                    <Tab label="Comments" icon={<CommentIcon/>} {...a11yProps(1)} />                                    
                            </Tabs>
                            :
                            <Tabs
                                value={tabValue}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                className={classes.tab}
                                variant="fullWidth"
                                aria-label="full width tabs example"
                                >
                                    <Tab label="About" icon={<AccountCircleIcon/>} {...a11yProps(0)} />  
                            </Tabs>
                        }
                        <TabPanel value={tabValue} index={0} className={classes.accordion}>
                                <div>
                                    <Container component="main" maxWidth="xs">                
                                        <Box display="flex" justifyContent="space-between" >
                                            <Grid container spacing={2} alignItems="flex-start">
                                                    {fields.map((item, index) => {
                                                        return(
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
                                                                    onChange={event => item[2](event.target.value)}
                                                                    InputProps={{
                                                                        startAdornment: (<InputAdornment position="start">{item[3]}</InputAdornment>)
                                                                    }}
                                                                    />
                                                            </Grid>
                                                            )
                                                        })}
                                            </Grid>
                                        </Box>
                                    </Container>
                                </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <Box display="flex" flex={1} position="relative" maxHeight="75vh" className="column__cards">
                                <CommentSection username={viewedUsername}/>
                            </Box>
                        </TabPanel>
                    </Grid>
                </Grid> 
            </div>
        </div>
    );
}