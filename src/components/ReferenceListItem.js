import React, {Component, PropTypes} from 'react';
import {
    Alert,
	StyleSheet,
	View,
	Image,
	Platform,
	Text,
    TouchableOpacity,
} from 'react-native';


let menuHeight = Platform.OS === 'ios' ? 50 : 40;


export default class ReferenceListItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>{this.props.reference.name}</Text>
                    <Text style={styles.textDistance}>{this.props.reference.code}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
	container: {
        padding: 5,
        height: menuHeight,
        borderColor: '#7ec0ee',
        borderWidth: 0.25,
        backgroundColor: '#f5f5dc'
	},
	title: {
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
	},
    textTitle:{
        flex:0.8, 
        fontSize: 14,
        color: 'black',
    },
    textDistance:{
        flex:0.2, 
        fontSize: 14,
        color: '#C0C0C0',
    },
});