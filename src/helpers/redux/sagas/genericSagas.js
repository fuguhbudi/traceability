import * as types from 'helpers/redux/actionTypes';
import I18n from 'react-native-i18n'
import {takeEvery, put, takeLatest} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';

function setLanguageSaga(action) {
    try {
        const {currentLanguage} = action;
        I18n.locale = currentLanguage;
    } catch (e) {
    }
}

function setApiToken(action){
    try {
        const {apiToken} = action;
        alert(apiToken);
    } catch (e){
    }
}

function* setLastRequestPath(response){
    const { requests } = response;
    const paths = Object.keys(requests);
    if(paths.length && requests[paths[0]] && requests[paths[0]].inProgress){
        yield put({
            type: types.SET_LAST_REQUEST_PATH,
            lastRequestPath: paths[0]
        })
    }
}

function showError(response) {

}

function printLastAppQueueId(action){
    try {
        const {appointmentId} = action;
        // alert('queue yang di save: '+appointmentId);
    } catch (e) {
    }
}

function* setUserData() {
    // navigation.dispatch(NavigationActions.navigate({ routeName: 'ActivityOption'}));
}

function* setAppointmentId() {
    console.log('Navigate to CreateAppointment');
    // navigation.dispatch(NavigationActions.navigate({ routeName: 'CreateAppointment'}));
}

export const genericSagas = [
    // takeEvery(types.SET_ERROR, showError),
    takeLatest(types.SET_LANGUAGE, setLanguageSaga),
    takeEvery(types.SET_API_TOKEN, setApiToken),
    takeLatest(types.SET_REQUEST_STATE, setLastRequestPath),
    takeLatest(types.SET_APP_QUEUE_ID, printLastAppQueueId),
    takeEvery(types.SET_USER_DATA, setUserData),
    takeEvery(types.SET_APP_QUEUE_ID, setAppointmentId),
];