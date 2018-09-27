import * as types from "helpers/redux/actionTypes";

export function SetFormState(form, resetValueOnly) {
    if(resetValueOnly){
        for(let i in form){
            if(form[i] && form[i].value){
                form[i].value = null;
            }
        }
    }
    return function (dispatch) {
        dispatch({
            type: types.SET_FORM,
            form: form
        })
    }
}

export function ResetFormState(defaultForm) {
    return function (dispatch) {
        dispatch({
            type: types.RESET_FORM
        })
    }
}

export function SetUserData(userData) {
    return function(dispatch) {
        dispatch({
            type: types.SET_USER_DATA,
            userData: userData
        })
    }
}

export function ResetUserData() {
    return function(dispatch) {
        dispatch({
            type: types.RESET_USER_DATA,
        })
    }
}

export function SetFormData(formData) {
    return function(dispatch) {
        dispatch({
            type: types.SET_FORM_DATA,
            formData: formData
        })
    }
}

export function ResetFormData() {
    return function(dispatch) {
        dispatch({
            type: types.RESET_FORM_DATA,
        })
    }
}

export function SetDepositoryFormData(depositoryFormData) {
    return function(dispatch) {
        dispatch({
            type: types.SET_DEPOSITORY_FORM_DATA,
            depositoryFormData: depositoryFormData
        })
    }
}

export function ResetDepositoryFormData() {
    return function(dispatch) {
        dispatch({
            type: types.RESET_DEPOSITORY_FORM_DATA,
        })
    }
}


export function SetRecipient(recipientInfo) {
    return function(dispatch) {
        dispatch({
            type: types.SET_DEPOSITORY_FORM_DATA,
            depositoryFormData: depositoryFormData
        })
    }
}