import React from 'react';
import {StatusBar} from 'react-native';
import {Root, StyleProvider} from "native-base";
import getTheme from 'themes/overrides/components';
import BDS from 'themes/variables';
import AppNavigator from './navigators/AppNavigator';
import {Provider} from 'react-redux';
import store from 'helpers/redux/store';

export default () =>
    <Root>
        <Provider store={store}>
            <StyleProvider style={getTheme(BDS)}>
                <AppNavigator/>
            </StyleProvider>
        </Provider>
    </Root>

//Dont remove this line : Disable Yellow Box Warning Globaly
console.disableYellowBox = true;