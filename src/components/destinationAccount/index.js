import React from "react";
import {Image} from 'react-native';
import {View, Button, Text, Left, Body, Right, Radio, ListItem} from "native-base";
import {PropTypes, i18n, themes, staticIcons, staticImages} from "helpers/common";
import {validation} from "helpers/utils";
import styles from "./style";

const DestinationAccount = ({lists, type}, context) => {
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
        lists.map((item, id) => (
            <View key={id} style={themes.fldr}>
                <ListItem style={styles.selectAccount} block {...item.props} selected={id === item.selected} onPress={() => handleOnPress(item.onPress)}>
                    <View style={themes.fldr}>
                        <Left>
                            <Radio selected={id === item.selected} color={'#000f23'} selectedColor={'#14af96'} onPress={() => handleOnPress(item.onPress)} />
                        </Left>
                        <Body style={styles.destinationAccountCardBody}>
                            <Text style={styles.mediumTextBold}>{item.accountName}</Text>
                            <Text style={styles.mediumTextBold}>{item.accountNumber} ({item.currency})</Text>
                            <Text style={styles.mediumTextNormal}>{item.accountType}</Text>
                        </Body>
                        <Right style={themes.flp5}>
                            <Image source={staticImages.cardVisa}/>
                        </Right>
                    </View>
                </ListItem>
            </View>
        ))
    )
};

DestinationAccount.contextTypes = {
    form: PropTypes.object,
    bind: PropTypes.func
};

DestinationAccount.propTypes = {
    lists: PropTypes.array.isRequired,
    type: PropTypes.string
};

export default DestinationAccount;