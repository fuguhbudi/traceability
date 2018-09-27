import React,{Component} from 'react';
import {StatusBar, BackHandler} from 'react-native';
import {PropTypes, i18n, connect, themes, staticIcons} from 'helpers/common';
import {SetFormState, SetUserData, ResetUserData, ResetFormState} from 'helpers/redux/actions/formActions';
import {InputTextNormal} from 'components/inputFields';
import {getHeightRatio, clean, formUtil, setScreenStep} from 'helpers/utils';
import {SV_LOGIN_NON_CUSTOMER, SV_REGISTER_NON_CUSTOMER, SV_LOGIN_CUSTOMER} from 'helpers/services/endpoints/';
import {normalizeEFormParams, setDefaults} from 'helpers/utils/generic/dataTransfer';
import {TELLER, MAIN, ERROR_INVALID_USER_DATA} from 'helpers/constant';
import ApiService from 'helpers/services';
import LoginForm from './login';
import Greeting from './greeting';
import Signup from './signup';
import * as Animatable from 'react-native-animatable';
import constraints from 'helpers/constraints/loginConstraints';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            step: {
                login: false,
                signup: false,
                greeting: false
            },
            prevStep: null
        }
    };

    onLogin = () => {
        console.log('onLogin');
        const {form} = this.props;
        const normalizeData =  normalizeEFormParams(form, this.state);
        if(!formUtil.isValid(form)) return;
        const params = {
                ...normalizeData
            },
            req = {
                path : SV_LOGIN_CUSTOMER,
                params: clean(params),
                type: MAIN,
            },
            reqSuccess = (response) => {
                console.log('Success login!', response);
                if (response.payload) {
                    const payload = response.payload;
                    this.props.dispatch(SetUserData(payload));
                    // const accountName = this.props.userData.bdsCustomer.accountName;
                    const accountName = this.props.userData.name;
                    this.setState({
                        accountName: accountName,
                        prevStep: 'login'
                    }, () => {
                        this.setStep('greeting');
                    });
                }
                else {
                    alert(response.message);
                }
            },
            reqError = (error) => {
                // const errCode = error.errCode;
                const errCode = error.code;
                console.log('Error: ', error);
                // alert(error.errMsg);
                alert(error.message);
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :'+JSON.stringify(params));
    };

    onRegister = () => {
        console.log('onRegister');
        const {form} = this.props;
        console.log(form);
        const normalizeData =  normalizeEFormParams(form, this.state);
        if(!formUtil.isValid(form)) return;
        const params = {
                ...normalizeData
            },
            req = {
                path : SV_REGISTER_NON_CUSTOMER,
                params: clean(params),
                type: MAIN,
            },
            reqSuccess = (response) => {
                console.log('Success register!', response);
                this.onLogin();
            },
            reqError = (error) => {
                const errCode = error.errCode;
                console.log('Error: ', error);
                alert(error.message);
            };
        ApiService.open(req).then(reqSuccess, reqError);
        console.log('===== ini params :'+JSON.stringify(params));
    };

    onSignUp = () => {
        this.setState({
            prevStep: 'signup'
        }, () => {
            this.setStep("signup");
        });
    };

    onNext = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        this.props.navigation.navigate('OnlineBooking');
    };

    setStep = (step) => {
        const stateStep = this.state.step;
        const newStep = setScreenStep(stateStep);
        this.props.dispatch(ResetFormState());
        this.setState({
            step: newStep(step)
        });
    };

    handleBackButton = () => {
        // const signupStep = this.state.step.signup;
        console.log('signupstep: ', this.state.step);
        switch(true) {
            case this.state.step.login:
                return false;
                break;

            case this.state.step.signup:
                this.setStep("login");
                return true;
                break;

            case this.state.step.greeting:
                this.state.prevStep === 'signup' ? this.setStep("signup") : this.setStep("login");
                return true;
                break;

            default:
                return false;
                break;
        }
    };

    componentWillMount() {
        // this.props.dispatch(ResetFormState());
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    render(){
        // console.log('form', this.props.form);
        let renderView, renderOpts;
        const { accountName } = this.state;
        const form = this.props.form;
        const requestLogin = this.props.requests[SV_LOGIN_CUSTOMER];
        const requestRegister = this.props.requests[SV_REGISTER_NON_CUSTOMER];
        switch(true) {
            case this.state.step.login:
                renderOpts = {
                    form: form,
                    onLogin: this.onLogin,
                    onSignUp: this.onSignUp,
                    request: requestLogin,
                    constraints: constraints
                };
                renderView = <LoginForm opts={renderOpts}/>;
                break;

            case this.state.step.signup:
                renderOpts = {
                    form: form,
                    onRegister: this.onRegister,
                    request: requestRegister,
                };
                renderView = <Signup opts={renderOpts}/>;
                break;

            case this.state.step.greeting:
                renderOpts = {
                    onNext: this.onNext,
                    accountName: accountName,
                };
                renderView = <Greeting opts={renderOpts}/>;
                break;

            default:
                renderOpts = {
                    form: form,
                    onLogin: this.onLogin,
                    onSignUp: this.onSignUp,
                    request: requestLogin,
                    constraints: constraints
                };
                renderView = <LoginForm opts={renderOpts}/>;
                break;
        }

        return (
            <Animatable.View animation={this.state.step.signup === true ? 'slideInRight' : undefined} opts={renderOpts} duration={200} style={{flex: 1}}>
                <StatusBar hidden={true}/>
                {renderView}
            </Animatable.View>
        );
    }
}

Login.propTypes = {
  appointmentId: PropTypes.string,
  dispatch: PropTypes.any,
  form: PropTypes.any,
  navigation: PropTypes.object,
  requests: PropTypes.object,
  userData: PropTypes.object
};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
        requests: state.requests,
        userData: state.userData,
        appointmentId: state.appointmentId
    }
};

export default connect(mapStatesToProps)(Login);