import React, { useEffect, useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button, makeStyles, Paper } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        backgroundColor: '#dcdc20',
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
      width: theme.spacing(30),
      height: theme.spacing(30),
      margin: theme.spacing(2),
    },
}));

export default function ProfileDoctor () {

    const classes = useStyles();

    const isDoctor = (sessionStorage.getItem("isdoctor"));

    const [profileImage, setProfileImage] = useState();

    const [firstName, setFirstName] = useState('-');
    const [lastName, setlastName] = useState('-');
    const [email, setEmail] = useState('-');
    const [username, setUsername] = useState('-');
    const [gender, setGender] = useState('-');
    const [age, setAge] = useState('-');
    const [phoneNumber, setPhoneNumber] = useState('-');
    const [city, setCity] = useState('-');
    const [password, setPassword] = useState('-');
    const [gmcNumber, setGmcNumber] = useState('-');
    const [specialization, setSpecialization] = useState('-');
    const [experience, setExperience] = useState('-');
    const [insurance, setInsurance] = useState('-');

    const fields = isDoctor ?
                    [['First Name', firstName],
                    ['Last Name', lastName],
                    ['Email Address', email],
                    ['Username', username],
                    ['Gender', gender],
                    ['Age', age],
                    ['Phone Number', phoneNumber],
                    ['City', city],
                    ['Password', password],
                    ['GMC Number', gmcNumber],
                    ['Filed of Specialization', specialization],
                    ['Work Experiece', experience]
                    ]

                   :

                   [['First Name', firstName],
                    ['Last Name', lastName],
                    ['Email Address', email],
                    ['Username', username],
                    ['Gender', gender],
                    ['Age', age],
                    ['Phone Number', phoneNumber],
                    ['City', city],
                    ['Password', password],
                    ['Insurance Type', insurance]
                    ];


    return (
        <div class="profilepaper">
            <div class="profileform">
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
                    {isDoctor ? (
                    <Grid item  justify="space-around" alignItems="center">
                        <Button class="button" style={{ marginLeft: '8rem' }}>Take a visit time</Button>
                    </Grid>
                    ) : <></>}
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography >Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={1} direction="column">
                                {fields.map((item) => {
                                    return(
                                        <Grid container item xs spacing={2} direction="row">
                                            <Grid item xs={3}>
                                                <Paper elevation={3} className={classes.detailsPaper}>
                                                    <Typography>
                                                        {item[0]}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs>
                                                <Paper elevation={3} className={classes.detailsPaper}>
                                                    <Typography>
                                                        {item[1]}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        )
                                    })}       
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    {isDoctor ? (
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography >Comments</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column" >
                                <Paper elevation={3} className={classes.commentsPaper} >
                                    <Grid item container direction="row" spacing={3}>
                                        <Grid item><Avatar className={classes.medium}></Avatar></Grid>
                                        <Grid item xs>
                                            <b>User 1</b>
                                            <br></br>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Paper elevation={3} className={classes.commentsPaper}>
                                    <Grid item container direction="row" spacing={3}>
                                        <Grid item><Avatar className={classes.medium}></Avatar></Grid>
                                        <Grid item xs>
                                            <b>User 2</b>
                                            <br></br> 
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Paper elevation={3} className={classes.commentsPaper}>
                                    <Grid item container direction="row" spacing={3}>
                                        <Grid item><Avatar className={classes.medium}></Avatar></Grid>
                                        <Grid item xs>
                                            <b>User 3</b>
                                            <br></br>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                            sit amet blandit leo lobortis eget.
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    ) : <></>}
                </Grid>
            </div>
        </div>
    );
}





