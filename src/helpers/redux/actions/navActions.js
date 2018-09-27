import * as types from 'helpers/redux/actionTypes';

export function setNavStates(navStates) {
    return function (dispatch) {
        dispatch({
            type: types.SET_NAV_STATE,
            navStates: navStates
        })
    }
}