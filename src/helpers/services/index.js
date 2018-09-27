import 'whatwg-fetch';
import {
    ENV,
    MOCK_TELLER_API_URL,
    MOCK_MAIN_API_URL,
    MOCK_BRANCH_API_URL,
    MOCK_TRANSACTION_API_URL,
    MOCK_MOCK_API_URL,

    PROD_TELLER_API_URL,
    PROD_TANSAC_API_URL,
    PROD_MOCK_API_URL,
    PROD_MAIN_API_URL,
    PROD_BRANCH_API_URL,
    PROD_TRANSACTION_API_URL,
} from 'helpers/config';
import store from 'helpers/redux/store';
import {
    ERROR_CODE_CONNECTION,
    ERROR_CODE_TIMEOUT,
    ERROR_CODE_SECURITY_ISSUE,
    ERROR_EFORM_EXPIRED,
    ERROR_EARLY,
    ERROR_APPOINTMENT_EXPIRED,
    ERROR_NOT_BRANCH,
    TELLER,
    MAIN,
    MOCK,
    TRANSACTION,
    POST_METHOD,
    GET_METHOD
} from 'helpers/constant';
import {setRequestState} from "helpers/redux/actions/genericActions";
import {handleResponse} from 'helpers/utils';
import {Alert} from 'react-native';
import {i18n} from 'helpers/common';

const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

class ApiService {
    open = (req) => {
        let {path, params, type, method, callbackErrorOnPressButtonOk, showTryAgainOptions, callbackErrorOnPressButtonTryAgain, notShowErrorAlert} = req;
        // notShowErrorAlert not throw alert, and you might need to handle on reqError callback.
        if(isEmpty(params)) {
            params = {};
        }

        const setRequest = (inProgress, error) => {
            return setRequestState({
                [path]: {
                    inProgress: inProgress,
                    error: error
                }
            })
        };

        const dispatchAction = (action) => {
            try {
                store.dispatch(action)
            } catch (e) { }
        };

        const successCallback = (result, resolve, reject) => {
            console.log('==== raw result ====',result);
            let filtered = handleResponse(result);
            console.log('=== filtered result ===', filtered);
            if(filtered.type === 'error'){
                reject(filtered);
                // wait for this thing implemented to redux
                dispatchAction(setRequest(false, true));
                errorCallback(filtered, reject)
            } else {
                resolve(filtered);
                // wait for this thing implemented to redux
                dispatchAction(setRequest(false, false));
            }
        };

        const errorCallback = (error, reject) => {
            if (!notShowErrorAlert) {
                try{
                    // no response from server
                    // [TypeError: Network request failed]
                    let errorString = error.toString();
                    let errorCode, errorMessage;
                    if (error && error.type === 'error') {
                        // defined error from handleResponse
                        errorCode = (error.code) ? ' ( ' + error.code + ' ) ' : '';
                        errorMessage = (error.message) ? error.message : '';
                    } else if (errorString.indexOf('TypeError') !== -1 && errorString.indexOf(':') !== -1) {
                        errorCode = '';
                        messageArr = errorString.split(':');
                        errorMessage = (messageArr.length === 2) ? messageArr[1] : i18n('unknownError');
                    } else {
                        errorCode = '';
                        errorMessage = i18n('serviceUnavailable');
                    }
                    if (showTryAgainOptions) {
                        Alert.alert(
                            i18n('error'),
                            errorMessage + errorCode,
                            [
                                {
                                    text: i18n('tryAgain'), onPress: () => {
                                        if (typeof callbackErrorOnPressButtonTryAgain === 'function') {
                                            callbackErrorOnPressButtonTryAgain();
                                        }
                                    }
                                },
                                {
                                    text: i18n('ok'), onPress: () => {
                                        if (typeof callbackErrorOnPressButtonOk === 'function') {
                                            callbackErrorOnPressButtonOk();
                                        }
                                    }
                                }
                            ],
                            { cancelable: false }
                        );
                    } else {
                        Alert.alert(
                            i18n('error'),
                            errorMessage + errorCode,
                            [
                                {
                                    text: i18n('ok'), onPress: () => {
                                        if (typeof callbackErrorOnPressButtonOk === 'function') {
                                            callbackErrorOnPressButtonOk();
                                        }
                                    }
                                }
                            ],
                            { cancelable: false }
                        );
                    }
                }catch(e){
                    console.log(e)
                }
            }
            reject(error);
            dispatchAction(setRequest(false, true));
        };

        dispatchAction(setRequest(true, false));

        return new Promise((resolve, reject) => {
            let data = !(isEmpty(params)) ? {

                // jadi disini ada JWTAuthToken
                // -- example token --
                // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJheW1vbmRoYXJ5YW50by5yaEBnbWFpbC5jb20iLCJwYXNzd29yZCI6MTIzMTIzMTIzfQ.tghm5gPuvtKTN1ARECNa2vZVQSSshW6uFmOrZatnybU"

                ...params,
            } : {};
            if(ENV !== 'DEV'){
                let customUrl;
                switch(type){
                    case MAIN:
                        customUrl = PROD_MAIN_API_URL;
                        break;
                    case TELLER:
                        customUrl = PROD_TELLER_API_URL;
                        break;
                    case MOCK:
                        customUrl = PROD_MOCK_API_URL;
                        break;
                    case TRANSACTION:
                        customUrl = PROD_TRANSACTION_API_URL;
                        break;
                    default:
                        customUrl = PROD_MAIN_API_URL;
                        break;
                }
                if (!method) {
                    //default to POST
                    method = POST_METHOD;
                }
                if (method === POST_METHOD) {
                    console.log('Endpoint: ', customUrl + path)
                    fetch(
                        customUrl + path,
                        {
                            method: POST_METHOD,
                            headers : {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        }
                    )
                        .then((response) => response.json())
                        .then(
                            (result) => successCallback(result, resolve, reject),
                            (error) => errorCallback(error, reject)
                        );
                } else {
                    console.log('Endpoint: ', customUrl + path)
                    fetch(
                        customUrl + path,
                        {
                            method: GET_METHOD,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: undefined
                        }
                    )
                        .then((response) => response.json())
                        .then(
                            (result) => successCallback(result, resolve, reject),
                            (error) => errorCallback(error, reject)
                        );
                }
            }
            else {
                let customUrl;
                switch (type) {
                    case MAIN:
                        customUrl = MOCK_MAIN_API_URL;
                        break;
                    case TELLER:
                        customUrl = MOCK_TELLER_API_URL;
                        break;
                    case MOCK:
                        customUrl = MOCK_MOCK_API_URL;
                        break;
                    default:
                        customUrl = MOCK_MAIN_API_URL;
                        break;
                }
                if (!method) {
                    //default to POST
                    method = POST_METHOD;
                }
                if (method === POST_METHOD) {
                    console.log('Endpoint: ', customUrl + path)
                    fetch(
                        customUrl + path,
                        {
                            method: POST_METHOD,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        },
                    )
                        .then((response) => response.json())
                        .then(
                            (result) => successCallback(result, resolve, reject),
                            (error) => errorCallback(error, reject)
                        );
                } else {
                    console.log('Endpoint: ', customUrl + path)
                    fetch(
                        customUrl + path,
                        {
                            method: GET_METHOD,
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: undefined
                        },
                    )
                        .then((response) => response.json())
                        .then(
                            (result) => successCallback(result, resolve, reject),
                            (error) => errorCallback(error, reject)
                        );
                }
            }
        });

        // this.unSubscribeStore();
    }
}

export default new ApiService();