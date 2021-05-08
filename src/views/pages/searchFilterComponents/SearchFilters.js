import React, { useState, useEffect } from "react";
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
import Button from "@material-ui/core/Button";
import { Pagination } from "../../../core/modules/pagination";

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

export const SearchFiltersFragment = ({ setOnFilters, page, pageCount }) => {
    const classes = useStyles();
    const [onExpand, setOnExpand] = useState(false);

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
        let filters = {};
        if (usernameSearchValue !== "")
            filters = {...filters, q: usernameSearchValue};
        if (genderSearchValue !== "")
            filters = {...filters, gender: genderSearchValue};
        if (citySearchValue !== "")
            filters = {...filters, city: citySearchValue};
        if (specialtySearchValue !== "")
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

    return (
        <>
        <Container maxWidth="lg" className={classes.container}>
            <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderRadius: "50px" }}>
                <Grid container>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
                    <Collapse in={onExpand} timeout="auto" unmountOnExit>
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
                                    <OutlinedInput id="specialty-search-input" value={specialtySearchValue} onChange={(event) => setSpecialtySearchValue(event.target.value)} variant={"standard"} className={classes.inputEmpty}/>
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
                            <Grid item xs={6} md={2}>
                                {filterParams !== null && <Box display="flex" minHeight="100%" maxHeight="100%" justifyContent="center" paddingTop="2em" paddingBottom="1em">
                                    <Pagination
                                        page={page}
                                        pageCount={pageCount}
                                        onBackwardFirstPage={() => setFilterParams({...filterParams, page: 1})}
                                        onBackwardPage={() => setFilterParams({...filterParams, page: page - 1})}
                                        onForwardLastPage={() => setFilterParams({...filterParams, page: pageCount})}
                                        onForwardPage={() => setFilterParams({...filterParams, page: page + 1})}/>                                    
                                </Box>}
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Box display="flex" minHeight="100%" maxHeight="100%" justifyContent="space-evenly" paddingTop="2em" paddingBottom="1em">
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
                        </Grid>
                        </Grid>
                    </Container>
                    </Collapse>
                    </Grid>

                </Grid>
            </div>
        </Container>
        </>
    );
}