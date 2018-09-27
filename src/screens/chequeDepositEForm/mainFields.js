import React,{Component} from 'react';
import {Text, View, Image, TouchableOpacity} from "react-native";
import {Spinner, Button, CheckBox, Left, Body, Right} from 'native-base';
import {PropTypes, i18n, themes, staticIcons, connect} from "helpers/common";
import styles from "./style";
import Card from 'components/card';
import {PickerDropList} from 'components/picker';
import {InputTextNormal} from 'components/inputFields';
import ButtonGroup from 'components/buttonGroup';
import PopUp from 'components/popUp';
import {TouchableInputField} from 'components/inputFields';
import AutoComplete from 'components/autoComplete';
import {SetFormState} from 'helpers/redux/actions/formActions';
import queryString from 'query-string';
import { SV_GET_BANK_NAME } from 'helpers/services/endpoints/';
import { MAIN, GET_METHOD, MOCK } from 'helpers/constant';
import ApiService from 'helpers/services';
import {setDefaults} from 'helpers/utils/generic/dataTransfer';

class MainFields extends Component {
    constructor() {
        super();
        this.state = {
            autoCompleteValue: '',
            suggestionList: []
        }
    }

    getServiceType = (keyword) => {
        console.log('Getting bank list');
        const {form} = this.props;
        // const {toggleErrorPopUp} = this.props.opts;
        const params = {
                name: keyword
            },
            queryStringParam = queryString.stringify(params),
            req = {
                path : SV_GET_BANK_NAME + '?' + queryStringParam,
                params: {},
                type: MOCK,
                method: GET_METHOD,
                // notShowErrorAlert: true
            },
            reqSuccess = (response) => {
                const payload = response.payload;
                let suggestionList = [];
                for (let i = 0; i < payload.length; i++) {
                    suggestionList.push(
                        {
                            name: payload[i].name,
                            serviceType: payload[i].serviceType
                        },
                    )
                }
                this.setState({suggestionList: suggestionList});
            },
            reqError = (error) => {
                // toggleErrorPopUp(error);
            };
        console.log('===== ini params :'+JSON.stringify(params));
        this.props.opts.setRequest(SV_GET_BANK_NAME + '?' + queryStringParam);
        ApiService.open(req).then(reqSuccess, reqError);
    };

    onSelect = (fieldName, suggestion) => {
        const {actionButton, form} = this.props;
        let obj = {};
        obj[fieldName] = suggestion.name;
        // Real data
        // const defaults = setDefaults(form, obj);
        //Local mock data
        const defaults = setDefaults(form, {
            ...obj
        });

        this.setState({
            autoCompleteValue: suggestion.name,
            defaults: defaults
        }, () => {
            this.props.dispatch(SetFormState(defaults))
        });
    };

    handleChangeText = (fieldName, text) => {
        this.setState({autoCompleteValue: text}, () => {
            this.searchBank(fieldName, text);
        })
    };

    searchBank = (fieldName, text) => {
        if (text.length >= 3) this.getServiceType(text);
    };


