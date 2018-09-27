import React from 'react';
import {Text, View} from "react-native";
import {Spinner, Button, CheckBox} from 'native-base';
import {PropTypes, i18n} from "helpers/common";
import styles from "./style";
import Card from 'components/card';
import {PickerDropList} from 'components/picker';
import {InputTextNormal} from 'components/inputFields';
import ButtonGroup from 'components/buttonGroup';
import PopUp from 'components/popUp';
import {
    PRECISION_CURRENCY,
    UNIT_CURRENCY,
    DELIMITER_CURRENCY,
    SEPARATOR_CURRENCY
} from 'helpers/constant';
import { TextInputMask } from 'react-native-masked-text';

const MainFields = ({
    requestCardDestination, selectDestinationAccount, destinationAccountCardContent, currencyList,
    calculateEquivalentAmount, currentStep, goToDepositoryField, depositoryAccountCardContent, agreeSubmitForm,
    checkAgreeSubmitForm, toggleTncPopUp, submitFormButton, appointmentId, toggleDestinationAccountPopUp,
    destinationAccountPopupVisible, popupTitle, popupBody, popupButton, popupFooter, topButtonPopup,
    getAmountValueFromFieldName
}) => {
    return (
        <View>
            <Card title={i18n('selectDestinationAccount')}>
                {
                    requestCardDestination && requestCardDestination.inProgress ? <Spinner/> :
                        <Button style={styles.selectAccount} onPress={selectDestinationAccount}>
                            {destinationAccountCardContent}
                        </Button>
                }
            </Card>
            <Card title={i18n('amount')}>
                <View style={styles.flexColumn}>
                    <View style={styles.flexColumnLeft}>
                        <PickerDropList name="currency" list={currencyList} />
                    </View>
                    <View style={styles.flexColumnRight}>
                        <TextInputMask
                            refInput={(ref) => this.amount = ref}
                            type={'money'}
                            name='amount'
                            maxLength={16}
                            options={{
                                precision: PRECISION_CURRENCY,
                                separator: SEPARATOR_CURRENCY,
                                delimiter: DELIMITER_CURRENCY,
                                unit: UNIT_CURRENCY
                            }}
                            onChangeText={(value) => { calculateEquivalentAmount(value)  }}
                            onEndEditing={ () => { calculateEquivalentAmount('000', true)} }
                            value={getAmountValueFromFieldName('amount')}
                            style={styles.textInputMask}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                </View>
            </Card>
            <Card title={i18n('notes')}>
                <View>
                    <InputTextNormal
                        name='message'
                        placeholder={i18n('max250Chars')}
                        multiline
                        parentStyle={styles.textArea}
                        maxLength={250}
                        // ref={ el => this.addDynamicFields(el, "message") }
                    />
                </View>
            </Card>
            <Card title={i18n('selectDepositoryInformation')}>
                {/*<Button onPress={goToDepositoryField} disabled={appointmentId} style={ appointmentId ? styles.selectAccountAppQueue : styles.selectAccount}>*/}
                <Button onPress={goToDepositoryField} style={ styles.selectAccount }>
                    {depositoryAccountCardContent}
                </Button>
            </Card>
            <Card>
                <View style={styles.flexColumn}>
                    <View style={styles.flexColumnLeft}>
                        <CheckBox checked={agreeSubmitForm} color="#14af96" onPress={checkAgreeSubmitForm}/>
                    </View>
                    <View style={styles.flexColumnRightAgreement}>
                        <Text style={styles.mediumTextBold}>{i18n('agreeSubmitForm')}. <Text style={styles.agreeSubmitReadMore} onPress={toggleTncPopUp}>{i18n('readMore')}</Text></Text>
                    </View>
                </View>
            </Card>
            <ButtonGroup buttons={submitFormButton} />
            <PopUp
                onBackdropPress={toggleDestinationAccountPopUp}
                isVisible={destinationAccountPopupVisible}
                content='inputData'
                title={popupTitle}
                body={popupBody}
                buttons={popupButton}
                footer={popupFooter}
                topButton={topButtonPopup}
            />
        </View>
    );
};

MainFields.propTypes = {};

export default MainFields;
