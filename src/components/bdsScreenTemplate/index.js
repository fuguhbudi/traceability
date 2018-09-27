import React,{Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Container, Content} from 'native-base';
import {themes, PropTypes, ScreenHeader, i18n, connect, staticImages, staticIcons} from 'helpers/common';
import styles from './style';
import {InputTextTopLabel, InputTextNormal} from 'components/inputFields';
import {SetFormState, ResetFormState} from 'helpers/redux/actions/formActions';
import {getHeightRatio, clean, formUtil} from 'helpers/utils';


class BDSScreenTemplate extends Component {
    render(){

        const time = new Date().getTime();
        const {title, navigation, headerTitle, screenHeaderDate, subtitle, body, swipeCard, goBack, verticalCenter, parentStyle , children, noPadding} = this.props;
        return(
            <Container>
                <ScreenHeader goBack={goBack} navigation={navigation} headerTitle={headerTitle} date={time} format='dayDate' left='back'/>
                <Content style={verticalCenter ? {...styles.centerContainer, ...parentStyle} : noPadding? {...styles.contentWrapperNoPadding, ...parentStyle} : {...styles.contentWrapper, ...parentStyle}}>
                    {
                        title || subtitle || body?
                        <View>
                            {title}
                            {subtitle}
                            {body}
                        </View>:
                        null
                    }
                    {children}
                </Content>
                {/*{*/}
                    {/*swipeCard ?*/}
                        {/*<View style={styles.swipeCardContainer}>*/}
                            {/*<Image source={staticImages.swipeCard} style={styles.swipeCardItem} />*/}
                        {/*</View> : null*/}
                {/*}*/}
                {/*{*/}
                    {/*goBack ?*/}
                        {/*<TouchableOpacity style={styles.navigateBack} onPress={this.props.goBack} >*/}
                            {/*<Image source={staticIcons.back} style={styles.backIcon}  />*/}
                        {/*</TouchableOpacity> : null*/}
                {/*}*/}
            </Container>
        );
    }
}

BDSScreenTemplate.propTypes = {

};

const mapStatesToProps = (state) => {
    return {
        form: state.form,
    }
};

export default connect(mapStatesToProps)(BDSScreenTemplate);