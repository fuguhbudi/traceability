import React,{Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Button, Left, Right, Content, Spinner} from 'native-base';
import {PropTypes, i18n, connect, themes, staticImages, staticIcons} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {SetFormState, ResetFormState} from 'helpers/redux/actions/formActions';
import {InputTextNormal} from 'components/inputFields';
import {validation} from 'helpers/utils';
import SuperForm from "helpers/classMixins/superForm";
import {resetAppointmentId} from "helpers/redux/actions/genericActions";
import {setDefaults} from 'helpers/utils/generic/dataTransfer';
import AppointmentList from 'components/appointmentList';

class BookingList extends SuperForm(Component) {
    constructor() {
        super();
        this.dynamicFields = {}
    }

    createTransaction = (navigation) => {
        navigation.navigate('ActivityOption');
    };

    render(){
        const {form, onLogin, onSignUp, request, bookingListItem, history, navigation} = this.props.opts;

        return(
            <Content>
                {
                    !history ?
                        <Button style={styles.buttonCreateBooking} onPress={() => this.createTransaction(navigation)}>
                            <View style={themes.fldr}>
                                <View>
                                    <Text style={styles.createBookingText}>{i18n('createNewOnlineBooking')}</Text>
                                </View>
                            </View>
                        </Button> : null
                }
                {
                    request ? <Spinner/> : <AppointmentList lists={bookingListItem} />
                }
            </Content>
        );
    }
}

BookingList.propTypes = {
  opts: PropTypes.any
};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        requests: state.requests,
    }
};

export default connect(mapStatesToProps)(BookingList);