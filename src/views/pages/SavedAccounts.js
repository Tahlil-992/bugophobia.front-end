import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { callAPIHandler } from "../../core/modules/refreshToken";
import DoctorImage from "../../assets/images/doctor.png";
import PatientImage from "../../assets/images/patient.png";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import StarRating from "./RatingComponent/rating";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import { setLocalStorage } from "../../core/modules/storageManager";
import { Avatar } from '@material-ui/core';
import { Link } from "react-router-dom";

const callSavedProfilesAPI = async () => {
    try {
        var response = callAPIHandler({ method: "GET", url: `/profile/save/` }, true, true);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const callProfilePictureAPI = async (mainUsername, is_doctor, isRemembered) => {
    try {
        const urlAddress = is_doctor ? "doctor" : "patient";
        const response = callAPIHandler({ method: "GET", url: `/profile/${urlAddress}/update/${mainUsername}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const getRatingDetailCallAPI = ({ doctor_id }, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: `/auth/rate-detail/${doctor_id}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e7e7e7',
        transition: "transform 0.15s ease-in-out",
        "&:hover": {
            transform: "scale3d(1.1, 1.1, 1)",
            backgroundColor: '#f3f3f3',
        },
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    cardMedia: {
        height: '15vh',
        width: '15vh',
        marginLeft: '0.5em',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginTop: '0.6em',
        marginBottom: '0.6em',
        border: '3px solid #ebebeb'
    },
    cardContent: {
        display: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
}));
export default function SavedAccounts() {
    const classes = useStyles();
    const [SavedAccounts, setSavedAccounts] = useState([]);
    const [proPictures, setProPictures] = useState({});
    const [rateAvg, setRateAvg] = useState({});
    const [rateCount, setRateCount] = useState({});
    const [got, setGot] = useState(false);
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
    const callGetAPI = async () => {
        try {
            const response = await callSavedProfilesAPI();
            setSavedAccounts(response.payload);
            setGot(true);
        }
        catch (error) {
            console.log(error);
        }
    }
    const [sent, setSent] = useState(false);
    if (!sent) { setSent(true); }
    useEffect(() => { callGetAPI(); }, []);
    useEffect(() => { if (got) { callProfilePictureGetAPI(); } }, [got]);
    useEffect(() => { if (got) { callGetDetailRatingAPI(); } }, [got])
    const ViewProfile = (username) => {
        setLocalStorage({ isvieweddoctor: 'true', viewedusername: username });
    }
    var isDoctor = false;
    var isRemembered = false;
    if (localStorage.getItem("isdoctor") == null) {
        isDoctor = ((sessionStorage.getItem("isdoctor") === "true") ? true : false);
        isRemembered = false;
    }
    else {
        isDoctor = ((localStorage.getItem("isdoctor") === "true") ? true : false);
        isRemembered = true;
    }
    const callProfilePictureGetAPI = async () => {
        try {
            SavedAccounts.map(async (card, index) => {
                const uname = card.doctor.user.username;
                const response = await callProfilePictureAPI(uname, card.doctor.user.is_doctor, isRemembered);
                if (response.status === 200) {
                    let pro_picture = response.payload.pro_picture;
                    if (pro_picture === null) {
                        proPictures[index] = (card.doctor.user.is_doctor ? DoctorImage : PatientImage);
                    }
                    else {
                        proPictures[index] = (pro_picture);
                    }
                }
            });
            setSent(!sent);
        }
        catch (error) { console.log(error); }
    }
    const callGetDetailRatingAPI = async () => {
        try {
            SavedAccounts.map(async (card, index) => {
                const response = await getRatingDetailCallAPI({ doctor_id: card.doctor.user.id });
                if (response.status == 200) {
                    const payload = response.payload;
                    rateCount[index] = (payload.number);
                    rateAvg[index] = (payload.avg);
                    setSent(!sent);
                }
            });
            setSent(!sent);
        }
        catch (e) { console.log(e); }
    }
    return (
        <div style={{ backgroundColor: '#8ab6d6', minHeight: '100vh' }}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Saved accounts</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px', padding: '2em' }}>
                            <React.Fragment>
                                <Container style={{ backgroundColor: '#E0E0E0', minHeight: '43em' }} className={classes.cardGrid}>
                                    <Grid container style={{ background: '#E0E0E0' }} spacing={4}>
                                        {SavedAccounts.map((card, index) => (
                                            <Grid item key={`card-${index}`} xs={12} sm={6} md={4} style={{ backgroundColor: '#E0E0E0', }}>
                                                <Button style={{ textTransform: 'none' }} component={Link} to="/view-profile" onClick={() => ViewProfile(card.doctor.user.username)} size="small" color="primary">
                                                    <Card className={classes.card} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: '10px', height: '100%', width: '320px' }}>
                                                        <Grid style={{ display: 'flex', flexDirection: 'row', color: 'inherit' }}>
                                                            <Avatar className={classes.cardMedia} src={proPictures[index]} />
                                                            <CardContent className={classes.cardContent}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {card.doctor.user.username}
                                                                </Typography>
                                                                <Typography>
                                                                    {specializationMap(card.doctor.filed_of_specialization)}
                                                                </Typography>
                                                                <Box display="flex" flexDirection="row" style={{ marginTop: "0.5em", color: 'inherit' }} alignItems="center" justifyContent="flex-start">
                                                                    <Paper elevation={0} style={{ backgroundColor: "inherit", display: 'flex', flexDirection: 'row', color: 'inherit' }}>
                                                                        <StarRating val={rateAvg[index]} />
                                                                        <VisibilityIcon style={{ color: "inherit", marginLeft: '0.5em', marginRight: '0.2em' }} />
                                                                        <Typography style={{ color: 'inherit' }}>{rateCount[index]}</Typography>
                                                                    </Paper>
                                                                </Box>
                                                            </CardContent>
                                                        </Grid>
                                                    </Card>
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Container>
                            </React.Fragment>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}