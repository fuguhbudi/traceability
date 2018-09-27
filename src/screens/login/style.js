import themes from "themes";
import {getHeightRatio} from 'helpers/utils';

export default {
    containerBackground: {
        ...themes.bgLight
    },
    title: {
        fontSize: 40,
        fontFamily: 'DIN BoldAlternate',
        fontWeight: 'bold'
    },
    bodyContainer: {
        ...themes.bgNeutral,
        ...themes.fl1,
        paddingHorizontal: 27
    },
    inputContainer: {
        maxWidth: 400,
    },
    inputItem: {
        ...themes.mt30,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#002846',
        fontSize: 16,
        borderRadius: 0
    },
    containerTitle: {
        ...themes.pb45
    },
    buttonContainer: {
        ...themes.mt40,
    },
    skipButtonWrapper: {
        ...themes.centerItems
    },
    skipButtonText: {
        ...themes.textItalic,
        ...themes.textSize.fs24,
        color: '#4a4a4a',
        textDecorationLine: 'underline',
        marginTop: 48
    },
    backgroundPrimary: {
        backgroundColor: '#002846',
        flex: 1
    },
    backgroundWhite: {
        backgroundColor: '#fff',
        ...themes.mh12,
        ...themes.br8
    },
    agreeSignUp: {
        ...themes.paint.primary,
        ...themes.textSize.tiny,
        ...themes.textCenter,
        ...themes.ph35,
        ...themes.pt20,
        paddingBottom: 32
    },
    logoContainer: {
        ...themes.centerItems,
        ...themes.mb40,
        marginTop: getHeightRatio(62)
    },
    footerContainer: {
        ...themes.pb0,
        ...themes.bgNeutral,
        elevation: 0,
        height: 'auto',

    },
    footer: {
        ...themes.bgNeutral,
        ...themes.pb8
        // flex: 0,
        // flexDirection: "column",
        // justifyContent: "flex-end"
    },
    footerText: {
        ...themes.textSize.tiny,
        ...themes.textCenter,
        color: '#7e7e7e',
    },
    greetingTitle: {
        ...themes.paint.primary,
        ...themes.textBold,
        ...themes.textSize.fs18,
        ...themes.textCenter,
        ...themes.mb20,
        marginTop: getHeightRatio(38),
    },
    greetingSubtitle: {
        ...themes.paint.primary,
        ...themes.textSize.large,
        ...themes.textCenter,
        ...themes.mb120,
    },
    testStyle: {
        ...themes.textBold
    }
};
