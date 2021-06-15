import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import '../../index.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { callAPIHandler } from "../../core/modules/refreshToken";
import DoctorImage from "../../assets/images/doctor.png";
import PatientImage from "../../assets/images/patient.png";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setLocalStorage, setSessionStorage, resetLocalStorage, resetSessionStorage } from "../../core/modules/storageManager";
import { signOut } from '../../core/Authentication/action/authActions';
import { Link } from "react-router-dom";
import { SearchFiltersFragment } from "./searchFilterComponents/SearchFilters";
import MenuItem from '@material-ui/core/MenuItem';
import Box from "@material-ui/core/Box";
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import { Pagination } from "../../core/modules/pagination";
import EventIcon from '@material-ui/icons/Event';
import DeleteIcon from '@material-ui/icons/Delete';
import StarRating from "./RatingComponent/rating";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Avatar } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { DirectionsRailway } from '@material-ui/icons';
import { callListPatientReservations } from '../../core/modules/calendarAPICalls';
import addDays from 'date-fns/addDays';

const callTopDoctorsAPI = async () => {
    try {
        var response = callAPIHandler({ method: "GET", url: `/profile/list_doctors/` }, true, true);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const callProfileAPI = async (is_doctor, isRemembered) => {
    try {
        const urlAddress = is_doctor ? "doctor" : "patient";
        const response = callAPIHandler({ method: "GET", url: `/auth/detail/${urlAddress}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const callProfilePictureAPI = async (mainUsername, is_doctor, isRemembered) => {
    try {
        const urlAddress = is_doctor ? "doctor" : "patient";
        const response = callAPIHandler({ method: "GET", url: `/profile/${urlAddress}/update/${mainUsername}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const getNotificationAPI = ({ patient }, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: `/schedule/get-notification/${patient}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const deleteNotificationAPI = ({ id }, isRemembered) => {
    try {
        const response = callAPIHandler({ method: "DELETE", url: `/schedule/delete-notification/${id}/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const getSortedRatingListCallAPI = (isRemembered) => {
    try {
        const response = callAPIHandler({ method: "GET", url: `/auth/top-doctor-list/` }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const getAllSearchCallAPI = async (params, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "GET", url: "/search/all/", params: params }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const getLimitedSearchCallAPI = async (username, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "GET", url: "/search/limited/", params: { q: username } }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const callDeleteAccountAPI = async (username, isdoctor, isRemembered) => {
    try {
        const response = await callAPIHandler({ method: "DELETE", url: (isdoctor ? `/profile/doctor/update/${username}/` : `/profile/patient/update/${username}/`) }, true, isRemembered);
        return response;
    }
    catch (e) {
        throw e;
    }
}
const drawerWidth = 240;
const collapsedSearchWidth = '12rem';
const expandedSearchWidth = '18rem';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#10217d',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#10217d',
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: collapsedSearchWidth,
            '&:focus': {
                width: expandedSearchWidth,
            },
        },
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: 'rgba(138, 182, 214, 0.57)',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
        backgroundColor: 'rgba(138, 182, 214, 0.57)',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: '#8ab6d6',
    },
    container: {
        paddingTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
    },
    depositContext: {
        flex: 1,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e7e7e7',
        transition: 'all 0.3s ease',
        color: '#222',
        "&:hover": {
            transform: "scale3d(1.1, 1.1, 1)",
            backgroundColor: '#f3f3f3',
            transition: 'all 0.3s ease',
        },
    },
    limitedCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        "&:hover": {
            backgroundColor: '#EEE',
        },
    },
    limitedPopper: {
        width: "35ch",
    },
    cardGrid: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),

    },
    cardMedia: {
        height: '15vh',
        width: '15vh',
        marginLeft: '0.5em',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginTop: '0.6em',
        marginBottom: '0.6em',
    },
    SearchCardMedia: {
        height: '10vh',
        width: '10vh',
        marginLeft: '0.5em',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginTop: '0.6em',
        marginBottom: '0.6em',
    },
    cardContent: {
        flexGrow: 1,
        display: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'inherit',
    },
    limitedCardContent: {
        display: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    advancedSearchButton: {
        "&:hover": {
            backgroundColor: "#10217d",
        },
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    list: {
        width: 350,
    },
    fullList: {
        width: 'auto',
    },
    bottomPushClose: {
        position: "fixed",
        width: theme.spacing(9),
        bottom: 0,
        textAlign: "center",
        paddingBottom: 10,
    },
    bottomPushOpen: {
        position: "fixed",
        width: drawerWidth,
        bottom: 0,
        textAlign: "center",
        paddingBottom: 10,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Explore({ signOut }) {

    const [showLimitedMenu, setShowLimitedMenu] = useState(false);
    const [limitedSearchInput, setLimitedSearchInput] = useState("");
    const [limitedSearchResults, setLimitedSearchResults] = useState(null);
    const [limitedWidth, setLimitedWidth] = useState("auto");

    const anchorRef = useRef(null);
    const filterAnchorRef = useRef(null);

    const [allSearchParams, setAllSearchParams] = useState(null);
    const [searchPage, setSearchPage] = useState(1);
    const [searchPageCount, setSearchPageCount] = useState(1);
    const [openFilters, setOpenFilters] = useState(false);

    const [title, setTitle] = useState("Top Doctors");
    const [focused, setFocused] = React.useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    // useEffect(() => {
    //     if (anchorRef && anchorRef.current) {
    //         const w = anchorRef.current.getBoundingClientRect().width;
    //         setLimitedWidth(w);
    //         console.log("anchorWidth = " + w);
    //     }
    // }, [showLimitedMenu])

    useEffect(() => {
        if (limitedSearchInput) {
            if (limitedSearchInput !== "" && limitedSearchInput !== null)
                callSearchLimitedAPI();
            else {
                setLimitedSearchResults(null);
            }
        }
        else {
            setLimitedSearchResults(null);
        }
    }, [limitedSearchInput])

    useEffect(() => {
        if (allSearchParams !== null) {
            callSearchAllAPI();
        }
        else {
            setTitle("Top Doctors");
            setSent(false);
        }
    }, [allSearchParams])

    const handleOnLimitedSearchInputChange = (event) => {
        setLimitedSearchInput(event.target.value);
        // if (anchorRef && anchorRef.current) {
        //     const w = anchorRef.current.getBoundingClientRect().width;
        //     setLimitedWidth(w);
        //     console.log("anchorWidth = " + w);
        // }
    }

    const handleClickListItem = (event) => {
        setShowLimitedMenu(true);
    };

    const handleCloseLimitedPopper = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setShowLimitedMenu(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setShowLimitedMenu(false);
        }
    }

    const handleSignOut = () => {
        resetLocalStorage();
        resetSessionStorage();
        signOut();
        document.location.reload();
    }
    const handeDeleteAccount = () => {
        callDeleteAccountAPI(username, isDoctor, isRemembered);
        signOut();
        resetLocalStorage();
        resetSessionStorage();
        document.location.reload();
    }
    const [cards, setcards] = useState([]);
    const [proPictures, setProPictures] = useState({});
    const [notifications, setnotifications] = useState([]);
    const specializationMap = (spec) => {
        switch (spec) {
            case 'C': return 'Cardiologist';
            case 'D': return 'Dermatologist';
            case 'G': return 'General Practitioner';
            case 'GY': return 'Gynecologist';
            case 'I': return 'Internist';
            case 'N': return 'Neurologist';
            case 'O': return 'Obstetrician';
            case 'OP': return 'Ophthalmologist';
            case 'OT': return 'Otolaryngologist';
            case 'P': return 'Pediatrician';
            case 'PS': return 'Psychiatrist';
            case 'U': return 'Urologist';
            default: return '';
        }
    }

    const [a, seta] = useState(0);
    useEffect(() => {
        seta(0);
    }, [a]);

    const [username, setUsername] = useState("");
    const [got, setGot] = useState(false);
    const [rateAvg, setRateAvg] = useState({});
    const [rateCount, setRateCount] = useState({});
    const [sortedList, setSortedList] = useState({});

    const callGetAPI = async () => {
        try {
            const response1 = await callTopDoctorsAPI();
            await getSortedRatingList(response1.payload);
            const response2 = await callProfileAPI(isDoctor, isRemembered);
            if (response2.status === 200) {
                setUsername(response2.payload.user.username);
                if (!isDoctor)
                    callgetNotificationAPI(response2.payload.user.id);
            }
            setGot(true);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getSortedRatingList = async (oldCards) => {
        try {
            await callProfilePictureGetAPI(oldCards);
            const response = await getSortedRatingListCallAPI(isRemembered);
            if (response.status === 200) {
                var newCards = Array(oldCards.length);
                response.payload.map((doctor, index) => {
                    sortedList[doctor.user] = index;
                    rateCount[doctor.user] = (doctor.number);
                    rateAvg[doctor.user] = (doctor.avg);
                });
                oldCards.map((doctor) => {
                    newCards[sortedList[doctor.user.id]] = doctor;
                });
            }
            setcards(newCards);
        }
        catch (error) {

        }
    }

    const callProfilePictureGetAPI = async (cards) => {
        try {
            cards.map(async (card, index) => {
                const uname = card.user.username;
                const response = await callProfilePictureAPI(uname, card.user.is_doctor, isRemembered);
                if (response.status === 200) {
                    let pro_picture = response.payload.pro_picture;
                    if (pro_picture === null) {
                        proPictures[card.user.id] = (card.user.is_doctor ? DoctorImage : PatientImage);
                    }
                    else {
                        proPictures[card.user.id] = (pro_picture);
                    }
                    //seta(a+1);
                }
            });
            seta(a + 1);
        }
        catch (error) {
            console.log(error);

        }
    }

    const callgetNotificationAPI = async (patient) => {
        try {
            const response = await getNotificationAPI({ patient }, isRemembered);
            if (response.status === 200) {
                response.payload.map((notif) => {
                    if (notif.message.includes("day")) {
                        var list = notif.message.split(" ");
                        var time = list[4].split(".")[0];
                        list[4] = time;
                        var day = list[2];
                        var username = list.pop();
                        var h = time.split(":")[0];
                        var min = time.split(":")[1];
                        var sec = time.split(":")[2];
                        var str1 = `${day}d ${h}h ${min}min`;
                        var str2 = `left till your appointment with doctor ${username}`;
                        if (Number(day) > 0)
                            notifications.push({ day: day, h: h, min: min, sec: sec, username: username, str1: str1, str2: str2, id: notif.id });
                    }
                    else {
                        var list = notif.message.split(" ");
                        var time = list[2].split(".")[0];
                        list[2] = time;
                        var day = 0;
                        var username = list.pop();
                        var h = time.split(":")[0];
                        var min = time.split(":")[1];
                        var sec = time.split(":")[2];
                        var str1 = `${h}h ${min}min`;
                        var str2 = `left till your appointment with doctor ${username}`;
                        notifications.push({ day: day, h: h, min: min, sec: sec, username: username, str1: str1, str2: str2, id: notif.id });
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
        seta(a + 1);
    }

    const callDeleteNotificationAPI = async (id, index) => {
        try {
            const response = await deleteNotificationAPI({id: id}, isRemembered);
            if (response.state === 204) {
                notifications.splice(index, 1);
                seta(a+1);
            }
        }
        catch(error) {

        }
    }

    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (sent === false) {
            callGetAPI();
            setSent(true);
        }
    }, [sent]);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const callSearchAllAPI = async () => {
        try {
            const response = await getAllSearchCallAPI({ ...allSearchParams }, isRemembered);
            if (response.status === 200) {
                setcards(response.payload.results);
                setSearchPage(allSearchParams.page ? allSearchParams.page : 1);
                setSearchPageCount(Math.ceil(response.payload.count !== 0 ? response.payload.count / 10 : 1));
                setTitle(response.payload.count !== 0 ? "Search Results" : "Search Results: Not Found!");
            }
        }
        catch {
            console.log("All SEARCH ERROR");
        }
    }

    const callSearchLimitedAPI = async () => {
        try {
            const response = await getLimitedSearchCallAPI(limitedSearchInput, isRemembered);
            if (response.status === 200) {
                setLimitedSearchResults(response.payload);
                if (!showLimitedMenu)
                    setShowLimitedMenu(true);
            }
        }
        catch {
            console.log("LIMITED SEARCH ERROR");
        }
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const ViewProfile = (username) => {
        setSessionStorage({ isvieweddoctor: 'true', viewedusername: username, viewedOffice: '', viewedEvent: '', viewedEventDate: '', from: '' });
    }
    const ViewProfile2 = (notif) => {
        const username = notif.username;
        const day = Number(notif.day);
        var start_time = new Date();
        start_time.setDate(start_time.getDate() + day);
        var end_time = new Date();
        end_time.setDate(end_time.getDate() + (day + 2));
        getPatientReservationsList(start_time, end_time, notif, username);

    }
    const ToCalendar = () => {
        setSessionStorage({ username: username });
    }
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    var isDoctor = false;
    var isRemembered = false;
    if (localStorage.getItem("isdoctor") == null) {
        isDoctor = ((sessionStorage.getItem("isdoctor") === "true") ? true : false);
        isRemembered = false;
    }
    else {
        isDoctor = ((localStorage.getItem("isdoctor") === "true") ? true : false);
        isRemembered = true;
    }
    const theme = useTheme();
    const [Drawerstate, setDrawerstate] = React.useState({ right: false });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setDrawerstate({ ...Drawerstate, [anchor]: open });
    };
    const list = (anchor) => (
        <div style={{ backgroundColor: 'rgba(138, 182, 214, 0.57)' }}
            className={clsx(classes.list, { [classes.fullList]: anchor === 'top' || anchor === 'bottom' })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}>
            <List style={{ width: '100%', minHeight: '100vh' }}>
                {notifications.map((notif, index) => (
                    <ListItem>
                        <Card style={{ minWidth: '100%', backgroundColor: '#e7e7e7' }}>
                            <CardContent>
                                <font style={{ color: 'rgba(61,132,184,1)', fontSize: 18 }}>{notif.str1 + " "}</font>
                                <font style={{ color: 'black', fontSize: 15 }}>{notif.str2}</font>
                            </CardContent>
                            <Box display="flex" flexDirection="row-reverse">
                                <CardActions>
                                    <Button size="small" onClick={() => ViewProfile2(notif)} style={{ textTransform: 'none', backgroundColor: 'rgba(61,132,184,0.8)', color: 'white' }}>View</Button>
                                    <Button size="small" onClick={() => callDeleteNotificationAPI(notif.id, index)} style={{ textTransform: 'none', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white' }}>Delete</Button>
                                </CardActions>
                            </Box>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div >
    );
    const almostEqual = (date1, date2) => {
        const time1 = date1.getHours() * 60 + date1.getMinutes();
        const time2 = date2.getHours() * 60 + date2.getMinutes();
        if (Math.abs(time1 - time2) < 5)
            return true;
        return false;
    }
    const [RedirectState, setRedirectState] = useState(false);
    const getPatientReservationsList = async (start_date, end_date, notif, username) => {
        alert(start_date + " " + end_date);
        const start_month = start_date.getMonth() + 1;
        const end_month = end_date.getMonth() + 1;
        const start_day = start_date.getDate();
        const end_day = end_date.getDate();
        const from_date = `${start_date.getFullYear()}${start_month < 10 ? `0${start_month}` : start_month}${start_day < 10 ? `0${start_day}` : start_day}`;
        const to_date = `${end_date.getFullYear()}${end_month < 10 ? `0${end_month}` : end_month}${end_day < 10 ? `0${end_day}` : end_day}`;
        try {
            const response = await callListPatientReservations({ from_date: from_date, to_date: to_date }, isRemembered);
            if (response.status === 200) {
                var hour = Number(notif.h);
                var min = Number(notif.min);
                var sec = Number(notif.sec);
                var EventDate = new Date(start_date.getFullYear(), start_month - 1, start_day, start_date.getHours() + hour, start_date.getMinutes() + min, start_date.getSeconds() + sec);
                alert(hour + " " + min + " " + sec);
                var MyReserve = null;
                alert(response.payload.length);
                response.payload.map((reserve) => {
                    alert(new Date(reserve.start_time) + " " + EventDate);
                    if (almostEqual(new Date(reserve.start_time), EventDate))
                        MyReserve = reserve;
                });
                var office_id = MyReserve.office.id;
                setSessionStorage({ isvieweddoctor: 'true', viewedusername: username, viewedOffice: office_id, viewedEvent: MyReserve.id, viewedEventDate: MyReserve.start_time, from: '' });
                setRedirectState(true);
            }
        }
        catch (e) {
            console.log("error on get reserve\n", e);
        }
    }
    const [SignoutOpen, setSignoutOpen] = useState(false);
    const handleClickSignoutOpen = () => {
        setSignoutOpen(true);
    };
    const handleSignoutClose = () => {
        setSignoutOpen(false);
    };
    const [DelAccountOpen, setDelAccountOpen] = useState(false);
    const handleDelAccountOpen = () => {
        setDelAccountOpen(true);
    };
    const handleDelAccountClose = () => {
        setDelAccountOpen(false);
    };
    if (RedirectState)
        return (<Redirect to="/view-profile" />);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar ref={filterAnchorRef} position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Home Page</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <div>
                            <div ref={anchorRef}>
                                <ClickAwayListener onClickAway={(event) => { handleCloseLimitedPopper(event); setLimitedWidth(collapsedSearchWidth) }}>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        onClick={(event) => { handleClickListItem(event); setLimitedWidth(expandedSearchWidth) }}
                                        value={limitedSearchInput}
                                        onChange={handleOnLimitedSearchInputChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                    />
                                </ClickAwayListener>
                            </div>
                            <Box style={{ display: "flex" }}>
                                <Container maxWidth={false} disableGutters style={{ width: focused ? expandedSearchWidth : collapsedSearchWidth }}>
                                    <Popper
                                        open={showLimitedMenu}
                                        anchorEl={anchorRef && anchorRef.current ? anchorRef.current : null}
                                        className={classes.limitedPopper}
                                        role={undefined}
                                        transition
                                        disablePortal
                                        placement="bottom-start"
                                        style={{ width: "100%" }}>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                                    width: "100%"
                                                }}>
                                                <Paper style={{ borderRadius: "5px" }}>
                                                    <ClickAwayListener onClickAway={handleCloseLimitedPopper} >
                                                        <MenuList property={{ style: { borderTopLeftRadius: '0px', borderTopRightRadius: '50px' } }} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{ padding: 0, }}>
                                                            {limitedSearchInput !== "" && limitedSearchResults && limitedSearchResults.length > 0 && limitedSearchResults.map((list, index) => (<MenuItem onClick={handleCloseLimitedPopper} style={{ padding: 0 }}>
                                                                <Button style={{ textTransform: 'none', textAlign: 'center', padding: 0, width: "100%" }} component={Link} to="/view-profile" onClick={() => ViewProfile(list.user.username)} size="small" color="primary">
                                                                    <Card
                                                                        className={classes.limitedCard}
                                                                        style={{ justifyContent: 'center', alignItems: 'center', borderRadius: (index === 0 ? '10px 10px 0 0' : '0'), height: '100%', width: "100%" }}>
                                                                        <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-evenly", alignItems: "center", width: "100%" }}>
                                                                            <Grid item xs={5} container justify='center'>
                                                                                <Avatar className={classes.SearchCardMedia} src={proPictures[list.user.id]} />
                                                                            </Grid>
                                                                            <Grid item xs={7}>
                                                                                <CardContent className={classes.limitedCardContent} style={{ padding: "1em 0" }}>
                                                                                    <Typography align='left' variant="h6">
                                                                                        {list.user.username}
                                                                                    </Typography>
                                                                                    <Typography align='left'>
                                                                                        {specializationMap(list.filed_of_specialization)}
                                                                                    </Typography>
                                                                                    <Box display="flex" flexDirection="row" style={{ marginTop: "0.5em", color: 'inherit' }} alignItems="center" justifyContent="flex-start">
                                                                                        <Paper elevation={0} style={{ backgroundColor: "inherit", display: 'flex', flexDirection: 'row', color: 'inherit' }}>
                                                                                            <StarRating val={list.rate_avg} />
                                                                                        </Paper>
                                                                                    </Box>
                                                                                </CardContent>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Card>
                                                                </Button>
                                                            </MenuItem>
                                                            ))}
                                                            {limitedSearchInput !== "" && limitedSearchResults !== null && limitedSearchResults.length === 0 && <Box style={{ padding: 0, backgroundColor: "#f9a099", display: "flex", justifyContent: "center", borderRadius: "5px 5px 0 0" }}>
                                                                <Card elevation={0} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#f9a099", height: '100%', width: 'auto' }}>
                                                                    <Typography style={{ color: "#611a15", margin: "0.5em 0" }}>
                                                                        Record Not found
                                                                    </Typography>
                                                                </Card>
                                                            </Box>}
                                                            {limitedSearchInput !== "" && limitedSearchResults !== null && <Box style={{ backgroundColor: "rgba(48, 150, 164, 1)", height: '100%', width: "auto", justifyContent: "center", borderRadius: "0 0 10px 10px" }}>
                                                                <Button
                                                                    onClick={() => { setOpenFilters(true); setShowLimitedMenu(false); }}
                                                                    style={{ textTransform: "none", backgroundColor: "rgba(48, 150, 164, 1)", textAlign: "center", padding: 0, width: "100%", "&:hover": { backgroundColor: "#10217d" } }}>
                                                                    <Typography style={{ color: "#FFF", margin: "0.5em 0" }}>
                                                                        Advanced Search
                                                                    </Typography>
                                                                </Button>
                                                            </Box>}
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>)}
                                    </Popper>
                                </Container>
                            </Box>
                        </div>
                    </div>
                    <div>
                        <React.Fragment key={'right'}>
                            <IconButton color="inherit" onClick={toggleDrawer('right', true)}>
                                <Badge badgeContent={notifications.length} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <SwipeableDrawer
                                anchor='right'
                                open={Drawerstate['right']}
                                onClose={toggleDrawer('right', false)}
                                onOpen={toggleDrawer('right', true)}>
                                {list('right')}
                            </SwipeableDrawer>
                        </React.Fragment>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }} open={open}>
                <div className={classes.toolbarIcon}>
                    <Typography component="h2" variant="h6" gutterBottom style={{ width: '80%', marginLeft: '10px' }}>
                        {username}
                    </Typography>
                    <IconButton onClick={handleDrawerClose} style={{ width: '20%' }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">
                            <ListItem button>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to={isDoctor ? "/DoctorCalendar" : "/Calendar"}>
                            <ListItem button onClick={ToCalendar}>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText primary="Calendar" />
                            </ListItem>
                        </Link>
                        {!isDoctor &&
                            <Link style={{ textDecoration: 'none', color: 'black' }} to="/SavedAccounts">
                                <ListItem button>
                                    <ListItemIcon>
                                        <BookmarksIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Saved accounts" />
                                </ListItem>
                            </Link>
                        }
                    </div>
                </List>
                <List>
                    <div className={open ? classes.bottomPushOpen : classes.bottomPushClose}>
                        <Divider />
                        <ListItem button onClick={handleClickSignoutOpen}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            {open && <ListItemText primary="Sign out" />}
                        </ListItem>
                        <Dialog fullWidth open={SignoutOpen} TransitionComponent={Transition} keepMounted onClose={handleSignoutClose}>
                            <DialogTitle>{"Sign out"}</DialogTitle>
                            <DialogContent><DialogContentText>Are you sure you want to sign out ?</DialogContentText></DialogContent>
                            <DialogActions>
                                <Button onClick={handleSignoutClose} style={{ textTransform: 'none', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginBottom: '0.5em' }}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSignOut} style={{ textTransform: 'none', backgroundColor: 'rgba(42,172,61,0.7)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginRight: '1em', marginBottom: '0.5em' }}>
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <ListItem button onClick={handleDelAccountOpen}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            {open && <ListItemText primary="Delete Account" />}
                        </ListItem>
                        <Dialog fullWidth open={DelAccountOpen} TransitionComponent={Transition} keepMounted onClose={handleDelAccountClose}>
                            <DialogTitle>{"Delete Account"}</DialogTitle>
                            <DialogContent><DialogContentText>Are you sure you want to delete your account ?</DialogContentText></DialogContent>
                            <DialogActions>
                                <Button onClick={handleDelAccountClose} style={{ textTransform: 'none', backgroundColor: 'rgba(255,0,0,0.5)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginBottom: '0.5em' }}>
                                    Cancel
                                </Button>
                                <Link style={{ textDecoration: 'none' }} to="/">
                                    <Button onClick={handeDeleteAccount} style={{ textTransform: 'none', backgroundColor: 'rgba(42,172,61,0.7)', color: 'white', paddingLeft: '2em', paddingRight: '2em', marginRight: '1em', marginBottom: '0.5em' }}>
                                        Confirm
                                    </Button>
                                </Link>
                            </DialogActions>
                        </Dialog>
                    </div>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <SearchFiltersFragment proPictures={proPictures} anchorEl={filterAnchorRef} setOnFilters={(value) => { setAllSearchParams(value); }} open={openFilters} setOpen={(value) => setOpenFilters(value)} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={classes.paper} style={{ backgroundColor: '#E0E0E0', borderTopLeftRadius: '50px', borderTopRightRadius: '50px' }}>
                                <React.Fragment>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box flex={1}>
                                            <Typography component="h2" variant="h6" color="primary" style={{ marginLeft: '1.5em' }} gutterBottom>
                                                {title}
                                            </Typography>
                                        </Box>
                                        <Box flex={1} display="flex" alignItems="center" justifyContent="flex-end" paddingRight="4em">
                                            {title === "Search Results" && <Pagination
                                                page={searchPage}
                                                pageCount={searchPageCount}
                                                onBackwardFirstPage={() => setAllSearchParams({ ...allSearchParams, page: 1 })}
                                                onBackwardPage={() => setAllSearchParams({ ...allSearchParams, page: searchPage - 1 })}
                                                onForwardLastPage={() => setAllSearchParams({ ...allSearchParams, page: searchPageCount })}
                                                onForwardPage={() => setAllSearchParams({ ...allSearchParams, page: searchPage + 1 })} />}
                                        </Box>
                                    </Box>
                                    <Container style={{ backgroundColor: '#E0E0E0', minHeight: '41.9em' }} className={classes.cardGrid}>
                                        <Grid container style={{ background: '#E0E0E0' }} spacing={4}>
                                            {cards.map((card, index) => (
                                                <Grid item key={`card-${index}`} xs={12} sm={6} md={4} style={{ backgroundColor: '#E0E0E0', }}>
                                                    <Button style={{ textTransform: 'none' }} component={Link} to="/view-profile" onClick={() => ViewProfile(card.user.username)} size="small" color="primary">
                                                        <Card className={classes.card} style={{ justifyContent: 'center', alignItems: 'center', borderRadius: '10px', height: '100%', width: '320px' }}>
                                                            <Grid style={{ display: 'flex', flexDirection: 'row', color: 'inherit' }}>
                                                                <Avatar className={classes.cardMedia} src={proPictures[card.user.id]} alt={DoctorImage} />
                                                                <CardContent className={classes.cardContent}>
                                                                    <Typography gutterBottom variant="h5" component="h2">
                                                                        {card.user.username}
                                                                    </Typography>
                                                                    <Typography>
                                                                        {specializationMap(card.filed_of_specialization)}
                                                                    </Typography>
                                                                    <Box display="flex" flexDirection="row" style={{ marginTop: "0.5em", color: 'inherit' }} alignItems="center" justifyContent="flex-start">
                                                                        <Paper elevation={0} style={{ backgroundColor: "inherit", display: 'flex', flexDirection: 'row', color: 'inherit' }}>
                                                                            <StarRating val={card.rate_avg} />
                                                                            <VisibilityIcon style={{ color: "inherit", marginLeft: '0.5em', marginRight: '0.2em' }} />
                                                                            <Typography style={{ color: 'inherit' }}>{rateCount[card.user.id]}</Typography>
                                                                        </Paper>
                                                                    </Box>
                                                                </CardContent>
                                                            </Grid>
                                                        </Card>
                                                    </Button>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Container>
                                </React.Fragment>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default connect(null, state => {
    return {
        signOut: () => signOut(),
    };
})(Explore)