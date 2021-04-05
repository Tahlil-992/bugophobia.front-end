import React, { useEffect, useState } from 'react';
import "../../style.css";
import User_photo from "../../assets/images/User_photo.png";
import Password_photo from "../../assets/images/Password_photo.png";
import email_photo from "../../assets/images/email_photo.png";
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
import { IconButton } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const callSignUPAPI = async ({ username, password, email }) => {
  try {
    const response = await axios({
      url: "/auth/register/",
      method: "POST",
      baseURL: "http://localhost:8000",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
        password,
        email
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

const emailRegex = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const userNameRegex = RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
const passwordRegex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

export default function SignUp() {

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

  const checkEmail = () => {
    const res = emailRegex.test(email)
    console.log("email:"+res);
    setIsEmailValid(res);
    console.log("m:"+message);
    if (message === "" || message === null || message === undefined) {
      if (!res)
        setMessage("Invalid pattern for email!");
    }
  }

  const checkUsername = () => {
    const res = userNameRegex.test(username);
    setIsUsernameValid(res);
    if (message === "" || message === null || message === undefined) {
      if (!res)
        setMessage("Invalid pattern for username!");
    }
  }

  const checkPassword = () => {
    const res = passwordRegex.test(password);
    setIsPasswordValid(res);
    if (message === "" || message === null || message === undefined) {
      if (!res)
        setMessage("Invalid pattern for password!");
    }
  }

  const checkConfigPass = () => {
    const res = (configPass === password);
    setIsConfigPassValid(res);
    if (message === "" || message === null || message === undefined) {
      if (!res)
        setMessage("Enter the password again!");
    }
  }

  const validateInputs = () => {
    checkEmail();
    checkUsername();
    checkPassword();
    checkConfigPass();
    if (isEmailValid && isUsernameValid && ispasswordValid && isConfigPassValid)
      return true;
    return false;
  }

  const handleSubmit = () => {
    const res = validateInputs();
    console.log("res" + res);
    if (!res) {
      setPassword("");
      setConfigPass("");
      setIsPasswordValid(false);
      setIsConfigPassValid(false);
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
      const response = await callSignUPAPI({ username, password, email });
      if (response.status === 201) {
        setOpenSnackBar(false);
        history.replace("/");
      }
    }
    catch {
      setPassword("");
      setConfigPass("");
      setIsPasswordValid(false);
      setIsConfigPassValid(false);
      setOpenSnackBar(true);
      setMessage("Something went wrong while trying to create your account. Your email or username might already exist!");
    }
  }

  useEffect(() => {
    if (onSubmit) {
      console.log(isLoading)
      callAPI();
      setIsLoading(false);
      console.log(isLoading);
      setOnSubmit(false);
    }

  }, [onSubmit]);

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Typography component="h1" variant="h5" style={{ color: "white" }}>SignUp Form</Typography>
          <div class="form">
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
                  error={!isEmailValid}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>
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
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                />
              </Grid>
              <Grid container spacing={0}>
                <Grid>
                  <img src={Password_photo} className="photo" alt="Password_photo" />
                </Grid>
                <Grid>
                  <label className="brtop">enter your password twice :</label>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!(ispasswordValid && isConfigPassValid)}
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
                  helperText={<><Typography variant="caption" display="block">
                    {`*Password must include lower and uppercase letters and numbers.\n`}</Typography>
                    <Typography variant="caption">
                      {`*Symbols are optional.`}</Typography></>}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={!(ispasswordValid && isConfigPassValid)}
                  variant="outlined"
                  required
                  fullWidth
                  name="Rpassword"
                  label="Repeat Password"
                  type="password"
                  id="Rpassword"
                  autoComplete="current-password"
                  value={configPass}
                  onChange={event => setConfigPass(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" class="button" onClick={() => handleSubmit()}>Sign Up</Button>
            <Grid>
              <Grid item>
                <Link to="/">Already have an account? log in</Link>
              </Grid>
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
            <IconButton anchorOrigin={{vertical: 'top', horizontal:'center'}}>
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