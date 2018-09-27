import {fromJS} from "immutable";
import * as types from "helpers/redux/actionTypes";
import globalState from "../states";

export function setNavStates(state = globalState.navStates, action) {
    switch (action.type) {
        case types.SET_NAV_STATE:
            return Object.assign({}, action.navStates);
        default:
            return state;
    }
}