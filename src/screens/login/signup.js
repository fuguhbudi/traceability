import React,{Component} from 'react';
import {View, Image} from 'react-native';
import {Text} from 'native-base';
import {PropTypes, i18n, connect, themes, staticImages} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {ResetFormState} from 'helpers/redux/actions/formActions';
import FormValidation from 'components/formValidation';
import constraints from 'helpers/constraints/signupConstraints';
import {InputTextNormal} from 'components/inputFields';
import {validation} from 'helpers/utils';
import SuperForm from "helpers/classMixins/superForm";

class SignUp extends SuperForm(Component) {
    constructor() {
        super();
        this.dynamicFields = {}
    }

    componentWillMount() {
        // this.props.dispatch(ResetFormState());
        console.log('login/signup: ',this.props.form)
    }

    componentDidMount(){
        console.log('didMount login/signup: ',this.props.form)
    }

    componentDidUpdate(){
        const { form } = this.props;
        console.log('didUpdate login/signup: ',this.props.form);
        if(form) validation.commitDelete(form, this.dynamicFields);
    };

    render(){
        const {form, onRegister, request} = this.props.opts;
        const actionButtons = [
            {
                text: i18n('next'),
                props: {
                    request: request
                },
                onPress: onRegister
            },
        ];


        return(
            <FormValidation form={form} constraints={constraints}>
                <View style={styles.backgroundPrimary}>
                    <View style={{...styles.logoContainer, ...themes.mb0}}>
                        <Image source={staticImages.wirecardSymbol}/>
                    </View>
                    <View style={{...styles.bodyContainer, ...styles.backgroundWhite}}>
                        <View style={styles.inputContainer}>
                            <InputTextNormal
                                name='name'
                                maxLength={40}
                                placeholder={i18n('fullName')}
                                parentStyle={styles.inputItem}
                                ref={ el => this.addDynamicFields(el, "name") }
                                loginForm
                            />
                            <InputTextNormal
                                name='email'
                                maxLength={40}
                                placeholder={i18n('email')}
                                parentStyle={styles.inputItem}
                                ref={ el => this.addDynamicFields(el, "email") }
                                loginForm
                            />
                            <InputTextNormal
                                name='phone'
                                maxLength={40}
                                placeholder={i18n('mobileNumber')}
                                parentStyle={styles.inputItem}
                                ref={ el => this.addDynamicFields(el, "phone") }
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
                            <ButtonGroup buttons={actionButtons}/>
                        </View>
                        <Text style={styles.agreeSignUp}>{i18n('agreeSignUp')}</Text>
                    </View>
                </View>
            </FormValidation>
        );
    }
}

SignUp.propTypes = {
  dispatch: PropTypes.any,
  form: PropTypes.object,
  opts: PropTypes.object
};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        requests: state.requests,
    }
};

export default connect(mapStatesToProps)(SignUp);