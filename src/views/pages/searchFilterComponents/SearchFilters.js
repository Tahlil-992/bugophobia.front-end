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
import { Pagination } from "../../../core/modules/pagination";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";

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
        // <Box style={{display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center", zIndex: 12, position: "absolute", ...anchor}}>
        <Popper style={{zIndex: 12}} open={onExpand} role={undefined} anchorEl={anchorEl !== null ? anchorEl.current : null} transition disablePortal>
        {({ TransitionProps, placement }) => (
        <Grow
        {...TransitionProps}
        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
            <Container style={{paddingTop: 0}} maxWidth="md" className={classes.container}>
                <Paper className={classes.paper} elevation={3} style={{ backgroundColor: 'rgba(224, 224, 224, 0.4)', borderRadius: "0 0 50px 50px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                        {/* <Collapse in={false} timeout="auto" unmountOnExit> */}
                        <Container>
                            <Grid container>
                            <Grid container item xs={12}>
                                <Grid item xs={6} md={2}>
                                    <FormControl variant={"outlined"} className={classes.formControl}>
                                        <FormLabel variant="standard" id="username-search-input-label">Username</FormLabel>
                                        <OutlinedInput id="username-search-input" value={usernameSearchValue} onChange={(event) => setUsernameSearchValue(event.target.value)} variant={"standard"} className={classes.inputEmpty}/>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                    <FormControl variant={"outlined"} className={classes.formControl}>
                                        <FormLabel variant="standard" id="specialty-search-input-label">Specialty</FormLabel>
                                        <Select
                                            labelId="specialty-search-select-label"
                                            id="specialty-search-select"
                                            value={specialtySearchValue}
                                            onChange={(event) => setSpecialtySearchValue(event.target.value)}
                                            className={classes.inputEmpty}
                                            native
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
                                        <FormLabel variant="standard" id="city-search-input-label">City</FormLabel>
                                        <OutlinedInput id="city-search-input" value={citySearchValue} onChange={(event) => setCitySearchValue(event.target.value)} variant={"standard"} className={classes.inputEmpty}/>
                                    </FormControl>
                                </Grid>    
                                <Grid item xs={6} md={2}>
                                    <FormControl variant={"outlined"} className={classes.formControl}>
                                        <FormLabel variant="standard" id="gender-search-select-label">Gender</FormLabel>
                                        <Select
                                            labelId="gender-search-select-label"
                                            id="gender-search-select"
                                            value={genderSearchValue}
                                            onChange={(event) => setGenderSearchValue(event.target.value)}
                                            className={classes.inputEmpty}
                                            native
                                            >
                                            <option value="">{""}</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </Select>
                                    </FormControl>
                                </Grid>   
                                <Grid item xs={6} md={3}>
                                    <Box display="flex" minHeight="100%" maxHeight="100%" justifyContent="flex-end" paddingTop="3em" paddingBottom="1em">
                                    <Button className={classes.submitButton} variant="text" onClick={handleSearchButton}>
                                        Search    
                                    </Button>
                                    {/* </Box>
                                    <Box>   */}
                                    <Button className={classes.resetButton} variant="contained" onClick={handleResetButton} color="primary" disableElevation>
                                        Reset    
                                    </Button>
                                    </Box>   
                                </Grid>
                                <Grid item xs={6} md={1}>
                                    <Box display="flex" minHeight="100%" maxHeight="100%" justifyContent="center" paddingTop="2.5em" paddingBottom="0.5em">
                                        <IconButton onClick={handleClosePopper}>
                                            <CloseIcon style={{ color: "#611a15" }} />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            </Grid>
                        </Container>
                        {/* </Collapse> */}
                        </Grid>

                    </Grid>
                </Paper>
            </Container>
        </Grow>)}
        </Popper>
        // </Box>
    );
}