import React,{Component} from 'react';
import {Container, Content, View,Text} from 'native-base';
import {InputTextTopLabel, InputTextNormal} from 'components/inputFields';
import {PickerDropList} from 'components/picker';
import InputLabel from 'components/inputFields/InputLabel';
import ButtonGroup from 'components/buttonGroup';
import {i18n,themes,connect,PropTypes, staticIcons} from 'helpers/common';
import {clean, formUtil,validation} from 'helpers/utils';
import styles from './style';
import _ from 'lodash';
import ApiService from 'helpers/services';
import {
    TELLER,
    MAIN,
    ACTION_CREATE,
    ACTION_READ,
    ACTION_UPDATE,
    ACTION_DELETE,
} from 'helpers/constant';
// import watcher from 'helpers/utils/generic/watcher';
import {SV_CARD} from 'helpers/services/endpoints';
import {SetFormState, ResetFormState} from 'helpers/redux/actions/formActions';
import writtenNumber from 'helpers/utils/amountInWords';
import {setDefaults} from 'helpers/utils/generic/dataTransfer';
import { TextInputMask, MaskService } from 'react-native-masked-text';

class FormBuilder extends Component{
    constructor(){
        super();
        this.state = {
            leftSideView: null,
            rightSideView: null,
            currencyList : [],
            tempContractRate : "1.00",
            currencyText: "rupiah",
        }
    }

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
    }

    generateFields = (field) => {
        const {currencyList} = this.state;
        const {request} = this.props;
        let generatedField;
        switch (field.type){
            case "text":
                if(field.fieldName === "depositoryType"){
                    generatedField = (
                        <InputTextNormal
                            name={field.fieldName}
                            maxLength={parseInt(field.maxLength)}
                            placeholder={i18n(field.placeholder)}
                            editable={field.editable}
                            // onEndEditing={this.getDestinationAccountName}
                        />
                    );
                }
                else{
                    generatedField = (
                        <InputTextNormal
                            name={field.fieldName}
                            maxLength={parseInt(field.maxLength)}
                            placeholder={i18n(field.placeholder)}
                            editable={field.editable}
                            // onEndEditing={this.getDestinationAccountName}
                        />
                    );
                }

                break;
            case "number":
            case "phone":
                if(field.fieldName === "beneficiaryAccount")
                {
                    generatedField = (
                        <InputTextNormal
                            name={field.fieldName}
                            maxLength={parseInt(field.maxLength)}
                            placeholder={i18n(field.placeholder)}
                            keyboardType='numeric'
                            editable={field.editable}
                            onEndEditing={this.getDestinationAccountName}
                        />
                    );
                }
                else if(field.fieldName === "amount")
                {
                    generatedField = (
                        // <InputTextNormal
                        //     name={field.fieldName}
                        //     maxLength={parseInt(field.maxLength)}
                        //     placeholder={i18n(field.placeholder)}
                        //     keyboardType='numeric'
                        //     editable={field.editable}
                        //     onEndEditing={this.calculateAmountToDeposit}
                        // />
                        <TextInputMask
                            name={field.fieldName}
                            refInput={(ref) => this.amount = ref} 
                            type={'money'}
                            options={{
                                precision: PRECISION_CURRENCY,
                                separator: SEPARATOR_CURRENCY,
                                delimiter: DELIMITER_CURRENCY,
                                unit: UNIT_CURRENCY
                            }}
                            onChangeText={(value) => { this.calculateAmountToDeposit(value)  }}
                            placeholder={i18n(field.placeholder)}
                            maxLength={parseInt(field.maxLength)}
                            value={this.getAmountValueFromFieldName(field.fieldName)}
                        />
                    );
                }
                else
                {
                    generatedField = (
                        <InputTextNormal
                            name={field.fieldName}
                            maxLength={parseInt(field.maxLength)}
                            placeholder={i18n(field.placeholder)}
                            keyboardType='numeric'
                            editable={field.editable}
                        />
                    );
                }
                break;
            case "currency":
                generatedField = (
                    <InputTextNormal
                        name={field.fieldName}
                        maxLength={parseInt(field.maxLength)}
                        placeholder={i18n(field.placeholder)}
                        currency
                        keyboardType='numeric'
                        editable={field.editable}
                        // onEndEditing={this.getDestinationAccountName}
                    />
                );
                break;
            case "droplist":
                console.log('to heree');
                console.log('field', field)
                if(field.fieldName === "currency"){
                    generatedField = (
                        <PickerDropList name={field.fieldName} list={field.content}/>
                    );
                }
                else if (field.fieldName === "destinationAccount") {
                    generatedField = (
                        // <PickerDropList name={field.fieldName} list={field.content}/>
                        <View style={themes.fldr}>
                            <Left>
                                <Text style={styles.placeholder}>{i18n('selectDestinationAccount')}</Text>
                            </Left>
                            <Right>
                                <Image source={staticIcons.arrowDroplist}/>
                            </Right>
                        </View>
                    );
                }
                else
                {
                    generatedField = (
                        <PickerDropList name={field.fieldName} list={field.content}/>
                    );
                }
                break;
            case "multipleText":
                generatedField = (
                    <InputTextNormal
                        name={field.fieldName}
                        maxLength={parseInt(field.maxLength)}
                        placeholder={i18n(field.placeholder)}
                        editable={field.editable}
                        multiline
                        parentStyle={{height: 77}}
                    />
                );
                break;
            default:
                break;
        }
        return generatedField;
    };

    generateNormalView = (firstColLength,fieldArray,fieldOrder) => {
        console.log('firstColLength', firstColLength)
        console.log('fieldArray', fieldArray)
        let targetFieldName,isDelimiterExist,targetFieldObj,inlineDisplay,normalDisplay,fieldTitle,isMandatory;
        const delimiter = "||";
        let normalViewArr = [];
        for(let i = 0 ; i < firstColLength ; i++){
            targetFieldName = fieldOrder[i];
            fieldTitle = null;
            isMandatory = false;
            isDelimiterExist = targetFieldName.includes(delimiter);
            if(isDelimiterExist){
                const multipleFields = targetFieldName.split(delimiter);
                let inlineFieldsArr = [];
                for(let i in multipleFields){
                    targetFieldObj =_.find(fieldArray, ['fieldName', multipleFields[i]]);
                    if(i === "0" && targetFieldObj.hideTitle === false) {
                        fieldTitle = targetFieldObj.title;
                        isMandatory = true;
                    } //make sure the first field is having title and not hiding the title
                    inlineFieldsArr.push(this.generateFields(targetFieldObj));
                }
                inlineDisplay =
                    (
                        <View style={themes.mv15}>
                            <InputLabel label={fieldTitle} isRequired={isMandatory}/>
                            <View style={{...themes.form.inputGroup,alignItems:'flex-start'}}>
                                <View style={styles.leftInlineItem}>
                                    {inlineFieldsArr[0]}
                                </View>
                                <View style={styles.rightInlineItem}>
                                    {inlineFieldsArr[1]}
                                </View>
                            </View>
                        </View>
                    );
                normalViewArr.push(inlineDisplay)
            }
            else{
                targetFieldObj =_.find(fieldArray,['fieldName', targetFieldName]);
                fieldTitle = targetFieldObj.title;
                isMandatory = targetFieldObj.mandatory;
                console.log('targetFieldObj', targetFieldObj)
                normalDisplay =
                    (
                        <View style={themes.mv15}>
                            <InputLabel label={fieldTitle} isRequired={isMandatory}/>
                            {this.generateFields(targetFieldObj)}
                        </View>
                    );
                normalViewArr.push(normalDisplay)
            }
        }
        return normalViewArr;
    };

    generateLeftView = (firstColLength,fieldArray,fieldOrder) => {
        let targetFieldName,isDelimiterExist,targetFieldObj,inlineDisplay,normalDisplay,fieldTitle,isMandatory;
        const delimiter = "||";
        let leftViewArr = [];
        for(let i = 0 ; i < firstColLength ; i++){
            targetFieldName = fieldOrder[i];
            fieldTitle = null;
            isMandatory = false;
            isDelimiterExist = targetFieldName.includes(delimiter);
            if(isDelimiterExist){
                const multipleFields = targetFieldName.split(delimiter);
                let inlineFieldsArr = [];
                for(let i in multipleFields){
                    targetFieldObj =_.find(fieldArray, ['fieldName', multipleFields[i]]);
                    if(i === "0" && targetFieldObj.hideTitle === false) {
                        fieldTitle = targetFieldObj.title;
                        isMandatory = true;
                    } //make sure the first field is having title and not hiding the title
                    inlineFieldsArr.push(this.generateFields(targetFieldObj));
                }
                inlineDisplay =
                    (
                        <View style={themes.mv15}>
                            <InputLabel label={fieldTitle} isRequired={isMandatory}/>
                            <View style={{...themes.form.inputGroup,alignItems:'flex-start'}}>
                                <View style={styles.leftInlineItem}>
                                    {inlineFieldsArr[0]}
                                </View>
                                <View style={styles.rightInlineItem}>
                                    {inlineFieldsArr[1]}
                                </View>
                            </View>
                        </View>
                    );
                leftViewArr.push(inlineDisplay)
            }
            else{
                targetFieldObj =_.find(fieldArray,['fieldName', targetFieldName]);
                fieldTitle = targetFieldObj.title;
                isMandatory = targetFieldObj.mandatory;
                normalDisplay =
                    (
                        <View style={themes.mv15}>
                            <InputLabel label={fieldTitle} isRequired={isMandatory}/>
                            {this.generateFields(targetFieldObj)}
                        </View>
                    );
                leftViewArr.push(normalDisplay);
            }
        }
        return leftViewArr;
    };

    generateRightView = (firstColLength,fieldArray,fieldOrder) => {
        let targetFieldName,isDelimiterExist,targetFieldObj,inlineDisplay,normalDisplay,fieldTitle,isMandatory;
        const delimiter = "||";
        let rightViewArr = [];
        for(let i = firstColLength ; i < fieldOrder.length ; i++){
            targetFieldName = fieldOrder[i];
            fieldTitle = null;
            isMandatory = false;
            isDelimiterExist = targetFieldName.includes(delimiter);
            if(isDelimiterExist){
                const multipleFields = targetFieldName.split(delimiter);
                let inlineFieldsArr = [];
                for(let i in multipleFields){
                    targetFieldObj =_.find(fieldArray, ['fieldName', multipleFields[i]]);
                    if(i === "0" && targetFieldObj.hideTitle === false) {
                        fieldTitle = targetFieldObj.title;
                        isMandatory = true;
                    } //make sure the first field is having title and not hiding the title
                    inlineFieldsArr.push(this.generateFields(targetFieldObj));
                }
                inlineDisplay =
                    (
                        <View style={themes.mv15}>
                            <InputLabel label={fieldTitle} isRequired={targetFieldObj.mandatory}/>
                            <View style={themes.form.inputGroup}>
                                <View style={styles.leftInlineItem}>
                                    {inlineFieldsArr[0]}
                                </View>
                                <View style={styles.rightInlineItem}>
                                    {inlineFieldsArr[1]}
                                </View>
                            </View>
                        </View>
                    );
                rightViewArr.push(inlineDisplay);
            }
            else{
                targetFieldObj =_.find(fieldArray,['fieldName', targetFieldName]);
                fieldTitle = targetFieldObj.title;
                isMandatory = targetFieldObj.mandatory;
                normalDisplay =
                    (
                        <View style={themes.mv15}>
                            <InputLabel label={fieldTitle} isRequired={isMandatory}/>
                            {this.generateFields(targetFieldObj)}
                        </View>
                    );
                rightViewArr.push(normalDisplay);
            }
        }
        return rightViewArr;
    };

    getDestinationAccountName = () =>{
        const {form} = this.props;
        if(form['beneficiaryAccount'].valid){
            const inputValues = formUtil.mapFTVO(form, true);

            const params = {
                    accountNumber: inputValues.beneficiaryAccount,
                    action: ACTION_READ,
                },
                req = {
                    path : SV_CARD,
                    params: clean(params),
                    type: MAIN,
                },
                reqSuccess = (response) => {
                    const payload = response.payload;
                    const formChanges = [
                        "beneficiaryName",
                        "beneficiaryAccountCurrency"
                    ];
                    const valueChanges = [
                        payload.accountName,
                        payload.currency
                    ];
                    for(let i = 0 ; i < formChanges.length; i++){
                        this.setValue(formChanges[i],valueChanges[i]);
                    }
                },
                reqError = (error) => {
                    console.log(error);
                    const formChanges = [
                        "destinationAccountName",
                        "destinationAccountCurrency"
                    ];
                    for(let i = 0 ; i < formChanges.length; i++){
                        this.setValue(formChanges[i],null);
                    }
                };
            console.log('aaaaa', params);
            ApiService.open(req).then(reqSuccess, reqError);
            console.log(params);
        }
    };

    calculateAmountToDeposit = () => {
        const {form,currentLanguage} = this.props;
        const {tempContractRate,currencyText} = this.state;
        const inputValues = formUtil.mapFTVO(form, true);
        const creditedAmount = parseInt(inputValues.amount);
        const result = creditedAmount * parseFloat(tempContractRate);
        // this.setValue("amountToDeposit",isNaN(result)? 0 : result.toString());
        this.setValue("amountInWords", writtenNumber(result, {lang : currentLanguage})+" "+currencyText);
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
        const {form} = this.props;
        const defaults = setDefaults(form, {
           "depositoryType" : "pintar"
        });
        this.setState({ defaults: defaults });
        this.props.dispatch(SetFormState(defaults))
    };

    componentDidMount(){
        const {form,depositoryType} = this.props;
        this.props.dispatch(SetFormState(form,true));
        this.setValue('depositoryType',depositoryType);
    }

    render(){
        const {isInline,content} = this.props;
        if(!content) return null; //this is created in order to wait the content of form being fetched
        const fieldOrder = content.order;
        const fieldArray = content.fields
        console.log('============', fieldOrder, 'aaaaaaaaaaaaaaaaa', fieldArray);
        const totalCol = 2; //sorry for the magic number :(
        let firstColLength,printForm,normalView,leftSideView,rightSideView;
        if(isInline){
            firstColLength = Math.ceil(fieldOrder.length / totalCol);
            leftSideView = this.generateLeftView(firstColLength,fieldArray,fieldOrder);
            rightSideView = this.generateRightView(firstColLength,fieldArray,fieldOrder);
            printForm = (
                <View style={styles.formField}>
                    <View style={styles.leftColumn}>
                        {leftSideView}
                    </View>
                    <View style={styles.rightColumn}>
                        {rightSideView}
                    </View>
                </View>
            )
        }
        else{
            // firstColLength = Math.ceil(fieldOrder.length / totalCol);
            firstColLength = fieldOrder.length
            normalView = this.generateNormalView(firstColLength,fieldArray,fieldOrder);
            printForm = (
                <View style={styles.paddingFields}>
                    {normalView}
                </View>
            );
        }
        // this.setDefaultValues();
        return(
            <View>
                {printForm}
            </View>
        )
    }
}

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        request: state.requests,
        currentLanguage: state.currentLanguage,
        depositoryType: state.depositoryType
    }
};

export default connect(mapStatesToProps)(FormBuilder);

FormBuilder.propTypes = {
  content: PropTypes.any,
  currentLanguage: PropTypes.string,
  dispatch: PropTypes.any,
  form: PropTypes.any,
  isInline: PropTypes.bool,
  request: PropTypes.any
};