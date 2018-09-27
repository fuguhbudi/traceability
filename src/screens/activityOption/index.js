import React, { Component } from 'react';
import { Content, Text, View, Spinner } from 'native-base';
import { themes, PropTypes, ScreenHeader, i18n, connect, staticIcons } from 'helpers/common';
import { InputTextTopLabel, InputTextNormal } from 'components/inputFields';
import {
    TELLER,
    MAIN,
    TRANSACTION,
    ACTION_CREATE,
    ACTION_READ,
    ACTION_UPDATE,
    ACTION_DELETE,
    GET_METHOD
} from 'helpers/constant';
import ApiService from 'helpers/services';
import { SV_GET_CURRENCY } from 'helpers/services/endpoints/';
import ButtonGroup from 'components/buttonGroup';
import styles from './style';
import { SV_FORM, SV_CARD, SV_GET_IDENTIFIER, SV_GET_FORM_FIELD, SV_TRANSACTION_TYPE } from 'helpers/services/endpoints/';
import { normalizeEFormParams, setDefaults } from 'helpers/utils/generic/dataTransfer';
import { clean, formUtil } from 'helpers/utils';
import { setAppointmentId, setAppQueueId } from 'helpers/redux/actions/genericActions';
import BdsScreenTemplate from 'components/bdsScreenTemplate';
import { SetFormState, ResetFormState } from 'helpers/redux/actions/formActions';
import RadioBox from 'components/radioBox';
import queryString from 'query-string';

// import Spinner from 'components/centerSpinner';

class ActivityOption extends Component {

    constructor() {
        super();
        this.state = {
            currencyListObj: {},
            formField: null,
            submitPopUpVisible: false,
            errorPopUpVisible: false,
            selectedBox: 0,
            activityList: [],
            activityButton: [],
            typeofTrans: null,
        };
        // this.getFormField = this.getFormField.bind(this);
    }

