import validate from 'validate.js';
import isEmpty from 'lodash.isempty';
import {mergeDeep} from './immutable';
import {SetFormState} from 'helpers/redux/actions/formActions';
import {formatCurrency} from 'helpers/utils/currency';
import store from 'helpers/redux/store';

const hasFormProp = (form) => !!form;
const formatValues = (value, props, validationKey, form) => {
    const { isNotEqual, isEqual, display } = props;
    let formattedValues = { [validationKey] : (isEmpty(value) ? null : value) };
    const mapTargetValue = (key) => {
        const equalityValue = form[key] ? form[key].value : {};
        const targetValue = equalityValue && equalityValue[display] || equalityValue;
        const sourceValue = value && value[display] || value;
        return {
            [validationKey] : sourceValue,
            target: targetValue
        }
    };
    const equalityKey = isNotEqual || isEqual;
    if(equalityKey){
        formattedValues = mapTargetValue(equalityKey)
    }
    return formattedValues;
};

const validateValue = (form, name, constraints, props, value, isUpdate) => {
    const { errorKey, multiple } = props;
    const validationKey = name.replace(/\./g, '');
    const equalityKey = props.isNotEqual || props.isEqual;
    const rules = { [validationKey]: constraints[name] };
    const attrs = { key: (errorKey || name), targetKey: equalityKey, fullMessages: false };
    if(!isUpdate && !value) value = hasFormProp(form) && form[name] ? form[name].value : null;
    const execValidate = () => {
        if(multiple){
            const multipleValues = value ? value.split(";") : [];
            let multipleErrors = [];
            multipleValues.map((value) => {
                const values = formatValues(value, props, validationKey, form);
                const errors = validate(values, rules, attrs);
                if(errors && errors[validationKey]){
                    multipleErrors = [
                        ...multipleErrors,
                        ...errors[validationKey]
                    ];
                }
            });

            if(multipleErrors.length){
                return {
                    [validationKey] : [ ...new Set(multipleErrors) ]
                }
            }
        }else{
            const values = formatValues(value, props, validationKey, form);
            return validate(values, rules, attrs);
        }
    };
    return execValidate() || {[validationKey] : []}
};

const init = (form, name, constraints, props) => {
    const { currency } = props;
    const validationKey = name.replace(/\./g, '');
    const value = hasFormProp(form) && form[name] ? form[name].value : null;
    const errors = validateValue(form, name, constraints, props);
    const display = formatCurrency(value, true);
    const model = formatCurrency(value);
    return {
        value: currency ? model : value,
        display: display,
        touched: false,
        errors: errors[validationKey],
        valid: isEmpty(errors[validationKey])
    };
};

const update = (form, name, value, constraints, props, skipTouched) => {
    const validationKey = name.replace(/\./g, '');
    const errors = validateValue(form, name, constraints, props, value, true);
    return {
        value: (typeof value === "object") ? { ...value } : value,
        touched: !skipTouched,
        errors: errors[validationKey],
        valid: isEmpty(errors[validationKey])
    };
};

const commit = (form, name, state) => {
    const { errors } = state;
    const resetError = !errors || errors && !errors.length;
    let newState = {[name] : state};
    if(resetError) newState[name].errors = [];
    store.dispatch(SetFormState(newState))
};

const commitDelete = (form, dynamicFields) => {
    for(let field in dynamicFields){
        if(dynamicFields.hasOwnProperty(field) && form.hasOwnProperty(field)) {
            const fieldIsHidden = dynamicFields[field] === null;
            const fieldIsDisabled = dynamicFields[field] && dynamicFields[field].props && dynamicFields[field].props.disabled;
            if((fieldIsHidden || fieldIsDisabled) && form.hasOwnProperty(field) && !isEmpty(form[field])){
                store.dispatch(SetFormState({
                    [field] : {}
                }))
            }
        }
    }
};

const setTouched = (form) => {
    const updated = {...form};
    for(let field in updated){
        updated[field].touched = true;
    }
    let newState = mergeDeep(form, updated);
    store.dispatch(SetFormState(newState))
};

export { init, update, commit, commitDelete, setTouched }