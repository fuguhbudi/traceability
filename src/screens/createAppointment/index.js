import React,{Component} from 'react';
import {Text, View} from 'native-base';
import {DatePickerAndroid, Image, BackHandler} from 'react-native';
import {themes, PropTypes, ScreenHeader, i18n, connect, staticIcons, staticImages} from 'helpers/common';
import {InputTextTopLabel, InputTextNormal} from 'components/inputFields';
import {
    TELLER,
    MAIN,
    ACTION_CREATE,
    ACTION_READ,
    ACTION_UPDATE,
    ACTION_DELETE,
    GET_METHOD
} from 'helpers/constant';
import ApiService from 'helpers/services';
import styles from './style';
import {
    SV_FORM, SV_CARD, SV_GET_IDENTIFIER,SV_GET_FORM_FIELD, SV_CREATE_APPOINTMENT, SV_GET_COORDINATE,
    SV_GET_NUMBERSOURCE, SV_GET_LOCATION
} from 'helpers/services/endpoints/';
import {normalizeEFormParams, setDefaults} from 'helpers/utils/generic/dataTransfer';
import {clean, formUtil, stepIndicatorStyle, validation, setScreenStep, formatedMonth} from 'helpers/utils';
import {setAppointmentId} from 'helpers/redux/actions/genericActions';
import {SetFormState, ResetFormState, SetFormData, SetUserData} from 'helpers/redux/actions/formActions';
import StepIndicator from 'react-native-step-indicator';
import PopUp from 'components/popUp';
import BdsScreenTemplate from 'components/bdsScreenTemplate';
import ButtonGroup from 'components/buttonGroup';
import {PickerDropList} from 'components/picker';
import Title from 'components/title';
import SuperForm from "helpers/classMixins/superForm";
import DateSelection from './dateSelection';
import LocationSelection from './locationSelection';
import Confirmation from './confirmation';
import Result from './result';
import * as Animatable from 'react-native-animatable';
import {resetAppointmentId} from 'helpers/redux/actions/genericActions';
import { NavigationActions } from 'react-navigation';
import DateDisplay from 'components/dateDisplay';
import queryString from "query-string";

class CreateAppointment extends SuperForm(Component) {

    constructor() {
        super();
        this.state = {
            currencyListObj: {},
            formField: null,
            submitPopUpVisible: false,
            errorPopUpVisible: false,
            currentStep: 1,
            totalStep: 4,
            currentPosition: 0,
            depositoryAccountCard: false,
            destinationAccountInfo: {},
            agreeSubmitForm: false,
            stepTitle: 'dateSelection',
            step: {
                dateSelection: false,
                locationSelection: false,
                confirmation: false,
                result: false
            },
            date: 'dd.mm.yy',
            simpleText: 'dd.mm.yyyy',
            dateParam: null,
            dateString: null,
            branchListItem: [],
            appointmentSlotList: [],
            branchId: null,
            startAppointment: null,
            endAppointment: null,
            locationBranch: null,
            appointcode: null,
            selectedTable: null,
            selectedBranch: null,
            firstHitAppointmentSlot: true,
            currentBookedSlot: null,
            currentWaitingTime: null,
            infoBranchPopupVisible: false,
            infoHolidayPopupVisible: false,
            name: null,
            day: null,
            branchHit: 0,
            filterState: null,
            loadingBranch: false
        };
        this.dynamicFields = {}
        // this.getFormField = this.getFormField.bind(this);
    }

    onBackClick = () => {
        switch(true) {
            case this.state.step.dateSelection:
                this.props.navigation.goBack();
                break;
            case this.state.step.locationSelection:
                this.goToDateSelection();
                break;
            case this.state.step.confirmation:
                this.goToLocationSelection();
                break;
            default:
                this.props.navigation.goBack();
                break;
        }
    };

    goToDateSelection = () => {
        this.setState({
            currentStep: 1,
            currentPosition: 0,
            stepTitle: 'dateSelection'
        }, () => {
            this.setStep("dateSelection");
        });
    };

    goToLocationSelection = () => {
        if(this.state.simpleText === 'dd.mm.yyyy') {
            alert(i18n('pleasePickDate'));
            return;
        }
        this.setState({
            currentStep: 2,
            currentPosition: 1,
            stepTitle: 'locationAndTimeSelection',
            loadingBranch: true,
            selectedBranch: null
        }, () => {
            this.setStep("locationSelection");
            this.getBranchList();
        });
    };

