import React, { useState, useEffect } from 'react';
import "../../style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, useParams, useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from '@material-ui/icons/Lock';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailIcon from '@material-ui/icons/Email';
import { callAPIHandler } from "../../core/modules/refreshToken";
import { LoadingSpinner } from "../../assets/loading.spinner";
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core';

const processStates = {
    SUBMIT_EMAIL_ADDRESS: 1,
    SUBMIT_EMAIL_CODE: 2,
}

const forgotPasswordAPICall = async({email}) => {
    try
    {
        const response = await callAPIHandler({method: "POST", data: {email: email}, url: "/auth/forgot_password/"}, false, false);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}

const confirmResetPasswordAPICall = async({token, password}) => {
    try
    {
        const response = await callAPIHandler({method: "POST", data: {password: password}, url: `/auth/confirm_reset_password/${token}/`}, false, false);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}

const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

const useStyles = makeStyles((theme) => ({
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
}));

export default function ForgetPass() {

    const history = useHistory();
    const classes = useStyles();

    const [processState, setProcessState] = useState(processStates.SUBMIT_EMAIL_ADDRESS);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [configPass, setConfigPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [ispasswordValid, setIsPasswordValid] = useState(true);
    const [isConfigPassValid, setIsConfigPassValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const [passhelper, setpasshelper] = useState("");
    const [configpasshelper, setConfigpasshelper] = useState("");
    const [emailhelper, setemailhelper] = useState("");

    const [onSubmitEmail, setOnSubmitEmail] = useState(false);
    const [onSubmitCode, setOnSubmitCode] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const {verify} = useParams();

    const [message, setMessage] = useState();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect (() => {
        if (verify === "verify") {
            setProcessState(processStates.SUBMIT_EMAIL_CODE);
        }
        else {
            setProcessState(processStates.SUBMIT_EMAIL_ADDRESS);
        }
    }, [verify])

    useEffect(() => {
        if (processState === processStates.SUBMIT_EMAIL_CODE) {
            history.push("/forget-password/verify");
        }
    }, [processState])

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

    useEffect(() => {
        if (isEmailValid)
          setemailhelper("");
        else
          setemailhelper("Email is invalid");
    }, [isEmailValid]);

    useEffect(() => {
        if (onSubmitEmail)
        {
            setIsLoading(true);
            callForgotPasswordAPI();
        }
        setOnSubmitEmail(false);
    }, [onSubmitEmail])

    useEffect(() => {
        if (onSubmitCode)
        {
            setIsLoading(true);
            callConfirmResetPasswordAPI();
        }
        setOnSubmitCode(false);
    })

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleSubmitEmail = () => {
        setOnSubmitEmail(true);
        setOpenModal(false);
    }

    const handleSubmitCode = () => {
        setOnSubmitCode(true);
        setOpenModal(false);
    }

    const checkEmail = (email) => {
        const res = emailRegex.test(email)
        setIsEmailValid(res);
    }

    const checkPassword = (password) => {
        const res = passwordRegex.test(password);
        setIsPasswordValid(res);
    }

    const checkConfigPass = (configPass) => {
        const res = (configPass === password);
        setIsConfigPassValid(res);
    }

    const handleClose = () => {
        setOpenSnackBar(false);
        setMessage("");
    }

    const goToLogin = () => {
        history.replace("/login");
    }

    const callForgotPasswordAPI = async() => {
        try
        {
            const response = await forgotPasswordAPICall({email: email});
            if (response.status === 200)
            {
                console.log(response.payload);
                setProcessState(processStates.SUBMIT_EMAIL_CODE);
            }
        }
        catch (e)
        {
            setOpenSnackBar(true);
            console.log("FORGOT_PASSWORD_ERROR\n", e);
            if (e.status === 404)
            {
                setMessage("There is no user registered with this email address.");
            }
            else
            {
                setMessage("Something went wrong while trying to send you an email.");
            }
        }
        finally
        {
            setIsLoading(false);
        }
    }

    const callConfirmResetPasswordAPI = async() => {
        try
        {
            const response = await confirmResetPasswordAPICall({token: code, password: password});
            if (response.status === 200)
            {
                setOpenModal(true);
            }
        }
        catch (e)
        {
            setOpenSnackBar(true);
            console.log("CONFIRM_RESET_PASSWORD\n", e);
            if (e.status === 404)
            {
                setMessage("This code is invalid.");
            }
            else
            {
                setMessage("Something went wrong while trying to change your password.");
            }
        }
        finally
        {
            setIsLoading(false);
        }
    }

    return (
        <React.Fragment >
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Forget Password Page</Typography>
                </Toolbar>
            </AppBar>
            <Box style={{ display: 'flex', backgroundColor: '#8ab6d6', height: '690px', alignItems: 'center' }}>
                <Container component="main" maxWidth="xs">
                    <div class="paper">
                        <div className="form">
                            {processState === processStates.SUBMIT_EMAIL_ADDRESS && 
                            <>
                            <Grid container spacing={2}>
                                <Grid>
                                    <Typography>
                                    Hey,<br />
                                    Enter your email address.<br />
                                    We will send you a code,<br />
                                    so, you can reset your password.<br /><br />
                                    </Typography>
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
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" class="button" onClick={() => handleSubmitEmail()}>Submit</Button>
                            {isLoading && <LoadingSpinner/>}
                            <Grid>
                                <Link class="link" to="/login" style={{fontFamily: "Josefin-sans"}}>Back to login form</Link>
                            </Grid>
                            </>}
                            {processState === processStates.SUBMIT_EMAIL_CODE &&
                            <>
                            <Grid container spacing={2}>
                                <Grid>
                                    <Typography>
                                    Please, enter the code we sent to your email.<br /><br />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="code"
                                        label="code"
                                        id="code"
                                        type={"text"}
                                        value={code}
                                        onChange={(event) => setCode(event.target.value)}
                                    />
                                </Grid>
                                <Grid>
                                    <Typography>
                                    Please, enter your new password.<br /><br />
                                    </Typography>
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
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" class="button" onClick={() => handleSubmitCode()} style={{fontFamily: "Josefin-Sans"}}>Submit</Button>
                            {isLoading && <LoadingSpinner/>}
                            <Grid>
                                <Link class="link" to="/login" style={{fontFamily: "Josefin-sans"}}>Back to login form</Link>
                            </Grid>
                            </>}
                        </div>
                    </div>
                </Container>
            </Box>
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
                  <Typography style={{ color: "#611a15", fontFamily: "Josefin-sans" }} display="block">{item}</Typography>
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
              <h2>Your password was changed successfully!</h2>
            </Box>
            <Box style={{ display: "flex" }} justifyContent="flex-end">
              <Button onClick={() => goToLogin()}>Dismiss</Button>
            </Box>
          </Box>
        </Modal>
        </React.Fragment>
    );
}