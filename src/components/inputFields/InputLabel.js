import React from "react";
import {View, Text} from "react-native";
import {themes, i18n, PropTypes} from "helpers/common";
import styles from "./styles";

const InputLabel = ({label,isRequired}) => {
    return (
        <View>
            <Text style = {styles.label}>{i18n(label)}{isRequired? <Text style={styles.starColor}> *</Text> : null}</Text>
        </View>
    )
};

export default InputLabel;

InputLabel.propTypes = {
  isRequired: PropTypes.bool,
  label: PropTypes.string
};