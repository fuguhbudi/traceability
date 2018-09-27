import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    contentWrapper: {
        ...themes.pt30,
        ...themes.ph14
    },
    contentWrapperNoPadding:{
        paddingTop: 0
    },
    centerContainer: {
        ...themes.fldr,
        ...themes.centerItems
    },
    swipeCardContainer: {
        position: 'absolute',
        right: getHeightRatio(7),
        top: getHeightRatio(122)
    },
    swipeCardItem: {
        width: getHeightRatio(54),
        height: getHeightRatio(156)
    },
    navigateBack: {
        position: 'absolute',
        left: getHeightRatio(37),
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    },
    backIcon: {
        width: getHeightRatio(58.1),
        height: getHeightRatio(62.3)
    },
};
