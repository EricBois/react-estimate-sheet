import React, { useState } from 'react';
import firebase from "../firebase";
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '5rem',
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: '5px',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const { isLoggedIn } = props;
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (status) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(status);
  };

  return (
    <div className={classes.root}>
      {isLoggedIn ? (
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6">
                Estimate IT
              </Typography>
              <Button
                onClick={() => firebase.logout()}
                className={classes.button}
                color="inherit"
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                onClick={toggleDrawer(false)}
                button
                component={Link}
                to="/"
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Estimates" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                onClick={toggleDrawer(false)}
                button
                component={Link}
                to="/create"
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Create" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                onClick={toggleDrawer(false)}
                button
                component={Link}
                to="/settings"
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </Drawer>
        </>
      ) : (
        <>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <Typography variant="h6" noWrap>
                Estimate Sheet
              </Typography>
            </Toolbar>
          </AppBar>
        </>
      )}
    </div>
  );
}
