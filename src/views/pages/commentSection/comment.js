import React from 'react';
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

// const useStyles = makeStyles({
//     root: {
//         minWidth: 275,
//     },
// });

export const Comment = ({ commentInfo }) => {

    // const classes = useStyles();
    const { user, content, time } = commentInfo;

    return (
        <Grid container>
            <Grid item xs={12} md={2}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <AccountCircleIcon color="primary" fontSize="large"/>
                </Box>
            </Grid>
            <Grid item xs={12} md={10}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" color="secondary">
                        {user}
                    </Typography>
                    <Typography variant="caption" color={"textSecondary"}>
                        {time}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="p" color={"textPrimary"}>
                        {content}
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton>
                            <EditIcon color="primary"/>
                        </IconButton>
                        <IconButton>
                            <DeleteIcon color="secondary"/>
                        </IconButton>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}