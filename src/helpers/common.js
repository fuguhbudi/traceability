import i18n from 'helpers/utils/i18n/getLanguage';
import I18n from 'helpers/utils/i18n';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import themes from 'themes';
import ScreenHeader from 'components/header';

const staticImages = {
    logoWirecard: require('assets/img/logo_wirecard.png'),
    wirecardSymbol: require('assets/img/wirecard-symbol.png'),
    cardVisa: require('assets/img/card_visa.png'),
};

const staticIcons = {
    home: require('assets/img/home.png'),
    arrowNext: require('assets/img/arrow-next.png'),
    back: require('assets/img/back.png'),
    arrowDroplist: require('assets/img/arrow-droplist.png'),
    calendar: require('assets/img/calendar.png'),
    location: require('assets/img/location.png'),
    search: require('assets/img/search.png'),
    info: require('assets/img/info.png'),
    searchLocation: require('assets/img/search_location.png'),
    time: require('assets/img/time.png'),
    success: require('assets/img/success.png'),
    addOne: require('assets/img/add_one.png'),
    camera: require('assets/img/camera.png')
};

export {connect,i18n, I18n, staticImages, PropTypes, themes, ScreenHeader, staticIcons};
