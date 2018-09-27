import React, { Component } from 'react';

import { AppRegistry,Platform,AsyncStorage,} from 'react-native';

// import DeviceInfo from 'react-native-device-info';

let SERVER_PREFIXS_PROD = "http://";
let IP_DEFAULT = "10.10.230.66:9001/";
let SERVER_SUFFIXS = "api/bds/";

// let deviceId = DeviceInfo.getDeviceId();
// let version = DeviceInfo.getVersion();
// let isEmulator = DeviceInfo.isEmulator();
// let isTablet = DeviceInfo.isTablet();

let platform = Platform.OS=='ios'? (isTablet?'ipad' : 'iphone') : Platform.OS;
// var prv;

invokeMethod = async(type,method,data,callbackSuccess,callbackError) =>{
    setTimeout(function(){

        // var path = SERVER_PREFIXS_PROD+IP_DEFAULT+SERVER_SUFFIXS+'?action='+method+'';
        var path = SERVER_PREFIXS_PROD+IP_DEFAULT+SERVER_SUFFIXS+method+'';

        // if (typeof data === 'string') {
        //     var jsonData = JSON.parse(data);
        //     jsonData["httpRequest"]=path;
        // }else{
        //     var jsonData = data;
        //     jsonData["httpRequest"]=path;
        // }
        if(type === "GET"){
            get(path,data,callbackSuccess,callbackError);
        }else if (type === "POST"){
            post(path,data,callbackSuccess,callbackError);
        }
        
    },0);
}

function get(path,data,callbackSuccess,callbackError){
    if(data != ""){    
        path += "?";
        var jsonData = JSON.parse(data);
        for (var key in jsonData) {
            var value = jsonData[key];
            path += key+"="+value+"&";
        }    
    }
    console.log(path);
    try{
        fetch(path, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                return response.text();
            }).then((responseText) => {
                // console.log("network response :"+responseText);
                var response = JSON.parse(responseText);
                if(response.errCode==null){
                    callbackSuccess(response);
                } else {
                    callbackError(response.errMsg);
                }
            })
        .catch((error) => {
            callbackError(error.errMsg);
        });
    } catch(e){
        callbackError(e);
    }
}

function post(path,data,callbackSuccess,callbackError){
    try{
        fetch(path, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then((response) => {
                return response.text();
            }).then((responseText) => {
                // console.log("network response :"+responseText);
                var response = JSON.parse(responseText);
                if(response.errCode==null){
                    callbackSuccess(response);
                } else {
                    callbackError(response.errMsg);
                }
            })
        .catch((error) => {
            callbackError(error.errMsg);
        });
    } catch(e){
        callbackError(e);
    }
}

function generateUUID() {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;

        d = Math.floor(d/16);

        return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;
};

//================================== Local Data ==================================

function addData(key,value){
    try {
        // console.log(key,value);
        AsyncStorage.removeItem(key);
        AsyncStorage.setItem(key,value);
    } catch (error) {
        // Error saving data
        console.log(error);
    }
}

getData = async (key) =>{
    try {
      var value = await AsyncStorage.getItem(key);
      if (value !== null){
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
      console.log("error get data:"+error);
      return '';
    }
}

clearDataByKey = async(key) =>{
    await AsyncStorage.removeItem(key);
}
//================================== Export Methods ==================================
// networks
exports.invokeMethod = invokeMethod;
// datas
exports.getData = getData;
exports.addData = addData;
exports.clearDataByKey = clearDataByKey;
