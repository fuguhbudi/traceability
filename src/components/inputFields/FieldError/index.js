import React, {Component} from "react";
import {Item, Text} from "native-base";
import {PropTypes} from "helpers/common";
import styles from "./style";

const FieldError = ({errors, isVisible, rounded, style}) => {
    return errors && errors.length && isVisible ? (
        <Item style={{
                    ...styles.inputValidationMsg,
                    ...(rounded ? styles.inputValidationRounded : {}),
                    ...style
                }}>
            <Text style={styles.inputErrorText}>
                {errors[0]}
            </Text>
        </Item>
    ) : null;
};

FieldError.propTypes = {
    errors: PropTypes.array,
    isVisible: PropTypes.bool
};

export default FieldError;