const React = require("react-native");
const {Dimensions} = React;
const deviceHeight = Dimensions.get("window").height;

function getHeightRatio(length){
    return length / 640 * deviceHeight;
}

export default getHeightRatio;