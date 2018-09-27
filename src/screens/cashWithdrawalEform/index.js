import React, { Component } from 'react';
import { Content, Text, View, Left, Right, Switch, Body } from 'native-base';
import { Image } from 'react-native';
import { themes, PropTypes, ScreenHeader, i18n, connect, staticIcons, staticImages } from 'helpers/common';
import { InputTextTopLabel, InputTextNormal } from 'components/inputFields';
import FormValidation from 'components/formValidation';
import {
    MAIN,
    ACTION_CREATE,
    ACTION_READ,
    GET_METHOD,
    MOCK,
    UNIT_CURRENCY,
    SEPARATOR_CURRENCY,
    DELIMITER_CURRENCY,
    PRECISION_CURRENCY
} from 'helpers/constant';
import ApiService from 'helpers/services';
import styles from './style';
import { SV_FORM, SV_CARD, SV_GET_FORM_FIELD, SV_CARD_DESTINATION, SV_GET_CURRENCY, SV_GET_IDENTITIES, SV_GET_IDENTITES, SV_GET_MOCK_ACCOUNTS } from 'helpers/services/endpoints/';
import constraints, { ktpConstraints } from 'helpers/constraints/eFormConstraints';
import { normalizeEFormParams, setDefaults } from 'helpers/utils/generic/dataTransfer';
import { clean, formUtil, validation } from 'helpers/utils';
import { setAppointmentId } from 'helpers/redux/actions/genericActions';
import writtenNumber from 'helpers/utils/amountInWords';
import { SetFormState, ResetFormState, SetUserData, SetFormData, SetDepositoryFormData, SetRecipient } from 'helpers/redux/actions/formActions';
import PopUp from 'components/popUp';
import BdsScreenTemplate from 'components/bdsScreenTemplate';
import ButtonGroup from 'components/buttonGroup';
import { PickerDropList } from 'components/picker';
import Title from 'components/title';
import SuperForm from "helpers/classMixins/superForm";
import DepositoryAccount from './depositoryAccount';
import MainFields from './mainFields';
import DestinationAccount from 'components/destinationAccount';
import _ from 'lodash';
import queryString from 'query-string';
import { MaskService } from 'react-native-masked-text'

class CashWithdrawalEform extends SuperForm(Component) {

    constructor() {
        super();
        this.state = {
            formField: null,
            submitPopUpVisible: false,
            errorPopUpVisible: false,
            currentStep: 1,
            totalStep: 3,
            currentPosition: 0,
            destinationAccountPopupVisible: false,
            saveAccountDetail: false,
            destinationAccountCard: false,
            depositoryAccountCard: false,
            destinationAccountInfo: {},
            agreeSubmitForm: false,
            currencyList: [
                {
                    "id": "IDR",
                    "label": "IDR"
                },
                {
                    "id": "USD",
                    "label": "USD"
                }
            ],
            depositoryList: [
                {
                    "id": "KTP",
                    "label": "KTP"
                },
                {
                    "id": "PASSPORT",
                    "label": "PASSPORT"
                }
            ],
            verificationMethod: [
                {
                    "id": "signature",
                    "label": "signature"
                },
                {
                    "id": "pin",
                    "label": "pin"
                }
            ],
            showDepository: false,
            depoFullName: null,
            depoIdType: null,
            depoIdNumber: null,
            depoPhoneNumber: null,
            depoAddress: null,
            popupStep: 1,
            cardDestination: [],
            selectedAccount: 999,
            tempContractRate: "1.00",
            currencyText: "rupiah",
            tncPopupVisible: false,
            firstHitMainField: false,
            equivalentAmountCurrency: 0,
            destinationAccountCardShow: [],
            recipientDisabled: false
        };
        this.dynamicFields = {}
        // this.getFormField = this.getFormField.bind(this);
    }

    calculateEquivalentAmount = (value, amountInWords) => {
        const { currentLanguage, form } = this.props;
        let amount;
        if (value !== '000') {
            amount = value;
        } else {
            amount = form && form.amount && form.amount.value ? form.amount.value : '0';
        }
        const { tempContractRate, currencyText } = this.state;
        let unformattedAmount = form.amount;
        if (amount) {
            unformattedAmount = MaskService.toRawValue('money', amount.toString(), {
                unit: UNIT_CURRENCY,
                separator: SEPARATOR_CURRENCY,
                delimiter: DELIMITER_CURRENCY,
                precision: PRECISION_CURRENCY
            });
        }
        const creditedAmount = parseFloat(unformattedAmount).toFixed(2);
        const result = creditedAmount * parseFloat(tempContractRate);
        this.setValue("amount", unformattedAmount.toString());
        this.setValue("equivalentAmount", result.toString());

        if (amountInWords) {
            this.setValue("amountInWords", writtenNumber(result, { lang: currentLanguage }) + " " + currencyText);
        }

        var lastResult = result;
        lastResult = lastResult.toString();
        console.log("Original data: ", lastResult);
        // lastResult = lastResult.slice(0, -2);
        lastResult = parseInt(lastResult);
        console.log("After truncate: ", lastResult);

        this.setState({
            submitedAmount: lastResult.toString(),
        });
        this.setValue("amountToDeposit", lastResult.toString());
        this.setValue("amountInWords", writtenNumber(lastResult, { lang: currentLanguage }) + " " + currencyText);
        this.setValue("equivalentAmount", unformattedAmount.toString());

    };

    getAmountValueFromFieldName = (fieldName) => {
        const { form } = this.props;
        const inputValues = formUtil.mapFTVO(form, true);
        const unformattedValues = parseInt(inputValues[fieldName]);
        return unformattedValues;
    };

