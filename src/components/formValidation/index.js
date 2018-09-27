import React, {Component} from "react";
import {PropTypes} from "helpers/common";
import {Form} from "native-base";
import styles from "./style";

class FormValidation extends Component {
    getChildContext(){
        const mapPropsToContext = {...this.props};
        ["children", "style", "bind"].forEach((k) => delete mapPropsToContext[k]);
        return mapPropsToContext;
    }

    render(){
        return this.props.children;
    }
}

FormValidation.propTypes = { 
    form: PropTypes.object.isRequired,
    constraints: PropTypes.object.isRequired,
    style: PropTypes.object
};

FormValidation.childContextTypes = {
    form: PropTypes.object,
    constraints: PropTypes.object
};

export default FormValidation;