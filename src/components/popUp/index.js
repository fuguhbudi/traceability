import React from "react";
import { Text, Image, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { View, Footer, Button, Content } from "native-base";
import { staticImages, staticIcons,i18n} from "helpers/common";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
// import ContainLink from "components/containLink";
import styles from "./style";
import {getHeightRatio} from 'helpers/utils';
import themes from "themes";

const PopUp = ({
    children,
    onBackdropPress,
    custom,
    isVisible,
    icon,
    actionHelper,
    title,
    isPendingTaskRejectReason,
    isExtra,
    extraContent,
    description,
    subDescription,
    buttons,
    subtitle,
    content,
    body,
    footer,
    topButton,
    type,titleStyle}) => {

    handleOnPress = (callback) => {
        callback();
    };

    const iconType = {
        error: {
            name: "error",
            width: getHeightRatio(90),
            height: getHeightRatio(90)
        },
        success: {
            name: "success",
            width: getHeightRatio(62),
            height: getHeightRatio(62)
        }
    };
    let renderContent;
    //title, children, description font size & weight should be set on parent
    switch(content) {
        case 'custom':
            renderContent =
                <View>
                    { title ? <Text style={styles.title}>{title}</Text> : null }
                    <View style={styles.containDesc}>
                        { body ? body : null }
                    </View>
                </View>;
                    break;
        case 'inputData':
            renderContent =
                <View>
                    { title ?
                        <View style={themes.fldr}>
                            <View style={styles.titleContainer}>
                                <Text style={{...styles.inputDataTitle, ...titleStyle}}>{title}</Text>
                            </View>
                            {
                                topButton ?
                                    <TouchableWithoutFeedback style={styles.addButton} onPress={() => handleOnPress(topButton)}>
                                        <View>
                                            <Image source={staticIcons.addOne} />
                                        </View>
                                    </TouchableWithoutFeedback> : null
                            }
                        </View>
                        : null }
                    { body ?
                        <View style={styles.inputDataBody}>
                            {body}
                        </View>: null
                    }
                </View>;
                    break;
        case 'popUpInfo':
            renderContent =
                <View>
                    { title ? <Text style={{...styles.centerTitle, ...titleStyle}}>{title}</Text> : null }
                    { body ?
                        <View style={styles.inputDataBody}>
                            {body}
                        </View>: null
                    }
                </View>;
            break;
        case 'popUpWeekendHoliday':
            renderContent =
                <View>
                    { title ? <Text style={{...styles.customTitleWeekend, ...titleStyle}}>{title}</Text> : null }
                    { body ?
                        <View style={styles.inputDataBody}>
                            {body}
                        </View>: null
                    }
                </View>;
            break;
        default:
            renderContent =
                <ScrollView>
                    { title ? <Text style={{...styles.title, ...titleStyle}}>{title}</Text> : null }
                    <View style={styles.containDesc}>
                        { description ? <Text style={styles.description}>{description}</Text> : null }
                    </View>
                </ScrollView>;
                    break;
    }

    const header = (
        <View style={styles.headerContainer}>
            <Image source={type ? staticIcons[iconType[type].name] : staticIcons[icon.name]} style={{
                ...styles.iconContainer,
                width: type ? iconType[type].width : icon.width,
                height: type ? iconType[type].height : icon.height
            }}/>
        </View>
    );

    return (
        <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContent}>
                    { type !== undefined ? (header) : null }
                    { renderContent }
                    { isExtra ? (extraContent) : null }
                    { buttons ? <View style={styles.buttons}>{(buttons)}</View> : null }
                    { footer ?
                        <View style={styles.footer}>
                            {footer}
                        </View>: null
                    }
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};


PopUp.propTypes = {
    isVisible: PropTypes.bool,
    onBackdropPress: PropTypes.func,
    custom: PropTypes.bool,
    icon : PropTypes.object,
    beforeTitle: PropTypes.any,
    title: PropTypes.any,
    children: PropTypes.any,
    description: PropTypes.string,
    isExtra: PropTypes.bool,
    extraContent: PropTypes.any,
    buttons: PropTypes.any,
    type: PropTypes.string
};

PopUp.defaultProps = {
    icon : {
        name: "success",
        width: getHeightRatio(62),
        height: getHeightRatio(62)
    }
};

export default PopUp;
