import React from 'react';
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
import { Link } from "react-router-dom";

export default function SignUp() {
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
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
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
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  name="username"
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
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Rpassword"
                  label="Repeat Password"
                  type="password"
                  id="Rpassword"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" class="button">Sign Up</Button>
            <Grid>
              <Grid item>
                <Link to="/">Already have an account? log in</Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </Box>
  );
}