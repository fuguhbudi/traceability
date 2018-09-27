import React, {Component} from "react";
import {View, Image} from "react-native";
import {Inputv} from "../Inputv";
import styles from "../styles";

class InputTextNormal extends Component{
    
    render(){
        return <Inputv normal {...this.props}/>;
    }
}

InputTextNormal.propTypes = Inputv.propTypes;

export { InputTextNormal }