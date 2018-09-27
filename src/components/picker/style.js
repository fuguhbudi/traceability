import themes from "themes";
import v from "themes/variables";
import {getHeightRatio} from "helpers/utils";

const React = require("react-native");
const { Platform, Dimensions} = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
    container:{
        borderRadius : 5,
        alignSelf : 'stretch',
        backgroundColor : 'transparent'
    },
    textPlaceholder : {
        ...themes.text,
        fontSize : 16,
        marginLeft : 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        height : getHeightRatio(48),
        flex: 1
    },
    trDroplistArrow:{
        marginRight: 17
    },
    countryView:{
        ...themes.inlineContainer,
        width: 85
    },
    countryButton:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    dropdownButton:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    countryIcon:{
        width:32,
        height:32
    },
    countryText:{
        ...themes.textBold,
        paddingLeft: 0,
        paddingTop: 0,
        fontSize: 16,
        color: '#000',
        marginLeft:5,
        marginBottom:getHeightRatio(2)
    },
    modalWrapper:{
        ...themes.form.item,
        justifyContent: 'flex-end',
        margin: 0
    },
    modalView: {
        ...themes.mlFix,
        maxHeight: getHeightRatio(500)
    },
    modalListHeader:{
        ...themes.plFix,
        backgroundColor: '#ec1d23',
        height: 50,
        get paddingTop(){
            return (this.height - 20) / 2
        }
    },
    modalListHeaderText:{
        ...themes.text,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#fff'
    },
    modalClose:{
        position: 'absolute',
        right: 30,
        height: 50,
        top: 0
    },
    modalListItem:{
        ...themes.plFix,
        alignItems: 'center',
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderColor: '#ddd'
    },
    modalListFlag:{
        width: 32,
        height:32
    },
    modalListFlagText:{
        textAlign: 'left',
        textAlignVertical: 'center',
        paddingTop: 3,
        marginRight:-5
    },
    modalcountryNameView:{
        width: deviceWidth / 3.95,
        minWidth: 90,
        maxWidth: 100
    },
    modalListText:{
        ...themes.text,
        paddingLeft: 0,
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    itemContainer:{
        backgroundColor: '#fff',
        borderColor: v.brandInput,
        ...themes.br8
    },
    itemContainerTransparent:{
        backgroundColor: "transparent",
        borderColor: "transparent",
        minWidth: 110
    },
    dropListWithHelper: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    dropListHelper:{
        padding: 5,
        paddingLeft: 20,
        backgroundColor: v.brandInput,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginLeft: 2
    },
    pickerContainer:{
        borderWidth: 1,
        ...themes.borderSoft,
        borderRadius: 8,
        marginTop : 7,
        height: getHeightRatio(38),
        ...themes.pl10
    },
    picker:{
        borderWidth: 1,
        borderColor: '#000f23',
        borderRadius: 8,
        height: getHeightRatio(38),
        ...themes.pl10
    }
};
