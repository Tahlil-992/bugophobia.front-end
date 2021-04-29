import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(3, 0, 8),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    footer: {
    },
    Btn: {
        backgroundColor: '#40bad5',
        border: '0px solid #10217d',
        paddingTop: '100px',
        textAlign: 'center',
        fontSize: '16px',
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
    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Typography variant="h6" color="inherit" noWrap>Let's Get Started</Typography>
                </Toolbar>
            </AppBar>
            <Grid style={{ backgroundColor: '#8ab6d6' }}>
                <div className={classes.heroContent} style={{ backgroundColor: '#E0E0E0', height: '60vh', display: 'flex', flexDirection: 'row', marginLeft: '100px', marginRight: '100px', borderBottomLeftRadius: '100px', borderBottomRightRadius: '100px' }}>
                    <Container>
                        <Grid style={{ display: 'flex', flexDirection: 'row' }}>
                            <Grid item style={{ width: '55%', borderRadius: '10px', height: '60vh' }}>
                                <Typography style={{ marginTop: '50px' }} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Virtual Healthcare
                            </Typography>
                                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                    Welcome !<br />Please choose which type of user you are.
                            </Typography>
                                <div className={classes.heroButtons}>
                                    <Grid container spacing={10} justify="center">
                                        <Grid item>
                                            <img src={DoctorImg} alt="DoctorUser" style={{ height: '100px', width: '100px' }} />
                                        </Grid>
                                        <Grid item>
                                            <img src={PatientImg} alt="PatientUser" style={{ height: '100px', width: '100px' }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} justify="center">
                                        <Grid item style={{ marginRight: '55px' }}>
                                            <Link to="login" style={{ textDecoration: 'none' }}>
                                                <Button onClick={changeToDoctor} className={classes.Btn} align="center" style={{ marginTop: '0px', padding: '10px 25px' }}>
                                                    Doctor
                                            </Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="login" style={{ textDecoration: 'none' }}>
                                                <Button onClick={changeToPatient} className={classes.Btn} align="center" style={{ marginTop: '0px', padding: '10px 25px' }}>
                                                    Patient
                                            </Button>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item style={{ width: '45%' }}>
                                <img src={OnlineDoctor} style={{ width: '507px', height: '517.5px', borderRadius: '10px' }} />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Grid>
            <footer className={classes.footer} style={{ backgroundColor: '#8ab6d6', height: '150px' }}>
                <Typography style={{ color: '#8ab6d6' }}>footer block</Typography>
                <Typography variant="h6" align="center" gutterBottom>Footer</Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">Something here to give the footer a purpose!</Typography>
                <Link class="link" style={{ display: 'flex', justifyContent: 'center', fontSize: '20px', marginTop: '5px' }}>about us</Link>
            </footer>
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