import React, {Component, PropTypes} from 'react';
import {
    Alert,
    Button,
	StyleSheet,
	View,
	Image,
	Platform,
	Text,
    TextInput,
    ScrollView,
} from 'react-native';


var marginTop = Platform.OS === 'ios'? 20 : 0;
import Globals from "helpers/Globals";


export default class NonCustomerDepositForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name    : Globals.guest == undefined ? "" : Globals.guest.name,
            id      : Globals.guest == undefined ? "" : Globals.guest.id,
            address   : Globals.guest == undefined ? "" : Globals.guest.address,
            city   : Globals.guest == undefined ? "" : Globals.guest.city,
            province   : Globals.guest == undefined ? "" : Globals.guest.province,
            zip   : Globals.guest == undefined ? "" : Globals.guest.zip,
            contact : Globals.guest == undefined ? "" : Globals.guest.contact,
            email   : Globals.guest == undefined ? "" : Globals.guest.email,
        }
    }

    render(){
        return(
            <View style={styles.container}>     
                <Text style={styles.titleText}>
                    Please fill in the details
                </Text>
                <View style={{flexDirection:'row', marginTop:'5%'}}>
                    <Text style={styles.leadText}>
                        Name
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        multiline = {false}
                        onChangeText={(text) => this.setState({'name':text})}
                        placeholder="Enter Name"
                        value={this.state.name}
                    />
                </View>
                <View style={{flexDirection:'row', marginTop:'2%'}}>
                    <Text style={styles.leadText}>
                        ID. Number
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        multiline = {false}
                        onChangeText={(text) => this.setState({'id':text})}
                        placeholder="Enter ID Number"
                        value={this.state.id}
                    />
                </View>
                <View style={{flexDirection:'row', marginTop:'2%'}}>
                    <Text style={styles.leadText}>
                        Address
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        multiline = {false}
                        onChangeText={(text) => this.setState({'address':text})}
                        placeholder="Address"
                        value={this.state.address}
                    />
                </View>
                <View style={{flexDirection:'row', marginTop:'2%'}}>
                    <Text style={styles.leadText}>
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        multiline = {false}
                        onChangeText={(text) => this.setState({'city':text})}
                        placeholder="City"
                        value={this.state.city}
                    />
                </View>
                <View style={{flexDirection:'row', marginTop:'2%'}}>
                    <Text style={styles.leadText}>
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        multiline = {false}
                        onChangeText={(text) => this.setState({'province':text})}
                        placeholder="Province"
                        value={this.state.province}
                    />
                </View>
                <View style={{flexDirection:'row', marginTop:'2%'}}>
                    <Text style={styles.leadText}>
                    </Text>
                    <TextInput
                        style={styles.inputText}
                        keyboardType='numeric'
                        multiline = {false}
                        onChangeText={(text) => this.setState({'zip':text})}
                        placeholder="Zip Code"
                        value={this.state.zip}
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
                        value={this.state.contact}
                    />
                </View>
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
                        value={this.state.email}
                    />
                </View>
                <View style={{flexDirection:'row', marginTop:'5%', justifyContent:'center'}}>
                    <View style={styles.button}>
                        <Button
                            onPress={()=>{this.props.gotoPrevScreen()}}
                            title="Cancel"/>
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={()=>{
                                if(this.state.name == undefined || this.state.name == "" || 
                                    this.state.id == undefined || this.state.id == "" || 
                                    this.state.address == undefined || this.state.address == "" || 
                                    this.state.city == undefined || this.state.city == "" || 
                                    this.state.province == undefined || this.state.province == "" || 
                                    this.state.zip == undefined || this.state.zip == "" || 
                                    this.state.contact == undefined || this.state.contact == ""|| 
                                    this.state.email == undefined || this.state.email == ""){

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
                                    var data = {
                                        name    : this.state.name,
                                        id      : this.state.id,
                                        address : this.state.address,
                                        city    : this.state.city,
                                        province: this.state.province,
                                        zip     : this.state.zip,
                                        contact : this.state.contact,
                                        email   : this.state.email,
                                    }
                                    this.props.submitForm(data);
                                }
                            }}
                            title="Submit"/>
                    </View>
                </View>
            </View>
        );
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
});