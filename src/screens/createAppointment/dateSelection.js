import React,{Component} from 'react';
import {View, Text, Image, DatePickerAndroid} from 'react-native';
import {Button, Left, Right, Body, Content, Container} from 'native-base';
import {PropTypes, i18n, connect, themes, staticIcons, staticImages} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {SetFormState, SetUserData, ResetUserData, ResetFormState} from 'helpers/redux/actions/formActions';
import FormValidation from 'components/formValidation';
import constraints from 'helpers/constraints/loginConstraints';
import {InputTextNormal} from 'components/inputFields';
import {getHeightRatio, clean, formUtil, validation} from 'helpers/utils';
import {SV_LOGIN_NON_CUSTOMER, SV_REGISTER_NON_CUSTOMER, SV_LOGIN_CUSTOMER} from 'helpers/services/endpoints/';
import {normalizeEFormParams, setDefaults} from 'helpers/utils/generic/dataTransfer';
import {TELLER, MAIN, ERROR_INVALID_USER_DATA} from 'helpers/constant';
import SuperForm from "helpers/classMixins/superForm";
import Card from 'components/card';

class DateSelection extends SuperForm(Component) {
    constructor() {
        super();
        this.dynamicFields = {}
    }

    componentWillMount() {
        console.log('Date Selection');
    }

    componentDidMount(){
        this.props.dispatch(ResetFormState());
    }

    componentDidUpdate(){
        const { form } = this.props;
        if(form) validation.commitDelete(form, this.dynamicFields);
    };

    render(){
        const {submitStep, date, pickDate} = this.props.opts;
        const actionButtons = [
            {
                text: i18n('next'),
                props: {
                    buttonContainerStyle: {
                        marginHorizontal: 27,
                        marginBottom: 28
                    }
                },
                onPress: submitStep
            }
        ];
        return(
                <Container>
                    <Content>
                        <Card title={i18n('selectDate')}>
                            <Button style={styles.selectAccount} onPress={pickDate}>
                                <View style={themes.fldr}>
                                    <Left>
                                        <Image source={staticIcons.calendar}/>
                                    </Left>
                                    <Body style={styles.selectDateBody}>
                                    <Text style={styles.placeholder}>{date}</Text>
                                    </Body>
                                    <Right/>
                                </View>
                            </Button>
                        </Card>
                    </Content>
                    <View style={{height: 260}}>
                        <ButtonGroup buttons={actionButtons} />
                    </View>
                </Container>
        );
    }
}

DateSelection.propTypes = {
  dispatch: PropTypes.func,
  form: PropTypes.object,
  opts: PropTypes.any
};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        requests: state.requests,
    }
};

export default connect(mapStatesToProps)(DateSelection);