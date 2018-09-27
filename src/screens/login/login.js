import React,{Component} from 'react';
import {View, Text, Image} from 'react-native';
import {PropTypes, i18n, connect, themes, staticImages} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {SetFormState, ResetFormState} from 'helpers/redux/actions/formActions';
import FormValidation from 'components/formValidation';
import constraints from 'helpers/constraints/loginConstraints';
import {InputTextNormal} from 'components/inputFields';
import {validation} from 'helpers/utils';
import SuperForm from "helpers/classMixins/superForm";
import {resetAppointmentId} from "helpers/redux/actions/genericActions";
import {setDefaults} from 'helpers/utils/generic/dataTransfer';

class LoginForm extends SuperForm(Component) {
    constructor() {
        super();
        this.dynamicFields = {}
    }

    wait(ms, data) {
        return new Promise( resolve => setTimeout(resolve.bind(this, data), ms) );
    }

    async series() {
        const a = {
                result1: await this.wait(300, this.props.dispatch(ResetFormState())),
                result2: await this.wait(300, this.props.dispatch(resetAppointmentId())),
        };
        return a
    }

    setDefaultValues = () => {
        const {form} = this.props;
        const defaults = setDefaults(form, {
            "email" : "fuguhbudiutomo@gmail.com",
            "password": "password123"
        });
        this.setState({ defaults: defaults });
        this.props.dispatch(SetFormState(defaults))
    };

    componentDidMount(){
        //For development use only
        this.setDefaultValues();
    }

    componentDidUpdate(){
        const { form } = this.props;
        console.log('didUpdate login/login: ',this.props.form)
        if(form) validation.commitDelete(form, this.dynamicFields);
    };

    render(){
        const {form, onLogin, onSignUp, request} = this.props.opts;
        const actionButtons = [
            {
                text: i18n('login'),
                props: {
                    request: request,
                },
                onPress: onLogin
            },
            {
                text: i18n('signUp'),
                props: {
                    buttonContainerStyle: {
                        ...themes.mt10
                    },
                    backgroundColor: '#14af96'
                },
                onPress: onSignUp
            },
        ];

        return(
            <FormValidation form={form} constraints={constraints}>
                <View style={styles.bodyContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={staticImages.wirecardSymbol}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <InputTextNormal
                            name='email'
                            maxLength={40}
                            placeholder={i18n('email')}
                            parentStyle={styles.inputItem}
                            ref={ el => this.addDynamicFields(el, "email") }
                            loginForm
                        />
                        <InputTextNormal
                            name='password'
                            maxLength={40}
                            placeholder={i18n('password')}
                            parentStyle={styles.inputItem}
                            ref={ el => this.addDynamicFields(el, "password") }
                            loginForm
                            secure={true}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonGroup buttons={actionButtons} type="stack"/>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>{i18n('copyrightTop')}</Text>
                    <Text style={styles.footerText}>{i18n('copyrightBottom')}</Text>
                </View>
            </FormValidation>
        );
    }
}

LoginForm.propTypes = {
  dispatch: PropTypes.any,
  form: PropTypes.any,
  opts: PropTypes.any
};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        requests: state.requests,
    }
};

export default connect(mapStatesToProps)(LoginForm);