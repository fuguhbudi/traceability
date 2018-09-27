import React, {Component} from 'react';
import {
  AppRegistry,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Modal,
  DeviceEventEmitter,
  Dimensions,
  Platform
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import Globals from "helpers/Globals";
import Util from "helpers/Util";
import BranchListItem from "components/BranchListItem";

const window = Dimensions.get('window');
var marginTop = Platform.OS === 'ios'? 50 : 0;

var branches = {};
var timeTable = [
  {time: '08:30 - 09:00', slot:'3'},
  {time: '09:01 - 09:30', slot:'0'},
  {time: '09:31 - 10:00', slot:'0'},
  {time: '10:01 - 10:30', slot:'1'},
  {time: '10:31 - 11:00', slot:'0'},
  {time: '11:01 - 11:30', slot:'2'},
  {time: '11:31 - 12:00', slot:'2'},
  {time: '12:01 - 12:30', slot:'1'},
  {time: '12:31 - 13:00', slot:'0'},
  {time: '13:01 - 13:30', slot:'3'},
  {time: '13:31 - 14:00', slot:'2'},
  {time: '14:01 - 14:30', slot:'0'},
  {time: '14:31 - 15:00', slot:'0'},
  {time: '15:01 - 15:30', slot:'4'},
  {time: '15:31 - 16:00', slot:'2'},
];

var { width, height } = Dimensions.get('window');

export default class SelectBranchScreen extends Component{
	constructor(props){
		super(props);
		const {params} = this.props.navigation.state;
		branches = params.branches;
		this.state = {
			title 		:'Select Branch',
			day 		: params.day,
			date 		: params.date,
			dateString 	: params.dateString,
			selBrances 	: branches[0],
			infoMoDalVisible : false,
			timeMoDalVisible : false,
			selTime 	: '-',
			loading 	: false,
		}
		// check gps enabled

		this.handleChildClick = this.handleChildClick.bind(this);
		this.handleChildInfoClick = this.handleChildInfoClick.bind(this);
		this.handleChildTimeClick = this.handleChildTimeClick.bind(this);
	}

	componentWillMount(){
		
	}

	handleChildClick(branch) {
    	this.setState({selBrances:branch})
  	}

  	handleChildInfoClick(branch) {
    	this.setState({selBrances:branch,
    					infoMoDalVisible:true})
  	}

	handleChildTimeClick(branch) {
		timeTable = branch.timeSlot;

    	this.setState({selBrances:branch,
    					timeMoDalVisible:true})
  	}

	render(){
		return(
			<View style={styles.container}>
			  	{this.renderLoadingModal()}
		        {this.renderInfoMondal()}
		        {this.renderTimeMondal()}

				<Text style={styles.titleText}>
		        	Your appointment date will be:
		        </Text>
		        <View style={styles.boxContainer}>
			        <Text style={styles.subtitleText}>
			        	{this.state.day}
			        </Text>
			        <Text style={styles.subtitleText}>
			        	{this.state.date}
			        </Text>
		        </View>

				<Text style={styles.titleText2}>
		        	Please select your branch or get nearest branches.
		        </Text>
		        
		        <View style={styles.addressBox}>
			        <Text>
			        	{this.state.selBrances.address}
			        </Text>
		        </View>
		        {this.renderNearestBranch()}
			</View>
		);
	}

	/*<View style={styles.searchBox}>
        <TextInput
        	style={styles.inputText}
        	multiline = {false}
	        placeholder="Search"
        />
	  	<Text style={styles.hintText}>
        	e.g. keyword "Sudirman" or zip code "11410"
        </Text>
    </View>*/

	renderNearestBranch(){
		const self = this
		return(
			<ScrollView style={styles.branchesBox}>
				{branches.map(function(branch,index){
						return (<BranchListItem key={index} branch={branch}
							onChildClick ={()=>self.handleChildClick(branch)}
							onChildInfoClick ={()=>self.handleChildInfoClick(branch)}
							onChildTimeClick ={()=>self.handleChildTimeClick(branch)}/>);
					})
				}
	        </ScrollView>
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

	renderInfoMondal(){
		return(
			<Modal
				visible = {this.state.infoMoDalVisible}
				transparent = {true}
				onRequestClose={() => this.closeInfoModal()}
				>
				<View style ={styles.modalContainer} >
					<View style ={styles.modal}>
						<Text style={styles.titleTextModal}>
				        	Information of {this.state.selBrances.name}:
				        </Text>
						<View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
			 				<View style={styles.boxContainerModal}>
						        <Text style={styles.subtitleTextModal}>
						        	Current Book Slots
						        </Text>
						        <Text style={styles.contentTextModal}>
						        	{this.state.selBrances.ticketPool}
						        </Text>
					        </View>
					        <View style={styles.boxContainerModal}>
						        <Text style={styles.subtitleTextModal}>
						        	Current Waiting Time
						        </Text>
						        <Text style={styles.contentTextModal}>
						        	{this.state.selBrances.waitingTime}
						        </Text>
				        	</View>
						</View>
				        <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
							<View style={styles.button}>
								<Button
								  	onPress={()=>{this.closeInfoModal()}}
								  	title="Ok"/>
						  	</View>
				        </View>
				    </View>
			    </View>
			    <View style ={styles.overlay}>
			    </View>
			</Modal>
		);
	}

	renderTimeMondal(){
		const self = this;
		return(
			<Modal
				visible = {this.state.timeMoDalVisible}
				transparent = {true}
				onRequestClose={() => this.closeTimeModal()}
				>
				<View style ={styles.modalContainer} >
					<View style ={styles.modal2}>
						<Text style={styles.titleTextModal}>
				        	Information of {this.state.selBrances.name}:
				        </Text>

				        <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
							<View style={styles.tableBoxModal}>
						        <Text style={styles.tableTitleTextModal}>
						        	Time
						        </Text>
				        	</View>
							<View style={styles.tableBoxModal}>
						        <Text style={styles.tableTitleTextModal}>
						        	Available Slots
						        </Text>
				        	</View>
			        	</View>
						{timeTable.map(function(schedule,index){
								if(schedule.slot==0)
									return (
										<View key={index} style={{flexDirection:'row', justifyContent:'center'}}>
											<View style={styles.tableBoxModalFull}>
										        <Text style={styles.tableContentTextModal}>
										        	{schedule.time}
										        </Text>
								        	</View>
											<View style={styles.tableBoxModalFull}>
										        <Text style={styles.tableContentTextModal}>
										        	FULL
										        </Text>
								        	</View>
							        	</View>
									);
								else
									if(schedule.time!=self.state.selTime){
										return (
											<TouchableOpacity key={index}
												onPress={() => {self.selectTime(schedule.time)}}>
												<View style={{flexDirection:'row', justifyContent:'center'}}>
													<View style={styles.tableBoxModal}>
												        <Text style={styles.tableContentTextModal}>
												        	{schedule.time}
												        </Text>
										        	</View>
													<View style={styles.tableBoxModal}>
												        <Text style={styles.tableContentTextModal}>
												        	{schedule.slot}
												        </Text>
										        	</View>
									        	</View>
							        		</TouchableOpacity>
										);
									}else{
										return (
											<TouchableOpacity key={index}
												onPress={() => {self.selectTime("-")}}>
												<View style={{flexDirection:'row', justifyContent:'center'}}>
													<View style={styles.tableBoxModalSelected}>
												        <Text style={styles.tableContentTextModal}>
												        	{schedule.time}
												        </Text>
										        	</View>
													<View style={styles.tableBoxModalSelected}>
												        <Text style={styles.tableContentTextModal}>
												        	{schedule.slot}
												        </Text>
										        	</View>
								        		</View>
								        	</TouchableOpacity>
										);
									}

							})
						}
				        <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
							<View style={styles.button}>
								<Button
								  	onPress={()=>{
								  		self.selectTime("-");
								  		this.closeTimeModal();
								  	}}
								  	title="Cancel"/>
						  	</View>
							<View style={styles.button}>
								<Button
								  	onPress={()=>{
								  		this.closeTimeModal();
								  		this.gotoNextScreen();
								  	}}
								  	title="Reserve"/>
						  	</View>
				        </View>
				    </View>
				    <View style ={styles.overlay}>
				    </View>
			    </View>
			</Modal>
		);
	}

	selectTime(time){
		this.setState({selTime:time});
	}

	closeInfoModal(){
		this.setState({infoMoDalVisible:false});
	}

	closeTimeModal(){
		this.setState({timeMoDalVisible:false});
	}

	gotoNextScreen(){
		this.setState({'loading':true});
		const {navigate, dispatch} = this.props.navigation;
		// request appointment code first
		console.log(this.state.selBrances)
		var time = this.state.selTime.split(" - ");
		var param = {
			"branchid": this.state.selBrances.id,
			"businesstype":"TS",
			"start":time[0],
			"end":time[1], 
			"date" :this.state.dateString,
			"appointmentId":Globals.appointmentId,
		};

		console.log(param);
		Util.invokeMethod("POST","appointment",
		    JSON.stringify(param),
		    (result)=>{
				this.setState({'loading':false});
		    	console.log(result);
		    	var aptCode = result.payload.appointCode;
		    	navigate('AppointmentScreen',{ branch : this.state.selBrances, date : this.state.date, time : this.state.selTime, appointmentCode : aptCode});
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

		// navigate('AppointmentScreen',{ branch : this.state.selBrances, date : this.state.date, time : this.state.selTime});
	}

	gotoPrevScreen(){
		const {goBack} = this.props.navigation;
		goBack();
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
    	marginTop: marginTop,
  	},
  	boxContainer:{
	    borderWidth: 0.5,
	    borderColor: '#7ec0ee',
	    padding:'7.5%',
	    marginLeft:'15%',
	    marginRight:'15%',
  	},
  	titleText:{
	    color: '#000',
	    fontSize: 18,
	    margin:'5%',
	    fontWeight: 'bold',
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	titleText2:{
	    color: '#000',
	    fontSize: 16,
	    margin:'5%',
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	subtitleText:{
	    color: '#000',
	    fontSize: 16,
	    margin:'2.5%',
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	searchBox:{
	    borderWidth: 0.5,
	    borderColor: '#d6d7da',
	    marginLeft:'5%',
	    marginRight:'5%',
  	},
  	addressBox:{
	    borderWidth: 0.5,
	    borderColor: '#7ec0ee',
	    marginTop:'2.5%',
	    marginLeft:'5%',
	    marginRight:'5%',
	    padding:'2.5%'
  	},
  	branchesBox:{
	    borderWidth: 0.5,
	    borderColor: '#000',
	    marginTop:'2.5%',
	    marginBottom:'5%',
	    marginLeft:'5%',
	    marginRight:'5%',
  	},
  	hintText:{
	    color: '#C0C0C0',
	    fontSize: 14,
	    margin:'1%',
  	},

	modalContainer: {
		flex:1,
		flexDirection:'row',
	    alignItems: 'center',
	    justifyContent: 'center',
  	},
  	modal:{
  		flex:1,
	    borderWidth: 0.5,
	    borderColor: '#7ec0ee',
	    alignSelf: 'center',
	    backgroundColor: 'white',
	    padding:'2.5%',
	    marginLeft:'5%',
	    marginRight:'5%',
	    zIndex:1,
  	},
  	titleTextModal:{
	    color: '#000',
	    fontSize: 18,
	    fontWeight: 'bold',
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	subtitleTextModal:{
	    color: '#7ec0ee',
	    fontSize: 14,
	    fontWeight: 'bold',
	    margin:2,
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	contentTextModal:{
	    color: '#000',
	    fontSize: 16,
	    margin:2,
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	boxContainerModal:{
  		flex:0.4,
	    borderWidth: 0.5,
	    borderColor: '#000000',
	    padding:'2.5%',
	    marginLeft:'1%',
	    marginRight:'1%',
  	},


  	modal2:{
	    borderWidth: 0.5,
	    borderColor: '#7ec0ee',
	    alignSelf: 'center',
	    backgroundColor: 'white',
	    padding:'5%',
	    marginLeft:'5%',
	    marginRight:'5%',
	    zIndex:1,
  	},
  	tableBoxModal:{
	    borderWidth: 0.5,
	    borderColor: '#000000',
  		flex:0.4,
  	},
  	tableBoxModalSelected:{
	    borderWidth: 0.5,
	    borderColor: '#000000',
	    backgroundColor: '#7ec0ee',
  		flex:0.4,
  	},
  	tableBoxModalFull:{
	    borderWidth: 0.5,
	    borderColor: '#000000',
	    backgroundColor: '#c0c0c0',
  		flex:0.4,
  	},
  	tableTitleTextModal:{
	    color: '#000',
	    fontSize: 14,
	    fontWeight: 'bold',
	    margin:4,
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	tableContentTextModal:{
	    color: '#000',
	    fontSize: 14,
	    margin:4,
	    textAlign: 'center',
	    justifyContent: 'center',
	    alignSelf: 'center',
  	},
  	button:{
	    alignSelf: 'center',
	    marginLeft: '2.5%',
	    marginRight: '2.5%',
	    width:100
  	},
  	overlay: {
	    flex: 1,
	    position: 'absolute',
	    left: 0,
	    top: 0,
	    opacity: 0.5,
	    backgroundColor: 'black',
	    width: width,
	    height:height,
	    zIndex:0,
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
