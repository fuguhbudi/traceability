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
  Keyboard
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";
import Util from "helpers/Util";

const window = Dimensions.get('window');

export default class RegistrationScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			title:'Register',
			loading : false,
		}
	}


	render(){
		return(
			<View style={styles.container}>
			  	{this.renderLoadingModal()}	
		        <Text style={styles.titleText}>
		        	Please fill in the details
		        </Text>
		        <View style={{flexDirection:'row', marginTop:'5%'}}>
			        <Text style={styles.leadText}>
			        	Email
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	keyboardType="email-address"
			        	multiline = {false}
				        onChangeText={(text) => this.setState({'email':text})}
				        placeholder="Enter Email"
			        />
		        </View>
		        <View style={{flexDirection:'row', marginTop:'2%'}}>
			        <Text style={styles.leadText}>
			        	Full Name
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	multiline = {false}
				        onChangeText={(text) => this.setState({'name':text})}
				        placeholder="Enter Name"
			        />
		        </View>
		        <View style={{flexDirection:'row', marginTop:'2%'}}>
			        <Text style={styles.leadText}>
			        	Contact Number
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	keyboardType='numeric'
			        	multiline = {false}
				        onChangeText={(text) => this.setState({'contact':text})}
				        placeholder="Enter Phone Number"
			        />
		        </View>
			    <View style={{flexDirection:'row', marginTop:'2%'}}>
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
			    <View style={{flexDirection:'row', marginTop:'2%'}}>
			        <Text style={styles.leadText}>
			        	Confirm Password
			        </Text>
			        <TextInput
			        	style={styles.inputText}
			        	multiline = {false}
			        	secureTextEntry = {true}
				        onChangeText={(text) => this.setState({'password2':text})}
				        placeholder="Enter password"
			        />
			    </View>
		        <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
					<View style={styles.button}>
						<Button
						  	onPress={()=>{
						  		Keyboard.dismiss();
						  		this.gotoPrevScreen()}}
						  	title="Cancel"/>
				  	</View>
					<View style={styles.button}>
						<Button
						  	onPress={()=>{
						  		Keyboard.dismiss();
						  		this.gotoNextScreen()}}
						  	title="Submit"/>
				  	</View>
		        </View>
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

	gotoNextScreen(){
		if(this.state.name == undefined || this.state.name == "" || 
            this.state.contact == undefined || this.state.contact == ""|| 
            this.state.email == undefined || this.state.email == "" ||
            this.state.password == undefined || this.state.password == "" || 
            this.state.password2 == undefined || this.state.password2 == ""){

            Alert.alert(
                'QMS',
                "Complete all fields!",
                [
                    {text: 'Ok', onPress: () => {
                        
                    }},
                ],
                { cancelable: true }
            );
        } else if( this.state.password !=  this.state.password2 ){
			Alert.alert(
                'QMS',
                "Password doesn't match!",
                [
                    {text: 'Ok', onPress: () => {
                        
                    }},
                ],
                { cancelable: true }
            );
        }else{
        	this.setState({'loading':true});
			var param = {"name": this.state.name,"phoneNumber": this.state.contact,"email": this.state.email,"password": this.state.password}
			console.log(param);
			Util.invokeMethod("POST","user/register",
			    JSON.stringify(param),
			    (result)=>{
			    	this.setState({'loading':false});
			    	console.log(result);

			    	const {navigate, dispatch} = this.props.navigation;
			    	Globals.mode = 'guest';
			    	Globals.account = undefined;
			    	var guest = {
		                name    : this.state.name,
		                contact : this.state.contact,
		                email   : this.state.email,
					};
					Globals.guest = guest;
					navigate('ConfirmationScreen');
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
	    marginRight:10,
	    alignSelf:'center'
  	},
  	inputText:{
  		flex:0.55,
	    color: '#000',
	    fontSize: 14,
	    marginRight:'5%',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	button:{
	    alignSelf: 'center',
	    marginLeft: 10,
	    marginRight: 10,
	    width:100
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