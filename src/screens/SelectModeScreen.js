import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Platform,
  DeviceEventEmitter
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";

import Util from "helpers/Util";

var radio_props = [
  {label: 'Customer Service', value: 0 },
  {label: 'Teller', value: 1 }
];

var marginTop = Platform.OS === 'ios'? 20 : 0;

export default class SelectModeScreen extends Component{
	constructor(props){
		super(props);
		// const {params} = this.props.navigation.state;

		this.state = {
			title:'Pick Mode',
			value: 0,
			services: [],
			services2: [],
			selectedService: 'Open Account Deposit',
			loading :true,
		}
	}

	componentWillMount(){
		var params = {};
		var param1 = {"businessType":"TS"};
		var param2 = {"businessType":"CS"};
		Util.invokeMethod("GET","servicetype",
		    JSON.stringify(param1),
		    (result)=>{
		    	console.log(result);
		    	params.services = result.payload;

				Util.invokeMethod("GET","servicetype",
			    JSON.stringify(param2),
			    (result2)=>{
			    	console.log(result2);
			    	params.services2 = result2.payload;

					this.setState({
						services: params.services,
						services2: params.services2,
						loading:false
					});
				}, (error)=>{
				}
			);
			}, (error)=>{
			}
		);
	}
	render(){
		Globals['modeScreen'] = this.props.navigation.state.key;
		return (
			<View style={styles.container}>
		        <Text style={styles.titleText}>
		        	What kind of transaction do you wish to do?
		        </Text>
				<RadioForm
			        radio_props={radio_props}
			        initial={0}
			        animation={false}
			        onPress={(value) => {this.setState({value:value})}}
			        buttonSize={10}
			        style={styles.radio}
		        />

				<Text style={styles.titleText}>
		        	Action
		        </Text>

				{this.renderPicker()}

				<View style={styles.button}>
					<Button
					  	onPress={()=>{this.gotoNextScreen()}}
					  	title="Next"/>
			  	</View>
			</View>
		);
	}

	serviceItems(){
		const srvItems = [];
		if(this.state.value == 0){
			for (var i = 0; i < this.state.services2.length; i++) {
				s = this.state.services2[i];
				srvItems.push(<Picker.Item key={i} value={s} label={s} />);
			}
		}else{
			for (var i = 0; i < this.state.services.length; i++) {
				s = this.state.services[i];
				srvItems.push(<Picker.Item key={i} value={s} label={s} />);
			}
		}
		return srvItems;
	}

	renderPicker(){
		if(!this.state.loading){
			if(Platform.OS=='ios'){
				return(
					<Picker
	                    selectedValue={this.state.selectedService}
	                    onValueChange={ (service) => ( this.setState({selectedService:service}) ) } >

	                    {this.serviceItems()}

	                </Picker>
				);
			}
			else{
				return(
					<Picker
						style={styles.picker}
	                    selectedValue={this.state.selectedService}
	                    onValueChange={ (service) => ( this.setState({selectedService:service}) ) } >

	                    {this.serviceItems()}

	                </Picker>
				);
			}
		}
	}

	gotoNextScreen(){
		const {navigate, dispatch} = this.props.navigation;
		console.log(this.state.selectedService);
		navigate('TransactionScreen',{ mode:this.state.selectedService, service:this.state.value });
	}

	gotoPrevScreen(){
		const {goBack} = this.props.navigation;
		goBack();
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent:'center',
    	top: marginTop,
  	},
  	titleText:{
	    color: '#000',
	    fontSize: 18,
	    fontWeight: 'bold',
  		alignItems:'flex-start',
	    marginLeft: '6%',
	    marginRight: '6%',
  	},
  	button:{
	    alignSelf: 'center',
	    marginLeft: 10,
	    marginRight: 10,
	    width:100
  	},
  	radio:{
  		alignItems:'flex-start',
	    marginLeft: '6%',
	    marginTop: '2.5%',
	    marginBottom: '2.5%',
  	},
  	picker:{
  		alignItems:'flex-start',
	    marginLeft: '6%',
	    marginRight: '6%',
	    marginTop: '2.5%',
	    marginBottom: '2.5%',
  	}
})
