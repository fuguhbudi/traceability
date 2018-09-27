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
        ...themes.fl1,
        flexDirection: 'column',
        alignSelf: 'flex-end'
    },
    flexColumnRight2p5:{
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
        ...themes.textSize.regular
    },
    tncTitleText: {
        ...themes.textSize.semiLarge,
        ...themes.mt20

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
    selectAccountAppQueue: {
        ...themes.bgNeutral,
        paddingLeft: 11,
        paddingRight: 17,
        height: getHeightRatio(71),
        backgroundColor: '#d9dbdc'
    },
    placeholder: {
        ...themes.textItalic,
        ...themes.textSize.medium,
        color: '#7a868c',
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
    destinationAccountCardBody: {
        alignItems: 'flex-start',
        flex: 1.8
    },
    destinationAccountGet: {
        ...themes.bgNeutral,
        ...themes.borderLight,
        ...themes.br8,
        ...themes.centerJustify,
        paddingLeft: 30,
        paddingRight: 17,
        height: getHeightRatio(71),
        marginLeft: 0,
    },
    takePhoto: {
        ...themes.mh5,
        ...themes.centerItems,
        ...themes.centerJustify,
        backgroundColor: '#000f23',
        height: getHeightRatio(70)
    },
    takePhotoText: {
        ...themes.center,
        ...themes.textBlack,
        ...themes.textSize.fs11,
        ...themes.pt5
    },
    suggestionsWrapper: {
        ...themes.bw1,
        ...themes.br8,
        marginLeft: 2,
        borderColor: '#d9dbdc'
    },
    icon: {
        position: 'absolute',
        right: 13,
        top: 15,
        alignContent: 'center'
    },
};
