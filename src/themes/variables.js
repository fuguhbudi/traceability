import color from "color";
import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX = platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

export default {
    platformStyle,
    platform,
    // AndroidRipple
    androidRipple: true,
    androidRippleColor: "rgba(256, 256, 256, 0.3)",
    androidRippleColorDark: "rgba(0, 0, 0, 0.15)",

    // Badge
    badgeBg: "#ED1727",
    badgeColor: "#fff",
    // New Variable
    badgePadding: 0,

    // Button
    btnFontFamily: "helvetica-neue-bold",
    btnDisabledBg: "#b5b5b5",
    btnDisabledClr: "#f1f1f1",

    // CheckBox
    CheckboxRadius: 0,
    CheckboxBorderWidth: 2,
    CheckboxPaddingLeft: 2,
    CheckboxPaddingBottom: 5,
    CheckboxIconSize: 14,
    CheckboxIconMarginTop: 1,
    CheckboxFontSize: 18,
    DefaultFontSize: 17,
    checkboxBgColor: "#039BE5",
    checkboxSize: 20,
    checkboxTickColor: "#fff",

    // Segment
    segmentBackgroundColor: "rgb(76,76,76)",
    segmentActiveBackgroundColor: "#fff",
    segmentTextColor: "#fff",
    segmentActiveTextColor: "rgb(76,76,76)",
    segmentBorderColor: "#fff",
    segmentBorderColorMain: "rgb(76,76,76)",

    // New Variable
    get defaultTextColor() {
        return this.textColor;
    },

    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },
    get btnTextSize() {
        return this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return 5;
    },

    buttonPadding: 6,

    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },

    // Card
    cardDefaultBg: "#fff",

    // Color
    brandPrimary: "#002846",
    brandInfo: "#62B1F6",
    brandSuccess: "#31B60C",
    brandDanger: "#ff2014",
    brandWarning: "#f0ad4e",
    brandSidebar: "#252932",
    brandDark: "rgb(76,76,76)",
    brandLight: "#f7f7f8",
    brandSecondary: "#14af96",
    brandNeutral: "#ffffff",
    brandInput: "rgb(242,242,242)",
    brandPrimaryAlpha: "rgba(76,76,76,.1)",
    lineSpacer: "rgb(215,215,215)",
    placeholder: '#7a868c',

    // Font
    fontFamily: "HelveticaNeue",
    fontSizeBase: 15,

    get fontSizeH1() {
        return this.fontSizeBase * 1.8;
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6;
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4;
    },

    // Footer
    footerHeight: isIphoneX ? 89 : 55,
    footerDefaultBg: "#4179F7",
    footerPaddingBottom: isIphoneX ? 34 : 5,

    // FooterTab
    tabBarTextColor: "#b3c7f9",
    tabBarTextSize: 11,
    activeTab: "#fff",
    sTabBarActiveTextColor: "#007aff",
    tabBarActiveTextColor: "#fff",
    tabActiveBgColor: "rgb(76,76,76)",

    // Tab
    tabDefaultBg: "rgb(76,76,76)",
    topTabBarTextColor: "#b3c7f9",
    topTabBarActiveTextColor: "#fff",
    topTabActiveBgColor: undefined,
    topTabBarBorderColor: "#fff",
    topTabBarActiveBorderColor: "#fff",

    // Header
    toolbarBtnColor: "#fff",
    get toolbarDefaultBg(){
        return this.brandDanger
    },
    toolbarHeight: 56,
    toolbarIconSize: 22,
    toolbarSearchIconSize: 23,
    toolbarInputColor: "#fff",
    searchBarHeight: 40,
    toolbarInverseBg: "#222",
    toolbarTextColor: "#fff",
    toolbarDefaultBorder: "transparent",
    iosStatusbar: "light-content",
    get statusBarColor() {
        return color(this.toolbarDefaultBg)
            .darken(0.2)
            .hex();
    },

    // Icon
    iconFamily: "Ionicons",
    iconFontSize: 28,
    iconMargin: 7,
    iconHeaderSize: 24,

    // InputGroup
    inputFontSize: 17,
    inputBorderColor: "#D9D5DC",
    inputSuccessBorderColor: "#2b8339",
    inputErrorBorderColor: "#ed2f2f",

    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return "#575757";
    },

    inputGroupMarginBottom: 10,
    inputHeightBase: 50,
    inputPaddingLeft: 5,

    get inputPaddingLeftIcon() {
        return this.inputPaddingLeft * 8;
    },

    // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    iconLineHeight: 30,
    lineHeight: 24,

    // List
    listBg: "rgba(0,0,0,0.1)",
    listBorderColor: "#c9c9c9",
    listDividerBg: "rgb(250,250,250)",
    listItemHeight: 45,
    listBtnUnderlayColor: "#DDD",

    // Card
    cardBorderColor: "#ccc",

    // Changed Variable
    listItemPadding: 12,

    listNoteColor: "#808080",
    listNoteSize: 13,

    // Progress Bar
    defaultProgressColor: "#E4202D",
    inverseProgressColor: "#1A191B",

    // Radio Button
    radioBtnSize: 23,
    radioSelectedColorAndroid: "rgb(76,76,76)",

    // New Variable
    radioBtnLineHeight: 24,

    radioColor: "#7e7e7e",

    get radioSelectedColor() {
        return color(this.radioColor)
            .darken(0.2)
            .hex();
    },

    // Spinner
    defaultSpinnerColor: "#45D56E",
    inverseSpinnerColor: "#1A191B",

    // Tabs
    tabBgColor: "#F8F8F8",
    tabFontSize: 15,
    tabTextColor: "#222222",

    // Text
    textColor: "rgb(76,76,76)",
    inverseTextColor: "#fff",
    noteFontSize: 14,

    // Title
    titleFontfamily: "helvetica-neue-bold",
    titleFontSize: 16,
    subTitleFontSize: 14,
    subtitleColor: "#FFF",

    // New Variable
    titleFontColor: "#FFF",

    // Other
    borderRadiusBase: 5,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    contentPadding: 10,

    get darkenHeader() {
        return color(this.tabBgColor)
            .darken(0.03)
            .hex();
    },

    dropdownBg: "rgb(76,76,76)",
    dropdownLinkColor: "#414142",
    inputLineHeight: 24,
    jumbotronBg: "#C9C9CE",
    jumbotronPadding: 30,
    deviceWidth,
    deviceHeight,
    isIphoneX,

    // New Variable
    inputGroupRoundedBorderRadius: 30,
};