import React, { useEffect, useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button, Container, makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    accordion:{
        backgroundColor: '#89dee2',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
      margin: theme.spacing(2),
    },
}));

export default function Profile () {

    const classes = useStyles();

    const isDoctor = !(sessionStorage.getItem("isdoctor"));

    const [profileImage, setProfileImage] = useState();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [gmcNumber, setGmcNumber] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [experience, setExperience] = useState('');
    const [insurance, setInsurance] = useState('');

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
                    ['Insurance Type', insurance, insuranceDis, setInsuranceDis, <LocalHospitalIcon/>]
                    ];

    const buttonHandler1 = () => {
        setButtonLable1(editProfile ? "Edit Profile" : "Save Changes");
        setEditProfile(!editProfile);
    }

    return (
        <div class="profilepaper">
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
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography >Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="profileform">
                                <Container component="main" maxWidth="xs">                
                                    <Box display="flex" justifyContent="space-between" >
                                        <Grid container spacing={2} alignItems="flex-start">
                                                {fields.map((item) => {
                                                    return(
                                                        <Grid item xs={12}>
                                                            <TextField 
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
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                {isDoctor ?
                    <Grid item xs={7}>
                        <Accordion className={classes.accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                    <Typography >Comments</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="profileform">
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
    );
}





