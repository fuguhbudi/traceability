import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    containerBackground: {
        ...themes.bgLight,
        // paddingBottom: 50
    },
    contentBackground: {
        ...themes.bgNeutral,
        // ...themes.mh135,
        paddingTop: 23,
        paddingBottom: 38,
        paddingHorizontal: 242
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
        flex: 2.5
    },
    flexColumnRight:{
        ...themes.fl1,
        flexDirection: 'column',
        alignSelf: 'flex-end'
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


    serviceTitle: {
        ...themes.textPrimary,
        ...themes.mb18,
    },
    serviceOption: {
        ...themes.mb8
    }
};
