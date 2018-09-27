import React,{Component} from 'react';
import {BackHandler, View, Text, Image, StatusBar} from 'react-native';
import {Tabs, Tab, Content, Button, Left, Right} from 'native-base';
import {PropTypes, i18n, connect, themes, staticIcons} from 'helpers/common';
import {SetFormState, SetUserData, ResetUserData, ResetFormState} from 'helpers/redux/actions/formActions';
import {clean, formUtil, setScreenStep} from 'helpers/utils';
import {SV_READ_APPOINTMENT, SV_GET_TICKET_ONLINE, SV_FORM, SV_GET_APPOINTMENT_HISTORY} from 'helpers/services/endpoints/';
import {normalizeEFormParams, setDefaults} from 'helpers/utils/generic/dataTransfer';
import {TELLER, MAIN, ACTION_READ, ACTION_CREATE, GET_METHOD} from 'helpers/constant';
import constraints from 'helpers/constraints/loginConstraints';
import BookingList from './bookingList';
import Ticket from './ticket';
import BdsScreenTemplate from 'components/bdsScreenTemplate';
import styles from './style';
import ApiService from 'helpers/services';
import queryString from 'query-string';

class OnlineBooking extends Component {
    constructor() {
        super();
        this.state = {
            step: {
                myBooking: true,
                history: false,
                ticket: false
            },
            prevStep: null,
            bookingListNew: [],
            bookingListExchanged: [],
            activeTab: 0,
            appointmentCode: null,
            location: null,
            start: null,
            end: null,
            status: null,
            branchId: null,
            branchName: null,
            ticketNumber: null,
            date: null,
        }
    };

