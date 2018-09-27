import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {PropTypes} from 'helpers/common';
import styles from './style';

const Body = ({ children, style }) => {
    return (
        <View style={{...styles.titleContainer, ...style}}>
            {children}
        </View>
    );
};

Body.propTypes = {
};

export default Body;