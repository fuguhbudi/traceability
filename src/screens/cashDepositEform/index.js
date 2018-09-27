import React, { Component } from 'react';
import { Content, Text, View, Left, Right, Switch, Body } from 'native-base';
import { Image } from 'react-native';
import { themes, PropTypes, ScreenHeader, i18n, connect, staticIcons, staticImages } from 'helpers/common';
import { InputTextTopLabel, InputTextNormal } from 'components/inputFields';
import FormValidation from 'components/formValidation';
import { MAIN, ACTION_CREATE, ACTION_READ, GET_METHOD, POST_METHOD, PRECISION_CURRENCY, UNIT_CURRENCY,
    DELIMITER_CURRENCY, SEPARATOR_CURRENCY } from 'helpers/constant';
import ApiService from 'helpers/services';
import styles from './style';
import { SV_FORM, SV_CARD, SV_GET_FORM_FIELD, SV_CARD_DESTINATION, SV_GET_CURRENCY } from 'helpers/services/endpoints/';
import constraints, { ktpConstraints } from 'helpers/constraints/eFormConstraints';
import { normalizeEFormParams, setDefaults } from 'helpers/utils/generic/dataTransfer';
import { clean, formUtil, validation } from 'helpers/utils';
import { setAppointmentId } from 'helpers/redux/actions/genericActions';
import writtenNumber from 'helpers/utils/amountInWords';
import { SetFormState, ResetFormState, SetUserData, SetFormData, SetDepositoryFormData } from 'helpers/redux/actions/formActions';
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
import {MaskService} from "react-native-masked-text";

