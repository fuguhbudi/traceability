import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  DeviceEventEmitter,
  Dimensions
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";
import Util from "helpers/Util";

import { Calendar } from 'react-native-calendars';

var marginTop = Platform.OS === 'ios'? 50 : 0;
const window = Dimensions.get('window');

export default class SelectTimeScreen extends Component{
	constructor(props){
		super(props);
		const {params} = this.props.navigation.state;
		this.state = {
			title 	:'Select Time',
			loading 	: false,
		}
	}


	render(){
		var maxDate = new Date();
		maxDate.setDate(maxDate.getDate() + 2);
		return (
			<View style={styles.container}>
			  	{this.renderLoadingModal()}
				<Text style={styles.titleText}>
		        	Please Select Your Prefered Date
		        </Text>
		        <Calendar
					// Initially visible month. Default = Date()
					// current={'2012-03-01'}
					// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
					minDate={Date()}
					// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
					maxDate={maxDate}
					onDayPress={(day) => {
					  		console.log('selected day', day);
					  		this.selectDay(day);
					 	}
					}
					// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
					monthFormat={'MMM yyyy'}
					// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
					firstDay={1}
				/>
				<Text style={styles.descText}>
		        	P.S: You can book up to 48 hours before your preferable appointment date.
		        </Text>
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

	selectDay(day){

		var d = new Date(day.timestamp);
		var weekday = new Array(7);
		weekday[0] = "Sunday";
		weekday[1] = "Monday";
		weekday[2] = "Tuesday";
		weekday[3] = "Wednesday";
		weekday[4] = "Thursday";
		weekday[5] = "Friday";
		weekday[6] = "Saturday";

		var n = weekday[d.getDay()];

		var date = this.formatDate(d);

		var params = { day : n, date :date , dateString : day.dateString};
		Alert.alert(
				'QMS',
				'Do you wish to select this day? '+n+' '+date,
				[
				    {text: 'Yes', onPress: () => {
						console.log(this.state.selectedService);

						this.gotoNextScreen(params);
					}},
				],
				{ cancelable: true }
			)
	}

	formatDate(date) {
	  var monthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  ];

	  var day = date.getDate();
	  var monthIndex = date.getMonth();
	  var year = date.getFullYear();

	  return day + ' ' + monthNames[monthIndex] + ' ' + year;
	}

	gotoNextScreen(params){
		const {navigate, dispatch} = this.props.navigation;
		var param = {"latitude": '-', "longitude": '-',"date":params.dateString}
		console.log(param);
		var method = "branch";
		if(params.day=="Sunday" || params.day=="Saturday"){
			method += "/special";
		}

		this.setState({'loading':true});
		Util.invokeMethod("GET",method,
		    JSON.stringify(param),
		    (result)=>{
				this.setState({'loading':false});
		    	console.log(result);
		    	branches = result.payload;
		    	params.branches = branches;

				navigate('SelectBranchScreen',params);
			}, (error)=>{
				this.setState({'loading':false});
				Alert.alert(
					'QMS',
					error,
					[
					    {text: 'Ok', onPress: () => {
							
						}},
					],
					{ cancelable: true }
				);
			}
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
		justifyContent:'center',
    	marginTop:marginTop,
  	},
  	titleText:{
	    color: '#000',
	    fontSize: 18,
	    margin:20,
	    fontWeight: 'bold',
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	descText:{
	    color: '#000',
	    fontSize: 14,
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
	    marginTop:20,
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
