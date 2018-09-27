import I18n from 'react-native-i18n'
import requests from './requests';
export default {
    currentLanguage: I18n.locale.substr(0, 2),
    apiToken: null,
    ...requests,
    error:{},
    lastRequestPath: null,
    form:{},
    navStates: {},
    appointmentId: null,
    ticketNumber: null,
    selectedOption: {
        fillInform: false,
        printTicket: false,
        sendTicket: false
    },
    userData:{},
    depositoryType: 'REGULAR',
    formData:{},
    depositoryFormData:{}
    // sendForm: {
    //     ...appointmentId,
    //     ...form
    // },
    // test: true,
    // cacheForm: [],
}
//
// (response) => {
//     // const {cacheForm} = this.props;
//     dispatchAction(addCacheForm(response))
// }
//
// addCacheForm(data){
//     const {cacheForm} = this.props;
//     asdasda = [
//         ...cacheForm,
//         data
//     ]
// }