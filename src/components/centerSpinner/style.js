import {Dimensions} from "react-native";

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = (Dimensions.get('window').height) - 120;

export default {
  centerSpinner:{
    width:deviceWidth,
    height:deviceHeight,
    flex:1,
    justifyContent : "center"
  }
};