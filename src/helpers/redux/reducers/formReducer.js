import * as types from "helpers/redux/actionTypes";
import globalState from "helpers/redux/states";

export function setForm(state = globalState.form, action) {
    switch (action.type) {
        case types.SET_FORM:
            return {
                ...state,
                ...action.form
            };
            break;
        case types.RESET_FORM:
            console.log('reset form');
            return Object.assign({});
            break;
        default:
            return state;
            break;
    }
}

export function setUserData(state = globalState.userData, action) {
    switch (action.type) {
        case types.SET_USER_DATA:
            return {
                ...state,
                ...action.userData
            }
            break;
        case types.RESET_USER_DATA:
            return Object.assign({});
            break;
        default:
            return state;
            break;
    }
}

export function setFormData(state = globalState.formData, action) {
    switch (action.type) {
        case types.SET_FORM_DATA:
            return {
                ...state,
                ...action.formData
            };
            break;
        case types.RESET_FORM_DATA:
            return Object.assign({});
            break;
        default:
            return state;
            break;
    }
}

export function setDepositoryFormData(state = globalState.depositoryFormData, action) {
    switch (action.type) {
        case types.SET_DEPOSITORY_FORM_DATA:
            return {
                ...state,
                ...action.depositoryFormData
            };
            break;
        case types.RESET_DEPOSITORY_FORM_DATA:
            return Object.assign({});
            break;
        default:
            return state;
            break;
    }
}