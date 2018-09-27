import React, {Component} from "react";
import { View, Image, TouchableOpacity, TextInput, Animated } from "react-native";
import {Item, Label, Input, Text} from "native-base";
import {PropTypes, themes, staticIcons, i18n} from "helpers/common";
import {formatCurrency} from "helpers/utils/currency";
import SuperForm from "helpers/classMixins/superForm";
import FieldError from "../FieldError";
import styles from "./style";
class TextFieldHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
        };
    }

    componentWillReceiveProps(newProps) {
        return Animated.timing(this.state.marginAnim, {
            toValue: newProps.withValue ? 10 : 0,
            duration: 230
        }).start();
    }

    render() {
        return (
            <Animated.View style={{ marginTop: this.state.marginAnim }}>
                {this.props.children}
            </Animated.View>
        );
    }
}
class Inputv extends SuperForm(Component) {
    constructor(){
        super();
        this.state = {
            localMaxLength: 15,
            showPlaceholder: true,
            text: '',
            length: 0
        }
    }

    handleOnEndEditing = () => {
        const { onEndEditing, currency } = this.props;
        const { value } = this.state;
        this.setState({ focused: false, showPlaceholder: true });
        if(typeof onEndEditing === "function") onEndEditing();
        if(currency){
            const display = formatCurrency(value, true);
            const model = formatCurrency(value);
            this.setState({ localMaxLength: 19, display: display }, () => this.handleInputChange(model));
            console.log('func');
        }
        console.log('endEdit');
    };
    onChangeText = (fieldName, value) => {
        const {onChangeTextProps} = this.props;
        if (typeof onChangeTextProps === 'function') {
            onChangeTextProps(fieldName, value);
        }
    };

    handleOnChangeText = (text) => {
        const {onChangeText, fieldName} = this.props;
        if(typeof onChangeText === "function") onChangeText(fieldName, text);
        this.handleInputChange(text);
    };

    handleOnFocus = () => {
        const { onFocus, currency } = this.props;
        this.setState({ focused: true, showPlaceholder: false });
        if(typeof onFocus === "function") onFocus();
        if(currency){
            this.setState({ localMaxLength: 15, display: null});
        }
    };
    getStyleFloatingField = () => {
        const {floatingLabelUseIcon} = this.props;
        if (floatingLabelUseIcon) {
            return styles.floatingField;
        }
    }
    getInputFloatingStyle = () => {
        const {floatingLabelUseIcon} = this.props;
        if (floatingLabelUseIcon) {
            return styles.floatingInput;
        }
    }
    counterChars = (text) => {
        this.setState({
            'text': text,
            'length': (text) ? text.length : 0
        })
    }

