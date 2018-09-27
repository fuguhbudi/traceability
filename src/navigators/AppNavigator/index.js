import React, {Component} from "react";
import {
    StackNavigator,
} from 'react-navigation';
import Login from 'screens/login';
import CashDepositEform from 'screens/cashDepositEform';
import OverBookingEform from 'screens/overBookingEform';
import CashWithdrawalEform from 'screens/cashWithdrawalEform';
import ChequeDepositEForm from 'screens/chequeDepositEForm';
import ActivityOption from 'screens/activityOption';
import CreateAppointment from 'screens/createAppointment';
import OnlineBooking from 'screens/onlineBooking';
import {setNavStates} from 'helpers/redux/actions/navActions';
import {connect, PropTypes} from "helpers/common";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {resetAppointmentId} from 'helpers/redux/actions/genericActions';
import {BackHandler} from 'react-native';
// import {BackManager} from 'controllers/HomeController';

class AppNavigator extends Component{

    // gets the current screen from navigation state
    getCurrentRouteName = (navigationState) => {
        if(!navigationState) return null;
        const route = navigationState.routes[navigationState.index];
        if(route.routes) return this.getCurrentRouteName(route);
        return route.routeName;
    };

    handleOnNavStateChange = (prevState, currentState) => {
        const currentScreen = this.getCurrentRouteName(currentState);
        const prevScreen = this.getCurrentRouteName(prevState);
        const navStates = {
            currentScreen: currentScreen,
            prevScreen: prevScreen
        };
        this.props.dispatch(setNavStates(navStates));
        // if (prevScreen !== currentScreen) {
        //     if(prevScreen === 'Home'){
        //         BackManager.enableHardwareBackPress();
        //     } else if(currentScreen === 'Home'){
        //         BackManager.disableHardwareBackPress();
        //     }
        // }
        if(currentScreen === 'Login'){
            this.props.dispatch(resetAppointmentId());
        }
        console.log(currentScreen);
    };

    handleBackButton = () => {
        return true;
    };

    componentDidMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    render(){
        const MainNavigator = StackNavigator({
            Login: { screen: Login },
            CashDepositEform: { screen: CashDepositEform },
            OverBookingEform: { screen: OverBookingEform },
            ActivityOption: { screen: ActivityOption },
            CreateAppointment: { screen: CreateAppointment },
            OnlineBooking: { screen: OnlineBooking },
            CashWithdrawalEform: { screen: CashWithdrawalEform },
            ChequeDepositEForm: { screen: ChequeDepositEForm}
        },{
            headerMode: 'none',
            initialRouteName : 'Login',
            transitionConfig: ()=> {
                return {screenInterpolator: CardStackStyleInterpolator.forHorizontal}
            },
            // transitionConfig: () => ({ screenInterpolator: () => null }),
        });

        return <MainNavigator
            ref={ nav => {global.navigation = nav} }
            onNavigationStateChange={this.handleOnNavStateChange}
        />;
    }
}
function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(AppNavigator);