    getAppointmentList = () => {
        const {userData} = this.props;
        console.log('userData: ', userData);
        const params = {
                // "customerId": userData.bdsCustomer.id
                userId: userData.id
            },
            queryStringParam = queryString.stringify(params),
            req = {
                path : SV_READ_APPOINTMENT + '?' + queryStringParam,
                params: {},
                type: MAIN,
                method: GET_METHOD
            },
            reqSuccess = (response) => {
                // alert(JSON.stringify(response.payload[0].start))
                console.log(JSON.stringify(response),"payload")
                const payload = response.payload;
                // console.log('payyyyy' , payload.appointments.length)
                if (payload) {
                    let bookingListNew = [];
                    let bookingListExchanged = [];
                    {for(let i = 0 ; i < payload.length; i++){
                        if (payload[i].status === 'NEW') {
                            bookingListNew.push(
                                {
                                    appointmentCode: payload[i].appointmentCode,
                                    location: payload[i].branch.location,
                                    start: payload[i].start,
                                    end: payload[i].end,
                                    createdDate: payload[i].createdDate,
                                    status: payload[i].status,
                                    ticketNumber: payload[i].ticketNumber,
                                    onPress: () => this.onClickAppointment(
                                        payload[i].appointmentCode,
                                        payload[i].branch.location,
                                        payload[i].start,
                                        payload[i].end,
                                        payload[i].status,
                                        payload[i].branch.id,
                                        payload[i].name,
                                        payload[i].date,
                                        payload[i].id,
                                        payload[i].ticketNumber,
                                    )
                                },
                            );
                        } else {
                            bookingListExchanged.push(
                                {
                                    appointmentCode: payload[i].appointmentCode,
                                    location: payload[i].branch.location,
                                    start: payload[i].start,
                                    end: payload[i].end,
                                    createdDate: payload[i].createdDate,
                                    status: payload[i].status,
                                    ticketNumber: payload[i].ticketNumber,
                                    onPress: () => this.onClickAppointment(
                                        payload[i].appointmentCode,
                                        payload[i].branch.location,
                                        payload[i].start,
                                        payload[i].end,
                                        payload[i].status,
                                        payload[i].branch.id,
                                        payload[i].name,
                                        payload[i].date,
                                        payload[i].id,
                                        payload[i].ticketNumber,
                                    )
                                },
                            );
                        }
                    }}
                    console.log(bookingListExchanged,"bookingListExchanged")
                    console.log(bookingListNew,"bookingListNew")
                    this.setState({
                        bookingListNew: bookingListNew,
                        bookingListExchanged: bookingListExchanged,
                        // ticketNumber: null
                    });
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

    getTicketNumber = () => {
        const {appointmentCode, branchId} = this.state;
        const params = {
                action: ACTION_CREATE,
                appointmentCode: appointmentCode,
                branchId: branchId
            },
            req = {
                path : SV_GET_TICKET_ONLINE,
                params: params,
                type: MAIN,
            },
            reqSuccess = (response) => {
                const payload = response.payload;
                // if(payload) {
                    this.setState({
                        ticketNumber: payload.ticketNumber
                    })
                // } else {
                    // alert(response.message);
                // }
            },
            reqError = (error) => {
                alert(error.message);
            };
        console.log('===== ini params :'+JSON.stringify(params));
        ApiService.open(req).then(reqSuccess, reqError);
    };

    getTicketNumberForm = (appointmentCode) => {
        const params = {
                // appointmentCode: appointmentCode
                // userId:
                appointmentId: appointmentCode
            },
            queryStringParam = queryString.stringify(params),
            req = {
                path : SV_GET_APPOINTMENT_HISTORY + '?' + queryStringParam,
                params: {},
                type: MAIN,
                method: GET_METHOD
            },
            reqSuccess = (response) => {
                // alert(JSON.stringify(response))
                const payload = response.payload;
                console.log(response,"responsenya")
                if(payload) {
                    this.setState({
                        // ticketNumber: payload[0].appQueue.queueNumber
                        ticketNumber: payload.ticketNumber
                    }, () => {
                        this.setStep('ticket');
                    })
                } else {
                    alert(response.message);
                }
            },
            reqError = (error) => {
                alert(JSON.stringify(error));
            };
        console.log('===== ini params :'+JSON.stringify(params));
        ApiService.open(req).then(reqSuccess, reqError);
    };

    onChangeTab = (currentTab) => {
        currentTab === 0 ? this.setStep('myBooking') : this.setStep('history');
        this.getAppointmentList();
    };

    onClickAppointment = (appointmentCode, location, start, end, status, branchId, branchName, date, appointmentCodeId, ticketNumber) => {
        // alert(ticketNumber);
        this.setState({
            appointmentCode: appointmentCode,
            location: location,
            start: start,
            end: end,
            status: status,
            branchId: branchId,
            branchName: branchName,
            date: date,
            ticketNumber: ticketNumber,
        }, () => {
            // this.getTicketNumberForm(appointmentCode);
            this.getTicketNumberForm(appointmentCodeId);

        });
    };

    setStep = (step) => {
        const stateStep = this.state.step;
        const newStep = setScreenStep(stateStep);
        this.props.dispatch(ResetFormState());
        this.setState({
            step: newStep(step)
        });
    };

    onClickArrive = () => {
        this.getTicketNumber();
    };

    componentWillMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentDidMount() {
        this.getAppointmentList();
    }

    render(){
        let renderView, renderOpts;
        const { bookingListNew, bookingListExchanged, appointmentCode, location, start, end, status, ticketNumber, branchName, date} = this.state;
        const gettingAppointmentList = this.props.requests[SV_READ_APPOINTMENT].inProgress;
        const requestTicketOnline = this.props.requests[SV_GET_TICKET_ONLINE];
        switch(true) {
            case this.state.step.myBooking:
                renderOpts = {
                    bookingListItem: bookingListNew,
                    request: gettingAppointmentList,
                    navigation: this.props.navigation
                };
                renderView = <BookingList opts={renderOpts}/>;
                break;
            case this.state.step.history:
                renderOpts = {
                    bookingListItem: bookingListExchanged,
                    request: gettingAppointmentList,
                    navigation: this.props.navigation,
                    history: true
                };
                renderView = <BookingList opts={renderOpts}/>;
                break;
            case this.state.step.ticket:
                renderOpts = {
                    request: requestTicketOnline,
                    onClickArrive: this.onClickArrive,
                    date: date,
                    location: location,
                    start: start,
                    end: end,
                    status: status,
                    appointmentCode: appointmentCode,
                    ticketNumber: ticketNumber,
                    branchName: branchName
                };
                renderView = <Ticket opts={renderOpts}/>;
                break;
        }

        return (
            <BdsScreenTemplate headerTitle={i18n('onlineBooking')} goBack={this.handleBackButton} navigation={this.props.navigation} parentStyle={styles.bdsParentStyle}>
                <StatusBar hidden={false}/>
                <Tabs onChangeTab={(tabView) => this.onChangeTab(tabView.i)} initialPage={0} tabBarBackgroundColor={'#fff'} style={styles.tabsContainer} tabBarUnderlineStyle={styles.tabBarUnderline} tabContainerStyle={styles.tabContainer}>
                    <Tab tabStyle={styles.tabStyle} activeTabStyle={styles.activeTab} textStyle={styles.textTab} activeTextStyle={styles.activeTextTab} heading={i18n('myBooking')}>
                        <Content>
                            <View style={styles.tabBody}>
                                {renderView}
                            </View>
                        </Content>
                    </Tab>
                    <Tab  tabStyle={styles.tabStyle} activeTabStyle={styles.activeTab} textStyle={styles.textTab} activeTextStyle={styles.activeTextTab} heading={i18n('history')}>
                        <View style={styles.tabBody}>
                            {renderView}
                        </View>
                    </Tab>
                </Tabs>
            </BdsScreenTemplate>
        );
    }
}

OnlineBooking.propTypes = {
  dispatch: PropTypes.func,
  form: PropTypes.object,
  navigation: PropTypes.any
};

const mapStatesToProps = (state) => {
    return {
        userData: state.userData,
        requests: state.requests
    }
};

export default connect(mapStatesToProps)(OnlineBooking);