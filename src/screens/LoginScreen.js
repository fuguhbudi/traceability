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
  DeviceEventEmitter,
  Dimensions,
  Keyboard,
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";
import Util from "helpers/Util";

const window = Dimensions.get('window');

export default class LoginScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			title 	:'Login',
			account :'1447010016165080',
			card 	:'1231231231231231',
			pin 	:'123456',
			loading : false,
		}
	}

/*
<View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
			        <Text style={styles.leadText}>
			        	Account Number
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	multiline = {false}
			        	keyboardType='numeric'
				        onChangeText={(text) => 
				        	this.setState({account:text})
				        }
				        placeholder="Account Number"
			        />
		        </View>
		        <View style={{flexDirection:'row', marginTop:'2%', justifyContent:'center'}}>
			        <Text style={styles.leadText}>
			        	Card Number
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	multiline = {false}
			        	keyboardType='numeric'
				        onChangeText={(text) => this.setState({card:text})}
				        placeholder="Card Number"
			        />
		        </View>
*/
	render(){
		return(
			<View style={styles.container}>	
				<View style={styles.container2}>		
			        <Text style={styles.titleText}>
			        	Welcome to QMS
			        </Text>

			        <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
				        <Text style={styles.leadText}>
				        	User ID
				        </Text>
				        <TextInput
				        	style={styles.inputText}
			        		keyboardType="email-address"
				        	multiline = {false}
					        onChangeText={(text) => 
					        	this.setState({username:text})
					        }
					        placeholder="Enter username"
				        />
			        </View>
			        <View style={{flexDirection:'row', marginTop:'2%', justifyContent:'center'}}>
				        <Text style={styles.leadText}>
				        	Password
				        </Text>
				        <TextInput
				        	style={styles.inputText}
				        	multiline = {false}
				        	secureTextEntry = {true}
					        onChangeText={(text) => this.setState({'password':text})}
					        placeholder="Enter password"
				        />
			        </View>

			        
					<View style={styles.button}>
						<Button
						  	onPress={()=>{
						  		Keyboard.dismiss();
						  		this.login()}}
						  	title="LOG IN"/>
				  	</View>
					<View style={styles.button}>
						<Button
						  	onPress={()=>{
						  		Keyboard.dismiss();
						  		this.gotoNextScreen("signup")}}
						  	title="SIGN UP"/>
				  	</View>
				</View>
			  	{this.renderLoadingModal()}
		  	</View>
		);
	}

    renderLoadingModal = () => {
        if(this.state.loading){
            return (
                <View style={styles.overlayLoading}>
                    <Image
			        	style={styles.imgLoading}
					    source={require('assets/img/loading.gif')}
			        />
                </View>
            );
        } else{
            return null;
        }
    }

	login(){
		if(this.state.username == undefined || this.state.username == "" || 
            this.state.password == undefined || this.state.password == ""){

            Alert.alert(
                'QMS',
                "Complete all fields!",
                [
                    {text: 'Ok', onPress: () => {
                        
                    }},
                ],
                { cancelable: true }
            );
        }else{
			this.setState({'loading':true});
			var param = {"email": this.state.username,"password": this.state.password}
			Util.invokeMethod("POST","customer/login",
		    JSON.stringify(param),
		    (result)=>{
		    	this.getAccount();
			}, (error)=>{
				Alert.alert(
					'QMS',
					error,
					[
					    {text: 'Ok', onPress: () => {
							this.setState({'loading':false});
						}},
					],
					{ cancelable: true }
				);
			}
		);	
        }
	}

	getAccount(){
		var param = {"accountNumber": this.state.account,"cardNumber": this.state.card,"pin": this.state.pin}
		Util.invokeMethod("GET","customer",
		    JSON.stringify(param),
		    (result)=>{
		    	this.setState({'loading':false});
		    	console.log(result);
		    	var account 	= result.payload;
		    	Globals.mode 	= 'customer';
		    	Globals.account = account;
		    	Globals.guest 	= undefined;
				this.gotoNextScreen("login");
			}, (error)=>{
				Alert.alert(
					'QMS',
					error,
					[
					    {text: 'Ok', onPress: () => {
							this.setState({'loading':false});
						}},
					],
					{ cancelable: true }
				);
			}
		);
	}

	gotoNextScreen(mode,param){
		const {navigate, dispatch} = this.props.navigation;
		if(mode=="login"){
			navigate('CustomerScreen');
		}else if(mode=="signup"){
			navigate('RegistrationScreen');
		}
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
		justifyContent:'center',
	    zIndex:0,
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
  		flex:0.3,
	    color: '#000',
	    fontSize: 14,
	    marginLeft:'5%',
	    alignSelf:'center'
  	},
  	inputText:{
  		flex:0.6,
	    marginRight:'5%',
	    color: '#000',
	    fontSize: 14,
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	button:{
	    alignSelf: 'center',
	    marginTop: '5%',
	    width:150
  	},
  	overlayLoading:{
  		position: 'absolute', 
  		width:window.width, 
  		height:window.height, 
  		zIndex:99,
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor: 'black', 
        opacity: 0.5
  	},
  	imgLoading:{
	  	resizeMode:'contain',
	  	height:100,
	  	width:100,
  	},
})