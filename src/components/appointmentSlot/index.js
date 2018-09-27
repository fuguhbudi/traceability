import React from "react";
import {TouchableNativeFeedback} from 'react-native';
import {View, Text} from "native-base";
import {PropTypes, i18n, themes, staticIcons} from "helpers/common";
import {validation} from "helpers/utils";
import styles from "./style";

const AppointmentSlot = ({lists, type}, context) => {
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
        <View style={styles.ticketSlotContainer}>
            <View style={styles.tableHead}>
                <View style={styles.tableHeadTextWrapper}><Text style={styles.titleTextBlack}>{i18n('time')}</Text></View>
                <View style={styles.tableHeadTextWrapper}><Text style={styles.titleTextBlack}>{i18n('ticketsAvailable')}</Text></View>
            </View>
            {lists.map((item, id) => (
                <TouchableNativeFeedback key={id} {...item.props} onPress={() => handleOnPress(item.onPress)}>
                    <View style={{...styles.tableBody, ...(id === item.selected ? styles.selectedTable : {})}}>
                        <View style={styles.tableBodyTextWrapperLeft}><Text style={styles.subtitleTextBlack}>{i18n(item.start)} - {i18n(item.end)}</Text></View>
                        <View style={styles.tableBodyTextWrapperRight}><Text style={styles.subtitleTextBlack}>{i18n(item.remain)}</Text></View>
                    </View>
                </TouchableNativeFeedback>
            ))}
        </View>
    )
};

AppointmentSlot.contextTypes = {
    form: PropTypes.object,
    bind: PropTypes.func
};

AppointmentSlot.propTypes = {
    lists: PropTypes.array.isRequired,
    type: PropTypes.string
};

export default AppointmentSlot;