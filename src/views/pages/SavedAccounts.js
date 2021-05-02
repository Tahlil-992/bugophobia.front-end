import React, { useState } from 'react';
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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { setLocalStorage } from "../../core/modules/storageManager";
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
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
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
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginTop: '10px',
        marginBottom: '10px',
    },
    cardContent: {
        flexGrow: 1,
        display: 'flex-start',
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
        }
        catch (error) {
            console.log(error);
        }
    }
    const [sent, setSent] = useState(false);
    if (!sent) {
        callGetAPI();
        setSent(true);
    }
    const ViewProfile = (username) => {
        setLocalStorage({ isvieweddoctor: 'true', viewedusername: username });
    }
    return (
        <div style={{ backgroundColor: '#E0E0E0', height: '100vh' }}>
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Saved accounts</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.paper} style={{ backgroundColor: '#E0E0E0' }}>
                            <React.Fragment>
                                <Container className={classes.cardGrid}>
                                    <Grid container spacing={4}>
                                        {SavedAccounts.map((account) => (
                                            <Grid item key={account} xs={12} sm={6} md={4} style={{ backgroundColor: '#E0E0E0' }}>
                                                <Button style={{ textTransform: 'none', textAlign: 'center' }} component={Link} to="/view-profile" onClick={() => ViewProfile(account.doctor.user.username)} size="small" color="primary">
                                                    <Card className={classes.card} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: '10px', height: '100%', width: '320px' }}>
                                                        <Grid style={{display:'flex', flexDirection:'row'}}>
                                                            <CardMedia
                                                                className={classes.cardMedia}
                                                                image={DoctorImage}
                                                                title="Image title" />
                                                            <CardContent className={classes.cardContent}>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {account.doctor.user.username}
                                                                </Typography>
                                                                <Typography>
                                                                    {specializationMap(account.doctor.filed_of_specialization)}
                                                                </Typography>
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