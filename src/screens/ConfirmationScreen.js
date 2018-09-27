import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter 
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";
import Util from "helpers/Util";

export default class ConfirmationScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			title:'Confirmation'
		}
	}


	render(){
		return(
			<View style={styles.container}>		
		        <Text style={styles.titleText}>
		        	Welcome to QMS
		        </Text>
		        <Image
		        	style={styles.img}
				    source={require('assets/img/checkmark.png')}
		        />

		        <Text style={styles.titleText}>
		        	You are now signed is as Guest
		        </Text>
				<View style={styles.button}>
					<Button
					  	onPress={()=>{this.gotoNextScreen()}}
					  	title="Next"/>
			  	</View>
			</View>
		);
	}

	gotoNextScreen(mode){
		// var params = {};
		// var param1 = {"businessType":"TS"};
		// var param2 = {"businessType":"CS"};
		// Util.invokeMethod("GET","servicetype",
		//     JSON.stringify(param1),
		//     (result)=>{
		//     	console.log(result);
		//     	params.services = result.payload;

		// 		Util.invokeMethod("GET","servicetype",
		// 	    JSON.stringify(param2),
		// 	    (result2)=>{
		// 	    	console.log(result2);
		// 	    	params.services2 = result2.payload;

					const {navigate, dispatch} = this.props.navigation;
					navigate('SelectModeScreen');
		// 		}, (error)=>{
		// 		}
		// 	);
		// 	}, (error)=>{
		// 	}
		// );
	}

	gotoPrevScreen(){
		const {goBack} = this.props.navigation;
		goBack();
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent:'center'
  	},
  	titleText:{
	    color: '#000',
	    fontSize: 18,
	    fontWeight: 'bold',
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	img:{
	  	resizeMode:'contain',
	  	height:100,
	  	width:100,
	  	alignSelf:'center',
	  	margin:20
  	},
  	button:{
	    alignSelf: 'center',
	    marginTop: 20,
	    width:150
  	},
})