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
  TextInput,
  ScrollView,
  Platform,
  DeviceEventEmitter,
  Dimensions,
  Keyboard,
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Globals from "helpers/Globals";
import Util from "helpers/Util";

import CardView from "components/AccountCardView"
import NonCustomerDepositForm from "components/NonCustomerDepositForm"
import SelectRecipientScreen from "components/SelectRecipientPage";

var marginTop = Platform.OS === 'ios'? 50 : 0;
const window = Dimensions.get('window');

export default class TransactionScreen extends Component{
	constructor(props){
		super(props);
		const {params} = this.props.navigation.state;

		this.state = {
			title:'Transaction',
			mode:params.mode,
			actions:params.service,
			selCard:{
				alias 			: Globals.account == undefined ? "" : Globals.account.name,
				accountNumber 	: Globals.account == undefined ? "" : Globals.account.accountNumber,
				accountType 	: Globals.account == undefined ? "" : Globals.account.cardType,
				balance 		: "1200000",
				currency 		: "IDR"
			},
			custData:{
                name    : Globals.guest == undefined ? "" : Globals.guest.name,
                contact : Globals.guest == undefined ? "" : Globals.guest.contact,
                email   : Globals.guest == undefined ? "" : Globals.guest.email,
			},
			loading 		: false,
			customerInput	: true,
			pick : false,
		}


		this.submitForm = this.submitForm.bind(this);
		this.gotoPrevScreen = this.gotoPrevScreen.bind(this);
		this.setBeneficiary = this.setBeneficiary.bind(this);
	}


