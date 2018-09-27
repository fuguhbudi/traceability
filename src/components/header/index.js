import React from "react";
import {Image, TouchableOpacity, TouchableWithoutFeedback, Text} from "react-native";
import {Header, Title, Button, Left, Right, Body, View} from "native-base";
import {themes, staticImages, staticIcons} from "helpers/common"
import PropTypes from "prop-types";
import styles from "./style";
import DateDisplay from 'components/dateDisplay';
import {StatusBar} from 'react-native';
import { NavigationActions } from 'react-navigation';

const ScreenHeader = ({navigation, icons, headerTitle, left, onBack, date, goBack}) => {
    let handleLeftButton;
    goHome = () => {
        navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'OnlineBooking'})]
        }));
    };
    return (
        <Header style={styles.headerContainer}>
            <StatusBar backgroundColor='#000f23'/>
            <Left style={{flex: 1}}>
                {
                    goBack ?
                        <TouchableOpacity onPress={goBack}>
                            <Image source={staticIcons.back}/>
                        </TouchableOpacity>
                        : null
                }
            </Left>
            <Body style={styles.headerContent}>
                <View style={themes.center}>
                    {
                        headerTitle ?
                            <Text style={styles.headerTitle}>{headerTitle}</Text> :
                            <TouchableOpacity>
                                <Image source={staticImages.logoWirecard}/>
                            </TouchableOpacity>
                    }
                </View>
            </Body>
            <Right style={{flex: 1}}>
                <TouchableOpacity onPress={this.goHome}>
                    <Image source={staticIcons.home}/>
                </TouchableOpacity>
            </Right>
        </Header>
    );
};

ScreenHeader.propTypes = {
    navigation: PropTypes.object,
    icons: PropTypes.object,
    title: PropTypes.string,
    left: PropTypes.string,
    onBack: PropTypes.func
};

export default ScreenHeader;