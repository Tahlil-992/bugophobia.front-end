import React, { useState } from 'react';
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

export default function ForgetPass() {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    return (
        <React.Fragment >
            <AppBar position="relative">
                <Toolbar style={{ backgroundColor: '#10217d', height: '5vh' }}>
                    <Link to="/"><Button style={{ color: 'white' }}><ArrowBackIcon /></Button></Link>
                    <Typography variant="h6" color="inherit" noWrap>Forget Password Page</Typography>
                </Toolbar>
            </AppBar>
            <Box style={{ display: 'flex', backgroundColor: '#E0E0E0', height: '690px', alignItems: 'center' }}>
                <Container component="main" maxWidth="xs">
                    <div class="paper">
                        <div className="form">
                            <Grid container spacing={2}>
                                <Grid>
                                    <label>
                                    Hey,<br />
                                    We have sent a password to your email.<br />
                                    please check your mailbox,<br />
                                    and use that password for logging in.<br /><br />
                                    </label>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        id="password"
                                        autoComplete="current-password"
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
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" class="button" >Submit</Button>
                            <Grid>
                                <Link class="link" to="/login">Back to login form</Link>
                            </Grid>
                        </div>
                    </div>
                </Container>
            </Box>
        </React.Fragment>
    );
}