    goToConfirmation = () => {
        if(this.state.selectedTable === null) {
            alert(i18n('pleaseSelectAppointmentSlot'));
            return;
        }
        this.setState({
            currentStep: 3,
            currentPosition: 2,
            stepTitle: 'confirmation'
        }, () => {
            this.setStep("confirmation");
        });
    };

    setStep = (step) => {
        const stateStep = this.state.step;
        const newStep = setScreenStep(stateStep);
        this.setState({
            step: newStep(step)
        });
    };

    showPicker = async (stateKey, options) => {
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dd.mm.yyyy';
            } else {
                var date = new Date(year, month, day);
                if(month < 10){
                    // month = '0'+month
                    formatedDate = day + '.' + '0'+(month+1) + '.' + year
                    dateParam = year + '-' + '0'+(month+1) + '-' + day;
                }else{
                    formatedDate = day + '.' + (month+1) + '.' + year
                    dateParam = year + '-' + (month+1) + '-' + day;
                }
                monthString = formatedMonth(month+1);
                // dateParam = year + '-' + (month+1) + '-' + day;
                
                dateString = day + ' ' + monthString + ' ' + year;
                newState[stateKey + 'Text'] = formatedDate;
                newState[stateKey + 'Date'] = date;
                newState['dateParam'] = dateParam;
                newState['day'] = date.getDay();
                newState['dateString'] = dateString;
            }
            date = formatedDate;

            this.setState(newState, ()=>{if (this.state.day === 6 || this.state.day === 0) {this.toggleInfoHolidayPopUp()}});
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    onClickBranch = (branchId, location, i) => {
        const { branchHit, filterState } = this.state;
        this.setState({
            branchId: branchId,
            locationBranch: location,
            firstHitAppointmentSlot: true,
            selectedTable: null,
            selectedBranch: i,
            loadingBranch: false
        }, () => {
            this.getAppointmentSlotList();
            branchHit === 1 ? this.getBranchListFilter(filterState) : this.getBranchList();
        });
    };

    onClickInfo = (book,time,name) => {
        this.setState({
            currentBookedSlot: book,
            currentWaitingTime: time,
            name: name,
            firstHitAppointmentSlot: true,
            selectedTable: null,
        }, () => {
            // console.log('INFO PASSED');
            this.toggleInfoBranchPopUp();
        });
    };

    pickAppointmentSlot = (i, start, end) => {
        const index = parseInt(i);
        this.setState({
                selectedTable: index, startAppointment: start, endAppointment: end
            }, () => {
            this.getAppointmentSlotList();
        });

    };

