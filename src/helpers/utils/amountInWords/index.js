"use strict";
let exports;
exports = module.exports = writtenNumber;
let util = require("./util");

let languages = ["en", "es", "pt", "fr", "eo", "it", "vi", "tr", "id"];
let i18n = {
    en: require("./i18n/en.json"),
    es: require("./i18n/es.json"),
    pt: require("./i18n/pt.json"),
    ptPT: require("./i18n/pt-PT.json"),
    fr: require("./i18n/fr.json"),
    eo: require("./i18n/eo.json"),
    it: require("./i18n/it.json"),
    vi: require("./i18n/vi.json"),
    tr: require("./i18n/tr.json"),
    hu: require("./i18n/hu.json"),
    enIndian: require("./i18n/en-indian.json"),
    id: require("./i18n/id.json")
};
exports.i18n = i18n;

let shortScale = [100];
for (let i = 1; i <= 16; i++) {
    shortScale.push(Math.pow(10, i * 3));
}

let longScale = [100, 1000];
for (let i = 1; i <= 15; i++) {
    longScale.push(Math.pow(10, i * 6));
}

writtenNumber.defaults = {
    noAnd: false,
    lang: "en"
};

/**
 * Converts numbers to their written form.
 *
 * @param {Number} n The number to convert
 * @param {Object} [options] An object representation of the options
 * @return {String} writtenN The written form of `n`
 */

function writtenNumber(n, options) {
    options = options || {};
    options = util.defaults(options, writtenNumber.defaults);

    if (n < 0) {
        return "";
    }

    n = Math.round(+n);

    let language = typeof options.lang === "string"
        ? i18n[options.lang]
        : options.lang;
    let scale = language.useLongScale ? longScale : shortScale;
    let units = language.units;
    let unit;

    if (!(units instanceof Array)) {
        let rawUnits = units;

        units = [];
        scale = Object.keys(rawUnits);

        for (let i in scale) {
            units.push(rawUnits[scale[i]]);
            scale[i] = Math.pow(10, parseInt(scale[i]));
        }
    }

    if (!language) {
        if (languages.indexOf(writtenNumber.defaults.lang) < 0) {
            writtenNumber.defaults.lang = "en";
        }

        language = i18n[writtenNumber.defaults.lang];
    }

    let baseCardinals = language.base;

    if (language.unitExceptions[n]) return language.unitExceptions[n];
    if (baseCardinals[n]) return baseCardinals[n];

    if (n < 100) {
        return handleSmallerThan100(n, language, unit, baseCardinals, options);
    }
    else if( n > 100 && n < 200){
        return handleIDRBetween100And200(n, language, unit, baseCardinals, options);
    }
    else if( n > 1000 && n < 2000){
        return handleIDRBetween1000And2000(n, language, unit, baseCardinals, options);
    }

    let m = n % 100;
    let ret = [];

    if (m) {
        if (
            options.noAnd &&
            !(language.andException && language.andException[10])
        ) {
            ret.push(writtenNumber(m, options));
        } else {
            ret.push(language.unitSeparator + writtenNumber(m, options));
        }
    }

    let firstSignificant;

    for (let i = 0, len = units.length; i < len; i++) {
        let r = Math.floor(n / scale[i]);
        let divideBy;

        if (i === len - 1) divideBy = 1000000;
        else divideBy = scale[i + 1] / scale[i];

        r %= divideBy;

        unit = units[i];

        if (!r) continue;
        firstSignificant = scale[i];

        if (unit.useBaseInstead) {
            let shouldUseBaseException =
                unit.useBaseException.indexOf(r) > -1 &&
                (unit.useBaseExceptionWhenNoTrailingNumbers
                    ? i === 0 && ret.length
                    : true);
            if (!shouldUseBaseException) {
                ret.push(baseCardinals[r * scale[i]]);
            } else {
                ret.push(r > 1 && unit.plural ? unit.plural : unit.singular);
            }
            continue;
        }

        let str;
        if (typeof unit === "string") {
            str = unit;
        } else {
            str = r > 1 && unit.plural && (!unit.avoidInNumberPlural || !m)
                ? unit.plural
                : unit.singular;
        }

        if (
            unit.avoidPrefixException &&
            unit.avoidPrefixException.indexOf(r) > -1
        ) {
            ret.push(str);
            continue;
        }

        let exception = language.unitExceptions[r];
        let number =
            exception ||
            writtenNumber(
                r,
                util.defaults(
                    {
                        // Languages with and exceptions need to set `noAnd` to false
                        noAnd: !((language.andException && language.andException[r]) ||
                            unit.andException) && true
                    },
                    options
                )
            );
        n -= r * scale[i];
        ret.push(number + " " + str);
    }

    let firstSignificantN = firstSignificant * Math.floor(n / firstSignificant);
    let rest = n - firstSignificantN;

    if (
        language.andWhenTrailing &&
        firstSignificant &&
        0 < rest &&
        ret[0].indexOf(language.unitSeparator) !== 0
    ) {
        ret = [ret[0], language.unitSeparator.replace(/\s+$/, "")].concat(
            ret.slice(1)
        );
    }

    return ret.reverse().join(" ");
}

function handleSmallerThan100(n, language, unit, baseCardinals, options) {
    let dec = Math.floor(n / 10) * 10;
    unit = n - dec;
    if (unit) {
        return (
            baseCardinals[dec] + language.baseSeparator + writtenNumber(unit, options)
        );
    }
    return baseCardinals[dec];
}

function handleIDRBetween100And200(n, language, unit, baseCardinals, options) {
    const dec = 100;
    unit = n - dec;
    if (unit) {
        return (
            baseCardinals[dec] + language.baseSeparator + writtenNumber(unit, options)
        );
    }
    return baseCardinals[dec];
}

function handleIDRBetween1000And2000(n, language, unit, baseCardinals, options) {
    const dec = 1000;
    unit = n - dec;
    if (unit) {
        return (
            baseCardinals[dec] + language.baseSeparator + writtenNumber(unit, options)
        );
    }
    return baseCardinals[dec];
}