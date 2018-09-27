import {required, email, isNumeric,isDigit, isAlphabet, alphanumeric, specialAlphanumeric} from "./genericConstraints";

const constraints = {
    name:{
        ...required,
        ...isAlphabet
    },
    email: {
        ...required,
        ...email
    },
    phoneNumber: {
        ...required,
        ...isNumeric
    },
    password:{
        ...required
    }
};

export default constraints;