    render() {
        const {opts} = this.props;
        const {suggestionList} = this.state;

        return (
            <View>

                <Card title={i18n('selectWhichToDeposit')}>
                    <PickerDropList name="chequeType" list={opts.chequeType} />
                </Card>

                {/*<Card title={i18n('pleaseTakePhoto')}>*/}
                    {/*<View style={styles.flexColumn}>*/}
                        {/*<View style={styles.flexColumnLeft}>*/}
                            {/*<TouchableOpacity style={styles.takePhoto} onPress={opts.takeFrontPhoto}>*/}
                                {/*<Image source={staticIcons.camera} />*/}
                            {/*</TouchableOpacity>*/}
                            {/*<Text style={styles.takePhotoText}>{i18n('frontCheque')}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.flexColumnRight}>*/}
                            {/*<TouchableOpacity style={styles.takePhoto} onPress={opts.takeBackPhoto}>*/}
                                {/*<Image source={staticIcons.camera} />*/}
                            {/*</TouchableOpacity>*/}
                            {/*<Text style={styles.takePhotoText}>{i18n('backCheque')}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</Card>*/}

                <Card title={i18n('chequeDate')}>
                    <TouchableInputField
                        actionButton={opts.pickChequeDate}
                        value={opts.form.chequeDate && opts.form.chequeDate.value? opts.form.chequeDate.value : 'yaa'}
                        existValue={opts.form.chequeDate && opts.form.chequeDate.value? opts.form.chequeDate.value : false}
                        name="chequeDate"
                        icon={staticIcons.calendar}
                        style={styles.selectAccount}
                    />
                </Card>

                <Card title={i18n('chequeBankName')}>
                    <View>
                        <AutoComplete
                            onSelect={this.onSelect}
                            suggestions={suggestionList}
                            suggestionObjectTextProperty='name'
                            value={this.state.autoCompleteValue}
                            onChangeText={(text) => {this.handleChangeText('chequeBankName', text)}}
                            name='chequeBankName'
                            maxLength={255}
                            placeholder={i18n('insertBankName')}
                            editable={true}
                            suggestionsWrapperStyle={styles.suggestionsWrapper}
                        />
                        <View style={{...styles.icon, top: 17}}>
                            <Image source={staticIcons.search} />
                        </View>
                    </View>

                </Card>

                <Card title={i18n('chequeNumber')}>
                    <View>
                        <InputTextNormal
                            name='chequeNumber'
                            maxLength={16}
                            placeholder={i18n('insertChequeNumber')}
                            onEndEditing={opts.getChequeAccount}
                            // ref={ el => this.addDynamicFields(el, "amount") }
                        />
                    </View>
                </Card>

                <Card title={i18n('sourceAccount')}>
                    {/*<Button onPress={goToDepositoryField} disabled={appointmentId} style={ appointmentId ? styles.selectAccountAppQueue : styles.selectAccount}>*/}
                    <Button onPress={opts.goToSoureAccountField} style={ styles.selectAccount }>
                        {opts.sourceAccountCardContent}
                    </Button>
                </Card>

                <Card title={i18n('amount')}>
                    <View style={styles.flexColumn}>
                        <View style={styles.flexColumnLeft}>
                            <PickerDropList name="currency" list={opts.currencyList} />
                        </View>
                        <View style={styles.flexColumnRight2p5}>
                            <InputTextNormal
                                name='amount'
                                maxLength={16}
                                placeholder={i18n('typeAmount')}
                                keyboardType='numeric'
                                onEndEditing={opts.calculateAmountToDeposit}
                                // ref={ el => this.addDynamicFields(el, "amount") }
                            />
                        </View>
                    </View>
                </Card>

                <Card title={i18n('beneficiaryAccount_')}>
                    {
                        opts.requestCardDestination && opts.requestCardDestination.inProgress ? <Spinner/> :
                            <Button style={styles.selectAccount} onPress={opts.selectDestinationAccount}>
                                {opts.destinationAccountCardContent}
                            </Button>
                    }
                </Card>

                <Card title={i18n('depositoryInformation')}>
                    {/*<Button onPress={goToDepositoryField} disabled={appointmentId} style={ appointmentId ? styles.selectAccountAppQueue : styles.selectAccount}>*/}
                    <Button onPress={opts.goToDepositoryField} style={ styles.selectAccount }>
                        {opts.depositoryAccountCardContent}
                    </Button>
                </Card>
                <Card title={i18n('notes')}>
                    <View>
                        <InputTextNormal
                            name='remark'
                            placeholder={i18n('max250Chars')}
                            multiline
                            parentStyle={styles.textArea}
                            maxLength={250}
                            // ref={ el => this.addDynamicFields(el, "message") }
                        />
                    </View>
                </Card>

                <Card title={i18n('instructionDate')}>
                    <TouchableInputField
                        actionButton={opts.pickInstructionDate}
                        value={opts.form.instructionDate && opts.form.instructionDate.value? opts.form.instructionDate.value : 'yaa'}
                        existValue={opts.form.instructionDate && opts.form.instructionDate.value? opts.form.instructionDate.value : false}
                        name="instructionDate"
                        icon={staticIcons.calendar}
                        style={styles.selectAccount}
                    />
                </Card>

                <Card>
                    <View style={styles.flexColumn}>
                        <View style={styles.flexColumnLeft}>
                            <CheckBox checked={opts.agreeSubmitForm} color="#14af96" onPress={opts.checkAgreeSubmitForm}/>
                        </View>
                        <View style={styles.flexColumnRightAgreement}>
                            <Text style={styles.mediumTextBold}>{i18n('agreeSubmitForm')}. <Text style={styles.agreeSubmitReadMore} onPress={opts.toggleTncPopUp}>{i18n('readMore')}</Text></Text>
                        </View>
                    </View>
                </Card>
                <ButtonGroup buttons={opts.submitFormButton} />
                <PopUp
                    onBackdropPress={opts.toggleDestinationAccountPopUp}
                    isVisible={opts.destinationAccountPopupVisible}
                    content='inputData'
                    title={opts.popupTitle}
                    body={opts.popupBody}
                    buttons={opts.popupButton}
                    footer={opts.popupFooter}
                    topButton={opts.topButtonPopup}
                />
            </View>
        );
    }
};

MainFields.propTypes = {};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        request: state.requests,
        currentLanguage: state.currentLanguage,
        depositoryType: state.depositoryType,
        formData: state.formData
    }
};

export default connect(mapStatesToProps)(MainFields);
