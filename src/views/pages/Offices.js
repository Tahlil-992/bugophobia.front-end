import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Button, Fade, Grid, IconButton, InputAdornment, makeStyles, Modal, Paper, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RemoveIcon from '@material-ui/icons/Remove';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

/*
<Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={open}
    onClose={modalClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
        timeout: 500,
    }}
>
    <Fade in={open}>
    <div className={classes.paper}>
        <h2 id="transition-modal-title">Transition modal</h2>
        <p id="transition-modal-description">react-transition-group animates me.</p>
    </div>
    </Fade>
</Modal>

<Paper className={classes.paper} 
onMouseEnter={() => setPaperElav(index)}
onMouseLeave={() => setPaperElav(-1)}
elevation={paperElav === index ? 10 : 1}
>
<Typography className={classes.title} align='center'>{office}</Typography>
<hr />
<Typography className={classes.text}>Phone Numbers</Typography>
<Typography className={classes.subtext}>- 09120001111</Typography>
<Typography className={classes.subtext}>- 09120002222</Typography>
<hr />
<Typography className={classes.text}>Address</Typography>
<Typography className={classes.subtext}>Tehran-Iran</Typography>
<hr />
<Grid container direction='row' justify='center' alignItems='center' width='100%'>
    <Button className={classes.button}>Edit</Button>
    <Button className={classes.button}>Delete</Button>
</Grid>
</Paper>
*/

