import React, { useEffect, useState } from 'react';
import "../../style.css";
import { setIsDoctor } from "../../core/Authentication/action/authActions";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { Link, useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { LoadingSpinner } from "../../assets/loading.spinner";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Paper from '@material-ui/core/Paper';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { callAPIHandler } from "../../core/modules/refreshToken";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import h1 from "../../assets/images/login-signup/h1.jpg";
import h2 from "../../assets/images/login-signup/h2.jpg";
import h3 from "../../assets/images/login-signup/h3.jpg";
import h4 from "../../assets/images/login-signup/h4.jpg";
import h5 from "../../assets/images/login-signup/h5.jpg";
import h6 from "../../assets/images/login-signup/h6.jpg";
import h7 from "../../assets/images/login-signup/h7.jpg";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DoctorSignUpFragment from './DoctorSignUpFragment';

const callSignUPAPI = async (data, isdoctor) => {
  try {
    const response = callAPIHandler({ method: "POST", data: data, url: `/auth/register/${isdoctor ? "doctor" : "patient"}/` }, false, false);
    return response;
  }
  catch (e) {
    throw e;
  }
}

const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
const userNameRegex = RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
const numRegex = RegExp(/^-?[0-9,\.]+$/);

const SpecializationAutocomplete = withStyles({
  inputRoot: {
    '&&[class*="MuiOutlinedInput-root"] $input': {
      paddingTop: 5.5, paddingBottom: 5.5
    },
  },
  input: {}
})(Autocomplete);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(../../assets/images/OnlineDoctor.jpg);',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
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
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  },
  MuiSelect: {
    select: {
      //padding: undefined,
      paddingTop: '0.9em',
      paddingBottom: '0.9em',
      //height: undefined,
    },
  },
}));
const Specializations = ["General Practitioner", "Cardiologist", 'Dermatologist', 'Gynecologist', 'Internist', 'Neurologist', 'Obstetrician', 'Ophthalmologist', 'Otolaryngologist', "Pediatrician", "Psychiatrist", "Urologist"];

