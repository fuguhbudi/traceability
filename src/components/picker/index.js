import React, {Component} from "react";
import { View} from "react-native";
import {Picker,Item,ListItem} from "native-base";
import {PropTypes, connect, themes, staticIcons, i18n} from "helpers/common";
import {formatCurrency} from "helpers/utils/currency";
import SuperForm from "helpers/classMixins/superForm";
import FieldError from 'components/inputFields/FieldError';
import styles from "./style";

class PickerDropList extends SuperForm(Component) {
    constructor(){
        super();
        this.state = {
            curPlaceholder : null,
            curValue : null,
        }
    }

    onValueChange (value,id) {
        this.setState({
            curValue: value
        }, () => {
            this.initValue();
            this.handleInputChange(value);
        })
    }

    componentWillMount(){
        const {list,noTranslate} = this.props;
        if(list){
            if(list.length > 0){
                this.handleInputChange(list[0].id);
            }
            else{
                return null
            }
        }
        else{
            return null
        }
    }

    componentWillReceiveProps(){
        // const {list,noTranslate} = this.props;
        // this.handleInputChange(list[0].id);
    }

    componentWillUpdate(){
        // alert('will update')
    }

    render(){
        const {list,noTranslate} = this.props;
        const { value, errors} = this.state;
        let printItem;
        printItem = list ? list.map((item,index) => {
                               return (
                                   <Item label={noTranslate ? item.label : i18n(item.label)} value={item.id} key={item.id}/>
                               )
                            })
                            :
                            null;
        return(
            <View style={styles.pickerContainer}>
                <Picker
                    supportedOrientations={['portrait','landscape']}
                    mode="dropdown"
                    style={styles.picker}
                    selectedValue={this.state.curValue}
                    onValueChange={this.onValueChange.bind(this)}
                >
                    {printItem}
                </Picker>
                <FieldError errors={errors} isVisible={this.showError()} rounded/>
            </View>
        )
    }
}

PickerDropList.contextTypes = {
    form: PropTypes.object,
    constraints: PropTypes.object
};

PickerDropList.propTypes = {
    mode: PropTypes.string,
    name: PropTypes.string,
};

export { PickerDropList };