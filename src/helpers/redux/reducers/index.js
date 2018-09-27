import {combineReducers} from 'redux';
import {
    setLanguage,
    setApiToken,
    setLastRequestPath,
    setRequestState,
    setError,
    setAppointmentId,
    setTicketNumber,
    setSelectedOption,
    setDepositoryType
} from './genericReducers';
import {setForm, setUserData, setFormData, setDepositoryFormData} from "./formReducer";
import {setNavStates} from './navReducers';
import * as types from 'helpers/redux/actionTypes';
import initialState from '../states';

const appReducer = combineReducers({
    currentLanguage: setLanguage,
    apiToken: setApiToken,
    requests: setRequestState,
    lastRequestPath: setLastRequestPath,
    form: setForm,
    error:setError,
    navStates: setNavStates,
    appointmentId: setAppointmentId,
    ticketNumber: setTicketNumber,
    selectedOption: setSelectedOption,
    userData: setUserData,
    depositoryType : setDepositoryType,
    formData: setFormData,
    depositoryFormData: setDepositoryFormData
});

const rootReducer = (state, action) => {
    if (action.type === types.RESET_ROOT_STATE) {
        const cache = state;
        const keptStates = {
            // lang: state.lang,
            // activeApp: state.activeApp,
            // countryList: state.countryList,
            // DownloadAndHit: state.DownloadAndHit
        };
        state = {
            ...initialState,
            ...keptStates,
        }
    }
    return appReducer(state, action)
};

export default rootReducer;
