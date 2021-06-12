import React, { useState } from 'react';
import "../../style.css";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { setIsDoctor } from "../../core/Authentication/action/authActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DoctorImg from "../../assets/images/DoctorUser.png";
import PatientImg from "../../assets/images/PatientUser.png";
import OnlineDoctor from "../../assets/images/OnlineDoctor.jpg";
import Box from "@material-ui/core/Box";
import SpeedIcon from '@material-ui/icons/Speed';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import IconButton from '@material-ui/core/IconButton';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DevInfo from './devsProfileSection/devContactUsInfo';
import Rajabi from '../../assets/images/devs/M.Rajabi.jfif';
import Kia from '../../assets/images/devs/M.Kia.jfif';
import Fata from '../../assets/images/devs/A.Fata.jfif';
import Eskandari from '../../assets/images/devs/S.Eskandari.jfif';
import Roudgar from '../../assets/images/devs/A.Roudgar.jfif';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(3, 0, 3),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    footer: {
        display: "flex",
        borderRadius: "100px 100px 0 0",
    },
    Btn: {
        backgroundColor: '#40bad5',
        textAlign: 'center',
        fontSize: '1em',
        borderRadius: '10px',
        textTransform: 'none',
        height:'45px',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
    },
}));

const LandingPage = ({ isdoctor, setIsDoctor }) => {
    const changeToPatient = () => {
        setIsDoctor(false);
    }
    const changeToDoctor = () => {
        setIsDoctor(true);
    }
    const classes = useStyles();
    const [whyUsReadMore, setWhyUsReadMore] = useState(false);

    const expandWhyUsReadMore = () => {
        setWhyUsReadMore(true);
    }

    const collpaseWhyUsReadMore = () => {
        setWhyUsReadMore(false);
    }

    return (
        <React.Fragment>
            <AppBar position="relative" style={{height:'5%'}}>
                <Toolbar style={{ backgroundColor: '#10217d' }}>
                    <Typography variant="h6" color="inherit" noWrap>Let's Get Started</Typography>
                </Toolbar>
            </AppBar>
            <Grid container style={{width: "84%", margin: "auto"}}>
            <Grid item xs={12} style={{ height:'60%', justifyContent:'center', alignItems:'center' }}>
                <div className={classes.heroContent} style={{ backgroundColor: '#E0E0E0', display: 'flex', flexDirection: 'row', borderBottomLeftRadius: '100px', borderBottomRightRadius: '100px' }}>
                    <Container>
                        <Grid style={{ display: 'flex', flexDirection: 'row' }}>
                            <Grid item style={{ width: '55%', borderRadius: '10px' }}>
                                <Typography style={{ marginTop: '50px' }} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Virtual Healthcare
                                </Typography>
                                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                    Welcome !<br />Please choose which type of user you are.
                                </Typography>
                                <div className={classes.heroButtons}>
                                    <Grid container spacing={10} justify="center">
                                        <Grid item>
                                            <img src={DoctorImg} alt="DoctorUser" style={{ height: '6.5em', width: '6.5em' }} />
                                        </Grid>
                                        <Grid item>
                                            <img src={PatientImg} alt="PatientUser" style={{ height: '6.5em', width: '6.5em' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} justify="center">
                                        <Grid item style={{ marginRight: '55px' }}>
                                            <Link to="login" style={{ textDecoration: 'none' }}>
                                                <Button onClick={changeToDoctor} className={classes.Btn} align="center" style={{ padding: '1em 1.6em' }}>
                                                    Doctor
                                                </Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="login" style={{ textDecoration: 'none' }}>
                                                <Button onClick={changeToPatient} className={classes.Btn} align="center" style={{ padding: '1em 1.6em' }}>
                                                    Patient
                                                </Button>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item style={{ width: '45%' }}>
                                <img src={OnlineDoctor} style={{ width: '30em', height: '30.62em', borderRadius: '200px' }} />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Grid>
            <Grid item xs={12} style={{ height:'60%', justifyContent:'center', alignItems:'center', backgroundColor: "rgba(16,33,125, 0.3)", margin: "0 100px" }}>
                <div 
                    className={classes.heroContent} 
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'row', 
                        marginTop: "5em",
                        marginBottom: "5em", 
                        borderRadius: '100px',
                        }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box width='60%' margin="auto">
                                <Typography style={{ color: "white", fontFamily: "cursive" }} component="h1" variant="h4" align="left" color="textPrimary" gutterBottom>
                                    ABOUT US
                                </Typography>
                            </Box>   
                            <Box display="flex" flexDirection="column" width='60%' margin="auto">
                                <Typography style={{ fontFamily: "cursive", color: "#DEDEDE" }}>
                                    When you’re diagnosed with a chronic condition, your whole life changes. 
                                    You go from feeling in control of your destiny to feeling like you have no control at all. 
                                    A doctor has taken over managing your health, yet you only see them a few minutes a year. 
                                    The rest of the time, you try to navigate on your own. A healthy life feels impossible. 
                                    You search for a magic pill to make you whole again.
                                </Typography>
                                <Collapse in={whyUsReadMore} timeout={1000} unmountOnExit>
                                    <Typography style={{ fontFamily: "cursive", color: "white" }}>
                                        <br/>
                                        A better way is possible.
                                    </Typography>
                                    <Typography style={{ fontFamily: "cursive", color: "#DEDEDE" }}>
                                        Reimagine your health, your limits, and your life.
                                        We are with you during the thousands of hours per year when you’re not at the doctor’s office.
                                        <br/>
                                        <br/>
                                    </Typography>
                                    <Typography style={{ fontFamily: "cursive", color: "white"  }}>
                                        We are all in this together.
                                    </Typography>
                                    <Typography style={{ fontFamily: "cursive", color: "#DEDEDE" }}>
                                        We give you back your time, your power, and your life. 
                                        And when we give back this time and power to millions of people around the world, 
                                        we have the potential to solve the problems facing our planet. We can change the future. 
                                        And together, we can create new possibilities for humanity. It all starts with you. 
                                    </Typography>
                                </Collapse>
                                {!whyUsReadMore && <Box>
                                    <IconButton onClick={expandWhyUsReadMore}>
                                        <ArrowRightIcon/>
                                    </IconButton>
                                </Box>}
                                {whyUsReadMore && <Box>
                                    <IconButton onClick={collpaseWhyUsReadMore}>
                                        <ArrowDropUpIcon/>
                                    </IconButton>
                                </Box>}
                            </Box>
                        </Grid> 
                        <Grid item xs={12}>
                            <Box width='60%' margin="auto" display="flex" alignItems="center">
                                <Typography style={{ color: "white", fontFamily: "cursive", marginRight: "0.25em" }} variant="h4" align="left" color="textPrimary" gutterBottom>
                                    {'\u2022'}
                                </Typography>
                                <Typography style={{ color: "white", fontFamily: "cursive" }} align="left" color="textPrimary" gutterBottom>
                                    WHY US ?
                                </Typography>
                            </Box>
                            <Box width='60%' margin="auto">
                                <Box display="flex">
                                    <EventAvailableIcon style={{color: "#DEDEDE"}}/>
                                    <Typography style={{ fontFamily: "cursive", marginLeft: "0.5em", color: "#DEDEDE" }}>
                                        Using our calendars you can always keep track of your reservations.
                                    </Typography>
                                </Box>
                                <br/>
                                <Box display="flex">
                                    <AssignmentIcon style={{color: "#DEDEDE"}}/>
                                    <Typography style={{ fontFamily: "cursive", marginLeft: "0.5em", color: "#DEDEDE" }}>
                                        Doctors can keep track of their reservation times.
                                    </Typography>
                                </Box>
                                <br/>
                                <Box display="flex" style={{color: "#DEDEDE"}}>
                                    <SearchIcon/>
                                    <Typography style={{ fontFamily: "cursive", marginLeft: "0.5em", color: "#DEDEDE" }}>
                                        Our advanced search lets you find your desired doctor easily.
                                    </Typography>
                                </Box>
                                <br/>
                                <Box display="flex" style={{color: "#DEDEDE"}}>
                                    <SpeedIcon/>
                                    <Typography style={{ fontFamily: "cursive", marginLeft: "0.5em", color: "#DEDEDE" }}>
                                        Finally, don't waste time behind a phone for a visit time. Pick your most desired.
                                    </Typography>
                                </Box>
                            </Box>                           
                        </Grid>                                              
                    </Grid>
                </div>
            </Grid>
            <footer className={classes.footer} style={{ backgroundColor: '#E0E0E0', padding: "2em 0" }}>
                <Grid container>
                <Grid item sm={3}>
                    <Typography style={{ color:"#444444", fontWeight: 900, fontSize: "1.5em" }} align="center">LOGO</Typography>
                </Grid>
                <Grid container item sm={9}>
                    <Grid item sm={6} style={{ padding: "0 1.5em"}}>
                        <Grid>
                            <Typography style={{ color:"black", fontWeight: 900, fontSize: "1.5em" }}>CONTATCT US</Typography>
                        </Grid>
                        <Grid>
                            <Typography style={{ color:"black", fontWeight: 600, fontSize: "1em" }}>Our team:</Typography>
                            <Grid style={{marginLeft: "0.5em"}}>
                                <DevInfo picture={Rajabi} name={"Mohammadhossein Rajabi Ghouzlu"} role={"Backend Developer"}/>
                                <DevInfo picture={Eskandari} name={"Sina Eskandari"} role={"Backend Developer"}/>
                                <DevInfo picture={Fata} name={"Ali Fata"} role={"Frontend Developer"}/>
                                <DevInfo picture={Kia} name={"Mohammadreza Kia"} role={"Frontend Developer"}/>
                                <DevInfo picture={Roudgar} name={"Amirhossein Roudgar"} role={"Frontend Developer"}/>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography style={{ color: "#333333", marginTop: "1em" }} variant={"subtitle2"}>
                                If you are facing any problem in using the website, or you want to share
                                an issue with us, you can send and email to this address:
                                <br/>
                                <Link style={{color: "blue"}}>
                                    bugophobia.support@gmail.com
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={6} style={{ padding: "0 1.5em"}}>
                        <Grid>
                            <Typography style={{ color:"black", fontWeight: 900, fontSize: "1.5em" }}>PRIVACY POLICY</Typography>
                        </Grid>
                        <Grid>
                            <Typography style={{ color: "#333333", marginTop: "1em" }}>
                                One of our main priorities is the privacy of our visitors. 
                                This Privacy Policy document contains types of information that is collected and recorded by Website Name and how we use it.
                                <br/>
                                If you have additional questions or require more information about our Privacy Policy, 
                                do not hesitate to contact us through email at: &nbsp;                               
                                <Link style={{color: "blue"}}>
                                        bugophobia.support@gmail.com
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>                    
                </Grid>
            </footer>
            </Grid>
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    return {
        isdoctor: state.authReducer.isdoctor,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setIsDoctor: (av) => dispatch(setIsDoctor(av)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);