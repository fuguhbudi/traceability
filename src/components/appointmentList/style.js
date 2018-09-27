import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    cardContainer: {
        ...themes.mv5,
        ...themes.mv20,
        ...themes.br0,
        justifyContent: 'center',
        alignItems: 'center',
        height: getHeightRatio(80),
        backgroundColor: 'red',
        marginTop: 30
    },
    cardWrapper: {
        ...themes.bgNeutral,
        ...themes.fldr,
        ...themes.mv5,
        paddingRight: 9,
        paddingLeft: 13,
        paddingTop: 9,
        paddingBottom: 12
    },
    branchItemBody: {
        alignItems: 'flex-start',
        flex: 1
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
    descriptionText: {
        ...themes.text,
        ...themes.textSize.small,
        ...themes.textPrimary
    },
    titleText: {
        ...themes.textBold,
        ...themes.textPrimary,
    },
    titleTextSmall: {
        ...themes.textBold,
        ...themes.textPrimary,
        ...themes.textSize.small
    },
    status: {
        ...themes.borderSecondary,
        ...themes.br8,
        ...themes.centerJustify,
        ...themes.centerItems,
        height: getHeightRatio(25),
        width: 118,
        alignSelf: 'flex-end'
    }
};
