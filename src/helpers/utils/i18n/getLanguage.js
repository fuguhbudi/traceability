import I18n from "./";
// const i18n = (key) => I18n.t(key.replace(/(\.)+/g, '_'));
const i18n = (key) => { return key && I18n.t(key.replace(/(\.)+/g, '_')) };
export default i18n;