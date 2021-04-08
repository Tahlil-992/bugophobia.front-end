import React, { useEffect,useState } from 'react';
import "../../style.css";
import email_photo from "../../assets/images/email_photo.png";
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
  catch (error) {
	throw error;
  }
}

export default function LogIn() {
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const [isEmailEmpty, setIsEmailEmpty] = useState(false);
	const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
	
	const [onSubmit, setOnSubmit] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [message, setMessage] = useState();
	const [openSnackBar, setOpenSnackBar] = useState(false);
	  
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
			alert("Login Successfully!\n" + payload.access + "\n" + payload.refresh);
		  }
		  
		}
		catch(e) {
			if (e.message === "Request failed with status code 401") {
				setIsLoading(false);
				setOpenSnackBar(true);
				setMessage("The email address or the password is wrong, Please check again.");
			}
			else if (e.message === "Request failed with status code 400") {
				alert("Bad Request");
			}
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
                                    <img src={email_photo} className="photo" alt="email_photo" />
                                </Grid>
                                <Grid>
                                    <label className="brtop">enter your email address :</label>
                                </Grid>
                            </Grid>
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
									onChange={event => {setEmail(event.target.value); setIsEmailEmpty(false);}}
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
									error={isPasswordEmpty}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
									value={password}
									onChange={event => {setPassword(event.target.value); setIsPasswordEmpty(false);}}
                                />
                            </Grid>
                            <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" />
                        </Grid>
				<Box display="flex" justifyContent="space-between">
					<Button type="submit" variant="contained" class="button" onClick={() => handleSubmit()}>Log in</Button>
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


