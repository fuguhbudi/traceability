import themes from "themes";
import inputStyles from "components/inputFields/styles";
import {getHeightRatio} from 'helpers/utils';

export default {
    ...inputStyles,
    inputIcon: {
        ...themes.mr15,
        ...themes.ml15
    },
    inputHelper: {
        ...themes.mr15,
        marginLeft: 75
    },
    inputIconCentered: {
        position: "absolute",
        marginLeft: 15
    },
    inputVItem: {
        ...themes.form.item,
        ...themes.plFix,
        borderBottomWidth: 1
    },
    inputLabel: {
        ...themes.text,
        ...themes.form.inputPlaceholderNormal,
    },
    helper: {
        position: "absolute",
        right: 0
    },
    itemContainer: {
        ...themes.br8,
        borderBottomWidth: 0 //remove default borderBottomWidth
    },
    upperLine : {
        marginTop : 27,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginBottom : 1,
    },
    label : {
        fontSize: 18,
        color: '#000f23',
        marginLeft: 0,
        // fontFamily: 'DIN ALternate-Bold'
    },
    text : {
        fontFamily: 'HelveticaNeue',
        ...themes.textSize.semiLarge,
        ...themes.borderSoft,
        ...themes.textPrimary,
        marginTop : 7,
        marginBottom : 0,
        alignSelf : 'stretch',
        paddingBottom : 0,
        paddingTop : 0,
        borderWidth: 1,
        borderRadius: 8,
        height: getHeightRatio(38),
        paddingLeft: 17,
        width: '100%'
    },
    textError: {
        fontFamily: 'HelveticaNeue',
        ...themes.textSize.semiLarge,
        ...themes.borderErrorColor,
        ...themes.textPrimary,
        marginTop : 7,
        marginBottom : 0,
        alignSelf : 'stretch',
        paddingBottom : 0,
        paddingTop : 0,
        borderWidth: 1,
        borderRadius: 8,
        height: getHeightRatio(38),
        paddingLeft: 17,
        width: '100%'
    },
    textErrorLogin: {
        ...themes.mt30,
        ...themes.textSize.semiLarge,
        ...themes.textPrimary,
        height: getHeightRatio(38),
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#ff2014',
    },
    textMultiple : {
        textAlignVertical: 'top',
        paddingTop: 18
    },
    disabledInput : {
        backgroundColor: '#d9dbdc',
        // color: 'red',
        borderWidth: 0
    }
};