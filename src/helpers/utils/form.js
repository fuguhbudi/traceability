import compact from 'lodash.compact';
import map from 'lodash.map';
import mapFtvo from 'helpers/constant/mapFtvo';
import {upperCaseFirstLetter, handleEmpty} from './string';

const getErrors = (form) => compact(map(form, (item) => item.errors && item.errors.join(",")));
const isValid = (form) => {
    const errors = getErrors(form);
    return !errors || (errors && !errors.length);
};
const mapFTVO = (form, noFlatten) => {
    let paramsFTVO = {};
    const formatKeys = [

    ];
    const mapValue = (obj) => {
        for(let field in obj){
            if (obj.hasOwnProperty(field)) {
                if(
                    !noFlatten && formatKeys.indexOf(field) >= 0
                ){
                    let formatter;
                    const mapObjectChildren = () => {
                        for(let child in obj[field].value){
                            if (obj[field].value.hasOwnProperty(child)) {
                                const key = field + upperCaseFirstLetter(child);
                                const paramKey = mapFtvo[key] || key;
                                paramsFTVO[paramKey] = obj[field].value[child];
                            }
                        }
                    };

                    const mapDateObject = () => {
                        if (obj[field].value && obj[field].value.hasOwnProperty("dateString")) {
                            paramsFTVO[mapFtvo[field]] = obj[field].value["dateString"];
                        }
                    };

                    const mapInstructionMode = () => {
                        if (obj[field].value) {
                            paramsFTVO["standingInstruction"] = obj[field].value;
                        }
                    };

                    switch(field){
                        case "instruction.date":
                            formatter = mapDateObject;
                            break;

                        case "instruction.mode":
                            formatter = mapInstructionMode;
                            break;

                        case "remitter":
                        case "beneficiary":
                        case "beneficiary.own.account":
                        case "beneficiary.other.account":
                        case "beneficiary.favorite.account":
                            formatter = mapObjectChildren;
                            break;
                    }

                    formatter();
                }else{
                    const paramKey = mapFtvo[field] || field;
                    paramsFTVO[paramKey] = handleEmpty(obj[field].value);
                }
            }
        }
    };
    mapValue(form);
    return paramsFTVO;
};

export { getErrors, isValid, mapFTVO }