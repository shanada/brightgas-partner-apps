import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fs } from './fontSizeData';
import { cd } from './colorData';
import { loadingAnim } from './assetData';


class Loader extends PureComponent {

    render() {
        const { isLoading, loaderMessage } = this.props;
        return (
            <Modal 
                isVisible={isLoading}
                animationIn='fadeIn'
                animationOut='fadeOut'
                animationInTiming={10}
                animationOutTiming={10}
                style={styles.modal}>
                <View style={styles.modalArea}>
                    <View style={styles.animationArea}>
                        <LottieView
                            resizeMode='cover'
                            autoPlay
                            loop
                            source={loadingAnim} />
                    </View>
                    <Text style={styles.modalLabel}>
                        {loaderMessage == undefined ? 'Please wait' : loaderMessage}
                    </Text>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    modal: {
        flex: 1,
        alignItems: 'center'
    },

    modalArea: {
        backgroundColor: cd.title,
        borderRadius: 10,
        padding: 10,
        width: wp(40),
        alignItems: 'center',
        justifyContent: 'center',
    },

    animationArea: {
        width: wp(30),
        height: 50,
    },

    modalLabel: {
        fontSize: fs.xl,
        fontWeight: 'bold',
        color: cd.label,
        textAlign: 'center'
    }
});

export default Loader;