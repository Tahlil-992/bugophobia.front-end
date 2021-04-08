import React from 'react';
import "../../style.css";
import Password_photo from "../../assets/images/Password_photo.png";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";

export default function ForgetPass() {
    return (
        <Box>
            <Container component="main" maxWidth="xs">
                <div class="paper">
                    <Typography component="h1" variant="h5" style={{ color: "white" }}>Forget Password Form</Typography>
                    <div className="form">
                        <Grid container spacing={2}>
                            <Grid>
                                <label className="brtop">
                                    Hey,<br />
                                    We have sent a password to your email.<br />
                                    please check your mailbox,<br />
                                    and use that password for logging in.<br /><br />
                                </label>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid>
                                    <img src={Password_photo} className="photo" alt="Password_photo" />
                                </Grid>
                                <Grid>
                                    <label className="brtop">enter the password we've sent to you :</label>
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
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" class="button" >Submit</Button>
                        <Grid>
                            <Link to="/">back to login form</Link>
                        </Grid>
                    </div>
                </div>
            </Container>
        </Box>
    );
}