const useStyles = makeStyles((theme) => ({
    paper: {
        //margin: '1em',
        padding: '1em',
        width: '16em',
        //height: '2em',
        //height: '12em',
        backgroundColor: '#f6f6f6',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#ffffff',
            transition: 'all 0.2s ease',
        },
    },
    pluspaper: {
        width: '16em',
        //height: '2em',
        padding: '1em',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(16, 16, 64, 0.2)',
            transition: 'all 0.2s ease',
        },
    },
    title: {
        fontSize: 15,
        fontWeight: 500,
    },
    text: {
        fontSize: 13,
        //fontWeight: 300,
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
        //padding: '0.3em',
        marginBottom: '0.5em',
        backgroundColor: 'rgba(36, 36, 128, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(36, 36, 128, 0.8)',
            boxShadow: '0px 0px 20px rgba(36, 36, 128, 0.8)',
            transition: 'all 0.3s ease',
            color: '#fff',
        },
    },
    doneicon: {
        //padding: '0.3em',
        marginBottom: '0.5em',
        backgroundColor: 'rgba(36, 128, 36, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(36, 128, 36, 0.8)',
            boxShadow: '0px 0px 20px rgba(36, 128, 36, 0.8)',
            transition: 'all 0.3s ease',
            color: '#fff',
        },
    },
    cancelicon: {
        //padding: '0.3em',
        marginBottom: '0.5em',
        backgroundColor: 'rgba(128, 36, 36, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(128, 36, 36, 0.8)',
            boxShadow: '0px 0px 20px rgba(128, 36, 36, 0.8)',
            transition: 'all 0.3s ease',
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
            width: '100%',
            marginLeft: '0%',
            marginRight: '0%',
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
            maxWidth: '100%',
            minWidth: '100%',
            maxHeight: '16em',
            minHeight: '8em',
            borderRadius: '3px',
            marginLeft: '0%',
            marginRight: '0%',
            backgroundColor: "#f3f3f3",
            transition: 'all 0s, width 0s',
        },
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
    const [open, setOpen] = useState(false);
    const [officeIndex, setOfficeIndex] = useState(-1);

    const modalOpen = () => {
        setOpen(true);
    };

    const modalClose = () => {
        setOpen(false);
    };

    const goToOffice = (index) => {
        setTitle(offices[index][0]);
        setAddress(offices[index][1]);
        setPhoneNos(offices[index][2]);
        setOfficeIndex(index);
    };

    const saveChanges = () => {
        var newOffices = offices;
        newOffices[officeIndex][0] = title;
        newOffices[officeIndex][1] = address;
        newOffices[officeIndex][2] = phoneNos;
        setOffices(newOffices);
        setIsChanged(false);
        setPaperElav(paperElav+1);
    };

    const cancelChanges = () => {
        setTitle(offices[officeIndex][0]);
        setAddress(offices[officeIndex][1]);
        setPhoneNos(offices[officeIndex][2]);
        setIsChanged(false);
        setPaperElav(paperElav+1);
    };

    const backToList = () => {
        setIsChanged(false);
        setPaperElav(-1);
        setOfficeIndex(-1);
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
        setPaperElav(paperElav+1);
    };

    const removePhone = (index) => {
        let newPhone = phoneNos;
        if (index > -1) {
            newPhone.splice(index, 1);
          }
        setPhoneNos(newPhone);
        setIsChanged(true);
        setPaperElav(paperElav+1);
    };

    const addOffice = () => {
        const index = offices.length;
        var newOffices = offices;
        newOffices.push(['Office ' + (index+1), '', []]);
        setOffices(newOffices);
        goToOffice(index);
    };

    const changeTitle = (index, title) => {
        var newOffices = offices;
        newOffices[index][0] = title;
        setOffices(newOffices);
    };

    return ( officeIndex === -1 ? 
        <Grid container direction='row' justify='center' alignItems='baseline'>
            {offices.map((office, index) => (
                <Grid item>
                    <Button style={{padding: '0em', margin: '1em 2em', textTransform: 'none'}} onClick={() => goToOffice(index)} key={index}>
                        <Paper className={classes.paper} 
                            onMouseEnter={() => setPaperElav(index)}
                            onMouseLeave={() => setPaperElav(-1)}
                            elevation={paperElav === index ? 10 : 1}
                        >
                            <Typography className={classes.title} align='center'>{office[0]}</Typography>
                        </Paper>
                    </Button>
                </Grid>
            ))}
            <Grid item>
                <Button style={{padding: '0em', margin: '1em 2em'}} onClick={addOffice}>
                    <Paper className={classes.pluspaper} 
                        onMouseEnter={() => setPaperElav(offices.length)}
                        onMouseLeave={() => setPaperElav(-1)}
                        elevation={paperElav === offices.length ? 10 : 1}
                    >
                        <Typography className={classes.title} align='center'>+</Typography>
                    </Paper>
                </Button>
            </Grid>
        </Grid>
        :
        <Grid container justify='flex-start' spacing={1} direction='row' className={classes.officegrid}>
            <Grid item xs={1} container direction='column' className={classes.sidebar}>
                <IconButton onClick={backToList} className={classes.backicon}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton onClick={saveChanges} className={classes.doneicon} disabled={!isChanged}>
                    <DoneIcon />
                </IconButton>
                <IconButton onClick={cancelChanges} className={classes.cancelicon} disabled={!isChanged}>
                    <ClearIcon />
                </IconButton>
            </Grid>
            <Grid item xs={11} container direction='row' spacing={2} style={{marginTop: '0em'}}> 
                <Grid item xs={12} style={{ textAlign: 'center',  }} inputProps={{min: 0, style: { textAlign: 'center',  }}}>
                    <Box >
                        <Typography className={classes.title} align='left'>Title:</Typography>
                        <TextField
                            variant='outlined'
                            value={title}
                            fullWidth
                            autoFocus={false}
                            style={{}}
                            className={classes.textfield}
                            inputProps={{min: 0, style: { textAlign: 'center', fontSize: 15 }}}
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
                            style={{}}
                            onChange={(event) => {setAddress(event.target.value); setIsChanged(true);}}
                            />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Typography className={classes.text} align='left'>Phone Numbers:</Typography>
                        {phoneNos.map((phone, index) => (
                            <Box display='flex' alignItems='center'>
                                <TextField
                                    variant='outlined'
                                    value={phone}
                                    fullWidth
                                    className={classes.textfield}
                                    inputProps={{min: 0, style: { textAlign: 'left', fontSize: 12, marginLeft: '1em' }}}
                                    onChange={(event) => changePhone(index, event.target.value)}
                                />
                                        <IconButton  style={{marginLeft: '0.0em'}} onClick={() => removePhone(index)}>
                                            <RemoveIcon fontSize='small' color='secondary' />
                                        </IconButton>
                            </Box>
                        ))}
                        <IconButton onClick={addPhone}>
                            <AddIcon fontSize='small' color='primary' />
                        </IconButton>
                    </Box>
                </Grid>
                <hr width='100%'/>
                <Grid item xs={12}>
                    <Typography align='center'>Office's Calendar</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}