import {i18n} from "helpers/common";

// field name to error key mapping
const mappedData = {

};

const inputKey = (key) => mappedData[key] || key;
const required = {
    presence: {
        message: function(value, attribute, validatorOptions, attributes, options) {
            return i18n(inputKey(options.key)) + " " + i18n("isMandatory")
        },
        allowEmpty: false
    }
};

const email = {
    email: {
        message: function() {
            return i18n("invalidEmailAddress")
        }
    }
};

const customEmail = {
    email: {
        message: function() {
            return i18n("invalidEmailAddress")
        }
    }
};

const alphanumeric = {
    format: {
        pattern: /^[0-9a-zA-Z]*$/i,
        message: function(value, attribute, validatorOptions, attributes, options) {
            return i18n(inputKey(options.key)) + " " + i18n("errorAlphanumeric")
        }
    }
};

const specialAlphanumeric = {
    format: {
        pattern: /^[0-9a-zA-Z -]*$/i,
        message: function(value, attribute, validatorOptions, attributes, options) {
            return i18n(inputKey(options.key)) + " " + i18n("errorSpecialAlphanumeric")
        }
    }
};

// currency format
const isNumeric = {
    format: {
        pattern: "[0-9,.]+",
        message: function(value, attribute, validatorOptions, attributes, options) {
            return i18n(inputKey(options.key)) + " " + i18n("isNotANumber")
        }
    }
};

// regular number
const isDigit = {
    format: {
        pattern: "[0-9]+",
        message: function(value, attribute, validatorOptions, attributes, options) {
            return i18n(inputKey(options.key)) + " " + i18n("isNotANumber")
        }
    }
};

const isNotEqual = {
    equality: {
        attribute: "target",
        message: function(value, attribute, validatorOptions, attributes, options) {
            const sourceKey = inputKey(options.key);
            const targetKey = inputKey(options.targetKey);
            const message = [targetKey, "and", sourceKey, "mustBeDifferent"].map(i18n);
            return message.join(" ");
        },
        comparator: function(source, target) {
            return source !== target;
        }
    }
};
 
const isEqual = {
  equality: {
        attribute: "target",
        message:    function(value, attribute, validatorOptions, attributes, options) {
                    const sourceKey = inputKey(options.key);
                    const targetKey = inputKey(options.targetKey);
                    const message =  [targetKey, "and", sourceKey, "mustBeEqual"].map(i18n);
                    return message.join(" ");
                },
                comparator : function(source,target){
                    return source === target
                }
  }  
};

const isAlphabet = {
    format: {
        pattern:  /^[a-zA-Z ]*$/,
        message: function(value, attribute, validatorOptions, attributes, options) {
            return i18n(inputKey(options.key)) + " " + i18n("isNotAnAlphabet")
        }
    }
};

export {required, email, alphanumeric, isNumeric, isDigit, customEmail, isNotEqual, specialAlphanumeric, isEqual, isAlphabet};