    submitForm = () => {
        const { form, appQueueId, userData, appointmentId } = this.props;
        const { destinationAccountInfo, depoFullName, depoIdType, depoIdNumber, depoPhoneNumber, depoAddress, equivalentAmountCurrency } = this.state;
        const normalizeData = clean(normalizeEFormParams(form, this.state));
        if (!formUtil.isValid(form) || !this.state.agreeSubmitForm) {
            // alert(equivalentAmountCurrency);
            // if (!this.state.agreeSubmitForm) {
            alert('Error');
            // alert(formUtil.isValid(form));
            return;
        }
        const inputValues = formUtil.mapFTVO(form, true);
        // if (userData.depositories && userData.depositories[0] != null) {
        //     if (depoFullName !== null) {
        //         console.log('yyyyyy');
        //     } else {
        //         console.log('nnnnnn');
        //     }
        // }
        const params = {
            paramMap: {
                ...normalizeData,
                // beneficiaryAccount: destinationAccountInfo.account.accountNumber,
                // beneficiaryAccountCurrency: destinationAccountInfo.account.currency,
                // beneficiaryName: destinationAccountInfo.account.accountName,

                sourceAccountNumber: destinationAccountInfo.accountNumber,
                sourceAccountName: destinationAccountInfo.accountName,
                sourceAccountCurrency: destinationAccountInfo.accountCurrency,
                sourceAccountType: "Saving",
                sourceAmountCurrency: inputValues.currency ? inputValues.currency : null,

                recipientIdType: userData.depositories && userData.depositories[0] != null ? depoIdType !== null ? depoIdType : userData.depositories && userData.depositories[0].idType : depoIdType !== null ? depoIdType : null,
                recipientIdNumber: userData.depositories && userData.depositories[0] != null ? depoIdNumber !== null ? depoIdNumber : userData.depositories && userData.depositories[0].idNumber : depoIdNumber !== null ? depoIdNumber : null,
                recipientAddress: userData.depositories && userData.depositories[0] != null ? depoAddress !== null ? depoAddress : userData.depositories && userData.depositories[0].recipientAddress : depoAddress !== null ? depoAddress : null,
                recipientPhoneNumber: userData.depositories && userData.depositories[0] != null ? depoPhoneNumber !== null ? depoPhoneNumber : userData.depositories && userData.depositories[0].recipientPhoneNumber : depoPhoneNumber !== null ? depoPhoneNumber : null,
                recipientName: userData.depositories && userData.depositories[0] != null ? depoFullName !== null ? depoFullName : userData.depositories && userData.depositories[0].depositoryName : depoFullName !== null ? depoFullName : null,
                // depositoryName: userData.depositories && userData.depositories[0] != null ? depoFullName !== null ? depoFullName : userData.depositories && userData.depositories[0].depositoryName : depoFullName !== null ? depoFullName : null,
                // depositoryPhone: userData.depositories && userData.depositories[0] != null ? depoPhoneNumber !== null ? depoPhoneNumber : userData.depositories && userData.depositories[0].depositoryPhone : depoPhoneNumber !== null ? depoPhoneNumber : null,
                depositoryType: userData.depositories && userData.depositories[0] != null ? userData.depositories[0].depositoryType : 'REGULAR',
                amountInWords: inputValues.amountInWords ? inputValues.amountInWords : null,
                rate: "1",
                verificationMethod: inputValues.methodVerification ? inputValues.methodVerification : null,
                equivalentAmountCurrency: inputValues.currency ? inputValues.currency : null,
            },
            formType: "CASH_WITHDRAWAL",
            cif: userData.cif,
            appointmentId: appointmentId ? appointmentId : null,
        },
            req = {
                path: SV_FORM,
                params: clean(params),
                type: MAIN,
            },

            reqSuccess = (response) => {
                // console.log(params,"params")
                // alert(JSON.stringify(response));
                const payload = response.payload;
                // if (payload) {
                // this.props.dispatch(setAppointmentId(payload.appointmentId));
                this.toggleSubmitPopUp();
                this.props.dispatch(setAppointmentId(payload.appointment.id));

                // this.getBusinessType(payload.appointmentId);
                // this.getBusinessType(payload.appointment.id);
                // } else {
                // alert(response.message);
                // }
            },
            reqError = (error) => {
                console.log(params, "params")
                console.log(error);
                // this.toggleErrorPopUp();
                alert(error.message);
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :' + JSON.stringify(req.params));
    };

    getBusinessType = (appQue) => {
        const params = {
            action: ACTION_READ,
            appointmentId: appQue
        },
            req = {
                path: SV_FORM,
                params: clean(params),
                type: MAIN,
            },
            reqSuccess = (response) => {
                const payload = response.payload[0];
                // console.log('payload: ', payload);
                this.props.dispatch(SetFormData(payload));
            },
            reqError = (error) => {
                console.log(error);
                alert(error.message);
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :' + JSON.stringify(req.params));
    };

    getDestinationAccountName = () => {
        const { form } = this.props;
        // console.log('form', form);
        // alert("save");
        // if(form['beneficiaryAccount'].valid){
        const inputValues = formUtil.mapFTVO(form, true);

        let params = {
            accountNumber: inputValues.beneficiaryAccount,
            userId: userData.id
        };
        let queryStringParam = queryString.stringify(params),
            req = {
                path: SV_CARD + '?' + queryStringParam,
                params: {},
                type: MAIN,
                method: GET_METHOD,
            },
            reqSuccess = (response) => {
                // alert("test");
                // console.log('SV_CARD READ: ', response);
                // alert(JSON.stringify(response))
                const payload = response.payload;
                if (payload) {
                    this.setState({
                        destinationAccountCard: true,
                        destinationAccountInfo: response.payload,
                        popupStep: 3
                    });
                } else {
                    // alert(response.message);
                    // alert(JSON.stringify(response))
                }
            },
            reqError = (error) => {
                console.log(error);
                // alert(error.errMsg);
                const formChanges = [
                    "destinationAccountName",
                    "destinationAccountCurrency"
                ];
                for (let i = 0; i < formChanges.length; i++) {
                    this.setValue(formChanges[i], null);
                }
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :' + JSON.stringify(req.params));
        // }
    };

    saveDestinationAccount = () => {
        // alert("save data")
        const { userData } = this.props;
        console.log('userdata::::::', userData.id);
        const { destinationAccountInfo } = this.state;
        // const params = {
        //         action: ACTION_CREATE,
        //         userId: userData.bdsCustomer.id,
        //         accountNumber: destinationAccountInfo.accountNumber,
        //     },
        let params = {
            action: ACTION_CREATE,
            userId: userData.id,
            accountNumber: destinationAccountInfo.accountNumber,
        }
        let queryStringParam = queryString.stringify(params),
            req = {
                path: SV_CARD_DESTINATION + '?' + queryStringParam,
                params: params,
                type: MAIN,
                method: GET_METHOD,
            },
            reqSuccess = (response) => {
                // alert(JSON.stringify(response))
                const payload = response.payload;
                if (payload) {
                    this.toggleDestinationAccountPopUp()
                } else {
                    // alert(response.message);
                }
            },
            reqError = (error) => {
                console.log(error);
                // alert(error.errMsg);
            };
        console.log('===== ini params :' + JSON.stringify(req.params));
        ApiService.open(req).then(reqSuccess, reqError);
    };

    selectDestinationAccount = () => {
        const { userData } = this.props;
        const { selectedAccount } = this.state;
        // const { destinationAccountInfo } = this.state;
        // const params = {
        //         action: ACTION_READ,
        //         userId: userData.id
        //     },
        // alert(userData.id)
        console.log(JSON.stringify(userData), userData);
        let params = {
            // action: ACTION_READ,
            cif: userData.cif,
            // accountNumber: destinationAccountInfo.account.accountNumber,
        }
        let queryStringParam = queryString.stringify(params),
            // req = {
            //     path: SV_CARD_DESTINATION + '?' + queryStringParam,
            //     params: params,
            //     type: MAIN,
            //     method: GET_METHOD,
            // },
            req = {
                path: SV_GET_MOCK_ACCOUNTS + '?' + queryStringParam,
                params: params,
                type: MOCK,
                method: GET_METHOD,
            },
            reqSuccess = (response) => {
                // alert("test");
                console.log(JSON.stringify(response, "jajaja"))
                // alert(JSON.stringify(response.payload));
                const payload = response.payload;
                if (payload) {
                    this.setState({ cardDestination: response.payload, popupStep: 1, selectedAccount: selectedAccount }, () => {
                        this.toggleDestinationAccountPopUp()
                    });
                } else {
                    alert(response.message);
                }
            },
            reqError = (error) => {
                console.log(error);
                alert(error.errMsg);
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :' + JSON.stringify(req.params));
    };

    onBackClick = () => {
        console.log('go back!');
        switch (true) {
            case !this.state.showDepository:
                this.props.navigation.goBack();
                break;
            case this.state.showDepository:
                this.gotoMainField();
                break;
        }
    };

    toggleSubmitPopUp = () => {
        this.setState({
            submitPopUpVisible: !this.state.submitPopUpVisible
        }, () => {
            const { form } = this.props;
            this.props.dispatch(SetFormState(form, true));
        });
    };

    toggleErrorPopUp = () => {
        this.setState({
            errorPopUpVisible: !this.state.errorPopUpVisible
        });
    };

    toggleTncPopUp = () => {
        this.setState({
            tncPopupVisible: !this.state.tncPopupVisible
        });
    };

    toggleDestinationAccountPopUp = () => {
        this.setState({ destinationAccountPopupVisible: !this.state.destinationAccountPopupVisible });
    };

    checkAgreeSubmitForm = () => {
        this.setState({ agreeSubmitForm: !this.state.agreeSubmitForm });
    };

    doAnotherTransaction = () => {
        this.props.navigation.navigate('ActivityOption', { typeTrans: 'doAnother' });
        this.toggleSubmitPopUp();
        // this.props.navigation.navigate('ActivityOption');
    };

    doneSubmit = () => {
        this.toggleSubmitPopUp();
        this.props.navigation.navigate('CreateAppointment');
    };

    goToDepositoryField = () => {
        const { form } = this.props;
        // if(!formUtil.isValid(form)) return;


        const { userData } = this.props;
        let params = {
            userId: userData.cif,
        }
        let queryStringParam = queryString.stringify(params),
            req = {
                path: SV_GET_IDENTITES + '?' + queryStringParam,
                params: params,
                type: MOCK,
                method: GET_METHOD,
            },
            reqSuccess = (response) => {

                const payload = response.payload;
                console.log(payload, "payload")
                if (payload) {
                    this.props.form.recipientFullName.value = response.payload[0].cif.fullName
                    this.props.form.idType.value = response.payload[0].type
                    this.props.form.recipientIdNumber.value = response.payload[0].value
                    this.props.form.recipientPhoneNumber.value = response.payload[0].cif.phone
                    this.props.form.recipientAddress.value = response.payload[0].cif.address

                    if (this.props.form.recipientFullName.value !== null) {
                        this.props.form.recipientFullName.valid = true
                        this.props.form.recipientFullName.errors = []
                        // errors
                    }
                    if (this.props.form.recipientIdNumber.value !== null) {
                        this.props.form.recipientIdNumber.valid = true
                        this.props.form.recipientIdNumber.errors = []
                    }


                    // this.props.form.recipientFullName = response.payload[0].cif.fullName
                    // this.props.form.idType = response.payload[0].type
                    // this.props.form.recipientIdNumber = response.payload[0].value
                    // this.props.form.recipientPhoneNumber = response.payload[0].cif.phone
                    // this.props.form.recipientAddress = response.payload[0].cif.address

                    this.setState({
                        // showDepository: false,
                        depoFullName: response.payload[0].cif.fullName,
                        depoIdType: response.payload[0].type,
                        depoIdNumber: response.payload[0].value,
                        depoPhoneNumber: response.payload[0].cif.phone,
                        depoAddress: response.payload[0].cif.address,
                        firstHitMainField: true

                    }, () => {
                        const { depoFullName, depoIdType, depoIdNumber, depoPhoneNumber, depoAddress } = this.state;
                        const data = {
                            recipientFullName: depoFullName,
                            idType: depoIdType,
                            recipientIdNumber: depoIdNumber,
                            recipientPhoneNumber: depoPhoneNumber,
                            recipientAddress: depoAddress
                        };
                        this.props.dispatch(SetDepositoryFormData(data));
                    });
                } else {
                    alert(response.message);
                    // alert(JSON.stringify(response))
                }
            },
            reqError = (error) => {
                console.log(error);
                // alert(error.errMsg);
                const formChanges = [
                    "destinationAccountName",
                    "destinationAccountCurrency"
                ];
                for (let i = 0; i < formChanges.length; i++) {
                    this.setValue(formChanges[i], null);
                }
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :' + JSON.stringify(req.params));
        this.setState({
            showDepository: true
        });
    };

    gotoMainField = () => {
        const { form } = this.props;
        console.log('form', form);
        // if (!formUtil.isValid(form)) return;
        // alert(formUtil.isValid(form));
        if (!formUtil.isValid(form)) {
            alert("Please, input the correct value");
        } else {
            // alert(JSON.stringify(this.props.form.recipientIdNumber.value));
            if (this.props.form.recipientFullName.value !== "" && this.props.form.recipientIdNumber.value !== "") {
                this.setState({
                    showDepository: false,
                    depoFullName: this.props.form.recipientFullName.value,
                    depoIdType: this.props.form.idType.value,
                    depoIdNumber: this.props.form.recipientIdNumber.value,
                    depoPhoneNumber: this.props.form.recipientPhoneNumber.value,
                    depoAddress: this.props.form.recipientAddress.value,
                    firstHitMainField: true
                    // if (this.props.form.recipientFullName !== "" && this.props.form.recipientIdNumber !== "") {
                    //     this.setState({
                    //         showDepository: false,
                    //         // depoFullName: this.props.form.recipientFullName,
                    //         // depoIdType: this.props.form.idType,
                    //         // depoIdNumber: this.props.form.recipientIdNumber,
                    //         // depoPhoneNumber: this.props.form.recipientPhoneNumber,
                    //         // depoAddress: this.props.form.recipientAddress,
                    //         firstHitMainField: true
                }, () => {
                    const { depoFullName, depoIdType, depoIdNumber, depoPhoneNumber, depoAddress } = this.state;
                    const data = {
                        recipientFullName: depoFullName,
                        idType: depoIdType,
                        recipientIdNumber: depoIdNumber,
                        recipientPhoneNumber: depoPhoneNumber,
                        recipientAddress: depoAddress
                    };
                    this.props.dispatch(SetDepositoryFormData(data));
                });
            } else {
                alert("Please, input the correct value ");
            }
        }

    };

    saveAccountToggle = () => {
        this.setState({ saveAccountDetail: !this.state.saveAccountDetail })
    };

    setValue = (field, value) => {
        const newValues = {
            [field]: {
                value: value
            }
        };
        this.props.dispatch(SetFormState(newValues))
    };

    setDefaultValues = () => {
        const { form } = this.props;
        const defaults = setDefaults(form, {
            "currency": "IDR"
        });
        this.setState({ defaults: defaults });
        this.props.dispatch(SetFormState(defaults))
    };

    componentWillMount() {
        this.props.dispatch(ResetFormState());
        const { form } = this.props;
        const { userData } = this.props;
        // if(!formUtil.isValid(form)) return;

        if (this.props.navigation.state.params.typeofTrans === null) {

            let params = {
                userId: userData.id,
            }
            let queryStringParam = queryString.stringify(params),
                req = {
                    path: SV_GET_IDENTITES + '?' + queryStringParam,
                    params: params,
                    type: MOCK,
                    method: GET_METHOD,
                },
                reqSuccess = (response) => {
                    console.log(response, "response")
                    const payload = response.payload;
                    if (payload) {
                        this.props.form.recipientFullName = response.payload[0].cif.fullName
                        this.props.form.idType = response.payload[0].type
                        this.props.form.recipientIdNumber = response.payload[0].value
                        this.props.form.recipientPhoneNumber = response.payload[0].cif.phone
                        this.props.form.recipientAddress = response.payload[0].cif.address

                        this.setState({
                            // showDepository: false,
                            depoFullName: response.payload[0].cif.fullName,
                            depoIdType: response.payload[0].type,
                            depoIdNumber: response.payload[0].value,
                            depoPhoneNumber: response.payload[0].cif.phone,
                            depoAddress: response.payload[0].cif.address,
                            firstHitMainField: true,
                            recipientDisabled: false

                        }, () => {
                            const { depoFullName, depoIdType, depoIdNumber, depoPhoneNumber, depoAddress } = this.state;
                            const data = {
                                recipientFullName: depoFullName,
                                idType: depoIdType,
                                recipientIdNumber: depoIdNumber,
                                recipientPhoneNumber: depoPhoneNumber,
                                recipientAddress: depoAddress
                            };
                            this.props.dispatch(SetDepositoryFormData(data));
                        });
                    } else {
                        alert(response.message);
                        // alert(JSON.stringify(response))
                    }
                },
                reqError = (error) => {
                    console.log(error);
                    // alert(error.errMsg);
                    const formChanges = [
                        "destinationAccountName",
                        "destinationAccountCurrency"
                    ];
                    for (let i = 0; i < formChanges.length; i++) {
                        this.setValue(formChanges[i], null);
                    }
                };
            ApiService.open(req).then(reqSuccess, reqError);
        } else {
            const { depositoryFormData } = this.props;
            console.log(depositoryFormData.recipientFullName, "depositoryFormData");

            this.props.form.recipientFullName = depositoryFormData.recipientFullName
            this.props.form.idType = depositoryFormData.idType
            this.props.form.recipientIdNumber = depositoryFormData.recipientIdNumber
            this.props.form.recipientPhoneNumber = depositoryFormData.recipientPhoneNumber
            this.props.form.recipientAddress = depositoryFormData.recipientAddress
            console.log(this.props.form.recipientFullName, "this.props.form.recipientFullName")
            this.setState({
                // showDepository: false,

                depoFullName: depositoryFormData.recipientFullName,
                depoIdType: depositoryFormData.idType,
                depoIdNumber: depositoryFormData.recipientIdNumber,
                depoPhoneNumber: depositoryFormData.recipientPhoneNumber,
                depoAddress: depositoryFormData.recipientAddress,
                firstHitMainField: false,
                recipientDisabled: true,
            }, () => {
                const { depoFullName, depoIdType, depoIdNumber, depoPhoneNumber, depoAddress } = this.state;
                const data = {
                    recipientFullName: depoFullName,
                    idType: depoIdType,
                    recipientIdNumber: depoIdNumber,
                    recipientPhoneNumber: depoPhoneNumber,
                    recipientAddress: depoAddress
                };
                this.props.dispatch(SetDepositoryFormData(data));
                console.log(depoFullName, "depoFullName")
            });


        }


        const { selectedAccount, destinationAccountInfo } = this.state;
        let param = {
            cif: userData.cif
        }
        let queryStringParams = queryString.stringify(param),
            reqs = {
                path: SV_GET_MOCK_ACCOUNTS + '?' + queryStringParams,
                params: param,
                type: MOCK,
                method: GET_METHOD,
            },
            reqSucces = (response) => {
                const payload = response.payload;
                console.log(payload, "payload")
                if (payload.length === 1) {
                    // alert("masuk");
                    this.setState({
                        destinationAccountCardShow: payload,
                        destinationAccountInfo: payload[0]
                    });

                    console.log(JSON.stringify(destinationAccountInfo), "destinationAccountInfo");

                }
                // if (payload) {
                //     this.setState({ cardDestination: response.payload, popupStep: 0, selectedAccount: selectedAccount }, () => {
                //         // this.toggleDestinationAccountPopUp()
                //     });
                // } else {
                //     alert(response.message);
                // }
            },
            reqErrors = (error) => {
                console.log(error);
                // alert(error.errMsg);
            };
        ApiService.open(reqs).then(reqSucces, reqErrors);

    }

    componentDidUpdate() {
        const { form } = this.props;
        if (form) validation.commitDelete(form, this.dynamicFields);
        if (!form.currency) this.setDefaultValues();
    }

    componentWillUnmount() {
        this.props.dispatch(ResetFormState());
    }

    render() {
        const { formField, currencyList, destinationAccountCard, verificationMethod,
            destinationAccountInfo, showDepository, depositoryList, depoFullName, depoIdType, depoIdNumber,
            popupStep, cardDestination, saveAccountDetail, tncPopupVisible, currentStep, stepTitle, totalStep,
            firstHitMainField, agreeSubmitForm, destinationAccountCardShow, recipientDisabled
        } = this.state;
        let popupTitle, popupBody, popupButton, topButtonPopup;
        let popupFooter =
            <View style={styles.footerPopup}>
                <Text style={{ ...styles.mediumTextBold, ...styles.saveAccountDetail }}>{i18n('saveAccountDetail')}</Text>
                <Switch value={this.state.saveAccountDetail} onValueChange={this.saveAccountToggle} />
            </View>;
        const requestForm = this.props.requests[SV_FORM];
        const requestCard = this.props.requests[SV_CARD];
        const requestCardDestination = this.props.requests[SV_CARD_DESTINATION];
        const gettingFormField = this.props.requests[SV_GET_FORM_FIELD].inProgress && !formField;
        const gettingDestinationAccountInfo = this.props.requests[SV_CARD].inProgress;
        const { form, userData, appointmentId, depositoryFormData } = this.props;
        console.log('form', form);
        let formDepository = form.depositoryFullName && form.depositoryFullName.value && form.depositoryIdNumber && form.depositoryIdType ?
            {
                depoFullName: form.depositoryFullName.value,
                depoIdType: form.depositoryIdType.value,
                depoIdNumber: form.depositoryIdNumber.value
            }
            :
            {
                depoFullName: null,
                depoIdType: null,
                depoIdNumber: null
            };

        const submitFormButton = [
            {
                text: i18n('submit'),
                onPress: this.submitForm,
                props: {
                    request: requestForm,
                    buttonContainerStyle: {
                        marginHorizontal: 27,
                        marginBottom: 28
                    }
                }
            }];

        const selectDestinationButton = [{
            text: i18n('confirm'),
            onPress: this.toggleDestinationAccountPopUp
        }];


        const destinationAccountButton = [{
            text: i18n('confirm'),
            onPress: this.getDestinationAccountName,
            props: {
                request: requestCard
            }
        }];

        const confirmAddDestinationButton = [{
            text: i18n('confirm'),
            onPress: saveAccountDetail ? this.saveDestinationAccount : this.toggleDestinationAccountPopUp,
            props: {
                request: requestCardDestination
            }
        }];

        const submitButton = [{
            text: i18n('goToAnotherTransaction'),
            onPress: this.doAnotherTransaction,
            props: {
                fontStyle: {
                    lineHeight: 44
                }
            }
        }, {
            text: i18n('goToBookAppointment'),
            onPress: this.doneSubmit,
            props: {
                fontStyle: {
                    lineHeight: 44
                }
            }
        }];

        const tncButton = [{
            text: i18n('OK'),
            onPress: this.toggleTncPopUp,
            props: {
                fontStyle: {
                    lineHeight: 44
                }
            }
        }];

        let destinationAccountList = [];
        {
            for (let i = 0; i < cardDestination.length; i++) {
                // if (userData.depositories[0].depositoryName === cardDestination[i].accountName) {
                //     destinationAccountList.push(
                //         {
                //             accountName: cardDestination[i].accountName,
                //             accountType: cardDestination[i].accountType,
                //             currency: cardDestination[i].currency,
                //             accountNumber: cardDestination[i].accountNumber,
                //             selected: this.state.selectedAccount,
                //             // onPress: () => this.onClickBranch(cardDestination[i].id, cardDestination[i].location),
                //             onPress: () => this.setState({
                //                 selectedAccount: i,
                //                 destinationAccountCard: true,
                //                 destinationAccountInfo: cardDestination[i],
                //                 popupStep: 1
                //             }, () => { console.log('selectedAccount: ', this.state.selectedAccount) })
                //         },
                //     );
                // }
                if (cardDestination[i].accountType === "Saving" && cardDestination[i].allowDebit === true) {
                    destinationAccountList.push(
                        {
                            accountName: cardDestination[i].accountName,
                            accountType: cardDestination[i].accountType,
                            accountCurrency: cardDestination[i].accountCurrency,
                            accountNumber: cardDestination[i].accountNumber,
                            selected: this.state.selectedAccount,
                            // onPress: () => this.onClickBranch(cardDestination[i].id, cardDestination[i].location),
                            onPress: () => this.setState({
                                selectedAccount: i,
                                destinationAccountCard: true,
                                destinationAccountInfo: cardDestination[i],
                                popupStep: 1
                            }, () => { console.log('selectedAccount: ', this.state.selectedAccount) })
                        },
                    );
                } else {

                }
            }
        }


        let destinationAccountLists = [];
        {
            console.log(destinationAccountList, "destinationAccountList")
            for (let i = 0; i < destinationAccountList.length; i++) {
                destinationAccountLists.push(
                    {
                        accountName: destinationAccountList[i].accountName,
                        accountType: destinationAccountList[i].accountType,
                        currency: destinationAccountList[i].accountCurrency,
                        accountNumber: destinationAccountList[i].accountNumber,
                        selected: this.state.selectedAccount,
                        // onPress: () => this.onClickBranch(cardDestination[i].id, cardDestination[i].location),
                        onPress: () => this.setState({
                            selectedAccount: i,
                            destinationAccountCard: true,
                            destinationAccountInfo: destinationAccountList[i],
                            popupStep: 1
                        }, () => { console.log('selectedAccount: ', this.state.selectedAccount) })
                    },
                );
            }
        }

        const title = (
            <Title style={styles.title} containerStyle={styles.containerTitle}>
                <Text style={styles.titleText}>{i18n('createCashWithdrawalEform')}</Text>
                <Text style={styles.subtitleText}>{i18n('pleaseInputYourData')}</Text>
            </Title>
        ); // Add this to bdsScreenTemplate props to show title step of screen

        switch (popupStep) {
            case 1:
                popupTitle = i18n("selectDebitAccount");
                popupBody = <DestinationAccount lists={destinationAccountLists} />;
                popupButton = <ButtonGroup buttons={selectDestinationButton} type="stack" />;
                popupFooter = null;
                // topButtonPopup = () => {this.setState({popupStep: 2})};
                break;
            case 2:
                popupTitle = i18n("enterDestinationAccount");
                popupBody =
                    <InputTextNormal
                        name='beneficiaryAccount'
                        maxLength={16}
                        placeholder={i18n('beneficiaryAccount')}
                        parentStyle={styles.inputItem}
                        keyboardType='numeric'
                        ref={el => this.addDynamicFields(el, "beneficiaryAccount")}
                        loginForm
                    />;
                popupButton = <ButtonGroup buttons={destinationAccountButton} type="stack" />;
                break;
            case 3:
                popupTitle = i18n("selectDestinationAccount");
                popupBody =
                    <View style={styles.destinationAccountGet}>
                        <View style={themes.fldr}>
                            <Body style={styles.destinationAccountCardBody}>
                                <Text style={styles.mediumTextBold}>{destinationAccountInfo.accountName}</Text>
                                <Text style={styles.mediumTextBold}>{destinationAccountInfo.accountNumber} ({destinationAccountInfo.accountCurrency})</Text>
                                <Text style={styles.mediumTextNormal}>{destinationAccountInfo.accountType}</Text>
                            </Body>
                            <Right style={themes.flp5}>
                                <Image source={staticImages.cardVisa} />
                            </Right>
                        </View>
                    </View>;
                popupButton = <ButtonGroup buttons={confirmAddDestinationButton} type="stack" />;
                break;
        }

        // let destinationAccountCardContent = null
        let destinationAccountCardContent = destinationAccountCardShow.length !== 0 ?
            destinationAccountCardContent =
            <View style={themes.fldr}>
                <Left>
                    <Image source={staticImages.cardVisa} />
                </Left>
                <Body style={styles.destinationAccountCardBody}>
                    <Text style={styles.mediumTextBold}>{destinationAccountCardShow[0].accountName}</Text>
                    <Text style={styles.mediumTextBold}>{destinationAccountCardShow[0].accountNumber} ({destinationAccountCardShow[0].accountCurrency})</Text>
                    <Text style={styles.mediumTextNormal}>{destinationAccountCardShow[0].accountType}</Text>
                </Body>
                <Right style={themes.flp5}>
                    <Image source={staticIcons.arrowDroplist} />
                </Right>
            </View>
            :
            destinationAccountCardContent = destinationAccountCard ?
                <View style={themes.fldr}>
                    <Left>
                        <Image source={staticImages.cardVisa} />
                    </Left>
                    <Body style={styles.destinationAccountCardBody}>
                        <Text style={styles.mediumTextBold}>{destinationAccountInfo.accountName}</Text>
                        <Text style={styles.mediumTextBold}>{destinationAccountInfo.accountNumber} ({destinationAccountInfo.accountCurrency})</Text>
                        <Text style={styles.mediumTextNormal}>{destinationAccountInfo.accountType}</Text>
                    </Body>
                    <Right style={themes.flp5}>
                        <Image source={staticIcons.arrowDroplist} />
                    </Right>
                </View>
                :
                <View style={themes.fldr}>
                    <Left>
                        <Text style={styles.placeholder}>{i18n('selectDebitAccount')}</Text>
                    </Left>
                    <Right>
                        <Image source={staticIcons.arrowDroplist} />
                    </Right>
                </View>
            ;

        // if (destinationAccountCardShow.length !== 0) {
        //     console.log(destinationAccountCardShow, "destinationAccountCardShow")
        //     destinationAccountCardContent =
        //         <View style={themes.fldr}>
        //             <Left>
        //                 <Image source={staticImages.cardVisa} />
        //             </Left>
        //             <Body style={styles.destinationAccountCardBody}>
        //                 <Text style={styles.mediumTextBold}>{destinationAccountCardShow[0].accountName}</Text>
        //                 <Text style={styles.mediumTextBold}>{destinationAccountCardShow[0].accountNumber} ({destinationAccountCardShow[0].accountCurrency})</Text>
        //                 <Text style={styles.mediumTextNormal}>{destinationAccountCardShow[0].accountType}</Text>
        //             </Body>
        //             <Right style={themes.flp5}>
        //                 <Image source={staticIcons.arrowDroplist} />
        //             </Right>
        //         </View>
        // } else {
        //     destinationAccountCardContent = destinationAccountCard ?
        //         <View style={themes.fldr}>
        //             <Left>
        //                 <Image source={staticImages.cardVisa} />
        //             </Left>
        //             <Body style={styles.destinationAccountCardBody}>
        //                 <Text style={styles.mediumTextBold}>{destinationAccountInfo.accountName}</Text>
        //                 <Text style={styles.mediumTextBold}>{destinationAccountInfo.accountNumber} ({destinationAccountInfo.accountCurrency})</Text>
        //                 <Text style={styles.mediumTextNormal}>{destinationAccountInfo.accountType}</Text>
        //             </Body>
        //             <Right style={themes.flp5}>
        //                 <Image source={staticIcons.arrowDroplist} />
        //             </Right>
        //         </View>
        //         :
        //         <View style={themes.fldr}>
        //             <Left>
        //                 <Text style={styles.placeholder}>{i18n('selectDebitAccount')}</Text>
        //             </Left>
        //             <Right>
        //                 <Image source={staticIcons.arrowDroplist} />
        //             </Right>
        //         </View>
        //         ;
        // }

        let depositoryAccountCardContent = userData.depositories && userData.depositories[0] != null && depoFullName != null ?
            form.recipientFullName ?
                <View style={themes.fldr}>
                    <Left>
                        <Text style={styles.mediumTextBold}>{depoFullName}</Text>
                        <Text style={styles.mediumTextBold}>{depoIdType}</Text>
                        <Text style={styles.mediumTextNormal}>{depoIdNumber}</Text>
                    </Left>
                    <Right>
                        <Image source={staticIcons.arrowDroplist} />
                    </Right>
                </View>
                :
                <View style={themes.fldr}>
                    {
                        _.isEmpty(depositoryFormData) ?
                            <Left>
                                <Text style={styles.mediumTextBold}>{userData.depositories[0].depositoryName}</Text>
                                <Text style={styles.mediumTextBold}>{userData.depositories[0].idType}</Text>
                                <Text style={styles.mediumTextNormal}>{userData.depositories[0].idNumber}</Text>
                            </Left> :
                            <Left>
                                <Text style={styles.mediumTextBold}>{depositoryFormData.recipientFullName}</Text>
                                <Text style={styles.mediumTextBold}>{depositoryFormData.idType}</Text>
                                <Text style={styles.mediumTextNormal}>{depositoryFormData.recipientIdNumber}</Text>
                            </Left>
                    }
                    <Right>
                        <Image source={staticIcons.arrowDroplist} />
                    </Right>
                </View>
            :
            form.recipientFullName || depoFullName ?
                <View style={themes.fldr}>
                    <Left>
                        <Text style={styles.mediumTextBold}>{depoFullName}</Text>
                        <Text style={styles.mediumTextBold}>{depoIdType}</Text>
                        <Text style={styles.mediumTextNormal}>{depoIdNumber}</Text>
                    </Left>
                    <Right>
                        <Image source={staticIcons.arrowDroplist} />
                    </Right>
                </View>
                :
                <View style={themes.fldr}>
                    <Left>
                        <Text style={styles.placeholder}>{i18n('selectRecipientInformation')}{depoFullName}</Text>
                    </Left>
                    <Right>
                        <Image source={staticIcons.arrowDroplist} />
                    </Right>
                </View>
            ;

        let renderView = !showDepository ?
            <MainFields
                requestCardDestination={requestCardDestination}
                selectDestinationAccount={this.selectDestinationAccount}
                destinationAccountCardContent={destinationAccountCardContent}
                currencyList={currencyList}
                currentStep={currentStep}
                goToDepositoryField={this.goToDepositoryField}
                depositoryAccountCardContent={depositoryAccountCardContent}
                agreeSubmitForm={agreeSubmitForm}
                checkAgreeSubmitForm={this.checkAgreeSubmitForm}
                toggleTncPopUp={this.toggleTncPopUp}
                submitFormButton={submitFormButton}
                appointmentId={appointmentId}
                toggleDestinationAccountPopUp={this.toggleDestinationAccountPopUp}
                destinationAccountPopupVisible={this.state.destinationAccountPopupVisible}
                popupTitle={popupTitle}
                popupBody={popupBody}
                popupButton={popupButton}
                popupFooter={popupFooter}
                topButtonPopup={topButtonPopup}
                verificationMethod={verificationMethod}
                getAmountValueFromFieldName={this.getAmountValueFromFieldName}
                calculateEquivalentAmount={this.calculateEquivalentAmount}
                recipientDisabled={recipientDisabled}
            />
            :
            <DepositoryAccount opts={{
                form: form,
                constraints: constraints,
                goToMainField: this.gotoMainField,
                requestForm: requestForm,
                depositoryList: depositoryList,
                value: userData.depositories && userData.depositories[0] && !firstHitMainField ? userData.depositories[0] : null
            }} />;

        return (
            <BdsScreenTemplate title={title} goBack={this.onBackClick} navigation={this.props.navigation} parentStyle={styles.containerBackground}>
                <Content>
                    <FormValidation form={form} constraints={form.idType && form.idType.value === 'KTP' ? ktpConstraints : constraints}>
                        {renderView}
                    </FormValidation>
                </Content>
                <PopUp
                    isVisible={this.state.submitPopUpVisible}
                    type="success"
                    title={i18n("eformSuccessSubmit")}
                    titleStyle={styles.titleText}
                    buttons={
                        <ButtonGroup buttons={submitButton} type="stack" />
                    }
                />
                <PopUp
                    isVisible={tncPopupVisible}
                    // type="success"
                    title={i18n("termsNCondition")}
                    description={
                        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam debitis dignissimos distinctio facere minima porro, sed vitae? Quibusdam, reprehenderit voluptatem. Consequuntur eaque iusto laboriosam libero, minima officiis quas repellat rerum voluptates. Accusantium ad animi asperiores, aspernatur at autem corporis cumque delectus doloremque ea eligendi eos error ex fugiat itaque minima mollitia nam nisi obcaecati officia optio possimus quaerat quam quasi quia quidem recusandae repellat sed tenetur, ullam, unde velit veritatis voluptates. Distinctio dolore excepturi, explicabo neque numquam optio perspiciatis porro rerum vitae. Ab ad architecto atque delectus odio. Alias asperiores autem beatae, blanditiis debitis dolore dolorum enim iure libero magni maxime neque quasi soluta! Asperiores eaque hic inventore itaque molestias sapiente, ullam ut. Ad, error eveniet excepturi itaque molestias numquam officia quibusdam sapiente vel vero? At ea fuga labore molestias neque numquam quasi quo sint temporibus vero! Ad amet expedita neque nihil provident, quaerat sunt voluptatem? Deleniti facere illum laboriosam molestias nam neque nulla pariatur placeat vitae voluptatem! Adipisci blanditiis commodi distinctio doloremque doloribus earum est, iste libero modi perferendis, quam qui quidem, sunt ullam voluptatibus? Aut cumque ea excepturi harum illo modi molestiae nihil odit omnis quia, rerum saepe tempora tempore temporibus ullam? Asperiores aut cupiditate dolor doloribus necessitatibus numquam qui, quis suscipit? Consequuntur dignissimos ea et explicabo illum iste laborum quaerat quos, rem temporibus. Architecto cumque debitis deleniti doloremque eligendi excepturi laboriosam modi molestiae nulla omnis quis, saepe voluptas! Ad, aperiam blanditiis consequatur cupiditate dicta dolor dolore earum eius esse excepturi facere, magni nemo obcaecati provident quia quos ratione repellendus ullam velit voluptas? Alias exercitationem illum quaerat unde! A ab amet commodi consequuntur cumque dignissimos dolorem dolorum eos error facilis harum hic inventore ipsa iure libero molestias mollitia, neque nostrum possimus quod quos veniam voluptatum. Accusamus ad at commodi consectetur cum deserunt dolor ea earum illo nihil nobis, numquam odio sequi totam velit. Accusamus delectus dicta explicabo, fugiat hic iste itaque iusto laudantium minima praesentium quae quas reiciendis reprehenderit sit sunt unde voluptates? Adipisci aperiam beatae cupiditate deleniti illum itaque magnam minima, numquam odio quaerat quo recusandae rem sint totam voluptate. Accusantium adipisci aliquam aliquid consequatur corporis delectus dolorem eligendi error facere illum maiores neque officia provident quaerat quod ratione repudiandae veritatis, voluptas! A magni quaerat velit. Alias ducimus iusto, modi nihil odit pariatur possimus quia. Aut blanditiis consequatur doloremque ducimus fugiat illo labore neque ullam vel voluptatum? Molestiae perferendis perspiciatis soluta. Ab alias animi earum eveniet excepturi, facilis illum ipsa maiores mollitia placeat quia, quod sapiente voluptates! A, assumenda consectetur dolore est fugit illum iure iusto laudantium minus nam quasi quibusdam ratione rerum saepe sit, unde veniam, vero voluptates! Aliquid enim quae sunt. Ab ad distinctio impedit molestias praesentium quaerat quibusdam, tempore tenetur voluptates. A ab adipisci alias aliquam amet architecto asperiores autem beatae commodi corporis debitis dicta doloribus error facilis incidunt ipsum iure laboriosam magnam maiores, obcaecati officiis porro quae quas, qui quisquam sequi similique soluta tempore temporibus vel velit vero voluptas, voluptatum. Ab commodi corporis cupiditate delectus dignissimos, excepturi explicabo, facere incidunt quam, saepe voluptatem."
                    }
                    titleStyle={{ ...styles.titleText, ...styles.tncTitleText }}
                    buttons={
                        <ButtonGroup buttons={tncButton} type="stack" />
                    }
                />
            </BdsScreenTemplate>
        );
    }
}

CashWithdrawalEform.propTypes = {
    appointmentId: PropTypes.string,
    appQueueId: PropTypes.string,
    currentLanguage: PropTypes.any,
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
        // appQueueId: state.appointmentId,
        depositoryType: state.depositoryType,
        userData: state.userData,
        depositoryFormData: state.depositoryFormData
    }
};

export default connect(mapStatesToProps)(CashWithdrawalEform);