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

export default class BranchListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            myBranch    : props.branch,
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.container2}>
                    <TouchableOpacity style={styles.title}
                        onPress={this.props.onChildClick}>
                        <Text style={styles.textTitle}>{this.state.myBranch.name}</Text>
                        <Text style={styles.textDistance}>{this.state.myBranch.distance}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.buttonLink}
                    onPress={this.props.onChildInfoClick}>
                    <Text>i</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonLink}
                    onPress={this.props.onChildTimeClick}>
                    <Text>T</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
	container: {
        flexDirection: 'row',
        height: menuHeight,
        borderColor: '#7ec0ee',
        borderWidth: 0.25,
	},
    container2: {
        flex:0.9,
	},
    title: {
        flex:0.9,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:5,
        marginTop:5,
        marginBottom:5,
    },
    textTitle:{
        flex:0.75, 
        fontSize: 14,
        color: 'black',
    },
    textDistance:{
        flex:0.15, 
        fontSize: 14,
        color: '#C0C0C0',
    },
    buttonLink:{
        flex:0.1,
        borderColor: '#7ec0ee',
        borderWidth: 0.5,
        backgroundColor: '#f5f5dc',
        alignItems:'center',
        justifyContent:'center',
    }
});