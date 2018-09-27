import React,{Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Button, Left, Right, Body, Spinner, Input} from 'native-base';
import {PropTypes, i18n, connect, themes, staticIcons, staticImages} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {SetFormState, SetUserData, ResetUserData, ResetFormState} from 'helpers/redux/actions/formActions';
import {InputTextNormal} from 'components/inputFields';
import {getHeightRatio, clean, formUtil, validation} from 'helpers/utils';
import {SV_GET_COORDINATE, SV_GET_NUMBERSOURCE, SV_GET_LOCATION} from 'helpers/services/endpoints/';
import {normalizeEFormParams, setDefaults} from 'helpers/utils/generic/dataTransfer';
import {TELLER, MAIN, ERROR_INVALID_USER_DATA, ACTION_READ} from 'helpers/constant';
import SuperForm from "helpers/classMixins/superForm";
import Card from 'components/card';
import {PickerDropList} from 'components/picker';
import BranchList from 'components/branchList';
import AppointmentSlot from 'components/appointmentSlot';

class RecipientAccount extends SuperForm(Component) {
    constructor() {
        super();
        this.state = {
            branchListItem: [],
            appointmentSlotList: [],
        };
        this.dynamicFields = {}
    }

    componentWillMount() {
        console.log('Location Selection');
    }

    render(){
        const {goToMainField, requestForm, depositoryList} = this.props.opts;

        const depositoryButton = [
            {
                text: i18n('next'),
                // onPress: () => {this.doAnotherTransaction()},
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
                {/*<Card title={i18n('selectDestinationAccount')}>*/}
                {/*<Button style={styles.selectAccount} onPress={this.selectDestinationAccount}>*/}
                {/*{destinationAccountCardContent}*/}
                {/*</Button>*/}
                {/*</Card>*/}
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
                                maxLength={40}
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
                            maxLength={40}
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

RecipientAccount.propTypes = {
    dispatch: PropTypes.func,
    opts: PropTypes.any,
    requests: PropTypes.any
};

const mapStatesToProps = (state) => {
    return {
        requests: state.requests,
    }
};

export default connect(mapStatesToProps)(RecipientAccount);