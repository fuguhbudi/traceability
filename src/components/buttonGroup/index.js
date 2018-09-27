import React from "react";
import {Image} from 'react-native';
import {View, Button, Text, Right, Left} from "native-base";
import {PropTypes, i18n, themes} from "helpers/common";
import {validation} from "helpers/utils";
import ButtonService from "components/buttonService";
import styles from "./style";

const ButtonGroup = ({buttons, type}, context) => {
    handleOnPress = (callback) => {
        const { form } = context;
        if(form){
            validation.setTouched(form);
            callback();
        }else{
            callback();
        }
    };

    return (
        <View style={{
            ...styles.buttonGroup,
            ...(type === "inline" ? themes.inlineContainer : {})
        }}>
            { buttons.map((button, id) => (
                <View key={id} style={{
                ...styles.buttonItemContainer,
                ...(type !== "inline" ? styles.buttonItemStacked : {}),
                ...(type !== "inline" ? (button.props && button.props.buttonContainerStyle) ? button.props.buttonContainerStyle : {} : {}),
            }}>
                    { button.props && button.props.request ?
                        (<ButtonService block {...button.props} onPress={() => handleOnPress(button.onPress)}>
                            {
                                button.icon ?
                                    <View style={styles.buttonWithIcon}>
                                        <Left style={themes.fl2}>
                                            <Text style={(button.props && button.props.fontStyle)?
                                                {...styles.buttonItemText, ...button.props.fontStyle}:(button.props && button.props.noFill?styles.buttonItemNofill : styles.buttonItemText)}>{i18n(button.text)}
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Image source={button.icon}/>
                                        </Right>
                                    </View>
                                    :
                                    <Text style={(button.props && button.props.fontStyle)?
                                        {...styles.buttonItemText, ...button.props.fontStyle}:(button.props && button.props.noFill?styles.buttonItemNofill : styles.buttonItemText)}>{i18n(button.text)}
                                    </Text>
                            }
                        </ButtonService>) :
                        (<Button block {...button.props} onPress={() => handleOnPress(button.onPress)}>
                            {
                                button.icon ?
                                    <View style={styles.buttonWithIcon}>
                                        <Left style={themes.fl2}>
                                            <Text style={(button.props && button.props.fontStyle)?
                                                {...styles.buttonItemText, ...button.props.fontStyle}:(button.props && button.props.noFill?styles.buttonItemNofill : styles.buttonItemText)}>{i18n(button.text)}
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Image source={button.icon}/>
                                        </Right>
                                    </View>
                                    :
                                    <Text style={(button.props && button.props.fontStyle)?
                                        {...styles.buttonItemText, ...button.props.fontStyle}:(button.props && button.props.noFill?styles.buttonItemNofill : styles.buttonItemText)}>{i18n(button.text)}
                                    </Text>
                            }
                        </Button>)
                    }
                </View>
            ))}
        </View>
    )
};

ButtonGroup.contextTypes = {
    form: PropTypes.object,
    bind: PropTypes.func
};

ButtonGroup.propTypes = {
    buttons: PropTypes.array.isRequired,
    type: PropTypes.string,
};

export default ButtonGroup;