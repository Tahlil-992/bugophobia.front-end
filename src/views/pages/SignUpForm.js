import React, { useEffect, useState } from 'react';
import "../../style.css";
import * as loginsignup_actions from "../../core/LoginSignUp/action/LoginSignUpAction";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import { Link, useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingSpinner } from "../../assets/loading.spinner";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Paper from '@material-ui/core/Paper';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const callSignUPAPI = async ({ username, password, email }) => {
  try {
    const response = await axios({
      url: "/auth/register/patient/",
      method: "POST",
      baseURL: "http://localhost:8000",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user: {
          username,
          password,
          email,
        },
      }
    })
    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      payload: response.data,
    };
  }
  catch (e) {
    const error = e.response
    const { status = '', statusText = '', headers = {}, data = null } = error;
    const result = {
      status,
      statusText,
      headers,
      payload: data,
    };
    throw result;
  }
}

const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
const userNameRegex = RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#c2fcc2',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const SignUp = ({ isdoctor, setIsDoctor }) => {

  const classes = useStyles();

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [configPass, setConfigPass] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [ispasswordValid, setIsPasswordValid] = useState(true);
  const [isConfigPassValid, setIsConfigPassValid] = useState(true);

  const [onSubmit, setOnSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [emailhelper, setemailhelper] = useState("");
  const [userhelper, setuserhelper] = useState("");
  const [passhelper, setpasshelper] = useState("");
  const [configpasshelper, setConfigpasshelper] = useState("");

  const checkEmail = (email) => {
    const res = emailRegex.test(email)
    setIsEmailValid(res);
  }

  const checkUsername = (username) => {
    const res = userNameRegex.test(username);
    setIsUsernameValid(res);
  }

  const checkPassword = (password) => {
    const res = passwordRegex.test(password);
    setIsPasswordValid(res);
  }

  const checkConfigPass = (configPass) => {
    const res = (configPass === password);
    setIsConfigPassValid(res);
  }

  const handleSubmit = () => {
    setOpenSnackBar(false);
    setIsLoading(true);
    setOnSubmit(true);
  }

  const handleClose = () => {
    setOpenSnackBar(false);
    setMessage("");
  }

  const callAPI = async () => {
    try {
      const response = await callSignUPAPI({ username, password, email });
      setIsLoading(false);
      if (response.status === 201) {
        setOpenSnackBar(false);
        setOpenModal(true);
      }
    }
    catch (error) {
      setIsLoading(false);
      setPassword("");
      setConfigPass("");
      setOpenSnackBar(true);
      if (error.payload.user !== null && error.payload.user !== undefined) {
        const err_payload = error.payload.user;
        let err_message = "";
        const keys = Object.keys(err_payload);
        keys.forEach((item) => {
          const m = err_payload[item][0].charAt(0).toUpperCase() + err_payload[item][0].slice(1);
          err_message += `${m}\n`;
          setMessage(err_message);
        })
      }
      else {
        setMessage("Something went wrong while trying to create your account.");
      }
    }
  }

  useEffect(() => {
    if (onSubmit) {
      callAPI();
      setOnSubmit(false);
      setOpenModal(false);
    }

  }, [onSubmit]);

  useEffect(() => {
    if (isEmailValid)
      setemailhelper("");
    else
      setemailhelper("Email is invalid");
  }, [isEmailValid]);

  useEffect(() => {
    if (isUsernameValid)
      setuserhelper("");
    else
      setuserhelper("Username is invalid");
  }, [isUsernameValid]);

  useEffect(() => {
    if (ispasswordValid)
      setpasshelper("");
    else
      setpasshelper("Password should be at least 8 characters including lowercase and uppercase letters and numbers. Symbols are optional.");
  }, [ispasswordValid]);

  useEffect(() => {
    if (isConfigPassValid)
      setConfigpasshelper("");
    else
      setConfigpasshelper("Passwords don't match");
  }, [isConfigPassValid]);

  const goToLogin = () => {
    history.replace("/login");
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const changeToPatient = () => {
    setIsDoctor(false);
  }
  const changeToDoctor = () => {
    setIsDoctor(true);
  }
  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <div className="paper">
          {isdoctor && <Typography component="h1" variant="h5" style={{ color: "white" }}>Doctor SignUp Form</Typography> }
          {!isdoctor && <Typography component="h1" variant="h5" style={{ color: "white" }}>Patient SignUp Form</Typography> }
          <div class="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {isdoctor &&
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="MedicalLicenseNumber"
                    label="Medical License Number"
                    name="MedicalLicenseNumber"
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><LocalHospitalIcon /></InputAdornment>),
                    }}
                  />
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!isEmailValid}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={event => { setEmail(event.target.value); checkEmail(event.target.value); }}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>),
                    endAdornment: (<InputAdornment position="end"></InputAdornment>)
                  }}
                  helperText={emailhelper}
                />
              </Grid>
              <Grid item xs={12}>
                <br />
                <TextField
                  error={!isUsernameValid}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={event => { setUsername(event.target.value); checkUsername(event.target.value); }}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><AccountCircleIcon /></InputAdornment>),
                    endAdornment: (<InputAdornment position="end"></InputAdornment>)
                  }}
                  helperText={userhelper}
                />
              </Grid>
              <Grid item xs={12}>
                <br />
                <TextField
                  error={!(ispasswordValid && isConfigPassValid)}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={event => { setPassword(event.target.value); checkPassword(event.target.value); }}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  helperText={passhelper}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!(ispasswordValid && isConfigPassValid)}
                  variant="outlined"
                  required
                  fullWidth
                  name="Rpassword"
                  label="Confirm Password"
                  id="Rpassword"
                  autoComplete="current-password"
                  value={configPass}
                  onChange={event => { setConfigPass(event.target.value); checkConfigPass(event.target.value) }}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>)
                  }}
                  helperText={configpasshelper}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="space-between">
              <Button type="submit" variant="contained" class="button" onClick={() => handleSubmit()}>Sign Up</Button>
              {isLoading && <LoadingSpinner />}
            </Box>
            <Grid>
              <Grid item>
                {!isdoctor && <Link class="link" onClick={changeToDoctor}>Are you a doctor? Sign up as a doctor</Link> }
                {isdoctor && <Link class="link" onClick={changeToPatient}>Are you a patient? Sign up as a patient</Link> }
              </Grid>
              <Grid item>
                <Link class="link" to="/login">Already have an account? Log in</Link>
              </Grid>
            </Grid>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleClose}
          resumeHideDuration={0}
        >
          <Paper style={{ backgroundColor: "#f9a099", borderRadius: "7px" }} elevation={3}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={"1em"} py={"1em"}>
              <ErrorOutlineIcon style={{ color: "#611a15", marginRight: "0.5em" }} />
              <Box>
                {message && message.split("\n").map((item) =>
                  <Typography style={{ color: "#611a15" }} display="block">{item}</Typography>
                )}
              </Box>
              <IconButton anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClick={handleClose}>
                <CloseIcon style={{ color: "#611a15" }} />
              </IconButton>
            </Box>
          </Paper>
        </Snackbar>
        <Modal
          open={openModal}
          onClose={() => goToLogin()}
        >
          <div className={classes.paper} display="flex" color='#1e4620'>
            <CheckCircleIcon />
            <h2>SignUp was Successful!</h2>
            <Button onClick={() => goToLogin()}>Dismiss</Button>
          </div>
        </Modal>
      </Container>
    </Box>
  );
}
const mapStateToProps = (state) => {
  return {
    isdoctor: state.LoginSignUp.isdoctor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsDoctor: (av) => dispatch(loginsignup_actions.setIsDoctor(av)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);