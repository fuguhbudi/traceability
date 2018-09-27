import React from "react";
import {Text} from "react-native";
// import {PropTypes} from 'helpers/common';
import {PropTypes} from 'prop-types';
import styles from "./style";
import moment from 'moment-timezone';

const DateDisplay = ({date, format, uppercase, countryCode}) => {
    let dateFormat;
    switch(format) {
        case "dateOnly":
            dateFormat = "D MMMM YYYY";
            break;
        case "short":
            dateFormat = "DD MMM YYYY - HH:mm:ss";
            break;
        case "dayDate":
            dateFormat = "dddd, DD MMM YYYY";
            break;
        case "hourMinute":
            dateFormat = "HH:mm";
            break;
        case 'dateSlash':
            dateFormat = "L";
            break;
        default:
            dateFormat = "DD MMM YYYY hh:mm A";
            break;
    }
    let value;

    switch(countryCode){
        case "MY":
            value = moment(Number(date)).tz("Asia/Kuala_Lumpur").format(dateFormat);
            break;
        case "ID":
            value = moment(Number(date)).tz("Asia/Jakarta").format(dateFormat);
            break;
        case "TH":
            value = moment(Number(date)).tz("Asia/Bangkok").format(dateFormat);
            break;
        case "SG":
            value = moment(Number(date)).tz("Asia/Singapore").format(dateFormat);
            break;
        case "KH":
            value = moment(Number(date)).tz("Asia/Phnom_Penh").format(dateFormat);
            break;
        default:
            value = moment(Number(date)).local().format(dateFormat);
            break;
    }
    const display = uppercase ? value.toUpperCase() : value;
    return (
        <Text style={format === "dayMonthOnly"? styles.dayMonthStyle: null}>{display}</Text>
    );
};

DateDisplay.propTypes = {
    date: PropTypes.any.isRequired,
    format: PropTypes.string
};

export default DateDisplay;