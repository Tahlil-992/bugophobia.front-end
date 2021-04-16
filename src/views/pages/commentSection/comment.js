import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
});

export const Comment = ({ commentInfo }) => {

    // const classes = useStyles();
    const { user, content, time } = commentInfo;

    return (
        <Grid container>
            <Box flex={1} display="flex" alignItems="flex-start" justifyContent="center">
                <AccountCircleIcon/>
            </Box>
            <Box flex={9}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">
                        {user}
                    </Typography>
                    <Typography variant="caption">
                        {time}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="p">
                        {content}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
}