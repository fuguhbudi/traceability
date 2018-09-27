import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    bdsParentStyle: {
        ...themes.pt0,
        ...themes.ph0,
        ...themes.bgLight,
    },
    tabsContainer: {
        // maxHeight: getHeightRatio(523)
    },
    tabContainer: {
        ...themes.bgNeutral
    },
    tabStyle: {
        ...themes.bgPlaceholder,
        // borderBottomWidth: 1
    },
    activeTab: {
        ...themes.bgPlaceholder,
        borderBottomWidth: 0
    },
    textTab: {
        ...themes.paint.secondary,
        ...themes.textSize.regular,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    activeTextTab: {
        ...themes.paint.neutral,
        ...themes.textSize.regular
    },
    tabBarUnderline: {
        height: 2
    },
    buttonCreateBooking: {
        ...themes.bgNeutral,
        ...themes.br8,
        ...themes.center,
        ...themes.mb15,
        paddingHorizontal: 12,
        height: getHeightRatio(48),
        elevation: 4
    },
    createBookingText: {
        ...themes.textBold,
        ...themes.textSize.small,
        ...themes.textPrimary
    },
    tabBody: {
        ...themes.pt20,
        ...themes.bgLight
    },
    addOneIcon: {
        height: 20
    },
    // Ticket
    confirmationCard: {
        ...themes.pb20
    },
    cardTitle: {
        ...themes.textCenter
    },
    confirmationItem: {
        ...themes.fldr,
        ...themes.ph14,
        ...themes.centerItems,
        ...themes.pv15
    },
    confirmationImage: {
        ...themes.fl1,
        ...themes.centerItems,
    },
    confirmationText: {
        flex: 5,
        ...themes.pl10
    },
    appointmentCodeTitle: {
        ...themes.textCenter,
        ...themes.ph20,
        fontWeight: 'normal'
    },
    appointmentCodeTextWrapper: {
        ...themes.centerItems,
        ...themes.centerJustify,
        ...themes.mh60,
        height: getHeightRatio(61),

        backgroundColor: '#8dc8e8',
    },
    appointmentCodeText: {
        ...themes.textBold,
        ...themes.textSize.fs36,
        color: '#fff',
    },
    subtitleText: {
        ...themes.text,
        ...themes.textPrimary,
    },
    haveArrived: {
        ...themes.textCenter,
        ...themes.pt15,
        ...themes.pb5
    }
};
