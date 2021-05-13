import React from 'react';
import "../../style.css";
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles, withStyles, } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

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
        padding: '1em 4em 1em 4em',
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
            width: '100%',
            marginLeft: '0%',
            marginRight: '0%',
            backgroundColor: "#f3f3f3",
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

    const [oldPassword, setOldPassword] = [props.oldPassword, props.setOldPassword]
    const [newPassword, setNewPassword] = [props.newPassword, props.setNewPassword]
    const [newPasswordConfirm, setNewPasswordConfirm] = [props.newPasswordConfirm, props.setNewPasswordConfirm]

    const classes = useStyles();

    return (
        <Grid container spacing={3} alignItems="center" justify="center" style={{marginTop: '1em'}}>
            <Grid item className={classes.textfieldgrid}>
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label="Old Password"
                    type="password"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" > <LockOpenIcon/> </InputAdornment>),
                        classes: { root: classes.dis }
                    }}
                />
            </Grid>
            <Grid item className={classes.textfieldgrid}>
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label="New Password"
                    type="password"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" ><LockIcon /> </InputAdornment>),
                        classes: { root: classes.dis }
                    }}
                />
            </Grid>
            <Grid item className={classes.textfieldgrid}>
                <MyTextField
                    variant="outlined"
                    className={classes.textfield}
                    label="Confirm New Password"
                    type="password"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start" ><LockIcon /> </InputAdornment>),
                        classes: { root: classes.dis }
                    }}
                />
            </Grid>
            <Grid item>
                <Button className={classes.button}>Change Your Password</Button>
            </Grid>
        </Grid>
    );
}