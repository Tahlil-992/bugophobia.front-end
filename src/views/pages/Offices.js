import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, makeStyles, Paper, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TitleIcon from '@material-ui/icons/Title';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Calendar, momentLocalizer, Views, dateFnsLocalizer } from 'react-big-calendar';
import moment from 'moment';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "../../style.css";
import Popper from '@material-ui/core/Popper';

const locales = {
    'en-US': require('date-fns/locale/en-US'),
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        padding: '1em',
        backgroundColor: '#f6f6f6',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(36, 36, 128, 1)',
            boxShadow: '0px 10px 10px rgba(36, 36, 128, 0.5)',
            transition: 'all 0.3s ease',
            color: '#fff',
        },
    },
    pluspaper: {
        width: '100%',
        padding: '1em',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(36, 128, 36, 1)',
            boxShadow: '0px 10px 10px rgba(36, 128, 36, 0.5)',
            transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
            color: '#fff',
        },
    },
    title: {
        fontSize: 15,
        fontWeight: 500,
    },
    text: {
        fontSize: 13,
        fontWeight: 400,
    },
    subtext: {
        fontSize: 10,
        //fontWeight: 300,
    },
    button: {
        width: '40%',
        marginLeft: '5%',
        marginRight: '5%',
        fontSize: 12,
    },
    buttongrid: {
        width: '40%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    addicon: {
        width: '1em',
        height: '1em',
        //margin: '30%',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    officegrid: {
        width: '100%',
        marginLeft: '0%',
        marginRight: '0%',
    },
    backicon: {
        marginBottom: '0.5em',
        backgroundColor: 'rgba(36, 36, 128, 0.3)',
        position: 'sticky',
        top: '0%',
        alignSelf: 'flex-start',
        '&:hover': {
            backgroundColor: 'rgba(36, 36, 128, 1)',
            boxShadow: '0px 0px 20px rgba(36, 36, 128, 1)',
            color: '#fff',
        },
    },
    doneicon: {
        marginBottom: '0.5em',
        backgroundColor: 'rgba(36, 128, 36, 0.3)',
        position: 'sticky',
        top: '0%',
        '&:hover': {
            backgroundColor: 'rgba(36, 128, 36, 1)',
            boxShadow: '0px 0px 20px rgba(36, 128, 36, 1)',
            color: '#fff',
        },
    },
    cancelicon: {
        marginBottom: '0.5em',
        backgroundColor: 'rgba(128, 36, 36, 0.3)',
        position: 'sticky',
        top: '0%',
        '&:hover': {
            backgroundColor: 'rgba(128, 36, 36, 1)',
            boxShadow: '0px 0px 20px rgba(128, 36, 36, 1)',
            color: '#fff',
        },
    },
    sidebar: {
        borderRight: '1px solid #aaa',
        marginRight: '1em',
    },
    textfield: {
        width: '100%',
        marginLeft: "0%",
        marginRight: '0%',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f3f3f3",
            transition: 'all 0s, width 0s',
        },
    },
    textarea: {
        maxWidth: '100%',
        minWidth: '100%',
        maxHeight: '16em',
        minHeight: '8em',
        borderRadius: '3px',
        marginLeft: '0%',
        marginRight: '0%',
        backgroundColor: 'inherit',
        transition: 'all 0.15s linear',
        '&:hover': {
            backgroundColor: "#f3f3f3",
            transition: 'all 0s, width 0s',
        },
    },
    container: {
        paddingTop: theme.spacing(4),
    },     
    popover: {
        pointerEvents: 'none',
        //transition: 'all 0.01s ease',
        position: 'absolute',
        top: '0em',
    },
    popoverpaper: {
        padding: '0.5em 1em',
        //transition: 'all 0.3s ease',
    },
    arrow: {
        backgroundColor: '#fff',
        position: 'absolute',
        transform: 'rotate(45deg)',
        top: '-1em',
        width: '2em',
        height: '2em',
        fontSize: '7px',
    },
}));

