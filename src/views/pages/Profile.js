import React, { useEffect, useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { AppBar, Avatar, Button, Container, Link, makeStyles, Toolbar } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LockIcon from '@material-ui/icons/Lock';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WcIcon from '@material-ui/icons/Wc';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BuildIcon from '@material-ui/icons/Build';
import WorkIcon from '@material-ui/icons/Work';
import AlarmIcon from '@material-ui/icons/Alarm';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { callAPIHandler } from "../../core/modules/refreshToken";
import { BorderColorOutlined } from '@material-ui/icons';
import DoctorImage from "../../assets/images/doctor.png";

const callProfileAPI = async (is_doctor, isRemembered) => {
    try {
        const urlAddress = is_doctor ? "doctor" : "patient";
        const response = callAPIHandler({method:"GET", url: `/auth/detail/${urlAddress}/`}, true, isRemembered);
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
    accordion:{
        backgroundColor: 'lightblue',
        borderWidth: "3px",
        borderColor: "#10217d",
        
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: 'lightblue',
        padding: "8px",
        '& > *': {
            margin: theme.spacing(2),
          },
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
      margin: theme.spacing(2),
    },
}));

export default function Profile () {

    const classes = useStyles();

    const isDoctor = ((sessionStorage.getItem("isdoctor") === "true") ? true : false) ||
                     ((localStorage.getItem("isdoctor") === "true") ? true : false);
    const str = isDoctor ? "doctor" : "patient";

    const specializationMap = (spec) => {
        switch(spec) {
            case 'C':
                return 'Cardiologist';
                break;
            case 'D':
                return 'Dermatologist';
                break;
            case 'G':
                return 'General Practitioner';
                break;
            case 'GY':
                return 'Gynecologist';
                break;
            case 'I':
                return 'Internist';
                break;
            case 'N':
                return 'Neurologist';
                break;
            case 'O':
                return 'Obstetrician';
                break;
            case 'OP':
                return 'Ophthalmologist';
                break;
            case 'OT':
                return 'Otolaryngologist';
                break;
            case 'P':
                return 'Pediatrician';
                break;
            case 'PS':
                return 'Psychiatrist';
                break;
            case 'U':
                return 'Urologist';
                break;
        }
    }

    const insuranceMap = (insur) => {
        switch(insur) {
            case 'O':
                return 'Omr';
                break;
            case 'H':
                return 'Havades';
                break;
            case 'T':
                return 'Takmili';
                break;
        }
    }

    const genderMap = (gen) => {
        switch(gen) {
            case 'M':
                return 'Male';
                break;
            case 'F':
                return 'Female';
                break;
        }
    }

    const [profileImage, setProfileImage] = useState(isDoctor ? DoctorImage : "");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [gmcNumber, setGmcNumber] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [insurance, setInsurance] = useState("");

    const callGetAPI = async () => {
        try {
            const response = await callProfileAPI(isDoctor, false);
            if (response.status === 200) {
                let payload = response.payload;
                setFirstName(payload.user.first_name);
                setLastName(payload.user.last_name);
                setEmail(payload.user.email);
                setUsername(payload.user.username);
                setGender(genderMap(payload.user.gender));
                setAge(payload.user.age);
                setPhoneNumber(payload.user.phone_number);
                setCity(payload.user.city);
                if (isDoctor) {
                    setGmcNumber(payload.user.gmc_number);
                    setSpecialization(specializationMap(payload.user.field_of_specialization));
                    setExperience(payload.user.work_experience);
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

    const [sent, setSent] = useState(false);
    if (!sent){
        callGetAPI();
        setSent(true);
    }

    const [firstNameDis, setFirstNameDis] = useState(false);
    const [lastNameDis, setLastNameDis] = useState(false);
    const [emailDis, setEmailDis] = useState(false);
    const [usernameDis, setUsernameDis] = useState(false);
    const [genderDis, setGenderDis] = useState(false);
    const [ageDis, setAgeDis] = useState(false);
    const [phoneNumberDis, setPhoneNumberDis] = useState(false);
    const [cityDis, setCityDis] = useState(false);
    const [passwordDis, setPasswordDis] = useState(false);
    const [gmcNumberDis, setGmcNumberDis] = useState(false);
    const [specializationDis, setSpecializationDis] = useState(false);
    const [experienceDis, setExperienceDis] = useState(false);
    const [insuranceDis, setInsuranceDis] = useState(false);

    const [editProfile, setEditProfile] = useState(false);
    const [buttonLable1, setButtonLable1] = useState("Edit Profile");

    const fields = isDoctor ?
                   [['First Name', firstName, setFirstName, firstNameDis, setFirstNameDis, <DoubleArrowIcon/>],
                    ['Last Name', lastName, setLastName, lastNameDis, setLastNameDis, <DoubleArrowIcon/>],
                    ['Email Address', email, setEmail, emailDis, setEmailDis, <EmailIcon/>],
                    ['Username', username, setUsername, usernameDis, setUsernameDis, <AccountCircleIcon/>],
                    ['Gender', gender, setGender, genderDis, setGenderDis, <WcIcon/>],
                    ['Age', age, setAge, ageDis, setAgeDis, <AlarmIcon/>],
                    ['Phone Number', phoneNumber, setPhoneNumber, phoneNumberDis, setPhoneNumberDis, <PhoneAndroidIcon/>],
                    ['City', city, setCity, cityDis, setCityDis, <ApartmentIcon/>],
                    //['Password', password, setPassword, passwordDis, setPasswordDis, <LockIcon/>],
                    ['GMC Number', gmcNumber, setGmcNumber, gmcNumberDis, setGmcNumberDis, <LocalHospitalIcon/>],
                    ['Filed of Specialization', specialization, setSpecialization, specializationDis, setSpecializationDis, <WorkIcon/>],
                    ['Work Experiece', experience, setExperience, experienceDis, setExperienceDis, <BuildIcon/>]
                    ]

                   :

                   [['First Name', firstName, setFirstName, firstNameDis, setFirstNameDis, <DoubleArrowIcon/>],
                    ['Last Name', lastName, setLastName, lastNameDis, setLastNameDis, <DoubleArrowIcon/>],
                    ['Email Address', email, setEmail, emailDis, setEmailDis, <EmailIcon/>],
                    ['Username', username, setUsername, usernameDis, setUsernameDis, <AccountCircleIcon/>],
                    ['Gender', gender, setGender, genderDis, setGenderDis, <WcIcon/>],
                    ['Age', age, setAge, ageDis, setAgeDis, <AlarmIcon/>],
                    ['Phone Number', phoneNumber, setPhoneNumber, phoneNumberDis, setPhoneNumberDis, <PhoneAndroidIcon/>],
                    ['City', city, setCity, cityDis, setCityDis, <ApartmentIcon/>],
                    //['Password', password, setPassword, passwordDis, setPasswordDis, <LockIcon/>],
                    ['Insurance Type', insurance, setInsurance, insuranceDis, setInsuranceDis, <LocalHospitalIcon/>]
                    ];

    const buttonHandler1 = () => {
        setButtonLable1(editProfile ? "Edit Profile" : "Save Changes");
        setEditProfile(!editProfile);
    }

    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link href={`/${str}/explore/`}><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Profile</Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                <Grid direction="column" container spacing={3}>
                    <Grid direction="row" container item spacing={3}>
                        <Avatar className={classes.large} src={profileImage}></Avatar>
                        <Grid direction="column" item justify="space-around" alignItems="flex-end">
                            <br></br>
                            <br></br>
                            <br></br>
                            {isDoctor ? (
                                <div>
                                    <h2>{"Dr. " + firstName + " " + lastName}</h2>
                                    <h3>{"specialized of " + specialization}</h3>
                                    <h4>*****</h4>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <h2>{firstName + " " + lastName}</h2>
                                    <h3>{"User"}</h3>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <br/>
                <Grid container direction="row" spacing={0} className={classes.root}>  
                    <Grid item xs={isDoctor ? 4 : ''}>
                        <Accordion className={classes.accordion} variant="outlined">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <font color="white">
                                    <Container component="main" maxWidth="xs">                
                                        <Box display="flex" justifyContent="space-between" >
                                            <Grid container spacing={2} alignItems="flex-start">
                                                    {fields.map((item) => {
                                                        return(
                                                            <Grid item xs={12}>
                                                                <TextField 
                                                                    color="white"
                                                                     backgroundColor="white"
                                                                    onMouseEnter={() => item[4](true)}
                                                                    onMouseLeave={() => item[4](false)}
                                                                    disabled={item[3] && !editProfile}
                                                                    variant="outlined"
                                                                    
                                                                    fullWidth 
                                                                    label={item[0]}
                                                                    value={item[1]}
                                                                    onChange={event => item[2](event.target.value)}
                                                                    InputProps={{
                                                                        startAdornment: (<InputAdornment position="start">{item[5]}</InputAdornment>)
                                                                    }}
                                                                    />
                                                            </Grid>
                                                            )
                                                        })}
                                            </Grid>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between">
                                            <Button variant="contained" class="button" onClick={buttonHandler1}>
                                                {buttonLable1}
                                            </Button>
                                        </Box>
                                    </Container>
                                    </font>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    {isDoctor ?
                        <Grid item xs={7}>
                            <Accordion className={classes.accordion} variant="outlined">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                        <Typography >Comments</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div >
                                        <Container component="main" maxWidth="xs">
                                            <h3><center>No Comments Here!</center></h3>
                                        </Container>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Grid> 
                        : 
                        <></>
                    }
                </Grid> 
            </div>
        </React.Fragment>
    );
}