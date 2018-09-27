import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	ListView,
	Alert,
	TouchableHighlight
} from 'react-native';

let ds = null;

export default class SelectOtherReceipt extends Component{
	constructor(props){
		super(props);
		ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			sortList : this.props.listCard,
			dataSource: ds.cloneWithRows(this.props.listCard)
		};
        console.log(this.state.dataSource);
	}

	render(){
		return(
			<View style={{flex: 1, flexDirection: 'column', padding: 10, backgroundColor: '#FFFFFF'}}>
				<TextInput style={{height: 40}} placeholder="search" onChangeText={(text) => this.searchText(text)}/>
				<ListView
					enableEmptySections={true}
					dataSource={this.state.dataSource}
					renderRow={(data) => 
						<TouchableHighlight underlayColor='transparent' onPress={() => this.setReceiptIndex(data.id)}>
							<View style={{flexDirection: 'row', marginBottom: 5, padding: 5}}>
								{this.getNameInitial(data.name)}
								<View style={{flex: 1, flexDirection: 'column', marginLeft: 20, marginRight: 20, justifyContent: 'center'}}>
									<Text style={{fontSize: 18}} numberOfLines={1}>{data.name}</Text>
									<Text style={{color: '#7D7D7D'}}>{data.rekNumber}</Text>
								</View>
							</View>
						</TouchableHighlight>
					}
				/>	
			</View>
		);
	}

	searchText(text){
		var rows = [];
		if(text != null || text !== ''){
			for(let i=0; i<this.state.sortList.length; i++){
				let name = this.state.sortList[i].name.toLowerCase();
				let rekNum = ""+this.state.sortList[i].rekNumber+"";
				if(name.search(text.toLowerCase()) !== -1 || rekNum.search(text.toLowerCase()) !== -1){
					rows.push(this.state.sortList[i]);
				}else{

				}
			}
		}else{
			rows.push(this.state.sortList);
		}

		this.setState({dataSource: ds.cloneWithRows(rows)});
	}

	getNameInitial = (name) => {
		let names = name.split(' ');
		if(names != null){
			if(names.length > 1){
				return <View style={{justifyContent: 'center', alignItems: 'center', borderWidth: 8, backgroundColor: '#EBEBEB', borderColor:'#EBEBEB', width: 60, height: 60, borderRadius: 60/2}}><Text style={{textAlign: 'center', fontSize: 25, color: '#FFF', backgroundColor: 'transparent'}}>{names[0].substr(0,1)}{names[1].substr(0,1)}</Text></View>
			}else{
				return <View style={{justifyContent: 'center', alignItems: 'center', borderWidth: 8,  backgroundColor: '#EBEBEB', borderColor:'#EBEBEB', width: 60, height: 60, borderRadius: 60/2}}><Text style={{textAlign: 'center', fontSize: 25, color: '#FFF', backgroundColor: 'transparent'}}>{names[0].substr(0,1)}</Text></View>
			}
			
		}
	}

	setReceiptIndex(index){
		this.props.instance.setReceiptIndex(index, 'other');
	}

	sorting(data){
		return data.list.sort((a,b) => a.name.localeCompare(b.name));
	}
}