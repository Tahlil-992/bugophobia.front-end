import React, { useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles, MenuItem, Typography, withStyles, } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const MyTextField = withStyles({
    root: {
      "& .MuiInputBase-root.Mui-disabled": {
        color: "rgba(0, 0, 0, 1)" // (default alpha is 0.38)
      }
    }
})(TextField);

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#40bad5',
        border: '0px solid #10217d',
        padding: '1em 4em 1em 4em',
        margin: '1em 0em 0em 0em',
        textAlign: 'center',
        fontSize: '0.9em',
        borderRadius: '10px',
        textTransform: 'none',
        height: '45px',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
    },
    textfield: {
        width: '94%',
        marginLeft: "3%",
        marginRight: '3%',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f9f9f9",
            transition: 'all 0s, width 0s',
        },
    },
    textfieldleft: {
        width: '45%',
        marginLeft: "3%",
        marginRight: '2%',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f9f9f9",
            transition: 'all 0s, width 0s',
        },
    },
    textfieldright: {
        width: '45%',
        marginLeft: "2%",
        marginRight: '3%',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f9f9f9",
            transition: 'all 0s, width 0s',
        },
    },
    textfieldgrid: {
        width: "76%",
        minWidth: '16em',
        marginLeft: "12%",
        marginRight: '12%',
    },
    typographygrid: {
        width: "70%",
        minWidth: '16em',
        marginLeft: "15%",
        marginRight: '15%',
    },
    title: {
        fontSize: 11,
        color: "#222",
        fontWeight: 600,
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
}));

