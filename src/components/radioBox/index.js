import React from "react";
import { TouchableOpacity } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, View, Button } from 'native-base';
import {PropTypes, i18n, themes} from "helpers/common";
import {validation} from "helpers/utils";
import styles from "./style";

const RadioBox = ({buttons, type}, context) => {
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
                    ...(type !== "inline" ? styles.buttonItemStacked : {})
                }}>
                    <ListItem style={styles.boxItem} block {...button.props} selected={id === button.selected} button={true} onPress={() => handleOnPress(button.onPress)}>
                        <Left style={{flex: 1}}>
                            <Radio selected={id === button.selected} color={'#000f23'} selectedColor={'#14af96'} onPress={() => handleOnPress(button.onPress)} />
                        </Left>
                        <Right style={{flex: 8, alignItems: 'flex-start'}}>
                            <Text style={(button.props && button.props.fontStyle)?
                                {...styles.buttonItemText, ...button.props.fontStyle}:styles.buttonItemText}>{i18n(button.text)}
                            </Text>
                        </Right>
                    </ListItem>
                </View>
            ))}
        </View>
    )
};

RadioBox.contextTypes = {
    form: PropTypes.object,
    bind: PropTypes.func
};

RadioBox.propTypes = {
    buttons: PropTypes.array.isRequired,
    type: PropTypes.string
};

export default RadioBox;