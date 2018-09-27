import React,{Component} from 'react';
import {View} from 'react-native';
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
        };
        this.dynamicFields = {}
    }

    setDefaultValues = () => {
        const { depositoryFormData } = this.props;
        const {form, value} = this.props.opts;
        let defaults;
        if (_.isEmpty(depositoryFormData)) {
            defaults = setDefaults(form, {
                "depositoryFullName" : value.depositoryName,
                "idType" : value.idType,
                "depositoryIdNumber" : value.idNumber,
                "depositoryAddress" : value.depositoryAddress,
                "depositoryPhoneNumber" : value.depositoryPhone
            });
        } else {
            defaults = setDefaults(form, {
                "depositoryFullName" : depositoryFormData.depositoryFullName,
                "idType" : depositoryFormData.idType,
                "depositoryIdNumber" : depositoryFormData.depositoryIdNumber,
                "depositoryAddress" : depositoryFormData.depositoryAddress,
                "depositoryPhoneNumber" : depositoryFormData.depositoryPhoneNumber
            });
        }
        this.setState({ defaults: defaults });
        this.props.dispatch(SetFormState(defaults))
    };

    componentWillMount() {
        console.log('Location Selection');
    }

    componentDidMount(){
        const {value} = this.props.opts;
        value ? this.setDefaultValues() : null;
    }

    render(){
        const {goToMainField, requestForm, depositoryList} = this.props.opts;

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
                <Card title={i18n('depositoryFullName')}>
                    <View>
                        <InputTextNormal
                            name='depositoryFullName'
                            maxLength={40}
                            placeholder={i18n('depositoryFullName')}
                            ref={ el => this.addDynamicFields(el, "depositoryFullName") }
                        />
                    </View>
                </Card>
                <Card title={i18n('depositoryId')}>
                    <View style={styles.flexColumn}>
                        <View style={styles.flexColumnLeft}>
                            <PickerDropList name="idType" list={depositoryList || []} ref={ el => this.addDynamicFields(el, "depositoryId") }/>
                        </View>
                        <View style={styles.flexColumnRight}>
                            <InputTextNormal
                                name='depositoryIdNumber'
                                maxLength={16}
                                placeholder={i18n('depositoryIdNumber')}
                                keyboardType='numeric'
                                ref={ el => this.addDynamicFields(el, "depositoryIdNumber") }
                            />
                        </View>
                    </View>
                </Card>
                <Card title={i18n('depositoryAddress')}>
                    <View>
                        <InputTextNormal
                            name='depositoryAddress'
                            maxLength={40}
                            placeholder={i18n('depositoryAddress')}
                            value={'1'}
                            ref={ el => this.addDynamicFields(el, "depositoryAddress") }
                        />
                    </View>
                </Card>
                <Card title={i18n('depositoryPhoneNumber')}>
                    <View>
                        <InputTextNormal
                            name='depositoryPhoneNumber'
                            maxLength={13}
                            placeholder={i18n('depositoryPhoneNumber')}
                            keyboardType='numeric'
                            ref={ el => this.addDynamicFields(el, "depositoryPhoneNumber") }
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