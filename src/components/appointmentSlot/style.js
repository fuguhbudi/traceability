import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    ticketSlotContainer: {
        ...themes.bgNeutral,
        ...themes.mv5,
        ...themes.ph33,
        ...themes.pt20,
        ...themes.pb44
    },
    tableHead: {
        ...themes.fldr,
        ...themes.pb10
    },
    tableHeadTextWrapper: {
        ...themes.fl1,
        ...themes.centerItems,
        ...themes.centerJustify
    },
    tableBody: {
        ...themes.fldr,
        ...themes.br4,
        ...themes.mb7,
        height: getHeightRatio(30),
        borderWidth: 0.2,
        borderColor: '#7a868c'
    },
    tableBodyTextWrapperLeft: {
        ...themes.fl1,
        ...themes.centerItems,
        ...themes.centerJustify,
        borderRightWidth: 0.8,
        borderColor: '#d9dbdc'
    },
    tableBodyTextWrapperRight: {
        ...themes.fl1,
        ...themes.centerItems,
        ...themes.centerJustify,
        borderLeftWidth: 0.8,
        borderColor: '#7a868c'
    },
    titleTextBlack: {
        ...themes.textBold,
        ...themes.textBlack,
        ...themes.textCenter,
        maxWidth: 70
    },
    subtitleTextBlack: {
        ...themes.text,
        ...themes.textBlack,
        ...themes.textCenter,
    },
    selectedTable: {
        backgroundColor: 'rgba(20,175,150,0.25)'
    }
};
