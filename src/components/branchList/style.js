import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    branchItem: {
        ...themes.bgNeutral,
        ...themes.mv5,
        ...themes.br0,
        justifyContent: 'center',
        alignItems: 'center',
        height: getHeightRatio(80),
        flex: 5
    },

    infoBranch:{
        ...themes.bgNeutral,
        ...themes.mv5,
        ...themes.br0,
        height: getHeightRatio(80),
        flex: 1,
        maxWidth: 45
    },

    branchIconWrapper: {
        ...themes.bgSecondary,
        ...themes.centerItems,
        ...themes.centerJustify,
        height: getHeightRatio(62),
        flex: 1
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
        color: '#7a868c'
    },
    branchDistanceText: {
        ...themes.text,
        ...themes.textSize.fs11,
        alignSelf: 'flex-end',
        lineHeight: 11,
        color: '#615d5d'
    },
    titleText: {
        ...themes.textBold,
        ...themes.textPrimary,
    },
    selectedBranch: {
        backgroundColor: 'rgba(20,175,150,0.25)'
    }
};
