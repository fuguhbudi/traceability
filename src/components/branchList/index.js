import React from "react";
import {Image} from 'react-native';
import {View, Button, Text} from "native-base";
import {PropTypes, i18n, themes, staticIcons} from "helpers/common";
import {validation} from "helpers/utils";
import styles from "./style";

const BranchList = ({lists, type}, context) => {
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
                <Button style={{...styles.infoBranch, ...(id === item.selected ? styles.selectedBranch : {})}} onPress={() => handleOnPress(item.onPressInfo)}>
                    <View style={styles.branchIconWrapper}>
                        <Image source={staticIcons.info}/>
                        <Text style={styles.branchIconText}>{i18n('info').toUpperCase()}</Text>
                    </View>
                </Button>
                <Button style={{...styles.branchItem, ...(id === item.selected ? styles.selectedBranch : {})}} onPress={() => handleOnPress(item.onPress)}>
                    <View style={styles.branchItemBody}>
                        <Text style={styles.titleText}>{i18n(item.name)}</Text>
                        <Text style={styles.branchDistanceText}>{i18n(item.distance)} KM</Text>
                        <Text style={styles.branchAddressText}>{i18n(item.location)}</Text>
                    </View>
                </Button>
            </View>
        ))
    )
};

BranchList.contextTypes = {
    form: PropTypes.object,
    bind: PropTypes.func
};

BranchList.propTypes = {
    lists: PropTypes.array.isRequired,
    type: PropTypes.string
};

export default BranchList;