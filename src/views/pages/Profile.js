import React, { useEffect, useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button, Container, makeStyles, Paper } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import { Link, useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from '@material-ui/icons/Email';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LockIcon from '@material-ui/icons/Lock';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { LoadingSpinner } from "../../assets/loading.spinner";
import { setLocalStorage, setSessionStorage, resetLocalStorage, resetSessionStorage } from "../../core/modules/storageManager";
import { connect } from "react-redux";
import { login, rememberMe, setIsDoctor } from "../../core/Authentication/action/authActions";
import { callAPIHandler } from "../../core/modules/refreshToken";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    commentsPaper: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing(1),
        backgroundColor: '#fcfc3c', 
        '& > *': {
          margin: theme.spacing(2),
          padding: theme.spacing(2),
        },
    },
    detailsPaper: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#fcfc3c',
        '& > *': {
          margin: theme.spacing(2),
        },
    },
    accordion:{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#dcdc20',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    grid: {
        display: "flex",
        flexWrap: 'wrap',
    },
    medium: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
      margin: theme.spacing(2),
    },
}));

export default function Profile () {

    const classes = useStyles();

    const isDoctor = !(sessionStorage.getItem("isdoctor"));

    const [profileImage, setProfileImage] = useState();

    const [firstName, setFirstName] = useState("mohammadreza");
    const [lastName, setlastName] = useState('kia');
    const [email, setEmail] = useState('mokia@gmail.com');
    const [username, setUsername] = useState('mokia');
    const [gender, setGender] = useState('Male');
    const [age, setAge] = useState('21');
    const [phoneNumber, setPhoneNumber] = useState('0911*****89');
    const [city, setCity] = useState('Gorgan');
    const [password, setPassword] = useState('********');
    const [gmcNumber, setGmcNumber] = useState('168545547321659485');
    const [specialization, setSpecialization] = useState('Neurologist');
    const [experience, setExperience] = useState('10');
    const [insurance, setInsurance] = useState('takmili');

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

    const fields = isDoctor ?
                    [['First Name', firstName, firstNameDis, setFirstNameDis, <EmailIcon/>],
                    ['Last Name', lastName, lastNameDis, setLastNameDis, <EmailIcon/>],
                    ['Email Address', email, emailDis, setEmailDis, <EmailIcon/>],
                    ['Username', username, usernameDis, setUsernameDis, <EmailIcon/>],
                    ['Gender', gender, genderDis, setGenderDis, <EmailIcon/>],
                    ['Age', age, ageDis, setAgeDis, <EmailIcon/>],
                    ['Phone Number', phoneNumber, phoneNumberDis, setPhoneNumberDis, <PhoneAndroidIcon/>],
                    ['City', city, cityDis, setCityDis, <EmailIcon/>],
                    ['Password', password, passwordDis, setPasswordDis, <LockIcon/>],
                    ['GMC Number', gmcNumber, gmcNumberDis, setGmcNumberDis, <LocalHospitalIcon/>],
                    ['Filed of Specialization', specialization, specializationDis, setSpecializationDis, <EmailIcon/>],
                    ['Work Experiece', experience, experienceDis, setExperienceDis, <EmailIcon/>]
                    ]

                   :

                   [['First Name', firstName, firstNameDis, setFirstNameDis, <EmailIcon/>],
                    ['Last Name', lastName, lastNameDis, setLastNameDis, <EmailIcon/>],
                    ['Email Address', email, emailDis, setEmailDis, <EmailIcon/>],
                    ['Username', username, usernameDis, setUsernameDis, <EmailIcon/>],
                    ['Gender', gender, genderDis, setGenderDis, <EmailIcon/>],
                    ['Age', age, ageDis, setAgeDis, <EmailIcon/>],
                    ['Phone Number', phoneNumber, phoneNumberDis, setPhoneNumberDis, <PhoneAndroidIcon/>],
                    ['City', city, cityDis, setCityDis, <EmailIcon/>],
                    ['Password', password, passwordDis, setPasswordDis, <LockIcon/>],
                    ['Insurance Type', insurance, insuranceDis, setInsuranceDis, <EmailIcon/>]
                    ];

    return (
        <div class="profilepaper">
             <div className="profileform">
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
                    <Box>
            <Container component="main" maxWidth="xs">
                
                    
                    <Box display="flex" justifyContent="space-between" >
                        <Grid container spacing={2}>
                        {fields.map((item) => {
                                    return(
                                        <Grid item xs={12}>
                                            <TextField 
                                                onMouseEnter={() => item[3](true)}
                                                onMouseLeave={() => item[3](false)}
                                                disabled={item[2]}
                                                variant="outlined"
                                                
                                                fullWidth
                                                //id="email"
                                                label={item[0]}
                                                //name="email"
                                                value={item[1]}
                                                InputProps={{
                                                    startAdornment: (<InputAdornment position="start">{item[4]}</InputAdornment>)
                                                }}
                                                />
                                        </Grid>
                                        )
                                    })}
                        </Grid>
                        
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Button variant="contained" class="button" >Edit Profile</Button>
                            
                        </Box>
                        
                    
            </Container>
        </Box>
                
            </div>
        </div>
    );
}