const SignUp = ({ isdoctor, setIsDoctor }) => {

  const space = (isdoctor ? '2.5em' : '6em');
  const classes = useStyles();
  const history = useHistory();

  const images = [h1, h2, h3, h4, h5, h6, h7];
  const [index, setindex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setindex(index => index === 6 ? 0 : index + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [configPass, setConfigPass] = useState("");
  const [gmcNum, setgmcNum] = useState("");
  const [Specialization, setSpecialization] = useState(Specializations[0]);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [ispasswordValid, setIsPasswordValid] = useState(true);
  const [isConfigPassValid, setIsConfigPassValid] = useState(true);
  const [isgmcValid, setIsgmcValid] = useState(true);

  const [onSubmit, setOnSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDoctorSignUpFragment, setOpenDoctorSignUpFragment] = useState(false);

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

  const checkGMC = (gmc) => {
    const res = numRegex.test(gmc);
    setIsgmcValid(res);
  }

  const handleSubmit = () => {
    if (!isdoctor) {
      if (email === "" || username === "" || password === "" || configPass === "") {
        setOpenSnackBar(true);
        setMessage("Please fill all the fields!");
        setIsLoading(false);
      }
      else {
        setOpenSnackBar(false);
        setIsLoading(true);
        setOnSubmit(true);
      }
    }
    else {
      if (email === "" || username === "" || password === "" || configPass === "" || FirstName === "" || LastName === ""
        || gmcNum === "" || Specialization === "") {
        setOpenSnackBar(true);
        setMessage("Please fill all the fields!");
        setIsLoading(false);
      }
      else {
        setOpenSnackBar(false);
        setIsLoading(true);
        setOnSubmit(true);
      }
    }
  }

  const handleClose = () => {
    setOpenSnackBar(false);
    setMessage("");
  }

  const specializationMap = (spec) => {
    switch (spec) {
      case 'Cardiologist': return 'C';
      case 'Dermatologist': return 'D';
      case 'General Practitioner': return 'G';
      case 'Gynecologist': return 'GY';
      case 'Internist': return 'I';
      case 'Neurologist': return 'N';
      case 'Obstetrician': return 'O';
      case 'Ophthalmologist': return 'OP';
      case 'Otolaryngologist': return 'OT';
      case 'Pediatrician': return 'P';
      case 'Psychiatrist': return 'PS';
      case 'Urologist': return 'U';
      default: return '';
    }
  }

  const callAPI = async () => {
    try {
      const data = isdoctor
        ? { user: { email: email, password: password, username: username, first_name: FirstName, last_name: LastName, is_doctor: true }, gmc_number: Number(gmcNum), filed_of_specialization: specializationMap(Specialization) }
        : { user: { email: email, password: password, username: username, is_doctor: false } }
      const response = await callSignUPAPI(data, isdoctor);

      setIsLoading(false);
      if (response.status === 201) {
        setOpenSnackBar(false);
        if (isdoctor) {
          setOpenDoctorSignUpFragment(true);
        }
        else {
          setOpenModal(true);
        }
      }
    }
    catch (error) {
      setIsLoading(false);
      setPassword("");
      setConfigPass("");
      setOpenSnackBar(true);
      if (error.payload && error.payload.user !== null && error.payload.user !== undefined) {
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
      setpasshelper("Password should be at least 8 characters including lowercase and uppercase letters and numbers.");
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

  if (openDoctorSignUpFragment) return (
    <DoctorSignUpFragment FirstName={FirstName} LastName={LastName} />
  );

  return (
    <React.Fragment >
      <AppBar position="relative">
        <Toolbar style={{ backgroundColor: '#10217d', height: '5%' }}>
          <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
          {isdoctor && <Typography variant="h6" color="inherit" noWrap>Doctor SignUp Page</Typography>}
          {!isdoctor && <Typography variant="h6" color="inherit" noWrap>Patient SignUp Page</Typography>}
        </Toolbar>
      </AppBar>
      <Grid container component="main" className={classes.root} style={{ paddingTop: window.innerWidth<500 ? "15%" : '2.6%', paddingBottom: window.innerWidth<500 ? "0%" : "2.6%", paddingRight: window.innerWidth<500 ? '5%' : '22.5%', paddingLeft: window.innerWidth<500 ? '5%' : '22.5%', height: '43.125em', backgroundColor: '#8ab6d6' }}>
        {window.innerWidth >= 500 && <Grid item style={{ width: '50%', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', backgroundImage: `url(${images[index]})` }} className={classes.image} />}
        <Grid item style={{ position:'relative', width: window.innerWidth<500 ? "100%" : "50%" , borderTopRightRadius: '20px', borderBottomRightRadius: '20px', borderTopLeftRadius: window.innerWidth<500 ? '20px' : '0px', borderBottomLeftRadius: window.innerWidth<500 ? '20px' : '0px', backgroundColor: '#E0E0E0' }} component={Paper} elevation={6} square>
          <div className={classes.paper} class="vertical_center_element">
            <Grid container spacing={2} >
              {isdoctor &&
                <Grid item xs={12}>
                  <Grid style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField style={{ width: '46%', marginRight: '1%' }}
                      variant="outlined"
                      required
                      fullWidth
                      id="FirstName"
                      label="First Name"
                      name="FirstName"
                      value={FirstName}
                      onChange={event => { setFirstName(event.target.value); }}
                      InputProps={{ startAdornment: (<InputAdornment position="start"><DoubleArrowIcon /></InputAdornment>) }}
                    />
                    <TextField style={{ width: '52%', marginLeft: '1%' }} size="Normal"
                      variant="outlined"
                      required
                      fullWidth
                      id="LastName"
                      label="Last Name"
                      name="LastName"
                      value={LastName}
                      onChange={event => { setLastName(event.target.value); }}
                      InputProps={{ startAdornment: (<InputAdornment position="start"><DoubleArrowIcon /></InputAdornment>) }}
                    />
                  </Grid>
                </Grid>
              }
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
              {isdoctor &&
                <Grid item xs={12}>
                  <Grid style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField style={{ width: '36%', marginRight: '1%' }}
                      error={!isgmcValid}
                      variant="outlined"
                      required
                      fullWidth
                      id="MedicalLicenseNumber"
                      label="GMC Number"
                      name="MedicalLicenseNumber"
                      value={gmcNum}
                      onChange={event => { setgmcNum(event.target.value); checkGMC(event.target.value); }}
                      InputProps={{
                        startAdornment: (<InputAdornment position="start"><LocalHospitalIcon /></InputAdornment>),
                      }}
                    />
                    <SpecializationAutocomplete style={{ width: '62%', marginLeft: '1%' }}
                      id="Specialization"
                      options={Specializations}
                      getOptionLabel={(option) => option}
                      value={Specialization}
                      renderInput={(params) => (
                        <TextField {...params} required label="Specialization" variant="outlined" InputLabelProps={{ shrink: true }} />
                      )}
                      ListboxProps={
                        { style: { maxHeight: '10em' } }
                      }
                      onChange={(event, value) => setSpecialization(value)}
                    />
                  </Grid>
                </Grid>
              }
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                {isdoctor &&
                  <Button fullWidth type="submit" variant="contained" className={classes.Btn} onClick={() => handleSubmit()} style={{ marginBottom: '1em', marginTop: '1em' }}>Sign up</Button>
                }
                {!isdoctor &&
                  <Button fullWidth type="submit" variant="contained" className={classes.Btn} onClick={() => handleSubmit()} style={{ marginBottom: '1.25em', marginTop: '1.5em' }}>Sign up</Button>
                }
              </Grid>
            </Grid>
            <Grid>
              {isLoading && <LoadingSpinner />}
            </Grid>
            <Grid>
              {!isdoctor && <Link class="link" onClick={changeToDoctor} style={{ fontFamily: `'Josefin Sans', sans-serif` }}>Are you a doctor? Sign up as a doctor</Link>}
            </Grid>
            <Grid>
              {isdoctor && <Link class="link" onClick={changeToPatient} style={{ fontFamily: `'Josefin Sans', sans-serif` }}>Are you a patient? Sign up as a patient</Link>}
            </Grid>
            <Grid>
              <Link class="link" to="/login" style={{ fontFamily: `'Josefin Sans', sans-serif` }}>Already have an account? Log in</Link>
            </Grid>
          </div>
        </Grid>
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
        <Modal className={classes.modal} open={openModal} onClose={() => goToLogin()}>
          <Box className={classes.modalPaper}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon style={{ marginRight: "1em" }} />
              <h2>SignUp was Successful!</h2>
            </Box>
            <Box style={{ display: "flex" }} justifyContent="flex-end">
              <Button onClick={() => goToLogin()}>Dismiss</Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </React.Fragment >
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);