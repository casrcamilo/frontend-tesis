import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles/';
import {Typography} from '@material-ui/core';

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
    Container_footer:{
        backgroundColor: '#000',
        padding: theme.spacing(4),
        borderTop: '4px solid red',
        boxShadow: '0px -6px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    Typography_footer:{
        color: '#fff'
    }
  }));

function Footer(){
    const classes = useStyles();

    const textFooter =[
        {title:'Desarrollado por:', variant:'h4'},
        {title:'Camilo Andres Sosa Ramirez  |  Angel Mauricio Monterrey  |  Junior Esteban Parra', variant:'h5'},
        {title:'Ingenieria Mecátronica', variant:'h5'},
        {title:'Universidad Piloto de Colombia', variant:'h5'},
        {title:'Todos los derechos reservados', variant:'body1'}
    ]
    return(
        <React.Fragment>
            <div className={classes.Container_footer} >
                {textFooter.map(text => (
                    <Typography component="h5" variant={text.variant} className={classes.Typography_footer} align="center">{text.title}</Typography>              
                )
                )}
            </div>
        </React.Fragment>
    )

}
export default Footer;