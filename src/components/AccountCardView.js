import React, {Component, PropTypes} from 'react';
import {
	View,
	Image,
	Text,
    StyleSheet
} from 'react-native';

const CARD_VIEW = 'account_card_view';

export default class AccountCardView extends Component{
    constructor(props){
        super(props);
    }
    
    setNativeProps(props) {
        this.refs[CARD_VIEW].setNativeProps(props);
    }

    render(){
        if(this.props.bordered){
            if(this.props.selCard.alias == ""){
                return(
                    <View ref={CARD_VIEW} style={styles.cardContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{flex: 0.3, height:80, borderRadius: 5, resizeMode:'contain'}} 
                                source={require('assets/img/loan.png')}/>
                            <View style={{flex: 0.7, flexDirection: 'column', marginLeft: '4%', justifyContent:'center'}}>
                                <Text style={{fontSize: 14, color: '#0F69B9', padding: '1%'}}>{this.props.selCard.alias}</Text>
                                <Text style={{fontSize: 10, color: '#8C8C8C', padding: '1%'}}>{this.props.selCard.accountNumber}</Text>
                            </View>
                        </View>
                        {this.renderBalance()}
                     </View>
                );
                
            }else{
                return(
                    <View ref={CARD_VIEW} style={styles.cardContainer}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{flex: 0.3, height:80, borderRadius: 5, resizeMode:'contain'}} 
                                source={require('assets/img/savings.png')}/>
                            <View style={{flex: 0.7, flexDirection: 'column', marginLeft: '4%', justifyContent:'center'}}>
                                <Text style={{fontSize: 14, color: '#0F69B9', padding: '1%'}}>{this.props.selCard.alias}</Text>
                                <Text style={{fontSize: 10, color: '#8C8C8C', padding: '1%'}}>{this.props.selCard.accountNumber}</Text>
                            </View>
                        </View>
                        {this.renderBalance()}
                     </View>
                );
            }
        }else{
            return(
                <View ref={CARD_VIEW} style={{flexDirection: 'column', padding: '2.5%'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{flex: 0.3, height:80, borderRadius: 5, resizeMode:'contain'}} 
                            source={require('assets/img/savings.png')}/>
                        <View style={{flex: 0.7, flexDirection: 'column', marginLeft: '4%', justifyContent:'center'}}>
                            <Text style={{fontSize: 14, color: '#0F69B9', padding: '1%'}}>{this.props.selCard.alias}</Text>
                            <Text style={{fontSize: 10, color: '#8C8C8C', padding: '1%'}}>{this.props.selCard.accountNumber}</Text>
                        </View>
                    </View>
                    {this.renderBalance()}
                </View>
            );
        }
    }

    renderBalance(){
        if(this.props.showBalance){
            return(
                <View style={{flexDirection: 'row', marginTop: '2.5%'}}>
                    <Text style={{flex: 0.3, fontSize: 12, color: '#8C8C8C'}}>Balance</Text>
                    <Text style={{flex: 0.7, fontSize: 14, textAlign: 'right'}}>{this.currencyFormat(this.props.selCard.balance, this.props.selCard.currency)}</Text>
                </View>
            );
        }else{
            return null;
        }
    }

    currencyFormat(n, currency){
        return currency + " " + parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
})