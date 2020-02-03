import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles/';
import {AppBar, Toolbar, Button, Typography, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

/* Styles */
import theme from '../Styles/Theme';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      Button_Login:{
          marginLeft: theme.spacing(2)
      }
  }));

export default function Navbar(){
    const classes = useStyles();

    return(
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Sistema de Reconocimiento Vehicular 
                    </Typography>
                    <Button color="secondary" 
                            variant="outlined"
                            className={classes.Button_Login}
                    >
                        Sign Up
                    </Button>
                    <Button color="secondary" 
                            variant="contained"
                            className={classes.Button_Login}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )

}
