import * as types from 'helpers/redux/actionTypes';
import globalState from '../states';
import {fromJS} from 'immutable';

export function setLanguage(state = globalState.currentLanguage, action) {
    switch (action.type) {
        case types.SET_LANGUAGE:
            // return {
            //     ...state,
            //     currentLanguage: action.currentLanguage
            // };
            return Object.assign({}, action);
        default:
            return state;
    }
}

export function setApiToken(state = globalState.apiToken, action){
    switch(action.type){
        case types.SET_API_TOKEN:
            return Object.assign({},action);
        default:
            return state;
    }
}

export function setRequestState(state = globalState.requests, action) {
    switch (action.type) {
        case types.SET_REQUEST_STATE:
            return fromJS(state).mergeDeep(action.requests).toJS();
        default:
            return state;
    }
}

export function setLastRequestPath(state = globalState.lastRequestPath, action){
    switch(action.type){
        case types.SET_LAST_REQUEST_PATH:
            return action.lastRequestPath;
        default:
            return state;
    }
}

export function setError(state = globalState.error, action) {
    switch (action.type) {
        case types.SET_ERROR:
            return Object.assign({}, action.error);
        default:
            return state;
    }
}

export function setAppointmentId(state = globalState.appointmentId, action){
    switch(action.type){
        case types.SET_APP_QUEUE_ID:
            return action.appointmentId;
        case types.RESET_APP_QUEUE_ID:
            return null;
        default:
            return state;
    }
}

export function setTicketNumber(state = globalState.ticketNumber, action){
    switch(action.type){
        case types.SET_TICKET_NUMBER:
            return action.ticketNumber;
        case types.RESET_TICKET_NUMBER:
            return null;
        default:
            return state;
    }
}

export function setSelectedOption(state = globalState.selectedOption, action){
    switch(action.type){
        case types.SET_FILL_IN_FORM_SELECTED:
            return {...state, fillInform: true};
        case types.SET_PRINT_TICKET_SELECTED:
            return {...state, printTicket: true};
        case types.SET_SEND_TICKET_SELECTED:
            return {...state, sendTicket: true};
        case types.RESET_SELECTED_OPTION:
            return {...state, fillInform: false, printTicket: false, sendTicket: false};
        default:
            return state;
    }
}

export function setDepositoryType(state = globalState.depositoryType, action){
    switch(action.type){
        case types.SET_DEPOSITORY_TYPE:
            return action.depositoryType;
        default:
            return state;
    }
}