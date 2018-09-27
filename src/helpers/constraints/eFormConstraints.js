import {required, email, isNumeric,isDigit, isAlphabet, alphanumeric, specialAlphanumeric} from "./genericConstraints";

const constraints = {
    beneficiaryAccount:{
        ...required,
        ...isDigit
    },
    currency:{
        ...required,
        ...isAlphabet
    },
    amount:{
        ...required,
        ...isNumeric
    },
    idType:{
        ...required,
    },
    depositoryPhoneNumber:{
        ...isDigit
    },
    depositoryAddress:{
        // ...specialAlphanumeric
    },
    message:{
        // ...specialAlphanumeric
    },
    depositoryFullName:{
        ...required,
        ...isAlphabet
    },
    depositoryIdNumber:{
        ...required,
        ...alphanumeric
    },
    recipientIdNumber:{
        ...required,
        ...alphanumeric
    },
    recipientFullName:{
        ...required,
        ...isAlphabet
    },
    recipientPhoneNumber:{
        ...isDigit
    },
};

export const ktpConstraints = {
    ...constraints,
    depositoryIdNumber:{
        ...required,
        ...isNumeric
    },
    recipientIdNumber:{
        ...required,
        ...isNumeric
    },
    recipientFullName:{
        ...required,
        ...isAlphabet
    },
};

export default constraints;