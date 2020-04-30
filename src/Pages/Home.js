import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles/';
import {Container, Typography} from '@material-ui/core';

/* Components*/
import Comparator from '../Components/Comparator'

/* Styles */
import theme from '../Styles/Theme';

const useStyles = makeStyles(theme => ({
    Container_main: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    ContainerBody:{
        //height: '100vh'
    }
}));

function Home(){
    const classes = useStyles();
    return(
        <ThemeProvider theme={theme} >
            <Container maxWidth={false} className={classes.ContainerBody}>
                <Container maxWidth="md" className={classes.Container_main}>
                    <Typography component="h2" variant="h2" align="center">Comparador de imágenes</Typography>
                </Container>
                <Container maxWidth="lg" className={classes.Container_main}>
                    <Comparator/>
                </Container>
            </Container>
        </ThemeProvider>
    )

}
export default Home;