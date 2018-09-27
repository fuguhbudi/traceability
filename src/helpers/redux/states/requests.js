import {
    SV_FORM,
    SV_GET_FORM_FIELD,
    SV_LOGIN_CUSTOMER,
    SV_LOGIN_NON_CUSTOMER,
    SV_REGISTER_NON_CUSTOMER,
    SV_CARD,
    SV_TRANSACTION_TYPE,
    SV_GET_COORDINATE,
    SV_GET_NUMBERSOURCE,
    SV_CREATE_APPOINTMENT,
    SV_GET_LOCATION,
    SV_CARD_DESTINATION,
    SV_READ_APPOINTMENT,
    SV_GET_TICKET_ONLINE,
    SV_GET_APPOINTMENT_HISTORY
} from 'helpers/services/endpoints';
export default {
    requests: {
        [SV_FORM] : {},
        [SV_GET_FORM_FIELD]: {},
        [SV_LOGIN_CUSTOMER]: {},
        [SV_LOGIN_NON_CUSTOMER]: {},
        [SV_REGISTER_NON_CUSTOMER]: {},
        [SV_CARD]:{},
        [SV_TRANSACTION_TYPE]:{},
        [SV_GET_COORDINATE]:{},
        [SV_GET_NUMBERSOURCE]:{},
        [SV_CREATE_APPOINTMENT]:{},
        [SV_GET_LOCATION]:{},
        [SV_CARD_DESTINATION]:{},
        [SV_READ_APPOINTMENT]:{},
        [SV_GET_TICKET_ONLINE]:{},
        [SV_GET_APPOINTMENT_HISTORY]:{}
    }
}