import { formUtil } from 'helpers/utils';

export const normalizeEFormParams = (form, state) => {
    const inputValues = formUtil.mapFTVO(form, true);
    // console.log('inputValues: ',inputValues);
    let paramsObj = {
        ...formUtil.mapFTVO(form, true),
        depositoryType: inputValues.depositoryType ? inputValues.depositoryType : 'REGULAR',
        name: inputValues.name ? inputValues.name : null,
        phoneNumber: inputValues.phoneNumber ?inputValues.phoneNumber : null,
        email: inputValues.email ? inputValues.email : null,
        password: inputValues.password ? inputValues.password : null,
    };
    return paramsObj;
};

export const setDefaults = (form, defaults) => {
    let formattedDefaults = {};
    for(let field in defaults){
        if(defaults.hasOwnProperty(field)){
            formattedDefaults[field] = {
                ...form[field],
                value: defaults[field],
                errors: []
            }
        }
    }
    return formattedDefaults;
};