import React,{Component} from 'react';
import {View, Image} from 'react-native';
import {Text, Footer, Content, Container} from 'native-base';
import {PropTypes, i18n, connect, themes, staticImages} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {InputTextNormal} from 'components/inputFields';

class Greeting extends Component {

    render(){
        const {onNext,accountName} = this.props.opts;
        const actionButtons = [
            {
                text: i18n('next'),
                props: {
                    backgroundColor: '#14af96'
                },
                onPress: onNext
            },
        ];


        return(
                <Container style={styles.bodyContainer}>
                    <Content>
                        <View style={styles.logoContainer}>
                            <Image source={staticImages.wirecardSymbol}/>
                        </View>
                        <Text style={styles.greetingTitle}>{i18n('hi')}, {accountName}</Text>
                        <Text style={styles.greetingSubtitle}>{i18n('wirecardGreeting')}</Text>
                        <View style={styles.buttonContainer}>
                            <ButtonGroup buttons={actionButtons} />
                        </View>
                    </Content>
                    <Footer style={styles.footerContainer}>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>{i18n('copyrightTop')}</Text>
                            <Text style={styles.footerText}>{i18n('copyrightBottom')}</Text>
                        </View>
                    </Footer>
                </Container>
        );
    }
}

Greeting.propTypes = {
  opts: PropTypes.object
};

const mapStatesToProps = (state) => {
    return {
    }
};

export default connect(mapStatesToProps)(Greeting);