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

class Result extends SuperForm(Component) {
    constructor() {
        super();
        this.state = {
        };
        this.dynamicFields = {}
    }

    componentWillMount() {
        console.log('Confirmation');
    }

    componentDidMount(){
        this.props.dispatch(ResetFormState());
    }

    componentDidUpdate(){
        const { form } = this.props;
        if(form) validation.commitDelete(form, this.dynamicFields);
    };

    render(){
        const {form, submitStep, request, onSelectDestinationAccount, date, location, start, end, appointcode} = this.props.opts;
        const actionButtons = [
            {
                text: i18n('done'),
                props: {
                    request: request,
                    buttonContainerStyle: {
                        marginHorizontal: 27,
                        marginBottom: 28
                    }
                },
                onPress: submitStep
            }
        ];
        return(
                <View>
                    <View>
                        <Card title={i18n('successBookAppointment')} containerStyle={styles.confirmationCard}>
                            <View style={styles.confirmationItem}>
                                <View style={styles.confirmationImage}>
                                    <Image source={staticIcons.calendar}/>
                                </View>
                                <View style={styles.confirmationText}>
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
                                    <Text style={styles.subtitleText}>{start} - {end}</Text>
                                </View>
                            </View>
                        </Card>
                        <Card title={i18n('hereIsTheAppointmentCode')} containerStyle={styles.confirmationCard} titleStyle={styles.appointmentCodeTitle}>
                            <View style={styles.appointmentCodeTextWrapper}>
                                <Text style={styles.appointmentCodeText}>{appointcode}</Text>
                            </View>
                            {/*<View>*/}
                                {/*<Text style={styles.appointmentCodeTitle}>{i18n('yourReferenceCode')}</Text>*/}
                            {/*</View>*/}
                        </Card>
                    </View>
                    <View>
                        <ButtonGroup buttons={actionButtons} />
                    </View>
                </View>
        );
    }
}

Result.propTypes = {

};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        requests: state.requests,
        appointmentId: state.appointmentId
    }
};

export default connect(mapStatesToProps)(Result);