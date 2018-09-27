import {required, email, isNumeric,isDigit, isAlphabet, alphanumeric, specialAlphanumeric} from "./genericConstraints";

const constraints = {
    sourceAccount:{
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
    recipientPhoneNumber:{
        ...isDigit
    },
    recipientAddress:{
        // ...specialAlphanumeric
    },
    message:{
        // ...specialAlphanumeric
    },
    recipientFullName:{
        ...required,
        ...isAlphabet
    },
    recipientIdNumber:{
        ...required,
        ...alphanumeric
    }
};

export const ktpConstraints = {
    ...constraints,
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