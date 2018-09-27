import React from "react";
import {TouchableNativeFeedback} from 'react-native';
import {View, Button, Text} from "native-base";
import {PropTypes, i18n, themes, staticIcons} from "helpers/common";
import {validation} from "helpers/utils";
import styles from "./style";
import DateDisplay from 'components/dateDisplay';

const AppointmentList = ({lists, type}, context) => {
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
            <TouchableNativeFeedback key={id} onPress={() => handleOnPress(item.onPress)} style={styles.cardContainer}>
                <View style={styles.cardWrapper}>
                    <View style={styles.branchItemBody}>
                        <Text style={styles.titleText}>{i18n('appointmentCode').toUpperCase()} : {item.appointmentCode}</Text>
                        {/* <Text style={styles.descriptionText}>{i18n('date')}: {item.start}<DateDisplay date={item.start} format={'hourMinute'}/></Text> */}
                        <Text style={styles.descriptionText}>{i18n('date')}: {item.start}</Text>
                        <Text style={styles.descriptionText}>{i18n('location')}: {item.location}</Text>
                        {/* <Text style={styles.descriptionText}>{i18n('created')} {item.createdDate}<DateDisplay date={item.createdDate} format={'dateSlash'}/></Text> */}
                        <Text style={styles.descriptionText}>{i18n('created')} {item.createdDate}</Text>
                    </View>
                    <View style={item.status === 'NEW' ? styles.status : {...styles.status, ...themes.borderErrorColor}}>
                        <Text style={styles.titleTextSmall}>{i18n(item.status)}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        ))
    )
};

AppointmentList.contextTypes = {
    form: PropTypes.object,
    bind: PropTypes.func
};

AppointmentList.propTypes = {
    lists: PropTypes.array.isRequired,
    type: PropTypes.string
};

export default AppointmentList;