export default function About(props) {

    const isDoctor = props.isDoctor;
    const viewProfile = props.viewProfile;
    const callEditAPI = props.callEditAPI;
    const setSent = props.setSent;
    const [firstName, setFirstName] = [props.firstName, props.setFirstName];
    const [lastName, setLastName] = [props.lastName, props.setLastName];
    const [email, setEmail] = [props.email, props.setEmail];
    const [username, setUsername] = [props.username, props.setUsername];
    const [gender, setGender] = [props.gender, props.setGender];
    const [age, setAge] = [props.age, props.setAge];
    const [phoneNumber, setPhoneNumber] = [props.phoneNumber, props.setPhoneNumber];
    const [city, setCity] = [props.city, props.setCity];
    const [gmcNumber, setGmcNumber] = [props.gmcNumber, props.setGmcNumber];
    const [specialization, setSpecialization] = [props.specialization, props.setSpecialization];
    const [experience, setExperience] = [props.experience, props.setExperience];
    const [insurance, setInsurance] = [props.insurance, props.setInsurance];
    const [detailChange, setDetailChange] = [props.detailChange, props.setDetailChange];
    const [isEmailValid, emailhelper] = [props.isEmailValid, props.emailhelper];
    const [isUsernameValid, userhelper] = [props.isUsernameValid, props.userhelper];

    const classes = useStyles();

    /*
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
    */

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

    return (
        <Grid container spacing={3} alignItems="center" justify='center' style={{marginTop: '0em', marginBottom: '1em'}}>
            <Grid item className={classes.typographygrid}>
                <Typography className={classes.title}>
                    Personal Informaton
                </Typography>
            </Grid>
            <Grid item container className={classes.textfieldgrid}>
                <MyTextField
                    variant="outlined"
                    className={classes.textfieldleft}
                    label='First Name'
                    value={firstName}
                    disabled={isDoctor || viewProfile}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <DoubleArrowIcon/> </InputAdornment>),
                    }}
                    onChange={
                        event => {
                            setFirstName(event.target.value); 
                            if (!detailChange) {
                                setDetailChange(true);
                            }
                        }
                    }
                />
                <MyTextField
                    variant="outlined"
                    className={classes.textfieldright}
                    label='Last Name'
                    value={lastName}
                    disabled={isDoctor || viewProfile}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <DoubleArrowIcon/> </InputAdornment>),
                    }}
                    onChange={
                        event => {
                            setLastName(event.target.value); 
                            if (!detailChange) {
                                setDetailChange(true);
                            }
                        }
                    }
                />
            </Grid>
            <Grid item className={classes.textfieldgrid} >
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label='Gender'
                    value={viewProfile ? genderMap(gender) : gender}
                    disabled={isDoctor || viewProfile}
                    select={!isDoctor && !viewProfile}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <WcIcon/> </InputAdornment>),
                    }}
                    onChange={
                        event => {
                            setGender(event.target.value); 
                            if (!detailChange) {
                                setDetailChange(true);
                            }
                        }
                    }
                >
                    {list_gender.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </MyTextField>
            </Grid>
            <Grid item className={classes.textfieldgrid} >
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label='Age'
                    value={age}
                    disabled={isDoctor || viewProfile}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <AccessibilityIcon/> </InputAdornment>),
                    }}
                    onChange={
                        event => {
                            setAge(event.target.value); 
                            if (!detailChange) {
                                setDetailChange(true);
                            }
                        }
                    }
                />
            </Grid>
            <hr width='80%'/>
            <Grid item className={classes.typographygrid}>
                <Typography className={classes.title}>
                    Authentication
                </Typography>
            </Grid>
            <Grid item className={classes.textfieldgrid} >
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label='Email Address'
                    value={email}
                    disabled={viewProfile}
                    error={!isEmailValid}
                    helperText={emailhelper}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <EmailIcon/> </InputAdornment>),
                    }}
                    onChange={
                        event => {
                            setEmail(event.target.value); 
                            if (!detailChange) {
                                setDetailChange(true);
                            }
                        }
                    }
                />
            </Grid>
            <Grid item className={classes.textfieldgrid} >
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label='Username'
                    value={username}
                    disabled={viewProfile}
                    error={!isUsernameValid}
                    helperText={userhelper}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <AccountCircleIcon/> </InputAdornment>),
                    }}
                    onChange={
                        event => {
                            setUsername(event.target.value); 
                            if (!detailChange) {
                                setDetailChange(true);
                            }
                        }
                    }
                />
            </Grid>
            <hr width='80%'/>
            <Grid item className={classes.typographygrid}>
                <Typography className={classes.title}>
                    Contact
                </Typography>
            </Grid>
            <Grid item className={classes.textfieldgrid} >
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label='Phone Number'
                    value={phoneNumber}
                    disabled={viewProfile}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <PhoneAndroidIcon/> </InputAdornment>),
                    }}
                    onChange={
                        event => {
                            setPhoneNumber(event.target.value); 
                            if (!detailChange) {
                                setDetailChange(true);
                            }
                        }
                    }
                />
            </Grid>
            <Grid item className={classes.textfieldgrid} >
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label='Address'
                    value={city}
                    disabled={viewProfile}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <ApartmentIcon/> </InputAdornment>),
                    }}
                    onChange={
                        event => {
                            setCity(event.target.value); 
                            if (!detailChange) {
                                setDetailChange(true);
                            }
                        }
                    }
                />
            </Grid>
            <hr width='80%'/>
            <Grid item className={classes.typographygrid}>
                <Typography className={classes.title}>
                    Medical Informaton
                </Typography>
            </Grid>
            {isDoctor ? 
                <>
                    <Grid item className={classes.textfieldgrid} >
                        <MyTextField
                            variant="outlined"
                            className={classes.textfield}
                            label='Medical License Number'
                            value={gmcNumber}
                            disabled
                            InputProps={{
                                startAdornment: (<InputAdornment position="start" > <LocalHospitalIcon/> </InputAdornment>),
                            }}
                            onChange={
                                event => {
                                    setGmcNumber(event.target.value); 
                                    if (!detailChange) {
                                        setDetailChange(true);
                                    }
                                }
                            }
                        />
                    </Grid>
                    <Grid item className={classes.textfieldgrid} >
                        <MyTextField
                            variant="outlined"
                            className={classes.textfield}
                            label='Field of Specialization'
                            value={specializationMap(specialization)}
                            disabled
                            InputProps={{
                                startAdornment: (<InputAdornment position="start" > <WorkIcon/> </InputAdornment>),
                            }}
                            onChange={
                                event => {
                                    setSpecialization(event.target.value); 
                                    if (!detailChange) {
                                        setDetailChange(true);
                                    }
                                }
                            }
                        />
                    </Grid>
                    <Grid item className={classes.textfieldgrid} >
                        <MyTextField
                            variant="outlined"
                            className={classes.textfield}
                            label='Work Experience'
                            value={experience}
                            disabled
                            InputProps={{
                                startAdornment: (<InputAdornment position="start" > <BuildIcon/> </InputAdornment>),
                            }}
                            onChange={
                                event => {
                                    setExperience(event.target.value); 
                                    if (!detailChange) {
                                        setDetailChange(true);
                                    }
                                }
                            }
                        />
                    </Grid>
                </>
                :
                <Grid item className={classes.textfieldgrid} >
                    <MyTextField
                        variant="outlined"
                        className={classes.textfield}
                        label='Insurance Type'
                        value={insuranceMap(insurance)}
                        disabled
                        InputProps={{
                            startAdornment: (<InputAdornment position="start" > <LocalHospitalIcon/> </InputAdornment>),
                        }}
                        onChange={
                            event => {
                                setInsurance(event.target.value); 
                                if (!detailChange) {
                                    setDetailChange(true);
                                }
                            }
                        }
                    />
                </Grid>
            }
            {viewProfile ?
                <></>
                :
                <Grid item>
                    <Button 
                        className={classes.button}
                        onClick={() => {callEditAPI(); setDetailChange(false);}} 
                        disabled={!detailChange} 
                    >
                        Update Your Profile
                    </Button>
                </Grid>
            }
        </Grid>
    );
}