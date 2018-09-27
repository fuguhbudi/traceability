import {NativeModules} from "react-native";
import I18n from "react-native-i18n";

import en from "./locales/en";
import id from "./locales/id";

const countriesLang = ['en','id'];

const normalize =  (content) => {
    let normalized = Object.keys(content).map((key) => {
        const newKey = key.replace(/(\.)+/g, '_');
        return { [newKey] : content[key] };
    });
    return Object.assign({}, ...normalized);
};


I18n.setAllLanguage = (callback) => {
    NativeModules.PrimeMobile.getLanguageValue(
        countriesLang,
        (results) => {
            const toNormalizeEn = {...en,...results.en};
            const toNormalizeId = {...id,...results.id};
            let normalizedEn = normalize(toNormalizeEn);
            let normalizedId = normalize(toNormalizeId);
            I18n.translations = {
                en : normalizedEn,
                id : normalizedId
            };
            console.log('EN',I18n.translations.en);
            console.log('ID',I18n.translations.id);
            callback();
        },

        (err) => {
            I18n.translations = {
                en : normalize(en),
                id : normalize(id)
            };
            callback()
        }
    )

};

I18n.fallbacks = true;
I18n.missingTranslation = (key) => { return key && key.replace(/(_)+/g, '.') };

I18n.translations = {
    en: normalize(en),
    id: normalize(id)
};

export default I18n;