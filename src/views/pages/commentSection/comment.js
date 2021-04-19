import React, { useEffect, useState } from 'react';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const Comment = ({ commentInfo }) => {

    // const classes = useStyles();
    const { comment_text, created, id, patient } = commentInfo;

    const [current_date] = useState(new Date());
    const [created_date] = useState({
        year: created.split("T")[0].split("-")[0],
        month: created.split("T")[0].split("-")[1],
        day: created.split("T")[0].split("-")[2]
    })

    const day_postfix = (day) => {
        switch (day) {
            case "1":
                return "st";
            case "2":
                return "nd";
            case "3":
                return "rd";
            default:
                return "th";
        }
    }

    const isToday = (current, created) => {
        if (Number(created.year) === current.getFullYear()
            && Number(created.month) === current.getMonth() + 1
            && Number(created.day) === current.getDate())
            return true;
        return false;
    }

    return (
        <Grid container>
            <Grid item xs={12} md={2}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <AccountCircleIcon color="primary" fontSize="large" />
                </Box>
            </Grid>
            <Grid item xs={12} md={10}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"} color="secondary">
                        {patient.user.username}
                    </Typography>
                    <Typography variant="caption" color={"textSecondary"}>
                        {!isToday(current_date, created_date) ? months[Number(created_date.month) - 1] + " " + created_date.day + day_postfix(created_date.day)
                            + ((Number(created_date.year) === current_date.getFullYear() ? "" : ", " + created_date.year)) :
                            "Today"}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant={"body2"} color={"textPrimary"}>
                        {comment_text}
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton>
                            <EditIcon color="primary" />
                        </IconButton>
                        <IconButton>
                            <DeleteIcon color="secondary" />
                        </IconButton>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}