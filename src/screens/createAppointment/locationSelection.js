import React,{Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Button, Left, Right, Body, Spinner, Input} from 'native-base';
import {PropTypes, i18n, connect, themes, staticIcons, staticImages} from 'helpers/common';
import styles from './style';
import ButtonGroup from 'components/buttonGroup';
import {SetFormState, SetUserData, ResetUserData, ResetFormState} from 'helpers/redux/actions/formActions';
import {InputTextNormal} from 'components/inputFields';
import {getHeightRatio, clean, formUtil, validation} from 'helpers/utils';
import {SV_GET_COORDINATE, SV_GET_NUMBERSOURCE, SV_GET_LOCATION} from 'helpers/services/endpoints/';
import {normalizeEFormParams, setDefaults} from 'helpers/utils/generic/dataTransfer';
import {TELLER, MAIN, ERROR_INVALID_USER_DATA, ACTION_READ} from 'helpers/constant';
import SuperForm from "helpers/classMixins/superForm";
import Card from 'components/card';
import BranchList from 'components/branchList';
import AppointmentSlot from 'components/appointmentSlot';
import PopUp from 'components/popUp';

class LocationSelection extends SuperForm(Component) {
    constructor() {
        super();
        this.state = {
            branchListItem: [],
            appointmentSlotList: [],
        };
        this.dynamicFields = {}
    }

    componentWillMount() {
        console.log('Location Selection');
    }

    render(){
        const {submitStep, branchListItem, appointmentSlotList, firstHitAppointmentSlot, handleFilterLocation, currentBook, loadingBranch} = this.props.opts;
        const gettingBranchListByCoordinate = this.props.requests[SV_GET_COORDINATE].inProgress;
        const gettingBranchListByInputSearch = this.props.requests[SV_GET_LOCATION].inProgress;
        const gettingAppointmentSlotList = this.props.requests[SV_GET_NUMBERSOURCE].inProgress;
        const actionButtons = [
            {
                text: i18n('next'),
                props: {
                    buttonContainerStyle: {
                        marginHorizontal: 27,
                        marginBottom: 28
                    }
                },
                onPress: submitStep
            }
        ];

        return(
            <View>
                <View>
                    <Card title={i18n('selectLocation')}>
                        <View style={styles.searchLocation} >
                            <View style={themes.fldr}>
                                <Left>
                                    <Image source={staticIcons.searchLocation}/>
                                </Left>
                                <Input
                                    maxLength={40}
                                    placeholder={i18n('searchBranchLocation')}
                                    onChangeText={handleFilterLocation}
                                    placeholderTextColor={themes.paint.placeholder.color}
                                    style={styles.inputTextCard}
                                />
                                <Right >
                                    <Image source={staticIcons.search}/>
                                </Right>
                            </View>
                        </View>
                        <Text style={{...styles.placeholder, ...themes.pt10}}>{i18n('locationSearchComment')}</Text>
                    </Card>
                    {(gettingBranchListByCoordinate || gettingBranchListByInputSearch) && loadingBranch ? <Spinner/> : <BranchList lists={branchListItem} />}
                    {gettingAppointmentSlotList && firstHitAppointmentSlot ? <Spinner/> : appointmentSlotList.length > 1 ? <AppointmentSlot lists={appointmentSlotList} /> : null}
                </View>
                <View>
                    <ButtonGroup buttons={actionButtons} />
                </View>
            </View>
        );
    }
}

LocationSelection.propTypes = {
    dispatch: PropTypes.func,
    opts: PropTypes.any,
    requests: PropTypes.any
};

const mapStatesToProps = (state) => {
    return {
        requests: state.requests,
    }
};

export default connect(mapStatesToProps)(LocationSelection);