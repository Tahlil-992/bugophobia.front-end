import React from 'react';
import clsx from 'clsx';
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
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import DoctorImage from "../../assets/images/doctor.png";
import { resetLocalStorage, resetSessionStorage } from "../../core/modules/storageManager";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from '../../core/Authentication/action/authActions';

const drawerWidth = 240;
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
        justifyContent: 'flex-end',
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
            width: '20ch',
            '&:focus': {
                width: '35ch',
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
        backgroundColor: '#719fb0',
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
        backgroundColor: '#719fb0',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        backgroundColor: 'lightblue',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
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
    },
    cardMedia: {
        paddingTop: '100%',
    },
    cardContent: {
        flexGrow: 1,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
}));
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Explore({ signOut }) {

    const handleSignOut = () => {
        resetLocalStorage();
        resetSessionStorage();
        signOut();
        document.location.reload();
    }    

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const theme = useTheme();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
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
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }} />
                    </div>
                    <IconButton color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }} open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <div>
                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button onClick={handleSignOut}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign out" />
                        </ListItem>
                    </div>
                </List>
                <Divider />
                <List>
                    <div>
                        <ListSubheader inset>Saved Accounts</ListSubheader>
                        <ListItem button>
                            {/*list of saved accounts*/}
                        </ListItem>
                    </div>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper} style={{ backgroundColor: 'lightblue', border: '3px solid #10217d' }}>
                                <React.Fragment>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Top Doctors
                                    </Typography>
                                    <div className="row">
                                        <div className="row__cards">
                                            {cards.map((card) => (
                                                <Grid item key={card} xs={12} sm={6} md={4}>
                                                    <Card className={classes.card} style={{ backgroundColor: 'lightblue', minWidth: '200px', marginRight:'10px' }}>
                                                        <CardMedia
                                                            className={classes.cardMedia}
                                                            image={DoctorImage}
                                                            title="Image title"
                                                        />
                                                        <CardContent className={classes.cardContent}>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                Doctor's name
                                                            </Typography>
                                                            <Typography>
                                                                Description
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small" color="primary">View Profile</Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </div>
                                    </div>
                                </React.Fragment>
                            </Paper>
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