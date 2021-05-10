import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },    
    formControl: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        // paddingTop: "1em",
    },
    inputEmpty: {
        backgroundColor: "#FFFFFF",
    },
    submitButton: {
        textTransform: "none",
        backgroundColor: 'rgba(42, 172, 61, 0.6)',
        "&:hover": {
            backgroundColor: 'rgba(19, 145, 34, 0.7)',
        },
    },
    resetButton: {
        textTransform: "none",
        backgroundColor: "#bdc1c5",
        "&:hover": {
            backgroundColor: "#9099A1",
        },
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
        <Container maxWidth={false} disableGutters style={{minWidth: "100%"}}>
        <Collapse in={onExpand} timeout="auto" unmountOnExit>
            <Container disableGutters maxWidth={false}>
                <Paper className={classes.paper} elevation={3} style={{ backgroundColor: '#E0E0E0', borderRadius: "0", padding: "0" }}>   
                    <Container style={{padding: "0", marginRight: 0, paddingLeft: 0}}>
                        <Grid container item xs={12}>
                            <Grid item xs={6} md={2} style={{paddingTop: "1em"}}>
                                <FormControl variant={"outlined"} className={classes.formControl} size="small">
                                    <InputLabel id="username-search-input-label">Username</InputLabel>
                                    <OutlinedInput label="Username" variant="outlined" id="username-search-input" value={usernameSearchValue} onChange={(event) => setUsernameSearchValue(event.target.value)} className={classes.inputEmpty}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} md={2} style={{paddingTop: "1em"}}>
                                <FormControl variant={"outlined"} className={classes.formControl} size="small">
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
                            <Grid item xs={6} md={2} style={{paddingTop: "1em"}}>
                                <FormControl variant={"outlined"} className={classes.formControl} size="small">
                                    <InputLabel id="city-search-input-label">City</InputLabel>
                                    <OutlinedInput label="city" variant="outlined" id="city-search-input" value={citySearchValue} onChange={(event) => setCitySearchValue(event.target.value)} className={classes.inputEmpty} style={{padding: 0}}/>
                                </FormControl>
                            </Grid>    
                            <Grid item xs={6} md={2} style={{paddingTop: "1em"}}>
                                <FormControl variant={"outlined"} className={classes.formControl} size="small">
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
                            <Grid item xs={6} md={2}>
                                <Box display="flex" justifyContent="space-between" height="100%" style={{paddingTop: "1em"}}>
                                <Button className={classes.submitButton} style={{margin: "0 0 1em 0.6em"}} variant="text" onClick={handleSearchButton}>
                                    Search    
                                </Button>
                                <Button className={classes.resetButton} style={{margin: "0 0 1em 0"}} variant="contained" onClick={handleResetButton} disableElevation>
                                    Reset    
                                </Button>
                                </Box>   
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Box display="flex" justifyContent="flex-end" alignItems="flex-start">
                                    <IconButton onClick={handleClosePopper}>
                                        <CloseIcon style={{ color: "#611a15" }} />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Container>        
        </Collapse>
        </Container>
    );
}