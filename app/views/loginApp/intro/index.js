import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import AppIntroSlider from 'react-native-app-intro-slider'
import VerifiedButton from '../../../components/button/verifiedButton';
import { introData } from '../../../json/introData';
import FastImage from 'react-native-fast-image';
import { Label } from '../../../components/common/label';
import { fs } from '../../../components/common/fontSizeData';
import { cd } from '../../../components/common/colorData';
import Ripple from 'react-native-material-ripple';

class Intro extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = async () => {
        this.props.onSetLoader(false)
    }



    render() {
        return (
            <AppIntroSlider
                data={introData}
                renderItem={this._renderItem}
                showDoneButton={false}
                showNextButton={false}
                activeDotStyle={styles.activeDotIntro}
                dotStyle={styles.inActiveDotIntro} />
        );
    }

    _renderItem = ({ item }) => {
        const { navigate } = this.props.navigation
        let image = item.image
        let text = item.text
        let type = item.type
        let confirm = item.confirm
        let labelBtn = item.registerLabel
        return (
            <View style={styles.introArea}>
                <FastImage source={image} style={styles.introImg} resizeMode={'contain'} />
                <Label
                    mt={25}
                    text={text}
                    size={fs.xxl}
                    color={cd.primary}
                    align={'center'}
                    lines={10} />
                <View style={styles.buttonUserArea}>
                    <VerifiedButton
                        isVerified
                        isPrimary
                        onPress={() => navigate(confirm)}
                        label={labelBtn} />
                    <VerifiedButton
                        isVerified
                        isPrimary
                        onPress={() => navigate('Login', { type })}
                        label={"LOGIN"} />
                    <Ripple
                        onPress={() => this.props.onSetLoggedIn(2)}
                        style={styles.skipUserArea}>
                        <Label text={'Lewati'} color={cd.subLabel} size={fs.xxl} />
                    </Ripple>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetLoader: (isLoading, loaderMessage) => {
            dispatch(
                onSetLoader(isLoading, loaderMessage)
            )
        },
        onSetLoggedIn: (isLoggedIn) => {
            dispatch(
                onSetLoggedIn(isLoggedIn)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro)