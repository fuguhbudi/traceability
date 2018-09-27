import v from './variables';
import {getHeightRatio} from 'helpers/utils';

const React = require('react-native');
const {Dimensions, Platform} = React;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default {
    global: {
        deviceWidth: deviceWidth,
        deviceHeight: deviceHeight
    },
    fullWidth: {
        width: deviceWidth
    },
    container: {
        backgroundColor: v.brandLight,
        flex: 1,
        width: null,
        height: null
    },
    imageContainer: {
        width: deviceWidth
    },
    inlineContainer: {
        flexDirection: 'row'
    },
    logoContainer: {
        marginTop: getHeightRatio(100),
        marginBottom: getHeightRatio(85)
    },
    bgPrimary: {
        backgroundColor: v.brandPrimary
    },
    bgSecondary: {
        backgroundColor: v.brandSecondary
    },
    bgLight: {
        backgroundColor: v.brandLight
    },
    bgNeutral: {
        backgroundColor: v.brandNeutral
    },
    bgDanger: {
        backgroundColor: v.brandDanger
    },
    bgInput: {
        backgroundColor: v.brandInput
    },
    bgTransparent: {
        backgroundColor: 'transparent'
    },
    bgDarkAlpha: {
        backgroundColor: '#002846'
    },
    bgPlaceholder: {
        backgroundColor: v.placeholder
    },
    br0: {
        borderRadius: 0
    },
    br4: {
        borderRadius: 4
    },
    br5: {
        borderRadius: 5
    },
    br8: {
        borderRadius: 8
    },
    logo: {
        alignSelf: 'center',
        width: 108,
        height: 30
    },
    logoBizChannel: {
        alignSelf: 'center',
        width: 269,
        height: 26
    },
    text: {
        fontFamily: 'HelveticaNeue',
        backgroundColor: 'transparent',
    },
    textItalic: {
        fontFamily: 'HelveticaNeue',
        fontStyle: 'italic'
    },
    textBold: {
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    textCenter: {
        textAlign: 'center'
    },
    textLeft: {
        textAlign: 'left'
    },
    textRight: {
        textAlign: 'right'
    },
    textSize: {
        tiny: {
            fontSize: 9
        },
        fs10: {
            fontSize: 10
        },
        small: {
            fontSize: 12
        },
        fs11: {
            fontSize: 11
        },
        medium: {
            fontSize: 13
        },
        regular: {
            fontSize: 14
        },
        semiLarge: {
            fontSize: 16
        },
        fs18: {
            fontSize: 18
        },
        large: {
            fontSize: 20
        },
        fs24: {
            fontSize: 24
        },
        fs30: {
            fontSize: 30
        },
        fs36: {
            fontSize: 36
        },
        fs40: {
            fontSize: 40
        }
    },
    textWhite: {
        color: '#fff'
    },
    textBlack: {
        color: '#000f23'
    },
    textPrimary: {
        color: '#002846'
    },
    textRed: {
        color: v.brandDanger,
    },
    borderBlack: {
        borderColor: '#000f23'
    },
    borderPrimary: {
        borderColor: '#002846'
    },
    borderSoft: {
        borderColor: '#7a868c',
        borderWidth: 1
    },
    borderSecondary: {
        borderColor: v.brandSecondary,
        borderWidth: 1
    },
    backgroundBlack: {
        backgroundColor: '000f23'
    },
    borderErrorColor: {
        borderColor: '#ff2014'
    },
    center: {
        alignSelf: 'center'
    },
    centerItems: {
        alignItems: 'center'
    },
    centerContent: {
        alignContent: 'center'
    },
    centerJustify: {
        justifyContent: 'center'
    },
    row: {
        marginHorizontal: 8
    },
    column: {
        paddingHorizontal: 12
    },
    contentWithStickyFooter: {
        paddingBottom: 80
    },
    fldr: {
        flexDirection: 'row'
    },
    flp5: {
        flex: 0.5
    },
    fl1: {
        flex: 1
    },
    fl2:{
        flex: 2
    },
    fl2p5: {
        flex: 2.5
    },
    fl3: {
        flex: 3
    },
    mt5: {
        marginTop: getHeightRatio(5)
    },
    mt10: {
        marginTop: getHeightRatio(10)
    },
    mt15: {
        marginTop: getHeightRatio(15)
    },
    mt20: {
        marginTop: getHeightRatio(20)
    },
    mt27: {
        marginTop: getHeightRatio(27)
    },
    mt30: {
        marginTop: getHeightRatio(30)
    },
    mt40: {
        marginTop: getHeightRatio(40)
    },
    mt45: {
        marginTop: getHeightRatio(45)
    },
    mt60: {
        marginTop: getHeightRatio(60)
    },
    mr5: {
        marginRight: 5
    },
    mr10: {
        marginRight: 10
    },
    mr15: {
        marginRight: 15
    },
    mr20: {
        marginRight: 20
    },
    mr42: {
        marginRight: 42
    },
    mr50: {
        marginRight: getHeightRatio(50)
    },
    mb0: {
        marginBottom: getHeightRatio(0)
    },
    mb5: {
        marginBottom: getHeightRatio(5)
    },
    mb7: {
        marginBottom: getHeightRatio(7)
    },
    mb8: {
        marginBottom: getHeightRatio(8)
    },
    mb10: {
        marginBottom: getHeightRatio(10)
    },
    mb15: {
        marginBottom: getHeightRatio(15)
    },
    mb18: {
        marginBottom: getHeightRatio(18)
    },
    mb20: {
        marginBottom: getHeightRatio(20)
    },
    mb30: {
        marginBottom: getHeightRatio(30)
    },
    mb40: {
        marginBottom: getHeightRatio(40)
    },
    mb70: {
        marginBottom: getHeightRatio(70)
    },
    mb120: {
        marginBottom: getHeightRatio(120)
    },
    ml5: {
        marginLeft: 5
    },
    ml10: {
        marginLeft: 10
    },
    ml15: {
        marginLeft: 15
    },
    ml20: {
        marginLeft: 20
    },
    ml42: {
        marginLeft: 42
    },
    ml50: {
        marginLeft: getHeightRatio(50)
    },
    mv5: {
        marginVertical: getHeightRatio(5)
    },
    mv10: {
        marginVertical: getHeightRatio(10)
    },
    mv15: {
        marginVertical: getHeightRatio(15)
    },
    mv20: {
        marginVertical: getHeightRatio(20)
    },
    mh5: {
        marginHorizontal: 5
    },
    mh10: {
        marginHorizontal: 10
    },
    mh12: {
        marginHorizontal: 12
    },
    mh14: {
        marginHorizontal: 14
    },
    mh15: {
        marginHorizontal: 15
    },
    mh20: {
        marginHorizontal: 20
    },
    mh60: {
        marginHorizontal: 60
    },
    mh135: {
        marginHorizontal: 135
    },
    pt0: {
        paddingTop: getHeightRatio(0)
    },
    pt5: {
        paddingTop: getHeightRatio(5)
    },
    pt10: {
        paddingTop: getHeightRatio(10)
    },
    pt12: {
        paddingTop: getHeightRatio(12)
    },
    pt13: {
        paddingTop: getHeightRatio(13)
    },
    pt15: {
        paddingTop: getHeightRatio(15)
    },
    pt20: {
        paddingTop: getHeightRatio(20)
    },
    pt30: {
        paddingTop: getHeightRatio(30)
    },
    pt35: {
        paddingTop: getHeightRatio(35)
    },
    pt40: {
        paddingTop: getHeightRatio(40)
    },
    pt90: {
        paddingTop: getHeightRatio(90)
    },
    pt100: {
        paddingTop: getHeightRatio(100)
    },
    pt120: {
        paddingTop: getHeightRatio(120)
    },
    pr5: {
        paddingRight: 5
    },
    pr7: {
        paddingRight: getHeightRatio(7)
    },
    pr10: {
        paddingRight: 10
    },
    pr15: {
        paddingRight: 15
    },
    pr20: {
        paddingRight: 20
    },
    pr22: {
        paddingRight: 22
    },
    pr23: {
        paddingRight: 23
    },
    pr30: {
        paddingRight: 30
    },
    pb0: {
        paddingBottom: 0
    },
    pb5: {
        paddingBottom: getHeightRatio(5)
    },
    pb7: {
        paddingBottom: getHeightRatio(7)
    },
    pb8: {
        paddingBottom: getHeightRatio(8)
    },
    pb10: {
        paddingBottom: getHeightRatio(10)
    },
    pb15: {
        paddingBottom: getHeightRatio(15)
    },
    pb20: {
        paddingBottom: getHeightRatio(20)
    },
    pb25: {
        paddingBottom: getHeightRatio(25)
    },
    pb40: {
        paddingBottom: getHeightRatio(40)
    },
    pb44: {
        paddingBottom: getHeightRatio(44)
    },
    pb45: {
        paddingBottom: getHeightRatio(45)
    },
    pb50: {
        paddingBottom: getHeightRatio(50)
    },
    pb60: {
        paddingBottom: getHeightRatio(60)
    },
    pb85: {
        paddingBottom: getHeightRatio(85)
    },
    pl5: {
        paddingLeft: 5
    },
    pl7: {
        paddingLeft: getHeightRatio(7)
    },
    pl10: {
        paddingLeft: 10
    },
    pl15: {
        paddingLeft: 15
    },
    pl18: {
        paddingLeft: getHeightRatio(18)
    },
    pl20: {
        paddingLeft: 20
    },
    pl22: {
        paddingLeft: 22
    },
    pl30: {
        paddingLeft: 30
    },
    ph0: {
        paddingHorizontal: 0
    },
    ph5: {
        paddingHorizontal: 5
    },
    ph10: {
        paddingHorizontal: 10
    },
    ph14: {
      paddingHorizontal: 14
    },
    ph15: {
        paddingHorizontal: 15
    },
    ph20: {
        paddingHorizontal: 20
    },
    ph33: {
        paddingHorizontal: getHeightRatio(33)
    },
    ph35: {
        paddingHorizontal: getHeightRatio(35)
    },
    ph40: {
        paddingHorizontal: getHeightRatio(40)
    },
    pv5: {
        paddingVertical: getHeightRatio(5)
    },
    pv10: {
        paddingVertical: getHeightRatio(10)
    },
    pv12: {
        paddingVertical: getHeightRatio(12)
    },
    pv15: {
        paddingVertical: getHeightRatio(15)
    },
    pv20: {
        paddingVertical: getHeightRatio(20)
    },
    pv28: {
        paddingVertical: getHeightRatio(28)
    },
    pv30: {
        paddingVertical: getHeightRatio(30)
    },
    pv80: {
        paddingVertical: getHeightRatio(80)
    },
    borderLight: {
        borderWidth: 1,
        borderColor: '#d9dbdc'
    },
    form: {
        validationContainer: {
            borderWidth: 0,
            borderColor: 'transparent',
            paddingVertical: 5,
            // backgroundColor: v.brandDanger
            backgroundColor: 'transparent'
        },
        error: {
            color: v.brandDanger,
            fontSize: 14
        },
        item: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        },
        inputLabel: {
            fontSize: 14,
            fontFamily: 'HelveticaNeue'
        },
        inputGroup: {
            flexDirection: 'row',
            // backgroundColor: v.brandInput,
            borderRadius: 5
        },
        inputGroupItem: {
            // height: 24,
            // alignSelf: 'center',
            // borderLeftWidth: 1,
            // borderLeftColor: 'rgb(215,215,215)'
        },
        inputPlaceholder: {
            color: 'rgb(76,76,76)'
        },
        inputPlaceholderNormal: {
            color: '#7a868c'
        }
    },
    paint: {
        primary: {
            color: v.brandPrimary
        },
        neutral: {
            color: v.brandNeutral
        },
        success: {
            color: v.brandSuccess
        },
        danger: {
            color: v.brandDanger
        },
        light: {
            color: v.brandLight
        },
        dark: {
            color: v.brandDark
        },
        placeholder: {
            color: v.placeholder
        }
    },
    icon: {
        primary: {
            color: v.brandPrimary,
            fontSize: 24
        },
        medium: {
            fontSize: 36
        },
        large: {
            fontSize: 96
        },
        smallsize: {
            width: 32,
            height: 32
        },
        checkoff: {
            width: 32,
            height: 32
        },
        checkon: {
            width: 32,
            height: 32
        },
        check: {
            width: 32,
            height: 32
        }
    },
    button: {
        height: 50,
    },
    primaryButton: {
        borderRadius: 5,
        // backgroundColor: '#14af96',
        height: getHeightRatio(39)
    },
    modal: {
        content: {
            backgroundColor: 'white',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            borderColor: 'rgba(0, 0, 0, 0.1)',
            alignSelf: 'center'
        },
        icon: {
            fontSize: 48
        }
    },
    footerIcon: {
        color: '#777',
        fontSize: 26,
        width: 30
    },
    mlFix: {
        marginLeft: -16 //todo: find out what causes unexpected container padding
    },
    plFix: {
        paddingLeft: 16
    },
    plainFooter: {
        get backgroundColor(){
            return this.bgTransparent
        },
        get marginVertical(){
            return this.mv10
        },
        borderTopColor: 'transparent'
    }
};
