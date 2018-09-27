import {required, email, isNumeric,isDigit, isAlphabet, alphanumeric, specialAlphanumeric} from "./genericConstraints";

const constraints = {
    fullNameLogin:{
        ...required,
        ...isAlphabet
    },
    phoneNumberLogin:{
        ...required,
        ...isNumeric
    },
};

export default constraints;