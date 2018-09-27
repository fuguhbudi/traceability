import themes from "themes";

export default {
    inputValidationMsg: {
        ...themes.pr5,
        ...themes.form.validationContainer,
        // ...themes.mb5
    },
    inputValidationRounded: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginTop: -5
    },
    inputErrorText: {
        ...themes.text,
        ...themes.form.error,
        ...themes.textSize.small
    }
};