    submitForm = () => {
        const { form, appointmentId } = this.props;
        const normalizeData = clean(normalizeEFormParams(form, this.state));
        if (!formUtil.isValid(form)) return;
        // alert('prev appointmentId: '+appointmentId);
        const inputValues = formUtil.mapFTVO(form, true);
        const params = {
            paramMap: {
                ...normalizeData,
            },
            branchId: inputValues.branchId ? inputValues.branchId : '11730',
            businessType: inputValues.businessType ? inputValues.businessType : 'TS',
            formTypeId: inputValues.formTypeId ? inputValues.formTypeId : "1",
            action: ACTION_CREATE,
            appointmentId: appointmentId ? appointmentId : null,
            appQueueId: appQueueId ? appQueueId : null,
        },
            req = {
                path: SV_FORM,
                params: clean(params),
                type: MAIN,
            },
            reqSuccess = (response) => {
                const payload = response.payload;
                this.props.dispatch(setAppointmentId(payload.appointmentId));
                this.toggleSubmitPopUp();
            },
            reqError = (error) => {
                console.log(error);
                alert(error);
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :' + JSON.stringify(req.params));
    };

    getTransactionList = () => {
        const { selectedBox } = this.state;
        const { navigation, userData } = this.props;
        // alert(selectedBox);
        let params = {
            // action: ACTION_READ,
            businessType: selectedBox === 0 ? "CS" : "TS"
        }
        let queryStringParam = queryString.stringify(params),
            req = {
                path: SV_TRANSACTION_TYPE + '?' + queryStringParam,
                params: clean(params),
                type: TRANSACTION,
                method: GET_METHOD,
            },

            reqSuccess = (response) => {
                let nonCustomer = [];
                if (userData !== null) {
                    console.log(userData.cif, "userData")
                    nonCustomer = ["CASH_WITHDRAWAL", "OVERBOOKING"]
                    console.log(nonCustomer[1], "nonCustomer")
                }
                const payload = response.payload;
                // console.log(JSON.stringify(payload),"payload")
                let activityButton = [];
                {
                    for (let i = 0; i < payload.length; i++) {

                        // if (payload[i].id.match(/^(CASH_WITHDRAWAL|OVERBOOKING)$/)) {
                            activityButton.push(
                                {
                                    text: payload[i].label,
                                    icon: staticIcons.arrowNext,
                                    onPress: () => this.selectTransaction(payload[i].id),
                                    props: {
                                        fontStyle: {
                                            fontWeight: 'normal'
                                        }
                                    }
                                },
                            );
                        // } else {
                        //     console.log("ada ada aja")
                        // }


                    }
                }
                this.setState({ activityButton: activityButton });
            },
            reqError = (error) => {
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :' + JSON.stringify(req.params));
    };

    onBackClick = () => {
        this.props.navigation.goBack();
    };

    onSelectCS = () => {
        console.log('CS Selected');
        this.setState({
            selectedBox: 0
        }, () => {
            this.getTransactionList();
        });
    };

    onSelectTS = () => {
        console.log('TS Selected');
        this.setState({
            selectedBox: 1
        }, () => {
            this.getTransactionList();
        });
    };

    selectTransaction = (id) => {
        const { typeofTrans } = this.state;
        console.log(id);
        switch (id) {
            case 'CASH_DEPOSIT':
                this.props.navigation.navigate('CashDepositEform');
                break;
            case 'CASH_WITHDRAWAL':
                this.props.navigation.navigate('CashWithdrawalEform', { typeofTrans: typeofTrans });
                break;
            case 'OVERBOOKING':
                this.props.navigation.navigate('OverBookingEform');
                break;
            case 'CHEQUE_DEPOSIT':
                this.props.navigation.navigate('ChequeDepositEForm');
                break;
            default:
                break;
        }
    };

    componentWillMount() {
        const { typeofTrans } = this.state;
        this.getTransactionList();
        this.props.dispatch(ResetFormState());
        if (this.props.navigation.state.params) {
            this.setState({
                typeofTrans: this.props.navigation.state.params.typeTrans
            });
            console.log(this.props.navigation.state.params.typeTrans, "typeTrans")
        }


    }

    render() {
        const { activityButton } = this.state;
        const gettingTransactionList = this.props.requests[SV_TRANSACTION_TYPE].inProgress;
        const actionButtons = [
            {
                selected: this.state.selectedBox,
                text: i18n('cs'),
                onPress: this.onSelectCS,
                props: {
                }
            },
            {
                selected: this.state.selectedBox,
                text: i18n('ts'),
                onPress: this.onSelectTS,
                props: {
                }
            }];
        // const transTypes = this.props.navigation.state.params.typeTranss ? this.props.navigation.state.params.typeTranss : null;


        // const test = this.props.navigation.state.params.type ? this.props.navigation.state.params.type : null
        // if (this.props.navigation.state.params.type !== undefined) {
        //     const userData =
        //         this.setState({
        //             typeTrans: this.props.navigation.state.params.type
        //         });
        // } else {
        //     this.setState({
        //         typeTrans: null
        //     });
        // }

        // console.log(typeofTrans, "typeTrans")


        return (
            <BdsScreenTemplate
                goBack={this.onBackClick}
                navigation={this.props.navigation}
                parentStyle={styles.containerBackground}>
                <Content style={{ marginBottom: 50 }}>
                    <Text style={styles.serviceTitle}>{i18n('pleaseChooseService')}</Text>
                    <View style={styles.serviceOption}>
                        <RadioBox buttons={actionButtons} />
                    </View>
                    {
                        gettingTransactionList ? <Spinner /> : <ButtonGroup buttons={activityButton} />
                    }
                </Content>
            </BdsScreenTemplate>
        );
    }
}

ActivityOption.propTypes = {
    appQueueId: PropTypes.string,
    appointmentId: PropTypes.string,
    dispatch: PropTypes.func,
    form: PropTypes.object,
    navigation: PropTypes.any,
    requests: PropTypes.object,
    userData: PropTypes.object

};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        requests: state.requests,
        navStates: state.navStates,
        currentLanguage: state.currentLanguage,
        appointmentId: state.appointmentId,
        depositoryType: state.depositoryType,
        userData: state.userData,
    }
};

export default connect(mapStatesToProps)(ActivityOption);