import React from "react";
import {Button, Spinner} from "native-base";
import PropTypes from "prop-types";

const ButtonService = (props) => (
    <Button {...props} disabled={props.disabled || props.request.inProgress}>
        {props.request.inProgress || props.inProgress ? <Spinner/> : props.children}
    </Button>
);

ButtonService.propTypes = {
    request: PropTypes.object.isRequired,
    children: PropTypes.any,
    disabled: PropTypes.bool
};

export default ButtonService;