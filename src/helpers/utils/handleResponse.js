import {Alert} from 'react-native';
import {i18n} from 'helpers/common';
const handleResponse = (response) => {
    let returnObj;
    if (response.code === '0') {
        // success
        returnObj = {
            code: response.code,
            message: response.message,
            type: 'success',
            payload: response.payload
        };
    } else if (response.code !== '0') {
        returnObj = {
            code: (response.code) ? response.code : '',
            message: (response.message) ? response.message : i18n('error'),
            type: 'error'
        };
    } else if (response.error) {
        returnObj = {
            code: (response.code) ? response.code : '',
            message: (response.error.description) ? response.error.description : (typeof response.error === 'string') ? response.error : i18n('error'),
            type: 'error'
        }
    }
    return returnObj;
}

export default handleResponse;