export default function Offices() {

    const classes = useStyles();

    const [offices, setOffices] = useState([]);

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNos, setPhoneNos] = useState([]);
    
    const [isChanged, setIsChanged] = useState(false);
    
    const [paperElav, setPaperElav] = useState(-1);
    const [officeIndex, setOfficeIndex] = useState(-1);

    const [autoFocus, setAutoFocus] = useState(false);

    const localizer = momentLocalizer(moment);
    const minTime = new Date();
    minTime.setHours(6,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,30,0);

    const [anchorEl, setAnchorEl] = useState(null);
    const [arrowRef, setArrowRef] = useState(null);
    const [popperText, setPopperText] = useState('');
    const popoverOpen = Boolean(anchorEl);

    const handlePopoverOpen = (event, text) => {
        setAnchorEl(event.currentTarget);
        setPopperText(text);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleArrowRef = node => (
        setArrowRef(node)
    );

    const addOffice = () => {
        const index = offices.length;
        var newOffices = offices;
        newOffices.push(['Office ' + (index+1), '', ['']]);
        setOffices(newOffices);
        goToOffice(index);
    };

    const removeOffice = (index) => {
        if (index === -1) {
            setOffices([]);
            setPaperElav(1);
            handlePopoverClose();
        }
        else {
            let newOffices = offices;
            newOffices.splice(index, 1);
            setOffices(newOffices);
            setPaperElav(offices.length + 1);
        }
    };

    const goToOffice = (index) => {
        setTitle(offices[index][0]);
        setAddress(offices[index][1]);
        setPhoneNos(offices[index][2]);
        setOfficeIndex(index);
    };

    const saveChanges = () => {
        var newOffices = offices;
        if (!title) {
            newOffices[officeIndex][0] = 'Office ' + (officeIndex+1);
            setTitle('Office ' + (officeIndex+1));
        }
        else {
            newOffices[officeIndex][0] = title;
        }
        newOffices[officeIndex][1] = address;
        newOffices[officeIndex][2] = phoneNos;
        setOffices(newOffices);
        setIsChanged(false);
        setAutoFocus(false);
        setPaperElav(paperElav+1);
    };

    const cancelChanges = () => {
        setTitle(offices[officeIndex][0]);
        setAddress(offices[officeIndex][1]);
        setPhoneNos(offices[officeIndex][2]);
        setIsChanged(false);
        setAutoFocus(false);
        setPaperElav(paperElav+1);
    };

    const backToList = () => {
        setIsChanged(false);
        setAutoFocus(false);
        setPaperElav(-1);
        setOfficeIndex(-1);
        handlePopoverClose();
    };

    const changePhone = (index, phone) => {
        var newPhone = [...phoneNos];
        newPhone[index] = phone;
        setPhoneNos(newPhone);
        setIsChanged(true);
        setPaperElav(paperElav+1);
    };

    const addPhone = () => {
        var newPhone = [...phoneNos];
        newPhone.push('');
        setPhoneNos(newPhone);
        setIsChanged(true);
        setAutoFocus(true);
        setPaperElav(paperElav+1);
    };

    const removePhone = (index) => {
        let newPhone = phoneNos;
        if (index > -1) {
            newPhone.splice(index, 1);
          }
        setPhoneNos(newPhone);
        setIsChanged(true);
        setAutoFocus(false);
        setPaperElav(paperElav+1);
    };

    return ( officeIndex === -1 ? 
        <Grid container direction='row' justify='center' alignItems='center'>
            {offices.map((office, index) => (
                <>
                    <Grid item xs={11} style={{padding: '0.5em 1em'}}>
                        <Button  style={{padding: '0em', margin: '0em 0em', textTransform: 'none', width: '100%'}} onClick={() => goToOffice(index)} key={index}>
                            <Paper className={classes.paper} 
                                onMouseEnter={() => setPaperElav(index)}
                                onMouseLeave={() => setPaperElav(-1)}
                                elevation={paperElav === index ? 10 : 1}
                            >
                                <Typography className={classes.title} align='center'>{office[0]}</Typography>
                            </Paper>
                        </Button>
                    </Grid>
                    <Grid item xs container justify='center' alignItems='center'>
                        <IconButton 
                            onClick={() => removeOffice(index)} 
                            onMouseEnter={(event) => handlePopoverOpen(event, 'Remove "' + offices[index][0] + '"')}
                            onMouseLeave={handlePopoverClose}
                            >
                                <DeleteIcon />
                        </IconButton>
                    </Grid>
                </>
            ))}
            <Grid item xs={11} style={{padding: '0.5em 1em'}} className={classes.officegrid}>
                <Button style={{padding: '0em', margin: '0em 0em', width: '100%', textTransform: 'none'}} onClick={addOffice}>
                    <Paper className={classes.pluspaper} 
                        onMouseEnter={() => setPaperElav(offices.length)}
                        onMouseLeave={() => setPaperElav(-1)}
                        elevation={paperElav === offices.length ? 10 : 1}
                    >
                        <Typography className={classes.title} align='center'>
                            {paperElav === offices.length ? '+ Add a new office' : '+'}
                        </Typography>
                    </Paper>
                </Button>
            </Grid>
            <Grid item xs container justify='center' alignItems='center'>
                <IconButton 
                    onClick={() => removeOffice(-1)}
                    onMouseEnter={(event) => handlePopoverOpen(event, 'Remove All')}
                    onMouseLeave={handlePopoverClose}
                    disabled={offices.length === 0}
                    >
                        <DeleteForeverIcon />
                </IconButton>
            </Grid>
            <Popper
                id="mouse-over-popover"
                className={classes.popover}
                placement='bottom-start'
                transition
                modifiers={{
                    arrow: {
                        enable: true,
                        element: arrowRef,
                    }
                }}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                >
                    {
                        true &&
                        <span className={classes.arrow} ref={handleArrowRef} />
                    }
                    <Paper elevation={5} className={classes.popoverpaper}>
                        <Typography className={classes.text}>{popperText}</Typography>
                    </Paper>
            </Popper>
        </Grid>
        
        :
        <Grid container  spacing={1} direction='row' className={classes.officegrid}>
            <Grid item xs={1} container direction='column' className={classes.sidebar}>
                <IconButton 
                    onClick={backToList} 
                    className={classes.backicon}
                    onMouseEnter={(event) => handlePopoverOpen(event, 'Back')}
                    onMouseLeave={handlePopoverClose}
                    >
                        <ArrowBackIcon />
                </IconButton>
                <IconButton 
                    onClick={saveChanges} 
                    className={classes.doneicon} 
                    disabled={!isChanged}
                    onMouseEnter={(event) => handlePopoverOpen(event, 'Save changes')}
                    onMouseLeave={handlePopoverClose}
                    >
                        <DoneIcon />
                </IconButton>
                <IconButton 
                    onClick={cancelChanges} 
                    className={classes.cancelicon} 
                    disabled={!isChanged}
                    onMouseEnter={(event) => handlePopoverOpen(event, 'Cancel changes')}
                    onMouseLeave={handlePopoverClose}
                    >
                        <ClearIcon />
                </IconButton>
            </Grid>
            <Grid item xs={11} container direction='row' spacing={2} style={{marginTop: '0em'}}> 
                <Grid item xs={12} style={{ textAlign: 'center',  }} inputProps={{min: 0, style: { textAlign: 'center',  }}}>
                    <Box >
                        <TextField
                            variant='outlined'
                            value={title}
                            label='Title'
                            fullWidth
                            autoFocus={false}
                            className={classes.textfield}
                            inputProps={{
                                style: { textAlign: 'center', fontSize: 15 },
                                startAdornment: (<InputAdornment position="start"> <TitleIcon/> </InputAdornment>),
                            }}
                            onChange={(event) => {setTitle(event.target.value); setIsChanged(true);}}
                            />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Typography className={classes.text} align='left'>Address:</Typography>
                        <TextareaAutosize
                            value={address}
                            label='Address'
                            className={classes.textarea}
                            onChange={(event) => {setAddress(event.target.value); setIsChanged(true);}}
                            />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box onMouseLeave={handlePopoverClose}>
                        <Typography className={classes.text} align='left'>Phone Numbers:</Typography>
                        {phoneNos.map((phone, index) => (
                            <Box display='flex' alignItems='center'>
                                <TextField
                                    variant='outlined'
                                    value={phone}
                                    fullWidth
                                    autoFocus={autoFocus}
                                    className={classes.textfield}
                                    inputProps={{ startAdornment: (<InputAdornment position="start" > {<PhoneAndroidIcon/> }</InputAdornment>), style: { textAlign: 'left', fontSize: 12, marginLeft: '1em' },}}
                                    onChange={(event) => changePhone(index, event.target.value)}
                                    />
                                <IconButton  
                                    style={{marginLeft: '0.0em'}} 
                                    onClick={() => removePhone(index)} 
                                    disabled={phoneNos.length === 1}
                                    onMouseEnter={(event) => handlePopoverOpen(event, 'Remove this phone number')}
                                    onMouseLeave={handlePopoverClose}
                                    >
                                        <RemoveIcon fontSize='small' color={phoneNos.length === 1 ? 'disabled' : 'secondary'} />
                                </IconButton>
                            </Box>
                        ))}
                        <IconButton 
                            onClick={addPhone}
                            onMouseEnter={(event) => handlePopoverOpen(event, 'Add a phone number')}
                            onMouseLeave={handlePopoverClose}
                            >
                                <AddIcon fontSize='small' color='primary' />
                        </IconButton>
                    </Box>
                </Grid>
                <hr width='100%' style={{marginBottom: '1px'}}/>
                <hr width='100%' style={{marginTop: '1px'}}/>
                <Grid item xs={12} className={classes.container}>
                    <Calendar style={{ height : '37rem' }}
                        localizer={localizer}
                        events={[
                            {
                                'title': 'visit 1',
                                'allDay': false,
                                'start': new Date(2021, 4, 19, 10, 0),
                                'end': new Date(2021, 4, 19, 11, 0),
                            },
                            {
                                'title': 'visit 2',
                                'allDay': false,
                                'start': new Date(2021, 4, 19, 18, 0),
                                'end': new Date(2021, 4, 19, 18, 45),
                            },
                            {
                                'title': 'visit 3',
                                'allDay': false,
                                'start': new Date(2021, 4, 21, 17, 0),
                                'end': new Date(2021, 4, 21, 17, 30),
                            },
                        ]}
                        step={60}
                        showMultiDayTimes
                        min={minTime}
                        max={maxTime} 
                        startAccessor="start"
                        endAccessor="end"
                    />
                </Grid>
            </Grid>
            <Popper
                id="mouse-over-popover"
                className={classes.popover}
                placement='bottom-start'
                transition
                modifiers={{
                    arrow: {
                        enable: true,
                        element: arrowRef,
                    }
                }}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                >
                    {
                        true &&
                        <span className={classes.arrow} ref={handleArrowRef} />
                    }
                    <Paper elevation={5} className={classes.popoverpaper}>
                        <Typography className={classes.text}>{popperText}</Typography>
                    </Paper>
            </Popper>
        </Grid>
    );
}