    render(){
        const { transparent, normal, placeholder, name,
            label, multiline, secure, icon, helper, maxLength,
            floatingLabel, inlineLabel, rounded, centered, style, onHelperClick,
            keyboardType, right, editable, currency, topLabel, height, vals, parentStyle, loginForm, floatingLabelUseIcon, useCounterIncrement
        } = this.props;

        const { value, display, errors, localMaxLength,showPlaceholder} = this.state;
        const normalInputItemStyle = transparent ? styles.itemContainerTransparent : styles.itemContainer;
        const helperIcon = <Image button style={styles.inputHelper} source={staticIcons[helper]}/>;
        const renderHelper = onHelperClick ? <TouchableOpacity style={styles.helper} onPress={() => onHelperClick()}>{helperIcon}</TouchableOpacity> : helperIcon;
        const renderValue = currency && display ? display : value;
        const paddingLeftIcon = icon && centered ? {paddingLeft: 90} : {};
        const editableOrNotNormal = editable ? {...styles.text, ...parentStyle} : {...styles.text, ...styles.disabledInput, ...parentStyle};
        const editableOrNotMultiple = editable ? {...styles.text, ...styles.textMultiple, ...parentStyle} : {...styles.text, ...styles.disabledInput, ...styles.textMultiple, ...parentStyle};
        const loginFormOrNot = loginForm ? {...styles.text, ...styles.textErrorLogin, ...this.getInputFloatingStyle()} : styles.textError;
        return (
            <View style={normal ? {...style} : themes.mlFix}>
                {
                    topLabel ?
                        <View style = {styles.upperLine}>
                            <Text style = {styles.label}>
                                { topLabel }
                            </Text>
                        </View > : null
                }
                { (floatingLabelUseIcon && (this.state.focused || renderValue)) ?
                    <Label style={styles.floatingInputLabel} >{(i18n(label) || i18n(name))}</Label>
                    :
                    null}
                <Item {...this.props}
                      style={normal ? normalInputItemStyle : styles.inputVItem}
                      error={this.showError()}>
                    { icon && !floatingLabelUseIcon ? <Image style={ centered ? styles.inputIconCentered : styles.inputIcon} source={staticIcons[icon]}/> : null}
                    { !icon && floatingLabelUseIcon ? <View style={ styles.inputFakeIcon}/> : null}
                    { floatingLabelUseIcon ? <Image style={styles.floatingWithIcon} source={staticIcons[icon]}/> : null}
                    { inlineLabel ? <Label style={styles.inputLabel} >{(label || name)}</Label> : null}
                    { multiline ?
                        <TextInput
                            value={ renderValue }
                            name={name}
                            maxLength={currency ? localMaxLength : maxLength}
                            placeholder={showPlaceholder ? i18n(placeholder) : null}
                            secureTextEntry={secure}
                            keyboardType={keyboardType}
                            editable={editable}
                            onEndEditing={this.handleOnEndEditing}
                            onFocus={this.handleOnFocus}
                            onChangeText={(text) => {
                                this.counterChars(text);
                                this.handleOnChangeText(text);
                                this.onChangeText(name, text);
                            }
                            }
                            style={this.showError()? {...loginFormOrNot, ...paddingLeftIcon, ...this.getStyleFloatingField()} : {...editableOrNotMultiple, ...paddingLeftIcon, ...this.getStyleFloatingField()}}
                            underlineColorAndroid='transparent'
                            multiline
                            placeholderTextColor={editable ? themes.form[normal ? "inputPlaceholderNormal" : "inputPlaceholder"].color : '#000f23'}
                        />
                        :
                        <Input value={ value }
                               name={name}
                               maxLength={currency ? localMaxLength : maxLength}
                               placeholder={showPlaceholder ? i18n(placeholder) : null}
                               secureTextEntry={secure}
                               keyboardType={keyboardType}
                               editable={editable}
                               onEndEditing={this.handleOnEndEditing}
                               onFocus={this.handleOnFocus}
                               onChangeText={(text) => {
                                   this.counterChars(text);
                                   this.handleOnChangeText(text);
                                   this.onChangeText(name, text);
                               }
                               }
                               style={this.showError()? {...loginFormOrNot,  ...paddingLeftIcon, ...this.getStyleFloatingField()} : {...editableOrNotNormal,  ...paddingLeftIcon, ...this.getStyleFloatingField()}}
                               placeholderTextColor={editable ? themes.form[normal ? "inputPlaceholderNormal" : "inputPlaceholder"].color : '#7a868c'}
                        />
                    }
                </Item>
                { (useCounterIncrement && maxLength) ?
                    <View>
                        <Text style={styles.counterChars}>{this.state.length + ' / ' + maxLength}</Text>
                    </View>
                    : null
                }
                { helper ? renderHelper : null}
                <FieldError errors={errors} isVisible={this.showError()} rounded={rounded} floatingField={floatingLabelUseIcon}/>
            </View>
        )
    }
}

Inputv.contextTypes = {
    form: PropTypes.object,
    constraints: PropTypes.object
};

Inputv.propTypes = {
    transparent: PropTypes.bool,
    normal: PropTypes.bool,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    multiline: PropTypes.bool,
    secure: PropTypes.bool,
    centered: PropTypes.bool,
    icon: PropTypes.string,
    helper: PropTypes.string,
    maxLength: PropTypes.number,
    floatingLabel: PropTypes.bool,
    inlineLabel: PropTypes.bool,
    right: PropTypes.bool,
    fieldName: PropTypes.string,
    onChangeTextProps: PropTypes.func
};

Inputv.defaultProps = {
    editable: true
};

export { Inputv };
