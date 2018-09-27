import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  DeviceEventEmitter 
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";

var util = NativeModules.PrimeMobileUtil;

export default class HomeScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			title:'Home'
		}
	}

	gotoNextScreen(mode){
		const {navigate, dispatch} = this.props.navigation;
		if(mode=="nasabah"){
			navigate('LoginScreen');
		}else if(mode=="non"){
			navigate('CustomerScreen');
		}
		// else if(mode=="appointment"){
			// navigate('AppointmentScreen');
		// }
	}

	render(){
		return(
			<View style={styles.container}>		
		        <Text style={styles.titleText}>
		        	{this.state.title}
		        </Text>
				<View style={styles.container2}>
					<View style={styles.button}>
				        <Button
						  	onPress = {()=>{this.gotoNextScreen("nasabah")}}
						  	title = "Nasabah"
						  	color = "#000000"/>
				  	</View>
					<View style={styles.button}>
						<Button
						  	onPress={()=>{this.gotoNextScreen("non")}}
						  	title="Bukan Nasabah"/>
				  	</View>
			  	</View>
			</View>
		);
	}


	gotoPrevScreen(){
		const {goBack} = this.props.navigation;
		goBack();
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
  	},
  	container2: {
		flex: 1,
		alignItems: 'center',
	    justifyContent: 'center',
  	},
  	titleText:{
	    color: '#000',
	    fontSize: 18,
	    fontWeight: 'bold',
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	button:{
	    marginBottom: 10,
	    width:170
  	},
})