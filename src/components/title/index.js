import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {PropTypes} from 'helpers/common';
import styles from './style';

const Title = ({ children, style, containerStyle }) => {
    return (
        <View style={[styles.titleContainer, containerStyle]}>
            {children}
        </View>
    );
};

Title.propTypes = {
};

export default Title;