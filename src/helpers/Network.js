
import { Toast } from 'native-base';
import {strings} from '../assets/values/styles';

const BASE_URL = "http://cb.aprdev.com/eform/";

export const toastError = (text) => {
    Toast.show({
        text: text,
        position: 'top',
        buttonText: 'X',
        type : 'danger',
        duration : 10000
      });
};

export default class Network {
    
    static post(ctx, servicePath, params, callbackSuccess, callbackError){
        let fetchResult = fetch(BASE_URL+servicePath, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });
        Network.handlingResponse(ctx, fetchResult, callbackSuccess, callbackError);
    }

    static get(ctx, servicePath, params, callbackSuccess, callbackError){
        const queryString = Network.objToQueryString(params);

        let fetchResult = fetch(BASE_URL+servicePath+"?${queryString}", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        Network.handlingResponse(ctx, fetchResult, callbackSuccess, callbackError);
    }

    static objToQueryString(obj) {
        const keyValuePairs = [];
        for (const key in obj) {
          keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }

    static handlingResponse(ctx, fetchResult, callbackSuccess, callbackError){
        ctx.setState({loading : true});

        fetchResult
        .then((response) => response.json())
        .then((responseJson) => {
            ctx.setState({loading : false});
            let payload = responseJson.payload;
            if(payload != undefined){
                callbackSuccess(payload);
            } else {
                if(callbackError == undefined)
                    toastError(responseJson.errCode +" : "+ responseJson.errMsg);
                else
                    callbackError(responseJson.errCode, responseJson.errMsg);
            }
        })
        .catch((error) => {
          console.log(error);
          toastError(strings.connectionError);
          ctx.setState({loading : false});
        });
    }

};