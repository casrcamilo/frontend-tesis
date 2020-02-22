import React, { useState } from 'react';
import axios from 'axios';

import { ThemeProvider, makeStyles } from '@material-ui/core/styles/';
import {Button, Grid, LinearProgress, withStyles, Container, FormControl, FormHelperText, Input, InputLabel, Snackbar, SnackbarContent} from '@material-ui/core';

/* Components*/

/* Styles */
import theme from '../Styles/Theme';

/* Resources */
import road from '../Images/road.jpg'

const styles = theme => ({
    Container_main:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    Container_textFields:{
        position: 'fixed', 
        height: 'auto',
        bottom: '30vh',
        right: '18px',
        width: '20vw',
        borderRadius: '0.5rem',
        boxShadow: '8px 8px 13px rgba(32, 48, 81, 0.35)',
    },
    Button_upload:{
        display: 'block',
        margin: '0 auto'
    },
    Images:{
        width: '100%',
        height: '100%',
        boxShadow: '8px 8px 13px rgba(32, 48, 81, 0.35)',
        borderRadius: '0.5rem',
    },
    Images_opacity:{
        filter: 'opacity(0.5)'
    },
    LinearProgress:{
        marginTop: theme.spacing(2)
    }
});


class Comparator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            originalImage : '',
            rekognitionImage: '',
            pk: '',
            loadingImage : false,
            cajas_teoricas: 0,
            cajas_practicas: 0,
            percent:0,
            loading: false,
            errorFields: [{
                cajas_teoricas: false,
                cajas_practicas: false,
            }],
          };
    }

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
          const newState = { ...prevstate };
          newState[name] = parseInt(value);
          return newState;
        });

    }

    checkField = e => {
        let name = e.target.name
        let value = e.target.value
        if (value === ''){
            this.setState(prevstate => {
                const newState = { ...prevstate };
                newState.errorFields[name] = true;
                return newState;
            });
        }else{
            this.setState(prevstate => {
                const newState = { ...prevstate };
                newState.errorFields[name] = false;
                return newState;
            });           
        }

    }

    handleLoadImage = e => {
        e.preventDefault();
        document.getElementById('Image_input').click()
    }

    sendImages = async () =>{
        this.setState({
            loadingImage: true,
        })
        const originalImage = document.getElementById('Image_input').files[0];
        let formData = new FormData();
        formData.append('imagen_sin_analizar', originalImage);

        try {
            const images = await axios({
                method: 'post',
                url: `https://backend.tecnologiacs.com/v1/images`,
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            console.log(images.data)
            this.setState({
                loadingImage: false,
                originalImage: images.data.imagen_sin_analizar,
                rekognitionImage: images.data.imagen_analizada,
                pk: images.data.pk
            })
        } catch (error) {
            console.log(error)
        }
    } 
    sendData = async () => {
        this.setState({loading: true})
        const data = {
            cajas_teoricas: this.state.cajas_teoricas,
            cajas_practicas: this.state.cajas_practicas,
            porcentaje: (this.state.cajas_practicas / this.state.cajas_teoricas)*100,
        }

        await axios({
            method: 'patch',
            url: `https://backend.tecnologiacs.com/v1/images/${this.state.pk}/upload`,
            data: data
        }).then(response => {
            console.log(response)
            this.setState({
                loading: false,
                open:true,
                originalImage: '',
                rekognitionImage: '',
                pk: '',
                cajas_teoricas: 0,
                cajas_practicas: 0,
                percent:0,
            })
        }).catch(error =>{
            console.log(error)
        })
        
  
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render(){
        const { classes } = this.props;



        return(
            <ThemeProvider theme={theme}>
                <Button color="primary"
                        variant="contained"
                        className={classes.Button_upload}
                        onClick={this.handleLoadImage}
                >
                    Subir Imagen
                </Button>
                <input type="file" id="Image_input" accept="image/*" style={{display:'none'}} onChange={this.sendImages}/>
                <Container maxWidth="md">
                    <Grid container className={classes.Container_main} spacing={4}>
                        <Grid item xs={12}>
                            <div className={classes.Container_column}>
                                {
                                    this.state.loadingImage
                                    ? <LinearProgress color="primary" />
                                    : null    
                                }
                                <img src={ this.state.originalImage ? this.state.originalImage : road} 
                                    className={`${classes.Images} ${this.state.originalImage ? null : classes.Images_opacity }`}
                                    alt="preview" 
                                /> 
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.Container_column}>
                                {
                                    this.state.loadingImage
                                    ? <LinearProgress color="primary" />
                                    : null
                                }
                                <img src={ this.state.rekognitionImage ? this.state.rekognitionImage : road } 
                                    className={`${classes.Images} ${this.state.rekognitionImage ? null : classes.Images_opacity }`}
                                    alt="preview" 
                                /> 
                            </div>
                        </Grid>
                    </Grid>

                </Container>
                <Container maxWidth="xs" className={classes.Container_textFields}>
                    <Grid container className={classes.Container_main} spacing={4}>
                        <Grid item xs={12} >
                            <FormControl required fullWidth  margin="normal" error={this.state.errorFields.cajas_teoricas ? true : false} >
                                <InputLabel htmlFor="form_cajasTeoricas">Vehiculos téoricos</InputLabel>
                                <Input  id="form_cajasTeoricas" 
                                        type="text" 
                                        name="cajas_teoricas" 
                                        fullWidth
                                        value={this.state.cajas_teoricas}
                                        onChange={this.handle_change}
                                        aria-describedby="form_SignUp_cajasTeoricas_errorText"
                                        onBlur={this.checkField}
                                        variant="outlined"
                                />
                                {this.state.errorFields.cajas_teoricas 
                                ? <FormHelperText id="form_SignUp_cajasTeoricas_errorText">Este campo es obligatorio </FormHelperText>
                                : null
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl required fullWidth  margin="normal" error={this.state.errorFields.cajas_practicas ? true : false} >
                                <InputLabel htmlFor="form_cajasPracticas">Vehiculos detectados</InputLabel>
                                <Input  id="form_cajasPracticas" 
                                        type="text" 
                                        name="cajas_practicas" 
                                        fullWidth
                                        value={this.state.cajas_practicas}
                                        onChange={this.handle_change}
                                        aria-describedby="form_SignUp_cajasPracticas_errorText"
                                        onBlur={this.checkField}
                                        variant="outlined"
                                />
                                {this.state.errorFields.cajas_practicas 
                                ? <FormHelperText id="form_SignUp_cajasTeoricas_errorText">Este campo es obligatorio </FormHelperText>
                                : null
                                }
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <p>Porcentaje de detección:{
                                isNaN(this.state.cajas_practicas / this.state.cajas_teoricas)
                                ?   0
                                :   (this.state.cajas_practicas / this.state.cajas_teoricas)*100
                            }%</p>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary"
                                    variant="contained"
                                    className={classes.Button_upload}
                                    onClick={this.sendData}
                            >
                                Enviar
                            </Button>
                            {this.state.loading ? <LinearProgress className={classes.LinearProgress}/> : null}
                        </Grid>
                    </Grid>
                </Container>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={4000}
                    onClose={this.handleClose}
                    >
                    <SnackbarContent
                        style={{backgroundColor: '#4bb543'}}
                        variant="success"
                        message="Registro actualizado con exito"                       
                    />
                        
                </Snackbar>
            </ThemeProvider>
        )
    }
}
export default withStyles(styles)(Comparator);

/*


function Home(){
    const classes = useStyles();
    //const [loadingImage, setLoadingImage] = useState(false)
    const [originalImage, setOriginalImage] = useState()

    const handleLoadImage = e => {
        e.preventDefault();
        document.getElementById('Image_input').click()
    }

    const uploadImage = e => {
        console.log(e.target.files[0])
        const reader = new FileReader();
        reader.addEventListener('load', () =>
            setOriginalImage(reader.result),
            sendImages()
        );
        reader.readAsDataURL(e.target.files[0]);
        
    }

    const sendImages = async () =>{
        //setLoadingImage(true)
        setOriginalImage(document.getElementById('Image_input').files[0])
        let formData = new FormData();
        formData.append('imagen_sin_analizar', originalImage);

        await axios({
              method: 'post',
              url: 'http://13.59.89.50/v1/images',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data' }
          }).then(response => (
            console.log(response)
            //setLoadingImage(false)
          )).catch(error =>(
            console.log(error)
          ))
    }



}
export default Home;*/