import React, { Component } from 'react'
import {Text, View, Image} from "react-native";
import {Button, Left, Body, Right} from 'native-base';
import {PropTypes, staticIcons, themes} from "helpers/common";
import styles from "./style";
import {InputTextNormal} from 'components/inputFields';
import SuperForm from "helpers/classMixins/superForm";
import FieldError from "../FieldError";

class TouchableInputField extends SuperForm(Component) {
    render() {
        const {actionButton, value, existValue, icon, style} = this.props;
        const {errors} = this.state;
        return (
            <View>
                <Button style={this.showError() ? {...styles.field, ...styles.textError, ...style} : {...styles.field, ...style}} onPress={actionButton}>
                    {
                        icon ?
                            <View style={themes.fldr}>
                                <Left style={themes.pl5}>
                                    <Image source={icon}/>
                                </Left>
                                <Body>
                                    <Text style={existValue ? styles.buttonText : styles.buttonTextPlaceholder}>{value}</Text>
                                </Body>
                                <Right/>
                            </View> :
                            <View style={themes.fldr}>
                                <Text style={existValue ? styles.buttonText : styles.buttonTextPlaceholder}>{value}</Text>
                            </View>
                    }
                </Button>
                <FieldError errors={errors} isVisible={this.showError()} />
            </View>
        );
    }
}

TouchableInputField.contextTypes = {
    form: PropTypes.object,
    constraints: PropTypes.object
};

TouchableInputField.propTypes = {
    actionButton: PropTypes.any,
    existValue: PropTypes.any,
    value: PropTypes.any
};

export {TouchableInputField};
