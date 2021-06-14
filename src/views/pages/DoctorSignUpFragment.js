import React, { useState, useEffect } from 'react';
import "../../style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useParams, useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from '@material-ui/icons/Lock';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailIcon from '@material-ui/icons/Email';
import { callAPIHandler } from "../../core/modules/refreshToken";
import { LoadingSpinner } from "../../assets/loading.spinner";
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalPaper: {
      backgroundColor: '#86E08C',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    Btn: {
        backgroundColor: '#40bad5',
        textAlign: 'center',
        fontSize: '1.05em',
        borderRadius: '10px',
        textTransform: 'none',
        height: '2.5em',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
        marginTop: "1em",
    },
    paper: {
        margin: theme.spacing(15, 3.5),
        //display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconbutton: {
        '&:hover': {
            backgroundColor: 'inherit',
        }
    }
}));

export default function DoctorSignUpFragment({FirstName, LastName}) {

    const classes = useStyles();

    return (
        <React.Fragment style={{height: '100vh'}}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Forget Password Page</Typography>
                </Toolbar>
            </AppBar>
            <Box style={{ display: 'flex', backgroundColor: '#8ab6d6', alignItems: 'center' }}>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper} style={{borderRadius: "10px"}} elevation={6} square>
                        <div style={{backgroundColor: "#E0E0E0", borderRadius: "10px", padding: "1em 1.5em 1.5em 1.5em"}}>
                            <Grid container spacing={1} direction='column'>
                                <Grid item>
                                    <IconButton href='/' className={classes.iconbutton}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item style={{margin: '0em 1em'}}>
                                    <Typography>
                                    Hey {FirstName} {LastName},<br />
                                    Thank you for signing up on our website;
                                    Your request has been sent to us.<br />
                                    We will check your Medical License Number and send you an email in less than a week.
                                    </Typography>
                                    {/* <Typography noWrap align='center' style={{fontSize: 18, margin: '1.5em 0em', textDecorationLine: 'underline'}}>
                                        {email}
                                    </Typography> */}
                                    {/* <Link class="link" to='/' style={{fontFamily: `'Josefin Sans', sans-serif`}}>
                                        Back to landing page
                                    </Link> */}
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </Container>
            </Box>
        </React.Fragment>
    );
}