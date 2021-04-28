import React, { useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppBar, Avatar, Badge, Button, Container, IconButton, Link, makeStyles, Toolbar, withStyles } from '@material-ui/core';
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
import Tooltip from '@material-ui/core/Tooltip';


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
        width: theme.spacing(16),
        height: theme.spacing(16),
        margin: theme.spacing(2),
        "&:hover": {
          width: theme.spacing(18),
          height: theme.spacing(18),
          margin: theme.spacing(1),
        }
      },
    tab: {
        width: 700,
    },
    grid: {
        marginTop: "2rem",
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
        iconSize: 30 ,
        '&:hover': {
            backgroundColor: "#D0D0F0",
            fontSize: 14,
        }
    },
    seltab: {
        backgroundColor: "#F5F5F5",
        //border: "3px solid #16E",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        borderTop: "3px solid #16E",
        borderRight: "3px solid #16E",
        borderLeft: "3px solid #16E", 
    },
    tabpanel: {
        backgroundColor: "#F5F5F5",
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
            color: "#05e",
        },
    },
    button: {
        backgroundColor: '#40bad5',
        border: '0px solid #10217d',
        padding: '1em 4em 1em 4em',
        margin: '1em 0em 2em 0em',
        textAlign: 'center',
        fontSize: '16px',
        borderRadius: '10px',
        textTransform: 'none',
        height:'45px',
        '&:hover': {
            backgroundColor: '#5f939a',
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

    const [openModal, setOpenModal] = useState(false);
    const [onRateSubmit, setOnRateSubmit] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
        setOnRateSubmit(false);
    }

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
        <div style={{backgroundColor:'#E0E0E0'}}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link href={`/${str}/explore/`}><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>View Profile</Typography>
                </Toolbar>
            </AppBar>
            <div >
                <Grid container className={classes.grid} direction="column" spacing={0} alignItems="center" justify="center" margin="1rem">
                    <Grid item>
                        <Box display="flex">
                            <Avatar className={classes.large} src={profileImage}></Avatar>
                                {isViewedDoctor ? (
                                        <Box>
                                            <br></br>
                                            
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
                                            <Typography variant="subtitle1">{specialization}</Typography>
                                            <Box display="flex" alignItems="center" justifyContent="center">
                                                <Tooltip title="Rate this doctor">
                                                    <Button onClick={() => setOpenModal(true)}>
                                                        <StarRating />
                                                    </Button>
                                                </Tooltip>
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
                                
                        </Box>
                    </Grid>
                    <Grid item>
                        {isViewedDoctor ?
                            (
                                <Button className={classes.button} >Take a Visit Time</Button>
                            )
                            :
                            <></>
                        }
                    </Grid>
                    <Grid item container className={classes.tab2} direction="column">
                    <Grid item style={{width: "inherit"}}>
                        {isViewedDoctor ? 
                            <Tabs
                                value={tabValue}
                                onChange={handleChange}
                                indicatorColor="inherit"
                                textColor="primary"
                                
                                variant="fullWidth"
                                aria-label="full width tabs example"
                                >
                                    <Tab label="About" icon={<AccountCircleIcon/>} {...a11yProps(0)} className={(tabValue === 0) ? classes.seltab : classes.onetab} />
                                    <Tab label="Comments" icon={<CommentIcon/>} {...a11yProps(1)} className={(tabValue === 1) ? classes.seltab : classes.onetab} />                                      
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
                                    <Tab label="About" icon={<AccountCircleIcon/>} {...a11yProps(0)} className={(tabValue === 0) ? classes.seltab : classes.onetab} />  
                            </Tabs>
                        }
                        </Grid>
                        <Grid item className={classes.tabpanel}>
                        <TabPanel value={tabValue} index={0}>
                                <div>
                                                   
                                        <Box display="flex" justifyContent="space-between" >
                                            <Grid container spacing={3} alignItems="flex-start">
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
                                                                    className={classes.textfield}
                                                                    onChange={event => item[2](event.target.value)}
                                                                    InputProps={{
                                                                        startAdornment: (<InputAdornment position="start">{item[3]}</InputAdornment>),
                                                                        classes: {root: classes.dis}
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
                            <Box display="flex" flex={1} position="relative" maxHeight="75vh" className="column__cards">
                                <CommentSection username={viewedUsername}/>
                            </Box>
                        </TabPanel>
                        </Grid>
                    </Grid>
                </Grid> 
            </div>
            {!isDoctor && 
            <Modal
                open={openModal}
                onClose={handleCloseModal}
            >
                <Box className={classes.modal} display="flex" color='#1e4620' flexDirection="column" alignItems="center">
                    <h4>{`Rate doctor ${username}.`}</h4>
                    <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column">
                        <StarRating editAllowed={true} onSubmit={onRateSubmit}/>
                        <Box display="flex" marginTop="1.5em" justifyContent="space-between">
                            <Button variant="contained" color="primary"  onClick={() => setOnRateSubmit(true)} style={{marginRight: "0.5em"}}>Submit</Button>
                            <Button variant="contained" alignSelf="flex-end" onClick={() => handleCloseModal()} style={{marginLeft: "0.5em"}}>DISMISS</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>}
        </div>
    );
}