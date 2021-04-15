import React from 'react';
import "../../style.css";
import {setIsDoctor} from "../../core/Authentication/action/authActions";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const LandingPage = ({ isdoctor, setIsDoctor }) => {
    const changeToPatient = () => {
        setIsDoctor(false);
    }
    const changeToDoctor = () => {
        setIsDoctor(true);
    }
    return (
        <Container component="main" class="paper" style={{width: '100%'}}>
            <div style={{ backgroundColor: "#89dee2", border: "5px solid #527c88", padding: "50px", borderRadius: "10px" }}>
                <Grid>
                    <Typography component="h1" variant="h5" >
                        Welcome<br />Please choose which type of user you are<br />
                    </Typography>
                </Grid>
                <Box display="flex" flexDirection="row" p={1} m={1}>
                    <Box p={1}>
                        <Link class="link" to="/login">
                            <Button onClick={changeToDoctor} fullWidth variant="contained" class="button">doctor</Button>
                        </Link>
                    </Box>
                    <Box p={1}>
                        <Link class="link" to="/login">
                            <Button onClick={changeToPatient} style={{ marginLeft: '2rem' }} fullWidth variant="contained" class="button">patient</Button>
                        </Link>
                    </Box>
                </Box>
            </div>
        </Container>
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