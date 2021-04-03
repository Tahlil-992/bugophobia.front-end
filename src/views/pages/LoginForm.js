import React from 'react';
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
import { Link } from "react-router-dom";

export default function LogIn() {
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
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="UserName"
                                    name="username"
                                    autoFocus
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
                            <FormControlLabel control={<Checkbox value="remember" />} label="Remember me" />
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" class="button" >Log in</Button>
                        <Grid>
                            <Link to="/forget-password">Forget password?</Link>
                        </Grid>
                        <Grid>
                            <Link to="/sign-up">Don't have an account? Sign Up</Link>
                        </Grid>
                    </div>
                </div>
            </Container>
        </Box>
    );
}