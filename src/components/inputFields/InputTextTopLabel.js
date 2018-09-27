import React,{Components} from 'react';
import {i18n} from "helpers/common";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';

const toUpperCase = (tValue) => (tValue.toUpperCase());

const InputTextTopLabel = ({
                               topLabel,
                               placeholder,
                               borderTop,
                               borderBottom,
                               maxLength,
                               onChangeText,
                               onButtonPress,
                               showMandatory,
                               mandatoryMessage,
                               showSecure,
                               imageSrc,
                               tooltip,
                           }) =>
{

    const {	ifTop,
        ifBottom,
        container,
        upperLine,
        lowerLine,
        label,
        text,
        image,
        imageEye
    } = style;

    const styleContainer = [container,borderBottom?ifBottom:{},borderTop?ifTop:{}];
    return(
        <View>
            <View style = {styleContainer} >
                <View style = {upperLine}>
                    <Text style = {label}>
                        { topLabel }
                    </Text>
                    <TouchableOpacity onPress={onButtonPress}>
                        <Image source = {imageSrc} style = {tooltip? image : imageEye} />
                    </TouchableOpacity>
                </View >
                <View style = {lowerLine}>
                    <TextInput
                        style = {text}
                        isRequired = 'true'
                        underlineColorAndroid = 'transparent'
                        placeholder = {placeholder}
                        autoCorrect = {false}
                        onChangeText = {onChangeText}
                        maxLength = {maxLength ? Number(maxLength) : 99999}
                        secureTextEntry = {!showSecure}
                    />
                </View>
            </View>
            <Text style={{padding: (showMandatory) ? 5 : 0, backgroundColor:'rgb(208,29,34)',color:'white',height:(showMandatory) ? null : 0}}>{
                mandatoryMessage ? i18n(mandatoryMessage) : i18n("field.is.required")
            }</Text>
        </View>
    );
};


InputTextTopLabel.PropTypes = {

};


const style = StyleSheet.create({
    container : {
        // height : 66,
        paddingLeft: 20,
        borderColor : '#BDBDBD',
        justifyContent : 'flex-start',
        flexDirection : 'column',
        alignSelf : 'stretch',

    },
    upperLine :
        {
            marginTop : 5,
            flexDirection : 'row',
            justifyContent : 'flex-start',
            alignItems : 'center',
            marginBottom : 1,
        },
    lowerLine :
        {
            justifyContent : 'flex-start',
            alignItems : 'center',
            marginLeft : Platform.OS === 'ios' ? 0 : -4,
        },
    ifBottom : {
        borderBottomWidth : 1,
    },
    ifTop : {
        borderTopWidth : 1,
    },
    label : {
        fontFamily: "DIN LightAlternate",
        fontSize: 18,
        color: '#182638',
        marginLeft: 0,
    },
    text : {
        fontFamily: "OpenSans-Regular",
        fontSize : 18,
        marginTop : 5,
        marginBottom : 0,
        alignSelf : 'stretch',
        paddingBottom : 0,
        paddingTop : 0,
        borderWidth: 1,
        borderColor: '#000f23',
        borderRadius: 8,
        height: 50,
        paddingLeft: 17
    },
    image : {
        width : 22,
        height : 22,
        resizeMode : 'stretch',
        marginLeft : 10
    },
    imageEye : {
        width : 22,
        height : 16,
        resizeMode : 'stretch',
        marginLeft : 10
    }
});



export {InputTextTopLabel}
