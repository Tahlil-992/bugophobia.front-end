import React, { useEffect, useState } from 'react';
import "../../style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { Link, useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { LoadingSpinner } from "../../assets/loading.spinner";
import { setLocalStorage, setSessionStorage, resetLocalStorage, resetSessionStorage } from "../../core/modules/storageManager";
import { connect } from "react-redux";
import { login, rememberMe, setIsDoctor } from "../../core/Authentication/action/authActions";
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

const callLoginAPI = async ({ email, password }, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "POST", data: { email, password }, url: "/auth/token/email/" }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
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
        margin: theme.spacing(15, 3.5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
}));

function LogIn({ isdoctor, login, rememberMe, setIsDoctor }) {

    const history = useHistory();

    const images = [h1, h2, h3, h4, h5, h6, h7];
    const [index, setindex] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setindex(index => index === 6 ? 0 : index + 1);
      }, 3000);
      return () => clearInterval(interval);
    }, []);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

    const [onSubmit, setOnSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [message, setMessage] = useState();
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const [checked, setChecked] = useState(false);

    const handleSubmit = () => {
        if (email !== "" && password !== "") {
            setOpenSnackBar(false);
            setIsLoading(true);
            setOnSubmit(true);
        }
        else {
            setOpenSnackBar(true);
            setMessage("Please fill all the fields!");
            if (password === "") {
                setIsPasswordEmpty(true);
            }
            if (email === "") {
                setIsEmailEmpty(true);
            }
        }
    }

    const handleClose = () => {
        setOpenSnackBar(false);
        setMessage("");
    }

    const callAPI = async () => {
        try {
            const response = await callLoginAPI({ email, password }, checked);
            setIsLoading(false);
            if (response.status === 200) {
                setOpenSnackBar(false);
                const payload = response.payload;
                login({ accessToken: payload.access, refreshToken: payload.refresh, email: email });
                setIsDoctor(payload.is_doctor);
                if (checked) {
                    rememberMe();
                    await setLocalStorage({ accessToken: payload.access, refreshToken: payload.refresh, email: email, isdoctor: payload.is_doctor ? "true" : "false" });
                    await resetSessionStorage();
                }
                else {
                    await setSessionStorage({ accessToken: payload.access, refreshToken: payload.refresh, email: email, isdoctor: payload.is_doctor ? "true" : "false" });
                    await resetLocalStorage();
                }
                history.replace("/")
            }

        }
        catch (error) {
            setIsLoading(false);
            setOpenSnackBar(true);
            if (error.payload !== null && error.payload !== undefined) {
                setMessage("Wrong email address or password, Please check again.");
            }
            else {
                setMessage("Something went wrong while trying to login");
            }

        }
    }

    useEffect(() => {
        if (onSubmit) {
            callAPI();
            setOnSubmit(false);
        }

    }, [onSubmit]);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const classes = useStyles();

    return (
        <React.Fragment >
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5%' }}>
                    <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Login Page</Typography>
                </Toolbar>
            </AppBar>
            <Grid container component="main" className={classes.root} style={{ paddingTop: '2.6%', paddingBottom: '2.6%', paddingRight: '22.5%', paddingLeft: '22.5%', height: '43.125em', backgroundColor: '#8ab6d6' }}>
                <Grid item style={{ width: '50%', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', backgroundImage: `url(${images[index]})` }} className={classes.image} />
                <Grid item style={{ width: '50%', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', backgroundColor: '#E0E0E0' }} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Grid container spacing={2} style={{ padding: '0.7em' }}>
                            <Grid item xs={12}>
                                <TextField
                                    error={isEmailEmpty}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={event => { setEmail(event.target.value); setIsEmailEmpty(false); }}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}><br />
                                <TextField
                                    error={isPasswordEmpty}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={event => { setPassword(event.target.value); setIsPasswordEmpty(false); }}
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" />}
                                    label="Remember me"
                                    onChange={(event) => setChecked(event.target.checked)} />
                            </Grid>
                        </Grid>
                        <Box display="flex" justifyContent="space-between">
                            <Button type="submit" variant="contained" className={classes.Btn} onClick={() => handleSubmit()} style={{width:'21em', marginBottom: '1.25em'}}>Log in</Button>
                        </Box>
                        <Grid>
                            {isLoading && <LoadingSpinner />}
                        </Grid>
                        <Grid>
                            <Link class="link" to="/forget-password">Forget password?</Link>
                        </Grid>
                        <Grid>
                            <Link class="link" to="/sign-up">Don't have an account? Sign Up</Link>
                        </Grid>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={openSnackBar}
                            message={
                                <Box display="flex" alignItems="center">
                                    <ErrorOutlineIcon style={{ color: "#611a15", marginRight: "0.5em" }} />
                                    <Typography style={{ color: "#611a15" }}>{message}</Typography>
                                    <IconButton anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                        <CloseIcon onClick={handleClose} style={{ color: "#611a15" }} />
                                    </IconButton>
                                </Box>}
                            ContentProps={{ style: { backgroundColor: "#f9a099" } }}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            resumeHideDuration={0}>
                        </Snackbar>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default connect(
    state => ({ isdoctor: state.authReducer.isdoctor }),
    dispatch => ({
        login: userData => dispatch(login(userData)),
        rememberMe: () => dispatch(rememberMe()),
        setIsDoctor: (av) => dispatch(setIsDoctor(av)),
    }))(LogIn);