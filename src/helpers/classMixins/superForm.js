import {validation, isEquivalent} from "helpers/utils";

/**
 * This is the future of all form instances
 * @param superclass
 * @constructor
 */
const SuperForm = superclass => class extends superclass {
    constructor(state, dynamicFields){
        super(state, dynamicFields);
        if(!dynamicFields) this.dynamicFields = {};
        if(!state) this.state = {};
    }

    componentWillMount(){
        this.initValue();
        if(typeof super.componentWillMount === "function") super.componentWillMount();
    }

    componentWillUpdate(nextProps, nextState, nextContext){
        const { form } = nextContext;
        const { name } = nextProps;
        if(form && form[name] && form[name].touched !== nextState.touched){
            this.setState({ touched: form[name].touched })
        }
        if(typeof super.componentWillUpdate === "function") super.componentWillUpdate(nextProps, nextState, nextContext);
    }

    componentDidUpdate(prevProps, prevState){
        const { form } = this.context;
        const { name, errorKey } = this.props;
        const { value } = prevState;
        const hasForm = form && form[name];
        const currentValue = hasForm ? form[name].value : undefined;
        const isResetValue = hasForm && currentValue === null && value !== null;
        const isObjectValue = typeof currentValue === "object";
        const isValueUpdated = hasForm && currentValue && value !== currentValue;
        const isUnmappedValue = isObjectValue ? !isEquivalent(value, currentValue) : isValueUpdated;
        const isDynamicallyMounted = prevProps.name !== name; // misterius
        const errorKeyChanged = errorKey !== prevProps.errorKey;
        if(isResetValue || isDynamicallyMounted){
            this.initValue();
        }else if(isUnmappedValue || errorKeyChanged){
            this.handleInputChange(currentValue)
        }
    }

    initValue = () => {
        const { form, constraints } = this.context;
        const { name } = this.props;
        if( form ){
            this.setState(
                validation.init(form, name, constraints, this.props),
                () => validation.commit(form, name, this.state)
            )
        }
    };

    handleInputChange = (v, skipTouched) => {
        const { form, constraints } = this.context;
        const { name } = this.props;
        if( form ) {
            this.setState(
                validation.update(form, name, v, constraints, this.props, skipTouched),
                () => validation.commit(form, name, this.state)
            );
        }
    };

    showError = () => {
        const { touched, focused, errors } = this.state;
        const { grouped, disabled } = this.props;
        return !!(!grouped && !disabled && !focused && touched && errors && errors.length)
    };

    addDynamicFields = (field, name) => {
        this.dynamicFields = {
            ...this.dynamicFields,
            [name]: field
        };
    };
};

export default SuperForm;