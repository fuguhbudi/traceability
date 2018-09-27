import {themes} from "helpers/common";
export default {
    leftInlineItem:{
        ...themes.fl2p5,
        ...themes.pr5
    },
    rightInlineItem: {
        ...themes.fl1,
        ...themes.pl5,
        flexDirection: 'column',
        alignSelf: 'flex-start'
    },
    leftColumn : {
        ...themes.fl1,
        ...themes.mr50
    },
    rightColumn : {
        ...themes.fl1,
        ...themes.ml50
    },
    formField: {
        ...themes.fldr,
        ...themes.mb40,
        alignItems: 'flex-start'
    },
    paddingFields: {
        paddingHorizontal: 27
    },
    placeholder: {
        ...themes.textItalic,
        ...themes.textSize.medium,
        color: '#7a868c',
    }
};
