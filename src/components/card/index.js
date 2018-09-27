import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import {PropTypes} from 'helpers/common';
import styles from './style';

const Card = ({ children, style, containerStyle, title, titleStyle }) => {
    return (
        <View style={[styles.cardContainer, containerStyle]}>
            {title ? <Text style={{...styles.title, ...titleStyle}}>{title}</Text> : null}
            {children}
        </View>
    );
};

Card.propTypes = {
};

export default Card;