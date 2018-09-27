import * as types from 'helpers/redux/actionTypes';

export function setLanguage(language) {
    return function (dispatch) {
        dispatch({
            type: types.SET_LANGUAGE,
            currentLanguage: language
        })
    }
}

export function logout() {
    return function (dispatch) {
        dispatch({
            type: types.RESET_ROOT_STATE
        });
    }
}

export function setApiToken(token){
    return function (dispatch) {
        dispatch({
            type: types.SET_API_TOKEN,
            apiToken: token
        })
    }
}

export function setRequestState(requests) {
    return function (dispatch) {
        dispatch({
            type: types.SET_REQUEST_STATE,
            requests: requests
        })
    }
}

export function setError(error) {
    return function (dispatch, getState) {
        dispatch({
            type: types.SET_ERROR,
            error: error,
            lastRequestPath: getState().lastRequestPath
        })
    }
}

export function setAppointmentId(id){
    return function (dispatch) {
        dispatch({
            type: types.SET_APP_QUEUE_ID,
            appointmentId: id
        })
    }
}

export function resetAppointmentId(){
    return function (dispatch) {
        dispatch({
            type: types.RESET_APP_QUEUE_ID
        })
    }
}

export function setTicketNumber(id){
    return function (dispatch) {
        dispatch({
            type: types.SET_TICKET_NUMBER,
            ticketNumber: id
        })
    }
}

export function resetTicketNumber(){
    return function (dispatch) {
        dispatch({
            type: types.RESET_TICKET_NUMBER,
        })
    }
}

export function setFillInform(){
    return function (dispatch) {
        dispatch({
            type: types.SET_FILL_IN_FORM_SELECTED,
        })
    }
}

export function setPrintTicketSelected(){
    return function (dispatch) {
        dispatch({
            type: types.SET_PRINT_TICKET_SELECTED,
        })
    }
}

export function setSendTicketSelected(){
    return function (dispatch) {
        dispatch({
            type: types.SET_SEND_TICKET_SELECTED,
        })
    }
}

export function resetSelectedOption(){
    return function (dispatch) {
        dispatch({
            type: types.RESET_SELECTED_OPTION,
        })
    }
}

export function setDepositoryType(type){
    return function (dispatch) {
        dispatch({
            type: types.SET_DEPOSITORY_TYPE,
            depositoryType: type
        })
    }
}