	render(){
		if(this.state.mode=='Opening Account' || this.state.mode=='Account Maintenance' || this.state.mode=='Card Maintenance'){
			return (
				<View style={styles.container}>
			        <Text style={styles.titleText}>
			        	Terms and Condition for {this.state.mode}
			        </Text>
			        <ScrollView>
				        <Text style={styles.descText}>
				        	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet finibus ipsum, nec pulvinar ipsum aliquam semper. Cras lobortis dignissim commodo. Morbi vulputate ex sed sem convallis iaculis. Phasellus varius lectus vel ligula pharetra, eu gravida sapien pretium. Ut semper nibh id est efficitur cursus. In hac habitasse platea dictumst. Vivamus pellentesque, massa ac molestie tincidunt, nisl augue accumsan erat, et placerat tortor neque et nunc. Etiam porta quam ut tortor finibus, at tempor dolor gravida. Sed iaculis eget diam ac fermentum. Phasellus rutrum elit id ipsum vestibulum hendrerit. Etiam molestie porttitor tempor. Mauris sed ipsum id nibh posuere pharetra a quis leo. Pellentesque sodales eleifend turpis, et eleifend leo. Sed efficitur ipsum libero, quis ultricies turpis sollicitudin malesuada. Quisque lectus tortor, pharetra vitae lectus vitae, luctus sollicitudin turpis.

							Pellentesque congue leo in nibh blandit consequat. In hac habitasse platea dictumst. Praesent euismod felis eget eros malesuada, nec ultricies massa volutpat. Fusce lobortis egestas ligula. Vestibulum sit amet tristique justo. Suspendisse facilisis leo feugiat purus euismod aliquet. Fusce bibendum turpis convallis cursus malesuada. Integer egestas vulputate magna, ut varius odio. Etiam sagittis vehicula ipsum, eu condimentum odio dictum at. Vestibulum elementum mauris eget tellus hendrerit auctor.
				        </Text>
			        </ScrollView>
					<View style={styles.buttonEnd}>
						<Button
						  	onPress={()=>{this.gotoNextScreen()}}
						  	title="Confirm"/>
				  	</View>
		        </View>
		    );
		} else if(this.state.mode=='Cash Deposit'){
			if(Globals.mode == "guest"){
				// minta isi data dulu
				return (
					<View style={styles.container}>
			  			{this.renderGuestForm()}
			  			{this.renderLoadingModal()}
			        </View>
			    );
			}else{
				return (
					<View style={styles.container}>
						<View style={styles.container2}>
					        <Text style={styles.titleText}>
					        	{this.state.mode}
					        </Text>
						    

						    <View style={{marginTop:'2.5%'}}>
						    	<Text style={styles.leadText}>
						        	Beneficiary Account
						        </Text>
						        <TouchableOpacity onPress={()=>{
									this.pickBeneficiary();
						        	}
						        }>
			                        <CardView selCard={this.state.selCard}
			                            showBalance={false} bordered={true}/>
	                            </TouchableOpacity>
				        	</View>
						    <View style={{marginTop:'2.5%'}}>
						        <Text style={styles.leadText}>
						        	Amount
						        </Text>
						        <View style={{flexDirection:"row"}}>
							        <TextInput
							        	style={styles.amountText}
						        		multiline = {false}
						        		keyboardType='numeric'
							        	placeholder="Enter Amount"
							        	onChangeText={(text) => 
								        	this.setState({amount:text})
								        }/>
							        <Text style={styles.curText}>
							        	IDR
							        </Text>
						        </View>
				        	</View>
						    <View style={{flexDirection:'column', marginTop:'2.5%'}}>
						        <Text style={styles.leadText}>
						        	Notes
						        </Text>
						        <TextInput
						        	style={styles.inputText}
					        		multiline = {true}
						        	placeholder=""
						        	onChangeText={(text) => 
							        	this.setState({message:text})
							        }/>
				        	</View>
					        <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
								<View style={styles.button}>
									<Button
									  	onPress={()=>{
									  		Keyboard.dismiss();
									  		this.gotoPrevScreen()
									  	}}
									  	title="Cancel"/>
							  	</View>
								<View style={styles.button}>
									<Button
									  	onPress={()=>{
									  		Keyboard.dismiss();
									  		if(this.validate())
									  			this.gotoNextScreen();
									  		else{
									  			Alert.alert(
													'QMS',
													'Please enter correct amount!',
													[
													    {text: 'Ok', onPress: () => {
														}},
													],
													{ cancelable: true }
												)
									  		}
									  	}}
									  	title="Confirm"/>
							  	</View>
					        </View>
				        </View>
			  			{this.renderLoadingModal()}
			        	{this.renderModal()}
			        </View>
			    );
			}
		}else if(this.state.mode=='Cash Withdrawal'){
			return (
				<View style={styles.container}>
			        <Text style={styles.titleText}>
			        	{this.state.mode}
			        </Text>
				    <View style={{marginTop:'2.5%'}}>
                        <CardView selCard={this.state.selCard}
                            showBalance={true} bordered={true}/>
		        	</View>
				    <View style={{marginTop:'2.5%'}}>
				        <Text style={styles.leadText}>
				        	Amount
				        </Text>
				        <TextInput
				        	style={styles.inputText}
			        		multiline = {false}
			        		keyboardType='numeric'
				        	placeholder="Enter Amount"/>
		        	</View>
				    <View style={{flexDirection:'column', marginTop:'2.5%'}}>
				        <Text style={styles.leadText}>
				        	Notes
				        </Text>
				        <TextInput
				        	style={styles.inputText}
			        		multiline = {true}
				        	placeholder=""/>
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
							  	title="Confirm"/>
					  	</View>
			        </View>
		        </View>
		    );
		} else{
			return (
				<View style={styles.container}>
			        <Text style={styles.titleText}>
			        	{this.state.mode}
			        </Text>
			        <Text style={styles.bigText}>
			        	Service Unavailable
			        </Text>
		        </View>
		    );
		}
	}

