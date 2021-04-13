import React, { useEffect, useState } from 'react';
import "../../style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
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
import { login, rememberMe } from "../../core/Authentication/action/authActions";

const callLoginAPI = async ({ email, password }) => {
    try {
        const response = await axios({
            url: "/auth/token/email/",
            method: "POST",
            baseURL: "http://localhost:8000",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email,
                password
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

function LogIn({ login, rememberMe }) {

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
			const response = await callLoginAPI({ email, password });
			setIsLoading(false);
			if (response.status === 200) {
				setOpenSnackBar(false);
				const payload = response.payload;
				login({ accessToken: payload.access, refreshToken: payload.refresh, email: email })
				if (checked) {
					rememberMe();
					await setLocalStorage({accessToken: payload.access, refreshToken: payload.refresh, email: email});
					await resetSessionStorage();
				}
				else {
					await setSessionStorage({accessToken: payload.access, refreshToken: payload.refresh, email: email})
					await resetLocalStorage();
				}
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

    return (
        <Box>
            <Container component="main" maxWidth="xs">
                <div class="paper">
                    <Typography component="h1" variant="h5" style={{ color: "white" }}>Login Form</Typography>
                    <div className="form">
                        <Grid container spacing={2}>
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
                            <Grid item xs={12}><br/>
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
									onChange={(event) => setChecked(event.target.checked)}/>
                            </Grid>
                        </Grid>
                        <Box display="flex" justifyContent="space-between">
                            <Button type="submit" variant="contained" class="button" onClick={() => handleSubmit()}>Log in</Button>
                            {isLoading && <LoadingSpinner />}
                        </Box>
                        <Grid>
                            <Link class="link" to="/forget-password">Forget password?</Link>
                        </Grid>
                        <Grid>
                            <Link class="link" to="/sign-up">Don't have an account? Sign Up</Link>
                        </Grid>
                    </div>
                </div>
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
                    resumeHideDuration={0}
                >
                </Snackbar>
            </Container>
        </Box>
    );
}

export default connect(
	null,
	dispatch => ({
		login: userData => dispatch(login(userData)),
		rememberMe: () => dispatch(rememberMe()),
	}))(LogIn);
