import React, { useState, useEffect } from 'react';
import "../../style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
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

export default function ForgetPass() {
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
        setIsLoading(true);
        if (onSubmitEmail)
        {
            callForgotPasswordAPI();
        }
        setOnSubmitEmail(false);
    }, [onSubmitEmail])

    useEffect(() => {
        setIsLoading(true);
        if (onSubmitCode)
        {
            callConfirmResetPasswordAPI();
        }
        setOnSubmitCode(false);
    })

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleSubmitEmail = () => {
        setOnSubmitEmail(true);
    }

    const handleSubmitCode = () => {
        setOnSubmitCode(true);
        alert("ALL OK!");
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
            console.log("FORGOT_PASSWORD_ERROR\n", e);
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
                console.log(response.payload);
            }
        }
        catch (e)
        {
            console.log("CONFIRM_RESET_PASSWORD\n", e);
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
                                    <label>
                                    Hey,<br />
                                    Enter your email address.<br />
                                    We will send you a code,<br />
                                    so, you can reset your password.<br /><br />
                                    </label>
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
                                <Link class="link" to="/login">Back to login form</Link>
                            </Grid>
                            </>}
                            {processState === processStates.SUBMIT_EMAIL_CODE &&
                            <>
                            <Grid container spacing={2}>
                                <Grid>
                                    <label>
                                    Please, enter the code we sent to your email.<br /><br />
                                    </label>
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
                                    <label>
                                    Please, enter your new password.<br /><br />
                                    </label>
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
                            <Button type="submit" fullWidth variant="contained" class="button" onClick={() => handleSubmitCode()}>Submit</Button>
                            <Grid>
                                <Link class="link" to="/login">Back to login form</Link>
                            </Grid>
                            </>}
                        </div>
                    </div>
                </Container>
            </Box>
        </React.Fragment>
    );
}