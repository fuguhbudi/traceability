import {required, email, isNumeric,isDigit, isAlphabet, alphanumeric, specialAlphanumeric} from "./genericConstraints";

const constraints = {
    appointmentCode:{
        ...required,
        ...isNumeric
    }
};

export default constraints;