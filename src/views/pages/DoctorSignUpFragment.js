import React, { useState, useEffect } from 'react';
import "../../style.css";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useParams, useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </Container>
            </Box>
        </React.Fragment>
    );
}