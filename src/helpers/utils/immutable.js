import {fromJS} from "immutable";

const mergeDeep  = (root, item) => fromJS(root).mergeDeep(item).toJS();
const maskingCC = (text)=>{
  return text.replace(/\d(?=\d{4})/g, "*");
};

export {mergeDeep, maskingCC}