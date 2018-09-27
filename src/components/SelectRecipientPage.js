import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Navigator,
    StatusBar,
    TouchableOpacity,
    TouchableHighlight,
	Platform,
    ListView
} from 'react-native';

import OtherReceipt from './SelectOtherReceipt';
import MyReceipt from './SelectOwnReceipt';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import DestinationData from '../data/DestRekData.json'
import OwnData from '../data/MyCard.json'

let marginTop = Platform.OS === 'ios' ? 65 : 55;

import Util from 'helpers/Util';
import Globals from 'helpers/Globals';

let sortData = DestinationData.list.sort((a,b) => a.name.localeCompare(b.name));
let ds = null;

export default class SelectRecipientPage extends Component {

    constructor(props){
        super(props);

        var DestinationData = require('../data/DestRekData.json');
        var ownData = require('../data/MyCard.json');
        this.state = {
            dataSource: DestinationData.list,
            ownSource: ownData.list,
        };
    }

    setReceiptIndex = (index, condition) => {
        let datax = undefined;
        let recipient = undefined;
        if(condition === "other"){  //rekening lain
            var otherCardDatax = this.state.dataSource;
            for(let i=0; i<otherCardDatax.length; i++){
                if(otherCardDatax[i].id == index){
                    recipient = otherCardDatax[i];
                    break;
                }
            }
        }else{  //rekening sendiri
            var myCardDatax = this.state.ownSource;
            for(let i=0; i<myCardDatax.length; i++){
                if(myCardDatax[i].id == index){
                    recipient = myCardDatax[i];
                    break;
                }
            }
        }
        this.props.setBeneficiary(recipient,condition);
    }

    render() 
    {
        if(Globals.mode == "guest"){
            return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <ScrollableTabView
                            tabBarUnderlineStyle={{backgroundColor:'#FFC300'}}
                            tabBarBackgroundColor={'#FFF'}
                            tabBarActiveTextColor={'black'}
                            tabBarInactiveTextColor={'black'}
                            tabBarTextStyle={{fontSize:13, textAlign: 'center'}}
                            renderTabBar={() => <DefaultTabBar />}>
                            <OtherReceipt instance={this} listCard={this.state.dataSource}
                                tabLabel="Beneficiary Account"></OtherReceipt>
                        </ScrollableTabView>
                    </View>
                </View>
            );

        }else{
            return (
                <View style={styles.container}>
                    <View style={styles.row}>
                        <ScrollableTabView
                            tabBarUnderlineStyle={{backgroundColor:'#FFC300'}}
                            tabBarBackgroundColor={'#FFF'}
                            tabBarActiveTextColor={'black'}
                            tabBarInactiveTextColor={'black'}
                            tabBarTextStyle={{fontSize:13, textAlign: 'center'}}
                            renderTabBar={() => <DefaultTabBar />}>
                            <MyReceipt indexCard={this.props.rekening} instance={this} 
                                tabLabel="Own Account" carddata ={this.state.ownSource}></MyReceipt>
                            <OtherReceipt instance={this} listCard={this.state.dataSource}
                                tabLabel="Other Account"></OtherReceipt>
                        </ScrollableTabView>
                    </View>
                </View>
            );

        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    row: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        flex: 1,
        backgroundColor: '#ebebeb'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: marginTop,
        backgroundColor: 'white'
    },
    burger: {
        marginLeft: 10,
        width: 20,
        height: 20,
        resizeMode : 'contain'
    },
    menu: {
        flex: 0.1,
        flexDirection: 'column',
        height: marginTop-20,
        justifyContent: 'center'
    },
    title: {
        flex:0.7, 
        marginLeft: 20
    },
    
});