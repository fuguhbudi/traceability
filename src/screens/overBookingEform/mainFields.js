import React from 'react';
import { Text, View } from "react-native";
import { Spinner, Button, CheckBox } from 'native-base';
import { PropTypes, i18n } from "helpers/common";
import styles from "./style";
import Card from 'components/card';
import { PickerDropList } from 'components/picker';
import { InputTextNormal } from 'components/inputFields';
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
    requestCardDestination, selectDestinationAccount, destinationAccountCardContent, currencyList, sourceAccountCardContent, selectSourceAccount,
    calculateEquivalentAmount, currentStep, goToDepositoryField, depositoryAccountCardContent, agreeSubmitForm,
    checkAgreeSubmitForm, toggleTncPopUp, submitFormButton, appQueueId, toggleDestinationAccountPopUp,
    destinationAccountPopupVisible, popupTitle, popupBody, popupButton, popupFooter, topButtonPopup, getAmountValueFromFieldName, verificationMethod,
}) => {
    return (
        <View>
            <Card title={i18n('sourceAccount')}>
                {
                    requestCardDestination && requestCardDestination.inProgress ? <Spinner /> :
                        <Button style={styles.selectAccount} onPress={selectSourceAccount}>
                            {sourceAccountCardContent}
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
                                precision: 0,
                                separator: '.',
                                delimiter: ',',
                                unit: ''
                            }}
                            onChangeText={(value) => { calculateEquivalentAmount(value) }}
                            onEndEditing={() => { calculateEquivalentAmount('000', true) }}
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
            <Card title={i18n('destinationAccount')}>
                {/*<Button onPress={goToDepositoryField} disabled={appQueueId} style={ appQueueId ? styles.selectAccountAppQueue : styles.selectAccount}>*/}
                <Button onPress={selectDestinationAccount} style={styles.selectAccount}>
                    {destinationAccountCardContent}
                </Button>
            </Card>
            <Card title={i18n('methodOfVerification')}>
                <View style={styles.flexColumn}>
                    <View style={styles.flexColumnCenter}>
                        <PickerDropList name="methodVerification" list={verificationMethod} />
                    </View>
                </View>
            </Card>
            <Card>
                <View style={styles.flexColumn}>
                    <View style={styles.flexColumnLeft}>
                        <CheckBox checked={agreeSubmitForm} color="#14af96" onPress={checkAgreeSubmitForm} />
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
