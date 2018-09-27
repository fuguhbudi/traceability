import React,{Component} from 'react';
import {View, Text, Image, DatePickerAndroid} from 'react-native';
import {Button, Left, Right, Body, Content, Container} from 'native-base';
import {PropTypes, i18n, connect, themes, staticIcons, staticImages} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {SetFormState, SetUserData, ResetUserData, ResetFormState} from 'helpers/redux/actions/formActions';
import FormValidation from 'components/formValidation';
import constraints from 'helpers/constraints/loginConstraints';
import {InputTextNormal} from 'components/inputFields';
import {getHeightRatio, clean, formUtil, validation} from 'helpers/utils';
import {normalizeEFormParams, setDefaults} from 'helpers/utils/generic/dataTransfer';
import {TELLER, MAIN, ERROR_INVALID_USER_DATA, ACTION_CREATE} from 'helpers/constant';
import SuperForm from "helpers/classMixins/superForm";
import Card from 'components/card';
import DateDisplay from 'components/dateDisplay';
import {SV_FORM} from 'helpers/services/endpoints/';
import ApiService from 'helpers/services';

class Ticket extends SuperForm(Component) {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidUpdate(){
        const { form } = this.props;
        if(form) validation.commitDelete(form, this.dynamicFields);
    };

    render(){

        const {onClickArrive, request, date, location, start, end, status, appointmentCode, branchName, ticketNumber} = this.props.opts;
        const actionButtons = [
            {
                text: i18n('yesImHere'),
                props: {
                    request: request,
                    buttonContainerStyle: {
                        marginHorizontal: 27,
                        marginBottom: 28
                    }
                },
                onPress: onClickArrive
            }
        ];
        // alert(ticketNumber);
        return(
            <View>
                <View>
                    <Card title={i18n('yourAppointmentDetail')} containerStyle={styles.confirmationCard} titleStyle={styles.cardTitle}>
                        <View style={styles.confirmationItem}>
                            <View style={styles.confirmationImage}>
                                <Image source={staticIcons.calendar}/>
                            </View>
                            <View style={styles.confirmationText}>
                                {/* <Text style={styles.subtitleText}><DateDisplay date={date} format={'dateOnly'}/></Text> */}
                                <Text style={styles.subtitleText}>{date}</Text>
                            </View>
                        </View>
                        <View style={styles.confirmationItem}>
                            <View style={styles.confirmationImage}>
                                <Image source={staticIcons.location}/>
                            </View>
                            <View style={styles.confirmationText}>
                                <Text style={styles.subtitleText}>{location}</Text>
                            </View>
                        </View>
                        <View style={styles.confirmationItem}>
                            <View style={styles.confirmationImage}>
                                <Image source={staticIcons.time}/>
                            </View>
                            <View style={styles.confirmationText}>
                                {/* <Text style={styles.subtitleText}><DateDisplay date={start} format={'hourMinute'}/> - <DateDisplay date={end} format={'hourMinute'}/></Text> */}
                                <Text style={styles.subtitleText}>{start} - {end}</Text>
                            </View>
                        </View>
                    </Card>
                    <Card title={ticketNumber || status !== 'NEW' ? i18n('hereIsYourTicketNumber') : i18n('hereIsTheAppointmentCode')} containerStyle={styles.confirmationCard} titleStyle={styles.appointmentCodeTitle}>
                        <View style={styles.appointmentCodeTextWrapper}>
                            <Text style={styles.appointmentCodeText}>{ ticketNumber || status !== 'NEW'  ? ticketNumber : appointmentCode}</Text>
                        </View>
                    </Card>
                    {/* <Card title={ status !== 'NEW' ? i18n('hereIsYourTicketNumber') : i18n('hereIsTheAppointmentCode')} containerStyle={styles.confirmationCard} titleStyle={styles.appointmentCodeTitle}>
                        <View style={styles.appointmentCodeTextWrapper}>
                            <Text style={styles.appointmentCodeText}>{ status !== 'NEW'  ? ticketNumber : appointmentCode}</Text>
                        </View>
                    </Card> */}
                </View>
                {
                    // ticketNumber || status !== 'NEW' ? null :
                    status !== 'NEW' ? null :
                        <View>
                            <Text style={{...styles.createBookingText, ...styles.haveArrived}}>{i18n('haveYouArrived')} {branchName}?</Text>
                            <ButtonGroup buttons={actionButtons} />
                        </View>
                }
            </View>
        );
    }
}

Ticket.propTypes = {
  dispatch: PropTypes.func,
  form: PropTypes.object,
  opts: PropTypes.object
};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        requests: state.requests,
        appointmentId: state.appointmentId
    }
};

export default connect(mapStatesToProps)(Ticket);