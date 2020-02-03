import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#ff0000',
            contrastText: '#fff',
        },
        secondary: {
            main: '#000',
            contrastText: '#fff',
        },
        status:{
            success: {
                backgroundColor: '#00ff00',
            },

        }
    },
    typography:{
        fontFamily:[
            'Roboto'
        ]
    },

});