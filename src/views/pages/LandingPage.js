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
import Box from "@material-ui/core/Box";

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
        marginTop: "5em",
        marginRight: "8%",
        marginLeft: "8%",
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
    return (
        <React.Fragment>
            <AppBar position="relative" style={{height:'5%'}}>
                <Toolbar style={{ backgroundColor: '#10217d' }}>
                    <Typography variant="h6" color="inherit" noWrap>Let's Get Started</Typography>
                </Toolbar>
            </AppBar>
            <Grid style={{ backgroundColor: '#8ab6d6', height:'60%', justifyContent:'center', alignItems:'center' }}>
                <div className={classes.heroContent} style={{ backgroundColor: '#E0E0E0', display: 'flex', flexDirection: 'row', marginLeft: '8%', marginRight: '8%', borderBottomLeftRadius: '100px', borderBottomRightRadius: '100px' }}>
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
            <footer className={classes.footer} style={{ backgroundColor: 'rgba(16,33,125, 0.3)', padding: "2em 0" }}>
                {/* <Typography variant="h6" align="center" gutterBottom>Footer</Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">Something here to give the footer a purpose!</Typography>
                <Link class="link" style={{ display: 'flex', justifyContent: 'center', fontSize: '1.25em' }}>about us</Link> */}
                <Grid container>
                <Grid item sm={3}>
                    <Typography style={{ color:"#FFFFFF", fontWeight: 900, fontSize: "1.5em" }} align="center">BOX</Typography>
                </Grid>
                <Grid container item sm={9}>
                    <Grid item sm={4} justifyContent="center"style={{ padding: "0 1.5em"}}>
                        <Grid>
                            <Typography style={{ color:"#FFFFFF", fontWeight: 900, fontSize: "1.5em" }}>ABOUT US</Typography>
                        </Grid>
                        <Grid>
                            <Typography style={{ color: "#C0C0C0", marginTop: "1em" }}>
                                Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.
                                Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, 
                                toen een onbekende drukker een zethaak met letters nam en ze 
                                door elkaar husselde om een font-catalogus te maken. 
                                Het heeft niet alleen vijf eeuwen overleefd maar is ook, 
                                vrijwel onveranderd, overgenomen in elektronische letterzetting. 
                                Het is in de jaren '60 populair geworden met de introductie van Letraset vellen 
                                met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals 
                                Aldus PageMaker die versies van Lorem Ipsum bevatten.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} style={{ padding: "0 1.5em"}}>
                        <Grid>
                            <Typography style={{ color:"#FFFFFF", fontWeight: 900, fontSize: "1.5em" }}>CONTATCT US</Typography>
                        </Grid>
                        <Grid>
                            <Typography style={{ color: "#C0C0C0", marginTop: "1em" }}>
                                Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.
                                Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, 
                                toen een onbekende drukker een zethaak met letters nam en ze 
                                door elkaar husselde om een font-catalogus te maken. 
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} style={{ padding: "0 1.5em"}}>
                        <Grid>
                            <Typography style={{ color:"#FFFFFF", fontWeight: 900, fontSize: "1.5em" }}>PRIVACY POLICY</Typography>
                        </Grid>
                        <Grid>
                            <Typography style={{ color: "#C0C0C0", marginTop: "1em" }}>
                                Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen.
                                Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, 
                                toen een onbekende drukker een zethaak met letters nam en ze 
                                door elkaar husselde om een font-catalogus te maken. 
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>                    
                </Grid>
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