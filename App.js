import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/redux/store';
import OfflineNotice from './app/components/common/offlineNotice'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import DeviceInfo from 'react-native-device-info';
import { cd } from "./app/components/common/colorData";
import { fs } from "./app/components/common/fontSizeData";
import { imgSplashScreen, icLogoTitle, icBrightGasFront, icMapsSolo } from "./app/components/common/assetData"
import Application from './app/views'
import FastImage from "react-native-fast-image";
import { Label } from "./app/components/common/label";

console.disableYellowBox = true

const appName = DeviceInfo.getApplicationName()
const appVersion = DeviceInfo.getVersion();

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSplashScreen: false,
            animation: new Animated.Value(0)
        }
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                isSplashScreen: true
            })
        }, 3000);
    }

    _renderLoadingFade = () => {
        Animated.timing(this.state.animation, {
            toValue: 0,
            timing: 3000
        }).start(() => {
            Animated.timing(this.state.animation, {
                toValue: 1,
                duration: 3000
            }).start();
        })
        const animatedStyle = {
            opacity: this.state.animation,
            alignItems: 'center'
        }
        return (
            <View style={styles.container}>
                <Animated.View style={animatedStyle}>
                    <FastImage source={icMapsSolo} style={styles.splashImg} resizeMode="contain" />
                    {/* <Label text={"PETA KULINER SOLO"} color={cd.primary} size={hp(4)} bold /> */}
                </Animated.View>
                {/* <View style={styles.footerImgArea}>
                    <FastImage resizeMode="contain" source={icBrightGasFront} style={styles.footerImg} />
                </View> */}
                <Text style={styles.labelVersion}>Versi {appVersion}</Text>
            </View>
        )
    }

    _renderLoadingScale = () => {
        let scaleValue = new Animated.Value(0)
        const cardScale = scaleValue.interpolate({
            inputRange: [0, 0.3, 0.8],
            outputRange: [1, 1.1, 1.2]
        })
        let transformStyle = { transform: [{ scale: cardScale }] }
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
        return (
            <View style={styles.container}>
                <Animated.View style={transformStyle}>
                    <FastImage source={icMapsSolo} style={styles.splashImg} resizeMode="contain" />
                </Animated.View>
                <View style={styles.footerImgArea}>
                    <FastImage resizeMode="contain" source={icBrightGasFront} style={styles.footerImg} />
                </View>
                <Text style={styles.labelVersion}>{appVersion}</Text>
            </View>
        )
    }

    render() {
        const { isSplashScreen } = this.state
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    {
                        isSplashScreen ?
                            <Application /> :
                            this._renderLoadingFade()
                    }
                    <OfflineNotice />
                </PersistGate>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cd.title,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationArea: {
        height: wp(50),
        width: wp(50),
    },
    splashImg: {
        width: wp(90),
        height: hp(50),
        marginTop: hp(25)
    },
    supportImg: {
        height: 60,
        width: 120,
        position: 'absolute',
        resizeMode: 'contain',
        bottom: hp(20),
        alignSelf: 'center'
    },
    labelVersion: {
        position: 'absolute',
        fontSize: fs.lg,
        fontWeight: 'bold',
        color: cd.primary,
        bottom: 5,
        right: 10,
    },
    footerImg: {
        width: wp(30),
        height: wp(15),
    },
    footerImgArea: {
        position: 'absolute',
        bottom: hp(15),
        alignItems: 'center',
    }
});

export default App