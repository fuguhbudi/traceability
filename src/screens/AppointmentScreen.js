import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  NativeModules,
  DeviceEventEmitter 
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";
import ReferenceListItem from "components/ReferenceListItem";

var util = NativeModules.PrimeMobileUtil;


var refTable = [
  {name: 'Cash Deposit', code:'A012'},
  {name: 'Cash Witdrawal', code:'A012'},
  {name: 'Open Deposit Account', code:'B001'},
];

export default class AppointmentScreen extends Component{
	constructor(props){
		super(props);
		const {params} = this.props.navigation.state;
		this.state = {
			title 	:'Appointment',
			branch 	: params.branch,
			date	: params.date,
			time 	: params.time,
			appointmentCode 	: params.appointmentCode,
		}

		refTable = Globals.transactions;
	}


	render(){
		return(
			<View style={styles.container}>		
		        <Text style={styles.titleText}>
		        	You have successfully book an appointment
		        </Text>		

		        <View style={styles.appointmentBox}>
	        		<Image
				        style={styles.icon}
				        source={require('assets/img/marker.png')}/>
			        <Text style={styles.contentText}>
			        	{this.state.branch.address}
			        </Text>
		        </View>
		        <View style={styles.appointmentBox}>
	        		<Image
				        style={styles.icon}
				        source={require('assets/img/calendar.png')}/>
			        <Text style={styles.contentText}>
			        	{this.state.date}
			        </Text>
		        </View>
		        <View style={styles.appointmentBox}>
	        		<Image
				        style={styles.icon}
				        source={require('assets/img/clock.png')}/>
			        <Text style={styles.contentText}>
			        	{this.state.time}
			        </Text>
		        </View>

		        <Text style={styles.subtitleText}>
		        	Your appointment code:
		        </Text>

		        <View style={styles.codeBox}>
			        <Text style={styles.codeText}>
			        	{this.state.appointmentCode}
			        </Text>
			        <Text style={styles.codeText2}>
			        	Please retain this appointment code for future reference
			        </Text>
		        </View>


		        <Text style={styles.subtitleText}>
		        	Your reference numbers:
		        </Text>
		        
		        {this.renderReferences()}

		        <Text style={styles.subtitleText}>
		        	Thank you! We are looking forward to see you!
		        </Text>
				<View style={styles.buttonEnd}>
					<Button
					  	onPress={()=>{this.gotoNextScreen()}}
					  	title="OK"/>
			  	</View>
			</View>
		);
	}

	renderReferences(){
		const self = this
		return(
			<View style={styles.refBox}>
			<ScrollView >
				{refTable.map(function(ref,index){
						return (<ReferenceListItem key={index} reference={ref} />);
					})
				}
	        </ScrollView>  
	        </View>
		);
	}

	gotoNextScreen(){
		Globals.transactions = undefined;
		Globals.appointmentId = undefined;
		const {navigate, dispatch} = this.props.navigation;
		dispatch(
			NavigationActions.reset({
		      index: 0,
		      actions: [
		        NavigationActions.navigate({ routeName: 'SelectModeScreen' })
		      ]
		    })
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
  	subtitleText:{
	    color: '#000',
	    fontSize: 16,
		marginTop:'2.5%',
	    marginLeft:'5%',
	    marginRight:'5%',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
	appointmentBox:{
		flexDirection:'row', 
		alignItems:'flex-start',
		marginTop:'2.5%',
	    marginLeft:'5%',
	    marginRight:'5%',
	},
  	icon:{
	  	resizeMode:'contain',
	    alignSelf: 'center',
	  	height:20,
	  	width:20,
	  	margin:'2.5%',
  	},
  	contentText:{
  		flex:1,
	    color: '#000',
	    fontSize: 14,
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	codeBox:{
	    justifyContent: 'center',
	    borderWidth: 0.5,
	    borderColor: '#000000',
        backgroundColor: '#7ec0ee',
	    marginTop:'2.5%',
	    marginLeft:'5%',
	    marginRight:'5%',
	    padding:'2.5%'
  	},
  	codeText:{
	    color: '#FFFFFF',
	    fontSize: 30,
	    fontWeight: 'bold',
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
	    margin:'2.5%',
  	},
  	codeText2:{
	    color: '#FFFFFF',
	    fontSize: 12,
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
	    margin:'1.25%',
  	},
  	refBox:{
	    borderWidth: 0.5,
	    borderColor: '#000',
	    marginTop:'2.5%',
	    marginBottom:'2.5%',
	    marginLeft:'5%',
	    marginRight:'5%',
	    height:'20%'
  	},
  	buttonEnd:{
	    alignSelf: 'flex-end',
	    alignItems: 'flex-end',
	    marginTop:'2.5%',
	    marginRight:'5%',
	    width:'25%'
  	},
})