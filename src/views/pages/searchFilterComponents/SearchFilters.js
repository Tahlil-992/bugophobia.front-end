import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
    container: {
        // paddingTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        // display: 'flex',
        // overflow: 'auto',
        // flexDirection: 'column',
    },    
    formControl: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        // minWidth: 120,
    },
    inputEmpty: {
        // marginTop: theme.spacing(1),
        backgroundColor: "#FFFFFF",
    },
    submitButton: {
        textTransform: "none",
        color: "white",
        backgroundColor: "#2aac3d",
        "&:hover": {
            backgroundColor: "#139122",
        },
    },
    resetButton: {
        textTransform: "none",
    },
}))

export const SearchFiltersFragment = ({ anchorEl, setOnFilters, open, setOpen }) => {
    const classes = useStyles();
    const [onExpand, setOnExpand] = useState(false);

    useEffect(() => {
        setOnExpand(open);
    }, [open])

    const [anchor, setAnchor] = useState(null);

    useEffect(() => {
        if (anchorEl && anchorEl.current) {
            setAnchor(anchorEl.current.getBoundingClientRect());
        }
    }, [anchorEl])

    useEffect(() => {
        console.log("anchor");
        console.log(anchor);
    }, [anchor])

    const [usernameSearchValue, setUsernameSearchValue] = useState("");
    const [genderSearchValue, setGenderSearchValue] = useState("");
    const [citySearchValue, setCitySearchValue] = useState("");
    const [specialtySearchValue, setSpecialtySearchValue] = useState("");
    
    const [filterParams, setFilterParams] = useState(null);

    useEffect(() => {
        if (filterParams !== null) {
            setOnFilters(filterParams);
        }
        else {
            setOnFilters(null);
        }
    }, [filterParams])

    const specializations = [
        'Cardiologist',
        'Dermatologist',
        'General Practitioner',
        'Gynecologist',
        'Internist',
        'Neurologist',
        'Obstetrician',
        'Ophthalmologist',
        'Otolaryngologist',
        'Pediatrician',
        'Psychiatrist',
        'Urologist',
    ]

    const specializationMap = (spec) => {
        switch (spec) {
            case 'Cardiologist': return 'C';
            case 'Dermatologist': return 'D';
            case 'General Practitioner': return 'G';
            case 'Gynecologist': return 'GY';
            case 'Internist': return 'I';
            case 'Neurologist': return 'N';
            case 'Obstetrician': return 'O';
            case 'Ophthalmologist': return 'OP';
            case 'Otolaryngologist': return 'OT';
            case 'Pediatrician': return 'P';
            case 'Psychiatrist': return 'PS';
            case 'Urologist': return 'U';
            default : return '';
        }
    }

    const handleSearchButton = () => {
        let filters = null;
        if (usernameSearchValue)
            filters = {...filters, q: usernameSearchValue};
        if (genderSearchValue)
            filters = {...filters, gender: genderSearchValue};
        if (citySearchValue)
            filters = {...filters, city: citySearchValue};
        if (specialtySearchValue)
            filters = {...filters, specialization: specializationMap(specialtySearchValue)};
        setFilterParams(filters)
    }

    const handleResetButton = () => {
        setUsernameSearchValue("");
        setGenderSearchValue("");
        setCitySearchValue("");
        setSpecialtySearchValue("");
        setFilterParams(null);
    }

    const handleClosePopper = () => {
        handleResetButton();
        setOpen(false);
    }

    return (
        <Box style={{display: "flex", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", zIndex: 12, ...anchor}}>
        <Collapse in={onExpand} timeout="auto" unmountOnExit>
        
        {/* // <Popper style={{zIndex: 12}} open={onExpand} role={undefined} anchorEl={anchorEl !== null ? anchorEl.current : null} transition disablePortal>
        // {({ TransitionProps, placement }) => ( */}
        {/* // <Grow */}
        {/* // {...TransitionProps}
        // style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        // > */}
            <Container style={{paddingTop: 0, paddingLeft: 0}} maxWidth="md" className={classes.container}>
                <Paper className={classes.paper} elevation={3} style={{ backgroundColor: 'whitesmoke', borderRadius: "0 0 10px 0", padding: "1em 0" }}>
                    {/* <Grid container> */}
                        {/* <Grid item xs={12}> */}
                        
                        <Container style={{padding: "0 1em"}}>
                            {/* <Grid container> */}
                            <Grid container item xs={12}>
                                <Grid item xs={6} md={2}>
                                    <FormControl variant={"outlined"} className={classes.formControl}>
                                        <InputLabel id="username-search-input-label">Username</InputLabel>
                                        <OutlinedInput label="Username" variant="outlined" id="username-search-input" value={usernameSearchValue} onChange={(event) => setUsernameSearchValue(event.target.value)} variant={"standard"} className={classes.inputEmpty}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <FormControl variant={"outlined"} className={classes.formControl}>
                                        <InputLabel id="specialty-search-input-label">Specialty</InputLabel>
                                        <Select
                                            labelId="specialty-search-select-label"
                                            id="specialty-search-select"
                                            value={specialtySearchValue}
                                            onChange={(event) => setSpecialtySearchValue(event.target.value)}
                                            className={classes.inputEmpty}
                                            native
                                            label="Specialty"
                                            variant="outlined"
                                            >
                                            <option value="">{""}</option>
                                            {specializations.map((spec) => {
                                                return (
                                                    <option value={spec}>{spec}</option>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <FormControl variant={"outlined"} className={classes.formControl}>
                                        <InputLabel id="city-search-input-label">City</InputLabel>
                                        <OutlinedInput label="city" variant="outlined" id="city-search-input" value={citySearchValue} onChange={(event) => setCitySearchValue(event.target.value)} variant={"standard"} className={classes.inputEmpty}/>
                                    </FormControl>
                                </Grid>    
                                <Grid item xs={6} md={2}>
                                    <FormControl variant={"outlined"} className={classes.formControl}>
                                        <InputLabel id="gender-search-select-label">Gender</InputLabel>
                                        <Select
                                            labelId="gender-search-select-label"
                                            id="gender-search-select"
                                            value={genderSearchValue}
                                            onChange={(event) => setGenderSearchValue(event.target.value)}
                                            className={classes.inputEmpty}
                                            native
                                            label="Gender"
                                            variant="outlined"
                                            >
                                            <option value="">{""}</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </Select>
                                    </FormControl>
                                </Grid>   
                                <Grid item xs={6} md={3}>
                                    <Box display="flex" justifyContent="center" height="100%">
                                    <Button className={classes.submitButton} style={{margin: "0.5em 0"}} variant="text" onClick={handleSearchButton}>
                                        Search    
                                    </Button>
                                    {/* </Box>
                                    <Box>   */}
                                    <Button className={classes.resetButton} style={{margin: "0.5em 0"}} variant="contained" onClick={handleResetButton} color="primary" disableElevation>
                                        Reset    
                                    </Button>
                                    </Box>   
                                </Grid>
                                <Grid item xs={6} md={1}>
                                    <Box display="flex" justifyContent="center" height="100%">
                                        <IconButton onClick={handleClosePopper}>
                                            <CloseIcon style={{ color: "#611a15" }} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            {/* </Grid> */}
                        </Container>
                        
                        {/* </Grid> */}

                    {/* </Grid> */}
                </Paper>
            </Container>
        {/* // </Grow>)} */}
        {/* // </Popper> */}
        
        </Collapse>
        </Box>
    );
}