	renderGuestForm(){
		console.log(this.state.customerInput);
		if(this.state.customerInput){
			return(
				<View style={styles.container2}>
			        <Text style={styles.titleText}>
			        	{this.state.mode} - Guest
			        </Text>
					<NonCustomerDepositForm 
						gotoPrevScreen ={()=>this.gotoPrevScreen()}
						submitForm ={this.submitForm}/>
				</View>
			);
		}else{
			return (
				<View style={styles.container2}>
			        <Text style={styles.titleText}>
			        	{this.state.mode} - Guest
			        </Text>
				    <View style={{marginTop:'2.5%'}}>
				    	<Text style={styles.leadText}>
				        	Depository 
				        </Text>
				        <TouchableOpacity onPress={()=>{
				        	this.setState({customerInput:true})
				        }
				        }>
	                        <View style={styles.cardContainer}>
			                    <View style={{flexDirection: 'row'}}>
			                        <Image style={{flex: 0.3, height:80, borderRadius: 5, resizeMode:'contain'}} 
			                            source={require('assets/img/loan.png')}/>
			                        <View style={{flex: 0.7, flexDirection: 'column', marginLeft: '4%', justifyContent:'center'}}>
			                            <Text style={{fontSize: 14, color: '#0F69B9', padding: '1%'}}>{this.state.custData.name}</Text>
			                            <Text style={{fontSize: 10, color: '#8C8C8C', padding: '1%'}}>{this.state.custData.id}</Text>
			                        </View>
			                    </View>
			                </View>
		                </TouchableOpacity>
		        	</View>
				    <View style={{marginTop:'2.5%'}}>
				    	<Text style={styles.leadText}>
				        	Beneficiary Account
				        </Text>
				        
				        <TouchableOpacity onPress={()=>{
							this.pickBeneficiary();
				        	}
				        }>
	                        <CardView selCard={this.state.selCard}
	                            showBalance={false} bordered={true}/>
		                </TouchableOpacity>
		        	</View>
				    <View style={{marginTop:'2.5%'}}>
				        <Text style={styles.leadText}>
				        	Amount
				        </Text>
						        <View style={{flexDirection:"row"}}>
							        <TextInput
							        	style={styles.amountText}
						        		multiline = {false}
						        		keyboardType='numeric'
							        	placeholder="Enter Amount"
							        	onChangeText={(text) => 
								        	this.setState({amount:text})
								        }/>
							        <Text style={styles.curText}>
							        	IDR
							        </Text>
						        </View>
		        	</View>
				    <View style={{flexDirection:'column', marginTop:'2.5%'}}>
				        <Text style={styles.leadText}>
				        	Notes
				        </Text>
				        <TextInput
				        	style={styles.inputText}
			        		multiline = {true}
				        	placeholder=""
				        	onChangeText={(text) => 
					        	this.setState({message:text})
					        }/>
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
							  		if(this.validate())
							  			this.gotoNextScreen();
							  		else{
							  			Alert.alert(
											'QMS',
											'Please enter correct amount!',
											[
											    {text: 'Ok', onPress: () => {
												}},
											],
											{ cancelable: true }
										)
							  		}
							  	}}
							  	title="Confirm"/>
					  	</View>
			        </View>
			        {this.renderModal()}
		        </View>
			);
		}
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

	renderModal(){
        if(this.state.pick){
    		return(
    			<View style={{
				  		position: 'absolute', 
				  		width:window.width, 
				  		height:window.height, 
				  		zIndex:50,
			  		}}>
	    			<SelectRecipientScreen 
			  			setBeneficiary ={this.setBeneficiary}  />
	  			</View>
    		);
    	}else{
    		return null;
    	}
    }

    submitForm(data){
    	Globals.guest = data;
    	this.setState({
    		customerInput	: false,
    		custData 		: data,
    	});
    }

	pickBeneficiary(){
		this.setState({
    		pick: true,
    	});
	}

    setBeneficiary(data,mode){
    	if(mode=="other"){
			this.setState({
	    		pick: false,
	    		selCard:{
					alias 			: data.name,
					accountNumber 	: data.rekNumber,
					accountType 	: "other",
				}
	    	});
    	}else{
    		this.setState({
	    		pick: false,
	    		selCard:{
					alias 			: data.alias,
					accountNumber 	: data.accountNumber,
					accountType 	: "savings",
				}
	    	});
    	}
    	
    }

    validate(){
    	var amount = parseInt(this.state.amount);
    	if(amount>0){
    		return true;
    	}else{
    		return false;
    	}
    }

	gotoNextScreen(){
		// save data, create book apalah
		if(Globals.transactions==undefined){
			Globals.transactions = [];
		}
		if(this.state.mode=="Cash Deposit"){
			this.setState({'loading':true});

			var param = {
				"businessType": "TS",
				"beneficiaryAccount": this.state.selCard.accountNumber,
				"depositoryAccount": this.state.selCard.accountNumber,
				"nameBeneficiary": this.state.selCard.alias,
				"amount": this.state.amount,
				"message": this.state.message,
			};
			
			if(Globals.appointmentId!=undefined){
				param = {
					"appointmentId":Globals.appointmentId,
					"businessType": "TS",
					"beneficiaryAccount": this.state.selCard.accountNumber,
					"depositoryAccount": this.state.selCard.accountNumber,
					"nameBeneficiary": this.state.selCard.alias,
					"amount": this.state.amount,
					"message": this.state.message,
				};
			}
			console.log(param)
			Util.invokeMethod("POST","form",
			    JSON.stringify(param),
			    (result)=>{
					this.setState({'loading':false});

			    	console.log(result);
			    	var refNumber = result.payload.refNumber;
			    	var appointmentId = result.payload.appointmentId;

					Globals.transactions.push({name:this.state.mode, code:refNumber});
					Globals.appointmentId = appointmentId;

					const {navigate, dispatch} = this.props.navigation;
					Alert.alert(
					  'QMS',
					  'Do you wish to do another transaction(s)',
					  [
					    {text: 'No', onPress: () => {
							console.log(this.state.selectedService);
							navigate('SelectTimeScreen');
						}},
						{text: 'Yes', onPress: () => {
							this.gotoPrevScreen();
						}},
					  ],
					  { cancelable: false }
					)
					console.log("test3");
				}, (error)=>{
					this.setState({'loading':false});
					console.log("error")
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
		}else{
			Globals.transactions.push({name:this.state.mode, code: this.genNumber()});

			const {navigate, dispatch} = this.props.navigation;
			Alert.alert(
			  'QMS',
			  'Do you wish to do another transaction(s)',
			  [
			    {text: 'No', onPress: () => {
					console.log(this.state.selectedService);
					navigate('SelectTimeScreen');
				}},
				{text: 'Yes', onPress: () => {
					this.gotoPrevScreen();
				}},
			  ],
			  { cancelable: false }
			)
		}

	}

	genNumber(){
		if(this.state.actions == 0){
			return "B"+Math.floor((Math.random() * 100) + 1);
		}else{
			return "A"+Math.floor((Math.random() * 100) + 1);
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
		padding:10,
    	marginTop:marginTop,
	    zIndex:0,
  	},
  	titleText:{
	    color: '#000',
	    fontSize: 18,
	    fontWeight: 'bold',
	    alignItems:'flex-start',
	    margin: '2.5%',
  	},
  	bigText:{
	    color: '#000',
	    fontSize: 36,
	    fontWeight: 'bold',
	    alignItems:'center',
	    justifyContent:'center',
	    textAlign:'center',
	    margin: '5%',
  	},
  	descText:{
	    color: '#000',
	    fontSize: 14,
	    alignItems:'flex-start',
  	},
  	leadText:{
	    color: '#000',
	    fontWeight: 'bold',
	    fontSize: 14,
	    marginLeft:'2.5%',
	    marginRight:'2.5%',
  	},
  	inputText:{
	    color: '#000',
	    fontSize: 14,
	    marginLeft:'2.5%',
	    marginRight:'2.5%',
  	},
  	button:{
	    alignSelf: 'center',
	    marginLeft: 10,
	    marginRight: 10,
	    width:100,
  		zIndex:5,
  	},
  	buttonEnd:{
	    alignSelf: 'flex-end',
	    alignItems: 'flex-end',
	    marginBottom: 10,
	    marginRight: 10,
	    width:100
  	},


  	curText:{
  		flex:0.1,
	    color: '#000',
	    fontWeight: 'bold',
	    fontSize: 20,
	    justifyContent:"center",
	    alignSelf:"center",
	    textAlign:"center",
	    marginLeft:'0.5%',
	    marginRight:'2.5%',
  	},
  	amountText:{
  		flex:0.87,
	    color: '#000',
	    fontSize: 14,
	    marginLeft:'2.5%',
  	},

    cardContainer:{
        flexDirection: 'column',
        borderWidth: 2, 
        borderRadius: 8, 
        borderColor: '#E4E4E4', 
        backgroundColor: '#FFF',
        marginBottom:'2.5%', 
        padding: '2.5%',
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
