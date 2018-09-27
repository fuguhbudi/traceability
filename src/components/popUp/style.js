import themes from "themes";
import v from "themes/variables";
import {getHeightRatio} from "helpers/utils";

const React = require("react-native");
const {Dimensions, Platform} = React;
const deviceWidth = Dimensions.get("window").width;

export default {
    modalContainer: {
        ...themes.mh14
    },
    modalContent: {
        ...themes.modal.content,
        ...themes.pt12,
        ...themes.pb25,
        ...themes.ph14,
        alignItems: "stretch",
        position: "relative",
        width: '100%'
    },
    headerContainer: {
        ...themes.imageContainer,
        backgroundColor: 'white',
        width: "100%",
        ...themes.center,
        ...themes.pt15
    },
    iconContainer:{
        ...themes.center,
        ...themes.mb30
    },
    title: {
        ...themes.textSize.large,
        ...themes.textBold,
        ...themes.textBlack,
        ...themes.center,
        ...themes.textCenter,
        ...themes.pb10
    },
    customTitle:{
        ...themes.textSize.large,
        ...themes.textBold,
        ...themes.textBlack,
        ...themes.center,
        ...themes.textCenter,
        ...themes.pb10
    },
    inputDataTitle: {
        ...themes.textBold,
        ...themes.textPrimary,
    },
    centerTitle: {
        ...themes.textSize.large,
        ...themes.center,
        ...themes.textPrimary,
        fontWeight: '500',
    },
    containDesc: {
        // minHeight: 30
    },
    description: {
        ...themes.text,
        ...themes.textBlack,
        ...themes.center,
        ...themes.textSize.semiLarge,
        ...themes.pb10,
        ...themes.textCenter,
    },
    customDescription: {
        paddingBottom: 0
    },
    customSubDescription: {
        ...themes.textSize.fs30
    },
    actionHelper:{
        ...themes.pt10,
        ...themes.pb10,
        ...themes.center
    },
    customTitlePTRejectReason:{
      marginBottom: getHeightRatio(10),
      // paddingRight: 150,
      textAlign: "left",
      color: "rgba(236,29,35, 0.8)",
      ...themes.textSize.semiLarge,
      ...themes.textBold,
      ...themes.ph5,
    },
    subtitle:{
      ...themes.textSize.small,
      ...themes.textItalic,
      ...themes.ph5,
      margin: 0
    },
    buttons:{
        ...themes.bgTransparent,
    },
    customChild: {
      ...themes.ph10
    },
    inputDataBody: {
        ...themes.mb5,
        // ...themes.mt27,
        ...themes.mt10
    },
    footer: {
        ...themes.mt30
    },
    addButton: {
        alignSelf: 'flex-end',
        ...themes.fl1
    },
    customTitleWeekend:{
        ...themes.textSize.large,
        // ...themes.textBold,
        ...themes.textPrimary,
        ...themes.center,
        ...themes.textCenter,
        ...themes.pb10,
        fontWeight: '500',
        marginTop: 26,
    },
    titleContainer: {
        ...themes.fl1,
        ...themes.centerJustify
    }
};
