import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    containerBackground: {
        ...themes.bgLight,
        ...themes.ph0,
        ...themes.pt13,
        // paddingBottom: 50
    },
    contentBackground: {
        ...themes.bgNeutral,
        // ...themes.mh135,
        paddingTop: 23,
        paddingBottom: 38,
    },
    contentHeader: {
        ...themes.textCenter,
        ...themes.textBold,
        ...themes.textSize.fs24,
        ...themes.textBlack,
        ...themes.mb15
    },
    formField: {
        ...themes.fldr,
        ...themes.mb40,
    },
    leftColumn : {
        ...themes.fl1,
        ...themes.mr50
    },
    rightColumn : {
        ...themes.fl1,
        ...themes.ml50
    },
    inputWideLeft : {
        ...themes.fl2p5,
        paddingRight: 7
    },
    inputNarrowRight : {
        ...themes.fl1,
        flexDirection: 'column',
        alignSelf: 'flex-end'
    },
    inputWideRight : {
        ...themes.fl2p5,
        paddingLeft: 7
    },
    inputNarrowLeft : {
        ...themes.fl1,
        flexDirection: 'column',
        alignSelf: 'flex-end'
    },
    flexColumn: {
        ...themes.fldr
    },
    flexColumnLeft:{
        ...themes.fl1,
        justifyContent: 'center'
    },
    flexColumnRight:{
        ...themes.fl2p5,
        flexDirection: 'column',
        alignSelf: 'flex-end'
    },
    flexColumnRightAgreement:{
        flex: 8,
        flexDirection: 'column',
        alignSelf: 'flex-start'
    },
    flexColumnRightDropList:{
        ...themes.fl1,
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    navigateBack: {
        position: 'absolute',
        left: getHeightRatio(37),
        flexDirection: 'row',
        alignItems: 'center',
        height: themes.global.deviceHeight
    },
    backIcon: {
        width: getHeightRatio(58.1),
        height: getHeightRatio(62.3)
    },
    titleText: {
        ...themes.textBold,
        ...themes.textPrimary,
    },
    subtitleText: {
        ...themes.text,
        ...themes.textPrimary,
    },
    stepIndicatorContainer: {
        ...themes.pv12,
        ...themes.pb7
    },
    selectAccount: {
        ...themes.bgNeutral,
        paddingLeft: 11,
        paddingRight: 17,
        height: getHeightRatio(71)
    },

    searchLocation: {
        ...themes.bgNeutral,
        ...themes.pl20,
        ...themes.borderSoft,
        ...themes.br8,
        ...themes.centerJustify,
        paddingRight: 23,
        height: getHeightRatio(71)
    },

    placeholder: {
        ...themes.textItalic,
        ...themes.textSize.medium,
        ...themes.paint.placeholder
    },
    textArea: {
        height: getHeightRatio(55)
    },
    mediumTextNormal: {
        ...themes.textPrimary,
        ...themes.textSize.medium
    },
    mediumTextBold: {
        ...themes.textBold,
        ...themes.textPrimary,
        ...themes.textSize.medium
    },
    agreeSubmitReadMore: {
        ...themes.textItalic,
        ...themes.textSize.medium,
        fontWeight: 'normal',
        color: '#3295d2'
    },
    footerPopup: {
        ...themes.fldr,
        ...themes.center
    },
    saveAccountDetail: {
        ...themes.mr20
    },
    selectDateBody: {
    },
    inputTextCard: {
        ...themes.text,
        alignItems: 'flex-start',
        flex: 4.5,
    },
    branchItem: {
        ...themes.bgNeutral,
        ...themes.mv5,
        ...themes.br0,
        height: getHeightRatio(80)
    },

    branchIconWrapper: {
        ...themes.bgSecondary,
        ...themes.centerItems,
        ...themes.centerJustify,
        height: getHeightRatio(62)
    },

    branchItemBody: {
        alignItems: 'flex-start',
        flex: 7.5,
        paddingRight: 35,
        paddingLeft: 22
    },
    branchIconText: {
        ...themes.text,
        ...themes.textWhite,
        ...themes.textSize.fs10,
        paddingTop: getHeightRatio(3)
    },
    branchAddressText: {
        ...themes.text,
        ...themes.textSize.small,
        color: 'small'
    },
    branchDistanceText: {
        ...themes.text,
        ...themes.textSize.fs11,
        ...themes.paint.placeholder,
        alignSelf: 'flex-end',
        lineHeight: 11,
    },
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
        ...themes.textCenter
    },
    confirmationCard: {
        ...themes.pb20
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
    boxContainer: {
        ...themes.fldr,
        ...themes.centerItems,
        ...themes.centerJustify,
        ...themes.centerContent,
    },
    box: {
        height: 101,
        flex: 1,
        ...themes.centerJustify,
        ...themes.centerItems,
        backgroundColor: '#f7f7f8',
        marginLeft: 5.5,
        marginRight: 5.5,
        paddingTop: 12,
        paddingLeft: 10,
        paddingRight: 9,
    },
    boxHeader: {
        height: 48,
        width: 115,
        color: '#7a868c',
        ...themes.textSize.regular,
        ...themes.text,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 1.5,
        marginBottom: 1.5,
    },
    boxContent: {
        height: 48,
        width: 115,
        color: '#002846',
        ...themes.textSize.large,
        ...themes.text,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 1.5,
        marginBottom: 1.5,
    },
    buttonStyle: {
        width: 98,
        height: 46,
    },
    limitedBranchesStyle: {
        ...themes.textSize.semiLarge,
        color: '#7a868c',
        fontFamily: 'HelveticaNeue',
        fontWeight: 'normal',
    },
    cancelStyle: {
        marginHorizontal: 26,
        marginTop: 20,
    },
};
