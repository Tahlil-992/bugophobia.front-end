import React, { useEffect,useState } from 'react';
import "../../style.css";
import User_photo from "../../assets/images/User_photo.png";
import Password_photo from "../../assets/images/Password_photo.png";
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
import { LoadingSpinner } from "../../assets/loading.spinner"

const callLoginAPI = async ({ username, password }) => {
  try {
    const response = await axios({
      url: "/auth/token/",
      method: "POST",
      baseURL: "http://localhost:8000",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
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
    const error = e
    const { status = '', statusText = '', headers = {}, data = null } = error;
    const result = {
      status,
      statusText,
      headers,
      errorCode: status,
      payload: data,
    };
    throw result;
  }
}

const userNameRegex = RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

export default function LogIn() {
	
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	
	const [isUsernameValid, setIsUsernameValid] = useState(true);
	const [ispasswordValid, setIsPasswordValid] = useState(true);
	
	const [onSubmit, setOnSubmit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [message, setMessage] = useState();
	const [openSnackBar, setOpenSnackBar] = useState(false);
	
	const checkUsername = () => {
		const res = userNameRegex.test(username);
		setIsUsernameValid(res);
		if (message === "" || message === null || message === undefined) {
		if (!res)
			setMessage("Invalid username!");
		}
	}

	const checkPassword = () => {
		const res = passwordRegex.test(password);
		setIsPasswordValid(res);
		if (message === "" || message === null || message === undefined) {
		if (!res)
			setMessage("Invalid password!");
		}
	}
	
	const validateInputs = () => {
		checkUsername();
		checkPassword();
		if (isUsernameValid && ispasswordValid)
		  return true;
		return false;
	}
	  
	const handleSubmit = () => {
		const res = validateInputs();
		if (!res) {
		  setPassword("");
		  setIsPasswordValid(false);
		  setOpenSnackBar(true);
		}
		else {
		  setOpenSnackBar(false);
		}
		setIsLoading(res);
		setOnSubmit(res);
	}

	const handleClose = () => {
		setOpenSnackBar(false);
		setMessage("");
	}
	  
	const callAPI = async () => {
		try {
		  const response = await callLoginAPI({ username, password });
		  setIsLoading(false);
		  if (response.status === 200) {
			setOpenSnackBar(false);
			alert("Login Successfully ...")
		  }
		}
		catch {
		  setIsLoading(false);
		  setPassword("");
		  setIsPasswordValid(false);
		  setOpenSnackBar(true);
		  setMessage("Something went wrong while trying to login");
		}
	}

	useEffect(() => {
		if (onSubmit) {
		  callAPI();
		  setOnSubmit(false);
		}

	  }, [onSubmit]);	
	
    return (
        <Box>
            <Container component="main" maxWidth="xs">
                <div class="paper">
                    <Typography component="h1" variant="h5" style={{ color: "white" }}>Login Form</Typography>
                    <div className="form">
                        <Grid container spacing={2}>
                            <Grid container spacing={0}>
                                <Grid>
                                    <img src={User_photo} className="photo" alt="User_photo" />
                                </Grid>
                                <Grid>
                                    <label className="brtop">enter your username :</label>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
				    error={!isUsernameValid}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="UserName"
                                    name="username"
                                    autoFocus
				    value={username}
				    onChange={event => setUsername(event.target.value)}
                                />
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid>
                                    <img src={Password_photo} className="photo" alt="Password_photo" />
                                </Grid>
                                <Grid>
                                    <label className="brtop">enter your password :</label>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
				    error={!(ispasswordValid)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
				    value={password}
				    onChange={event => setPassword(event.target.value)}
                                />
                            </Grid>
                            <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" />
                        </Grid>
				<Box display="flex" justifyContent="space-between">
					<Button type="submit" variant="contained" class="button" onClick={() => handleSubmit()}>Login</Button>
					{isLoading && <LoadingSpinner />}
				</Box>
                        <Grid>
                            <Link to="/forget-password">Forget password?</Link>
                        </Grid>
                        <Grid>
                            <Link to="/sign-up">Don't have an account? Sign Up</Link>
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
