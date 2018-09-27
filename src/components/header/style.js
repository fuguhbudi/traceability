import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    headerContainer: {
        ...themes.bgDarkAlpha,
        ...themes.pl22,
        ...themes.pr22,
        height: getHeightRatio(54),
    },
    headerContent: {
        ...themes.center,
        ...themes.fl1,
        ...themes.centerItems,
        ...themes.centerContent
    },
    titleText: {
        ...themes.textBold,
        ...themes.center,
        ...themes.textSize.semiLarge,
    },
    headerTime: {
        ...themes.text,
        ...themes.center,
        fontSize: 15
    },
    headerTitle: {
        color: '#fff',
        ...themes.textBold,
        ...themes.textSize.semiLarge,
    }
};
