import {required, email, isNumeric,isDigit, isAlphabet, alphanumeric, specialAlphanumeric} from "./genericConstraints";

const constraints = {
    sendToEmail:{
        ...required
    }
};

export default constraints;