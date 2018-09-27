import React,{Component} from 'react';
import {Text, View} from 'react-native';
import {Spinner, Button, CheckBox} from 'native-base';
import {PropTypes, i18n, connect} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {SetFormState} from 'helpers/redux/actions/formActions';
import {InputTextNormal} from 'components/inputFields';
import SuperForm from "helpers/classMixins/superForm";
import Card from 'components/card';
import {PickerDropList} from 'components/picker';
import {setDefaults} from 'helpers/utils/generic/dataTransfer';
import _ from 'lodash';

class DepositoryAccount extends SuperForm(Component) {
    constructor() {
        super();
        this.state = {
            branchListItem: [],
            appointmentSlotList: [],
            suratKuasa: false,
        };
        this.dynamicFields = {}
    }

    setDefaultValues = () => {
        const { depositoryFormData } = this.props;
        const {form, value} = this.props.opts;
        let defaults;
        if (_.isEmpty(depositoryFormData)) {
            defaults = setDefaults(form, {
                "recipientFullName" : value.depositoryName,
                "recipientId" : value.idType,
                "recipientIdNumber" : value.idNumber,
                "recipientAddress" : value.depositoryAddress,
                "recipientPhoneNumber" : value.depositoryPhone
            });
        } else {
            defaults = setDefaults(form, {
                "recipientFullName" : depositoryFormData.recipientFullName,
                "recipientId" : depositoryFormData.idType,
                "recipientIdNumber" : depositoryFormData.recipientIdNumber,
                "recipientAddress" : depositoryFormData.recipientAddress,
                "recipientPhoneNumber" : depositoryFormData.recipientPhoneNumber
            });
        }
        this.setState({ defaults: defaults });
        this.props.dispatch(SetFormState(defaults))
    };

    checkSuratKuasa = () => {
        this.setState({suratKuasa: !this.state.suratKuasa});
    };

    componentWillMount() {
        console.log('Location Selection');
    }

    componentDidMount(){
        const {value} = this.props.opts;
        value ? this.setDefaultValues() : null;
    }

    render(){
        const {goToMainField, requestForm, depositoryList, agreeSubmitForm} = this.props.opts;

        const depositoryButton = [
            {
                text: i18n('next'),
                onPress: goToMainField,
                props: {
                    request: requestForm,
                    buttonContainerStyle: {
                        marginHorizontal: 27,
                        marginBottom: 28
                    }
                }
            }
        ];

        return(
            <View>
                <Card>
                    <View style={styles.flexColumn}>
                        <View style={styles.flexColumnLeft}>
                            <CheckBox checked={this.state.suratKuasa} color="#14af96" onPress={this.checkSuratKuasa}/>
                        </View>
                        <View style={styles.flexColumnRightAgreement}>
                            <Text style={styles.mediumTextBold}>{i18n('accountWitPowerOfAttorney')}</Text>
                        </View>
                    </View>
                </Card>
                <Card title={i18n('recipientFullName')}>
                    <View>
                        <InputTextNormal
                            name='recipientFullName'
                            maxLength={40}
                            placeholder={i18n('recipientFullName')}
                            ref={ el => this.addDynamicFields(el, "recipientFullName") }
                        />
                    </View>
                </Card>
                <Card title={i18n('recipientId')}>
                    <View style={styles.flexColumn}>
                        <View style={styles.flexColumnLeft}>
                            <PickerDropList name="idType" list={depositoryList || []} ref={ el => this.addDynamicFields(el, "recipientId") }/>
                        </View>
                        <View style={styles.flexColumnRight}>
                            <InputTextNormal
                                name='recipientIdNumber'
                                maxLength={ this.props.form && this.props.form.idType && this.props.form.idType.value.equals("KTP") ? 16 : 10 }
                                placeholder={i18n('recipientIdNumber')}
                                keyboardType='numeric'
                                ref={ el => this.addDynamicFields(el, "recipientIdNumber") }
                            />
                        </View>
                    </View>
                </Card>
                <Card title={i18n('recipientAddress')}>
                    <View>
                        <InputTextNormal
                            name='recipientAddress'
                            maxLength={40}
                            placeholder={i18n('recipientAddress')}
                            value={'1'}
                            ref={ el => this.addDynamicFields(el, "recipientAddress") }
                        />
                    </View>
                </Card>
                <Card title={i18n('recipientPhoneNumber')}>
                    <View>
                        <InputTextNormal
                            name='recipientPhoneNumber'
                            maxLength={13}
                            placeholder={i18n('recipientPhoneNumber')}
                            keyboardType='numeric'
                            ref={ el => this.addDynamicFields(el, "recipientPhoneNumber") }
                        />
                    </View>
                </Card>
                <ButtonGroup buttons={depositoryButton} />
            </View>
        );
    }
}

DepositoryAccount.propTypes = {
  dispatch: PropTypes.func,
  opts: PropTypes.object
};

const mapStatesToProps = (state) => {
    return {
        requests: state.requests,
        depositoryFormData: state.depositoryFormData
    }
};

export default connect(mapStatesToProps)(DepositoryAccount);