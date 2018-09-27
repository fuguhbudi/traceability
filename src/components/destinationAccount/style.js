import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    selectAccount: {
        ...themes.bgNeutral,
        paddingLeft: 11,
        paddingRight: 17,
        height: getHeightRatio(71),
        ...themes.mv5,
        // ...themes.bgNeutral,
        ...themes.borderLight,
        ...themes.br8,
        // ...themes.pl18,
        marginLeft: 0,
        borderBottomWidth: 1
    },
    destinationAccountCardBody: {
        alignItems: 'flex-start',
        flex: 6
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
};