    doneCreateAppointment = () => {
        // this.props.dispatch(resetAppointmentId());
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'OnlineBooking'})]
        }));
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    };

    handleBackButton = (headerBack) => {
        switch(true) {
            case this.state.step.dateSelection:
                return false;
                break;

            case this.state.step.locationSelection:
                this.goToDateSelection();
                return true;
                break;

            case this.state.step.confirmation:
                this.goToLocationSelection();
                return true;
                break;

            case this.state.step.result:
                return true;
                break;

            default:
                return false;
                break;
        }
    };

    handleFilterLocation = (text) => {
        this.setState({
            filterState: text,
            loadingBranch: true,
            selectedBranch: null
        });
        console.log(text,"text");
        if (text.length >= 4) {
            this.getBranchListFilter(text);
        } else {
            this.getBranchList();
        }
    };

    getBranchList = () => {
        const {formData} = this.props;
        const { dateParam } = this.state;
        const params = {
                latitude: "-6.197599", // s.parman
                longitude: "106.798632",
                // latitude: "-6.193354", // pelni
                // longitude: "106.804636",
                date: dateParam,
                keyword: "jakarta",
                businessType: formData && formData.appQueue ? formData.appQueue.businessType : "TS"
            },
            queryStringParam = queryString.stringify(params),
            req = {
                path : SV_GET_COORDINATE + '?' + queryStringParam,
                params: {},
                type: MAIN,
                method: GET_METHOD
            },
            reqSuccess = (response) => {
                console.log('branchList: ', response.payload);
                // alert(JSON.stringify(response));
                const {selectedBranch} = this.state;
                const payload = response.payload && response.payload.branches ? response.payload.branches : null;
                if (payload) {
                    let branchListItem = [];
                    {for(let i = 0 ; i < payload.length; i++){
                        branchListItem.push(
                            {
                                name: payload[i].name,
                                location: payload[i].location,
                                distance: payload[i].distance,
                                currentBookedSlot: payload[i].used,
                                currentWaitingTime: payload[i].currentWaitingTime,
                                selected: selectedBranch,
                                onPress: () => this.onClickBranch(payload[i].ID, payload[i].location, i),
                                onPressInfo: () => this.onClickInfo(payload[i].used, payload[i].currentWaitingTime, payload[i].name),
                            },
                        );
                    }}
                    this.setState({branchListItem: branchListItem, branchHit: 0});
                } else {
                    alert(response.message);
                }
            },
            reqError = (error) => {
                console.log(error);
                alert(JSON.stringify(error));
            };
        console.log('===== ini params :'+JSON.stringify(params));
        ApiService.open(req).then(reqSuccess, reqError);
    };

    getBranchListFilter = (text) => {
        const {formData} = this.props;
        const {dateParam} = this.state;
        let buildParams = {
            latitude: "-6.197599", // s.parman
            longitude: "106.798632",
            // latitude: "-6.193354", // pelni
            // longitude: "106.804636",
            date: dateParam,
            businessType: formData && formData.appQueue ? formData.appQueue.businessType : "TS",
            keyword: text
        };
        console.log(buildParams,"params")
        let queryStringParam = queryString.stringify(buildParams);
        const params = {},
            req = {
                path : SV_GET_LOCATION + '?' + queryStringParam,
                // params: {},
                type: MAIN,
                method: GET_METHOD
            },
            reqSuccess = (response) => {
                // console.log('branchList: ----', response.payload);
                const {selectedBranch} = this.state;
                const payload = response.payload && response.payload.branches ? response.payload.branches : null;
                if (payload) {
                    console.log('branchList: ----', payload);
                    let branchListItem = [];
                    {for(let i = 0 ; i < payload.length; i++){
                        branchListItem.push(
                            {
                                name: payload[i].name,
                                location: payload[i].location,
                                distance: payload[i].distance,
                                selected: selectedBranch,
                                onPress: () => this.onClickBranch(payload[i].ID, payload[i].location, i),
                                onPressInfo: () => this.onClickInfo(payload[i].used, payload[i].currentWaitingTime, payload[i].name),
                            },
                        );
                    }}
                    // alert(branchListItem);
                    this.setState({branchListItem: branchListItem, branchHit: 1});
                } else {
                    alert(response.message);
                }
            },
            reqError = (error) => {
                console.log(JSON.parse(JSON.stringify(error)));
                alert(JSON.stringify(error));
            };
        console.log('===== ini params :'+JSON.stringify(params));
        ApiService.open(req).then(reqSuccess, reqError);
    };

    getAppointmentSlotList = () => {
        // alert("getAppointmentSlotList");
        const {dateParam, branchId, locationBranch} = this.state;
        const {formData} = this.props;
        // const date = new Date();
        // const hour = date.getHours().toString();
        // const hourConverted = hour < 10 ? '0'+hour : hour;
        const params = {
            branchId: branchId,
            date: dateParam,
            businessType: formData && formData.appQueue ? formData.appQueue.businessType : "TS"
        },
            queryStringParam = queryString.stringify(params),
            req = {
                path : SV_GET_NUMBERSOURCE + '?' + queryStringParam,
                params: {},
                type: MAIN,
                method: GET_METHOD
            },
            reqSuccess = (response) => {
                // console.log(JSON.stringify(response),"response")
                // alert(JSON.stringify(response));
                const {selectedTable} = this.state;
                if (response.payload) {
                    const payload = response.payload.time;
                    let appointmentSlotList = [];
                    {for(let i = 0 ; i < payload.length; i++){
                        // if (payload[i].start >= hourConverted) {
                            appointmentSlotList.push(
                                {
                                    start: payload[i].start,
                                    end: payload[i].end,
                                    remain: payload[i].remain.toString(),
                                    selected: selectedTable,
                                    onPress: () => this.pickAppointmentSlot(i, payload[i].start, payload[i].end)
                                },
                            );
                        // }
                    }}
                    this.setState({appointmentSlotList: appointmentSlotList, firstHitAppointmentSlot: false});
                } else {
                    alert(response.message);
                }
            },
            reqError = (error) => {
                console.log(error);
                alert(JSON.stringify(error));
            };
        console.log('===== ini params :'+JSON.stringify(params));
        ApiService.open(req).then(reqSuccess, reqError);
    };

    bookAppointment = () => {
        const {appointmentId, formData, userData} = this.props;
        const {date, dateParam, branchId, startAppointment, endAppointment} = this.state;
        const params = {
                action: ACTION_CREATE,
                // appointmentId: appointmentId,
                appointmentId: appointmentId,
                branchId: branchId,
                date: dateParam,
                businessType: formData && formData.appQueue ? formData.appQueue.businessType : 'TS',
                start: startAppointment,
                end: endAppointment,
                userId: userData.id
            },
            req = {
                path : SV_CREATE_APPOINTMENT,
                params: clean(params),
                type: MAIN,
            },
            reqSuccess = (response) => {
                console.log(JSON.stringify(response),"response code")
                const payload = response.payload;
                if (payload) {
                    this.setState({
                        currentStep: 4,
                        currentPosition: 3,
                        stepTitle: 'done',
                        appointcode: payload.appointmentCode
                    }, () => {
                        this.setStep("result");
                        this.props.dispatch(resetAppointmentId());
                    });
                } else {
                    alert(response.message);
                }
            },
            reqError = (error) => {
                console.log(error);
                alert(error.errMsg);
            };
        console.log('===== ini params :'+JSON.stringify(params));
        ApiService.open(req).then(reqSuccess, reqError);
    };

    toggleInfoBranchPopUp = () => {
        this.setState({
            infoBranchPopupVisible: !this.state.infoBranchPopupVisible
        });
    };

    toggleInfoHolidayPopUp = () => {
        console.log('sebelum', this.state.infoHolidayPopupVisible);
        this.setState({
            infoHolidayPopupVisible: !this.state.infoHolidayPopupVisible
        });
        console.log('sesudah', this.state.infoHolidayPopupVisible);
    };

    cancelOnPress = () => {
        this.setState({simpleText: 'dd.mm.yy'}, this.toggleInfoHolidayPopUp);
    };

    componentWillMount(){
        this.props.dispatch(ResetFormState());
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentDidUpdate(){
        const { form } = this.props;
        if(form) validation.commitDelete(form, this.dynamicFields);
    }

    componentWillUnmount() {
        console.log('Unmount CreateAppointment');
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render(){
        const {totalStep, parState, simpleText, branchListItem, appointmentSlotList, startAppointment, endAppointment,
            locationBranch, appointcode, firstHitAppointmentSlot, currentBookedSlot, currentWaitingTime, name,
            currentStep, loadingBranch} = this.state;
        const {form, userData} = this.props;
        const requestBookAppointment = this.props.requests[SV_CREATE_APPOINTMENT];
        const title = (
            <Title style={styles.title} containerStyle={styles.containerTitle}>
                <Text style={styles.titleText}>{i18n('createAnAppointment')}</Text>
                <Text style={styles.subtitleText}>{i18n('step')} {this.state.currentStep} {i18n('of')} {this.state.totalStep} : {i18n(this.state.stepTitle)}</Text>
            </Title>
        );
        const {formData} = this.props;

        const OKButton = [{
            text: i18n('OK'),
            onPress: this.toggleInfoBranchPopUp,
            props: {
                // request: requestCard,
                buttonContainerStyle: {
                    width: 98,
                    height: 46,
                    alignSelf: 'center'
                }
            }
        }];

        const OKButton2 = [{
            text: i18n('OK'),
            onPress: this.toggleInfoHolidayPopUp,
            props: {
                // request: requestCard,
                buttonContainerStyle: {
                    width: 98,
                    height: 46,
                    alignSelf: 'center'
                }
            }
        }];

        switch(true) {
            case this.state.step.dateSelection:
                renderOpts = {
                    form: form,
                    submitStep: this.goToLocationSelection,
                    readParentState: this.readParentState,
                    textParentState: parState,
                    date: simpleText,
                    pickDate: this.showPicker.bind(this, 'simple', {minDate: new Date()}),
                };
                renderView = <DateSelection opts={renderOpts}/>;
                break;
            case this.state.step.locationSelection:
                renderOpts = {
                    form: form,
                    submitStep: this.goToConfirmation,
                    branchListItem: branchListItem,
                    appointmentSlotList: appointmentSlotList,
                    firstHitAppointmentSlot: firstHitAppointmentSlot,
                    loadingBranch: loadingBranch,
                    handleFilterLocation: (text) => this.handleFilterLocation(text)
                };
                renderView = <LocationSelection opts={renderOpts}/>;
                break;
            case this.state.step.confirmation:
                renderOpts = {
                    form: form,
                    request: requestBookAppointment,
                    submitStep: this.bookAppointment,
                    date: dateString,
                    location: locationBranch,
                    start: startAppointment,
                    end: endAppointment
                };
                renderView = <Confirmation opts={renderOpts}/>;
                break;
            case this.state.step.result:
                renderOpts = {
                    form: form,
                    request: requestBookAppointment,
                    submitStep: this.doneCreateAppointment,
                    date: dateString,
                    location: locationBranch,
                    start: startAppointment,
                    end: endAppointment,
                    appointcode: appointcode
                };
                renderView = <Result opts={renderOpts}/>;
                break;
            default:
                renderOpts = {
                    form: form,
                    submitStep: this.goToLocationSelection,
                    readParentState: this.readParentState,
                    textParentState: parState,
                    date: simpleText,
                    pickDate: this.showPicker.bind(this, 'simple', {minDate: new Date()})
                };
                renderView = <DateSelection opts={renderOpts}/>;
                break;
        }

        return(
            <BdsScreenTemplate title={title} goBack={currentStep === 4 ? null : this.onBackClick} navigation={this.props.navigation} parentStyle={styles.containerBackground}>
                <View style={styles.stepIndicatorContainer}>
                    <StepIndicator
                        customStyles={stepIndicatorStyle}
                        currentPosition={this.state.currentPosition}
                        stepCount={totalStep}
                    />
                </View>
                <Animatable.View animation={this.state.step.locationSelection || this.state.step.confirmation ? 'slideInRight' : undefined} opts={renderOpts} duration={200}>
                    {renderView}
                    <PopUp
                        onBackdropPress={this.toggleInfoBranchPopUp}
                        isVisible={this.state.infoBranchPopupVisible}
                        content='popUpInfo'
                        title={i18n(name)}
                        body={
                            <View style={styles.boxContainer}>
                                <View style={styles.box}>
                                    <Text style={styles.boxHeader}>{i18n("slotTitle")}</Text>
                                    <Text style={styles.boxContent}>{currentBookedSlot}</Text>
                                </View>
                                <View style={styles.box}>
                                    <Text style={styles.boxHeader}>{i18n("expectedWaitingTime")}</Text>
                                    <Text style={styles.boxContent}>{currentWaitingTime}</Text>
                                </View>
                            </View>
                        }
                        buttons= {<ButtonGroup buttons={OKButton} type="stack"/>}
                    />

                    <PopUp
                        onBackdropPress={this.toggleInfoHolidayPopUp}
                        isVisible={this.state.infoHolidayPopupVisible}
                        content='popUpWeekendHoliday'
                        title={i18n("weekendHolidayTitle")}
                        body={
                            <View style={styles.boxContainer}>
                                <Text>{i18n("limitedBranches")}</Text>
                            </View>
                        }
                        buttons= {
                            <View style={styles.boxContainer}>
                                <Text style={styles.cancelStyle} onPress={this.cancelOnPress}>Cancel</Text>
                                <ButtonGroup buttons={OKButton2} type="stack"/>
                            </View>
                        }
                    />
                </Animatable.View>
            </BdsScreenTemplate>
        );
    }
}

CreateAppointment.propTypes = {
  appointmentId: PropTypes.any,
  dispatch: PropTypes.any,
  form: PropTypes.any,
  navigation: PropTypes.any,
  requests: PropTypes.any,
  userData: PropTypes.any
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
        formData: state.formData
    }
};

export default connect(mapStatesToProps)(CreateAppointment);