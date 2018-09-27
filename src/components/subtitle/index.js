import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {PropTypes} from 'helpers/common';
import styles from './style';

const Subtitle = ({ children, style, containerStyle }) => {
    return (
        <View style={[styles.titleContainer, containerStyle]}>
            <Text style={[styles.text, style]}>
                {children}
            </Text>
        </View>
    );
};

Subtitle.propTypes = {
};

export default Subtitle;