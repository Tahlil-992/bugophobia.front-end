import React, { useState } from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import { Button, IconButton, makeStyles, withStyles, } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const MyTextField = withStyles({
    root: {
      "& .MuiInputBase-root.Mui-disabled": {
        color: "rgba(0, 0, 0, 1)" // (default alpha is 0.38)
      }
    }
})(TextField);

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#40bad5',
        border: '0px solid #10217d',
        padding: window.innerWidth<500 ? '1em 2.3em 1em 2.3em' : '1em 4em 1em 4em',
        margin: '1em 0em 1em 0em',
        textAlign: 'center',
        fontSize: '0.9em',
        borderRadius: '10px',
        textTransform: 'none',
        height: '45px',
        '&:hover': {
            backgroundColor: '#5f939a',
        },
    },
    textfield: {
        width: '94%',
        marginLeft: "3%",
        marginRight: '3%',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f9f9f9",
            transition: 'all 0s, width 0s',
        },
    },
    textfieldgrid: {
        width: "76%",
        minWidth: '16em',
        marginLeft: "12%",
        marginRight: '12%',
    },
    subtext: {
        fontSize: 11,
        color: "#222",
    },
    text: {
        fontSize: 15,
        color: "#000",
        fontWeight: 500,
    },
    poptext: {
        fontSize: 13,
        fontWeight: 700,
    },
}));

export default function About(props) {

    const [oldPassword, setOldPassword] = [props.oldPassword, props.setOldPassword];
    const [newPassword, setNewPassword] = [props.newPassword, props.setNewPassword];
    const [newPasswordConfirm, setNewPasswordConfirm] = [props.newPasswordConfirm, props.setNewPasswordConfirm];
    const oldPasswordError = props.oldPasswordError;
    const newPasswordError = props.newPasswordError;
    const newPasswordConfirmError = props.newPasswordConfirmError;
    const passhelper = props.passhelper;
    const callChangePassword = props.callChangePassword;

    const classes = useStyles();

    const [showPassword1, setShowPassword1] = useState(false);
    const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);

    const [showPassword2, setShowPassword2] = useState(false);
    const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);

    return (
        <Grid container spacing={3} alignItems="center" justify="center" style={{marginTop: '1em'}}>
            <Grid item className={classes.textfieldgrid}>
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    value={oldPassword}
                    label="Old Password"
                    type={showPassword1 ? "text" : "password"}
                    error={oldPasswordError}
                    onChange={(event) => setOldPassword(event.target.value)}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start"><LockOpenIcon /></InputAdornment>),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                >
                                    {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
            <Grid item className={classes.textfieldgrid}>
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    value={newPassword}
                    label="New Password"
                    type={showPassword2 ? "text" : "password"}
                    error={newPasswordError}
                    onChange={(event) => setNewPassword(event.target.value)}
                    helperText={passhelper}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                >
                                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
            <Grid item className={classes.textfieldgrid}>
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    value={newPasswordConfirm}
                    label="Confirm New Password"
                    type={showPassword2 ? "text" : "password"}
                    error={newPasswordConfirmError}
                    onChange={(event) => setNewPasswordConfirm(event.target.value)}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" ><LockIcon /> </InputAdornment>),
                        classes: { root: classes.dis }
                    }}
                />
            </Grid>
            <Grid item>
                <Button 
                    className={classes.button} 
                    onClick={callChangePassword}
                    disabled={!oldPassword}
                    >
                        Change Your Password
                    </Button>
            </Grid>
        </Grid>
    );
}