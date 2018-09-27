import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';

import AccountCardView from './AccountCardView'

export default class SelectOwnReceipt extends Component{
	constructor(props){
		super(props);
    }

	setReceiptIndex(index){
		this.props.instance.setReceiptIndex(index, 'my');
	}

	renderScene = () => {
		let cardData = this.props.carddata;
		let views = [];
		for(let i=0; i<cardData.length; i++){
			if(cardData[i].id != this.props.indexCard){
	            // if(cardData[i].typeCard == 'savings'){
					views.push(
						<TouchableHighlight key={i} underlayColor='transparent' onPress={() => this.setReceiptIndex(cardData[i].id)}>
							<AccountCardView selCard={cardData[i]}
                                showBalance={false} bordered={false}/>
						</TouchableHighlight>
					);
				// }
			}
		}

		return views;
	} 

	render(){
		return(
			<ScrollView style={{flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'column'}}>
				{this.renderScene()}
			</ScrollView>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: 'white', 
		flexDirection: 'column'
	},
	cardBox: {
		flexDirection: 'column', 
		minHeight: 150, 
		margin: 10, 
		borderWidth: 2, 
		borderRadius: 8, 
		borderColor: '#E4E4E4'
	},
	titleCardBox: {
		height: 40, 
		backgroundColor: '#F6F6F6',
		borderBottomWidth: 2, 
		borderColor: '#E4E4E4', 
		justifyContent: 'center'
	},
	textTitle: {
		marginLeft: 10, 
		color: '#8C8C8C'
	},
	containerBox: {
		flexDirection: 'column', 
		padding: 10
	},
	images: {
		flex: 0.35, 
		width: 60, 
		borderRadius: 5, 
		height: 80, 
		alignItems:'stretch'
	},
	info: {
		flex: 0.65, 
		flexDirection: 'column', 
		marginLeft: 15
	},
	balance: {
		flexDirection: 'row', 
		marginTop: 25, 
		marginBottom: 10
	},
	textName: {
		fontSize: 18, 
		color: '#0F69B9', 
		padding: 5
	},
	textCardNumber: {
		fontSize: 14, 
		color: '#8C8C8C', 
		padding: 5
	},
	textBalance: {
		flex: 0.2, 
		fontSize: 16, 
		color: '#8C8C8C'
	},
	textValue: {
		flex: 0.8, 
		fontSize: 18, 
		textAlign: 'right'
	}
});