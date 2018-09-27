import themes from "themes";
import v from "themes/variables";
import {getHeightRatio} from "helpers/utils";

export default {
    field: {
        ...themes.bgNeutral,
        ...themes.bw1,
        ...themes.mt7,
        ...themes.br8,
        width: '100%',
        borderColor: v.brandExtraLightGrey,
        paddingHorizontal: 17,
        height: getHeightRatio(44),
    },

    textError: {
        ...themes.borderErrorColor
    },

    buttonText: {
        ...themes.textSize.semiLarge,
        color: '#000f23'
    },
    buttonTextPlaceholder: {
        ...themes.textSize.semiLarge
    }
};
