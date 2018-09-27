import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  DeviceEventEmitter 
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";
import Util from "helpers/Util";

export default class CustomerScreen extends Component{
	constructor(props){
		super(props);

		this.state = {
			title 		:'Customer',
			accountName : Globals.account.name,
			accountNo 	: Globals.account.accountNumber,
			accountType : Globals.account.cardType
		}
	}


	render(){
		return(
			<View style={styles.container}>		
		        <Text style={styles.titleText}>
		        	Let us confirm your account
		        </Text>
		        <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
			        <Text style={styles.leadText}>
			        	Account Holder
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	editable={false}
				        value={this.state.accountName}
			        />
		        </View>
		        <View style={{flexDirection:'row', marginTop:'2%', justifyContent:'center'}}>
			        <Text style={styles.leadText}>
			        	Account Number
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	editable={false}
				        value={this.state.accountNo}
			        />
		        </View>
		        <View style={{flexDirection:'row', marginTop:'2%', justifyContent:'center'}}>
			        <Text style={styles.leadText}>
			        	Account Type
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	editable={false}
				        value={this.state.accountType}
			        />
		        </View>
		        <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
					<View style={styles.button}>
						<Button
						  	onPress={()=>{this.gotoPrevScreen()}}
						  	title="Cancel"/>
				  	</View>
					<View style={styles.button}>
						<Button
						  	onPress={()=>{this.gotoNextScreen()}}
						  	title="Proceed"/>
				  	</View>
		        </View>
			</View>
		);
	}

	gotoNextScreen(){
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
  	leadText:{
  		flex:0.4,
	    color: '#000',
	    fontSize: 14,
	    marginLeft:'5%',
	    alignSelf:'center'
  	},
  	inputText:{
  		flex:0.55,
	    marginRight:'5%',
	    color: '#000',
	    fontSize: 14,
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	button:{
	    alignSelf: 'center',
	    marginLeft: 10,
	    marginRight: 10,
	    width:100
  	},
})