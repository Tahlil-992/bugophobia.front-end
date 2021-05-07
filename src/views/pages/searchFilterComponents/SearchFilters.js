import React, { useState } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        // display: 'flex',
        // overflow: 'auto',
        // flexDirection: 'column',
    },    
    formControl: {
        margin: theme.spacing(1),
        // minWidth: 120,
    },
    inputEmpty: {
        marginTop: theme.spacing(1),
        backgroundColor: "#FFFFFF",
    },
}))

export const SearchFiltersFragment = () => {
    const classes = useStyles();
    const [onExpand, setOnExpand] = useState(false);

    return (
        <>
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderRadius: "50px" }}>
                <Grid container>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <Box display="flex" marginLeft="1.5em" alignItems="center">
                            <SearchIcon color="primary"/>
                            <Typography component="h2" variant="h6" color="primary">
                                Advanced Search
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" marginRight="1.5em">
                            <IconButton onClick={() => setOnExpand(!onExpand)}>
                                {!onExpand && <KeyboardArrowDownIcon color="primary"/>}
                                {onExpand && <KeyboardArrowUpIcon color="primary"/>}
                            </IconButton>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center">
                    <Collapse in={onExpand} timeout="auto" unmountOnExit>
                    <Container>
                        <Grid container>
                            <Grid item xs={6} md={3}>
                                <FormControl variant={"outlined"} className={classes.formControl}>
                                    <FormLabel variant="standard" id="username-search-input-label">Username</FormLabel>
                                    <OutlinedInput id="username-search-input" value={"value"} variant={"standard"} className={classes.inputEmpty}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <FormControl variant={"outlined"} className={classes.formControl}>
                                    <FormLabel variant="standard" id="specialty-search-input-label">Specialty</FormLabel>
                                    <OutlinedInput id="specialty-search-input" value={"value"} variant={"standard"} className={classes.inputEmpty}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <FormControl variant={"outlined"} className={classes.formControl}>
                                    <FormLabel variant="standard" id="city-search-input-label">City</FormLabel>
                                    <OutlinedInput id="city-search-input" value={"value"} variant={"standard"} className={classes.inputEmpty}/>
                                </FormControl>
                            </Grid>    
                            <Grid item xs={6} md={3}>
                                <FormControl variant={"outlined"} className={classes.formControl}>
                                    <FormLabel variant="standard" id="gender-search-select-label">Gender</FormLabel>
                                    <Select
                                        labelId="gender-search-select-label"
                                        id="gender-search-select"
                                        value={"10"}
                                        className={classes.inputEmpty}
                                        native
                                        defaultValue={""}
                                        >
                                        <option value="">{""}</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </Select>
                                </FormControl>
                            </Grid>                                                    
                        </Grid>
                    </Container>
                    </Collapse>
                    </Box>
                </Grid>
            </div>
        </Container>
        </>
    );
}