class CashDepositEform extends SuperForm(Component) {

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
            firstHitMainField: false
        };
        this.dynamicFields = {}
        // this.getFormField = this.getFormField.bind(this);
    }

    submitForm = () => {
        const { form, appointmentId, userData } = this.props;
        const { destinationAccountInfo, depoFullName, depoIdType, depoIdNumber, depoPhoneNumber, depoAddress } = this.state;
        const normalizeData = clean(normalizeEFormParams(form, this.state));
        if (!formUtil.isValid(form) || !this.state.agreeSubmitForm) {
            alert('Error');
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
                destinationAccountNumber: destinationAccountInfo.account.accountNumber,
                destinationAccountName: destinationAccountInfo.account.accountName,
                destinationAccountCurrency: destinationAccountInfo.account.accountCurrency,

                recipientIdType: userData.depositories && userData.depositories[0] != null ? depoIdType !== null ? depoIdType : userData.depositories && userData.depositories[0].idType : depoIdType !== null ? depoIdType : null,
                recipientIdNumber: userData.depositories && userData.depositories[0] != null ? depoIdNumber !== null ? depoIdNumber : userData.depositories && userData.depositories[0].idNumber : depoIdNumber !== null ? depoIdNumber : null,
                
                recipientName: userData.depositories && userData.depositories[0] != null ? depoFullName !== null ? depoFullName : userData.depositories && userData.depositories[0].recipientName : depoFullName !== null ? depoFullName : null,
                recipientPhoneNumber: userData.depositories && userData.depositories[0] != null ? depoPhoneNumber !== null ? depoPhoneNumber : userData.depositories && userData.depositories[0].recipientPhoneNumber : depoPhoneNumber !== null ? depoPhoneNumber : null,

                recipientType: userData.depositories && userData.depositories[0] != null ? userData.depositories[0].recipientType : 'REGULAR',
                amountInWords: inputValues.amountInWords ? inputValues.amountInWords : null,
                equivalentAmount: inputValues.amount ? inputValues.amount : null,
                rate: "1"
            },
            formType: "CASH_DEPOSIT",
            appointmentId: appointmentId ? appointmentId : null,
        },
            req = {
                path: SV_FORM,
                params: clean(params),
                type: MAIN,
            },

            reqSuccess = (response) => {
                const payload = response.payload;
                console.log(response,"response")
                this.props.dispatch(setAppointmentId(payload.appointment.id));
                this.toggleSubmitPopUp();
                // this.getBusinessType(payload.appointment.id);
            },
            reqError = (error) => {
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
                console.log('payload: ', payload);
                this.props.dispatch(SetFormData(payload));
            },
            reqError = (error) => {
                console.log(error);
                alert(error.errMsg);
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :' + JSON.stringify(req.params));
    };

    getDestinationAccountName = () => {
        const { form } = this.props;
        const { userData } = this.props;
        console.log('form', form);
        const inputValues = formUtil.mapFTVO(form, true);

        let params = {
            accountNumber: inputValues.beneficiaryAccount,
            userId: userData.id
        }
        let queryStringParam = queryString.stringify(params),
            req = {
                path: SV_CARD + '?' + queryStringParam,
                params: params,
                type: MAIN,
                method: GET_METHOD,
            },
            reqSuccess = (response) => {
                // console.log('SV_CARD READ: ', response);
                const payload = response.payload;
                this.setState({
                    destinationAccountCard: true,
                    destinationAccountInfo: response.payload,
                    popupStep: 3
                });
            },
            reqError = (error) => {
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
            userId: userData.id,
            accountNumber: destinationAccountInfo.account.accountNumber,
        }
        let queryStringParam = queryString.stringify(params),
            req = {
                path: SV_CARD_DESTINATION + '?' + queryStringParam,
                params: params,
                type: MAIN,
                method: POST_METHOD,
            },
            reqSuccess = (response) => {
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
        let params = {
            action: ACTION_READ,
            userId: userData.id
        }
        let queryStringParam = queryString.stringify(params),
            req = {
                path: SV_CARD_DESTINATION + '?' + queryStringParam,
                params: params,
                type: MAIN,
                method: GET_METHOD,
            },
            reqSuccess = (response) => {
                this.setState({ cardDestination: response.payload, popupStep: 1, selectedAccount: selectedAccount }, () => {
                    this.toggleDestinationAccountPopUp()
                });
            },
            reqError = (error) => {
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
        this.toggleSubmitPopUp();
        this.props.navigation.navigate('ActivityOption');
    };

    doneSubmit = () => {
        this.toggleSubmitPopUp();
        this.props.navigation.navigate('CreateAppointment');
    };

    goToDepositoryField = () => {
        this.setState({
            showDepository: true
        });
    };

    gotoMainField = () => {
        const { form } = this.props;
        console.log('form', form);
        // if(!formUtil.isValid(form)) return;
        this.setState({
            showDepository: false,
            depoFullName: this.props.form.depositoryFullName.value,
            depoIdType: this.props.form.idType.value,
            depoIdNumber: this.props.form.depositoryIdNumber.value,
            depoPhoneNumber: this.props.form.depositoryPhoneNumber.value,
            depoAddress: this.props.form.depositoryAddress.value,
            firstHitMainField: true
        }, () => {
            const { depoFullName, depoIdType, depoIdNumber, depoPhoneNumber, depoAddress } = this.state;
            const data = {
                depositoryFullName: depoFullName,
                idType: depoIdType,
                depositoryIdNumber: depoIdNumber,
                depositoryPhoneNumber: depoPhoneNumber,
                depositoryAddress: depoAddress
            };
            this.props.dispatch(SetDepositoryFormData(data));
        });
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

    calculateAmountToDeposit = () => {
        const { form, currentLanguage } = this.props;
        const { tempContractRate, currencyText } = this.state;
        const inputValues = formUtil.mapFTVO(form, true);
        const creditedAmount = parseInt(inputValues.amount);
        const result = creditedAmount * parseFloat(tempContractRate);
        // this.setValue("equivalentAmount",isNaN(result)? 0 : result.toString());
        this.setValue("amountInWords", writtenNumber(result, { lang: currentLanguage }) + " " + currencyText);
    };

    calculateAmountToDeposit = (amount) => {
        const { currentLanguage, form } = this.props;
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
        unformattedAmount = unformattedAmount * Math.pow(10, PRECISION_CURRENCY);
        const creditedAmount = parseFloat(unformattedAmount).toFixed(2);
        const result = creditedAmount * parseFloat(tempContractRate);
        this.setValue("amount", unformattedAmount.toString());
        var lastResult = result;
        lastResult = lastResult.toString();
        lastResult = lastResult.slice(0, -2);
        lastResult = parseInt(lastResult);
        this.setValue("amountInWords", writtenNumber(lastResult, { lang: currentLanguage }) + " " + currencyText);
        this.setValue("equivalentAmount", unformattedAmount.toString());

    };

    getAmountValueFromFieldName = (fieldName) => {
        const {form} = this.props;
        const inputValues = formUtil.mapFTVO(form, true);
        const unformattedValues = parseInt(inputValues[fieldName]);
        const formattedValues =  MaskService.toMask('money', unformattedValues, {
            unit: UNIT_CURRENCY,
            separator: SEPARATOR_CURRENCY,
            delimiter: DELIMITER_CURRENCY,
            precision: PRECISION_CURRENCY
        })
        return formattedValues;
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
        const { formField, currencyList, destinationAccountCard,
            destinationAccountInfo, showDepository, depositoryList, depoFullName, depoIdType, depoIdNumber,
            popupStep, cardDestination, saveAccountDetail, tncPopupVisible, currentStep, stepTitle, totalStep,
            firstHitMainField, agreeSubmitForm
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
                destinationAccountList.push(
                    {
                        accountName: cardDestination[i].account.accountName,
                        accountType: cardDestination[i].account.accountType,
                        currency: cardDestination[i].account.accountCurrency,
                        accountNumber: cardDestination[i].account.accountNumber,
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
            }
        }

        const title = (
            <Title style={styles.title} containerStyle={styles.containerTitle}>
                <Text style={styles.titleText}>{i18n('createCashDepositEform')}</Text>
                <Text style={styles.subtitleText}>{i18n('pleaseInputYourData')}</Text>
            </Title>
        ); // Add this to bdsScreenTemplate props to show title step of screen

        switch (popupStep) {
            case 1:
                popupTitle = i18n("selectDestinationAccount");
                popupBody = <DestinationAccount lists={destinationAccountList} />;
                popupButton = <ButtonGroup buttons={selectDestinationButton} type="stack" />;
                popupFooter = null;
                topButtonPopup = () => { this.setState({ popupStep: 2 }) };
                break;
            case 2:
                popupTitle = i18n("enterDestinationAccount");
                popupBody = <InputTextNormal
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
                                <Text style={styles.mediumTextBold}>{destinationAccountInfo.account.accountName}</Text>
                                <Text style={styles.mediumTextBold}>{destinationAccountInfo.account.accountNumber} ({destinationAccountInfo.account.accountCurrency})</Text>
                                <Text style={styles.mediumTextNormal}>{destinationAccountInfo.account.accountType}</Text>
                            </Body>
                            <Right style={themes.flp5}>
                                <Image source={staticImages.cardVisa} />
                            </Right>
                        </View>
                    </View>;
                popupButton = <ButtonGroup buttons={confirmAddDestinationButton} type="stack" />;
                break;
        }

        let destinationAccountCardContent = destinationAccountCard ?
            <View style={themes.fldr}>
                <Left>
                    <Image source={staticImages.cardVisa} />
                </Left>
                <Body style={styles.destinationAccountCardBody}>
                    <Text style={styles.mediumTextBold}>{destinationAccountInfo.account.accountName}</Text>
                    <Text style={styles.mediumTextBold}>{destinationAccountInfo.account.accountNumber} ({destinationAccountInfo.account.accountCurrency})</Text>
                    <Text style={styles.mediumTextNormal}>{destinationAccountInfo.account.accountType}</Text>
                </Body>
                <Right style={themes.flp5}>
                    <Image source={staticIcons.arrowDroplist} />
                </Right>
            </View>
            :
            <View style={themes.fldr}>
                <Left>
                    <Text style={styles.placeholder}>{i18n('selectDestinationAccount')}</Text>
                </Left>
                <Right>
                    <Image source={staticIcons.arrowDroplist} />
                </Right>
            </View>
            ;

        let depositoryAccountCardContent = userData.depositories && userData.depositories[0] != null ?
            form.depositoryFullName ?
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
                                <Text style={styles.mediumTextBold}>{depositoryFormData.depositoryFullName}</Text>
                                <Text style={styles.mediumTextBold}>{depositoryFormData.idType}</Text>
                                <Text style={styles.mediumTextNormal}>{depositoryFormData.depositoryIdNumber}</Text>
                            </Left>
                    }
                    <Right>
                        <Image source={staticIcons.arrowDroplist} />
                    </Right>
                </View>
            :
            form.depositoryFullName ?
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
                        <Text style={styles.placeholder}>{i18n('selectDepositoryInformation')}</Text>
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
                calculateAmountToDeposit={this.calculateAmountToDeposit}
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
                getAmountValueFromFieldName={this.getAmountValueFromFieldName}
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

CashDepositEform.propTypes = {
    appointmentId: PropTypes.string,
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
        depositoryType: state.depositoryType,
        userData: state.userData,
        depositoryFormData: state.depositoryFormData
    }
};

export default connect(mapStatesToProps)(CashDepositEform);