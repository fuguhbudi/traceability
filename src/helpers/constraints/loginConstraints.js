import {required, email, isNumeric,isDigit, isAlphabet, alphanumeric, specialAlphanumeric} from "./genericConstraints";

const constraints = {
    email:{
        ...required,
        ...email
    },
    password:{
        ...required
    }
};

export default constraints;