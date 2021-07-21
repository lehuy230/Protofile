import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    color: {
        primary:"red",
        secondary:"yellow",
        err:"green"
      },
      typography:{
          fontFamily:"Roboto"
      },
      shape:{
          borderRadius:4,
          backgroundColor:"yellow",
          textColor:"#ccc"
      }
});

export default theme;