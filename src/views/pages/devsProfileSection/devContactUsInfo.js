import React from "react";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(() => ({
    cardMedia: {
        height: '2em',
        width: '2em',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        margin: "0.2em 0",
        border: '3px solid #ebebeb',
    },
})) 

const DevInfo = ({picture, name, role}) => {
    const classes = useStyles();
    return (
        <Box display="flex" alignItems="center">
            <Avatar className={classes.cardMedia} src={picture}/>
            <Box marginLeft="1em">
                <Typography variant={"subtitle2"} style={{lineHeight: "1em"}}>
                    {name}
                </Typography>
                <Typography variant={"caption"} style={{lineHeight: "1em", color: "gray"}}>
                    {role}
                </Typography>
            </Box>
        </Box>
    );
}

export default DevInfo;