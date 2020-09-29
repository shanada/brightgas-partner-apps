import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fs } from './fontSizeData';
import { cd } from './colorData';
import VerifiedButton from '../button/verifiedButton';
import { Label } from './label';


class Info extends React.Component {

    render() {
        const { isVisible, onPress, message, type } = this.props;
        return (
            <Modal isVisible={isVisible}
                animationIn='fadeIn'
                animationOut='fadeOut'
                animationInTiming={10}
                animationOutTiming={10}
                style={styles.modal}>
                <View style={styles.modalArea}>
                    <Label text={type ? "Berhasil" : "Gagal"} bold size={fs.xl} color={cd.label} mb={5} />
                    <Label text={message} size={fs.lg} color={cd.label} lines={2} align={'center'} />
                    <View style={styles.buttonArea}>
                        <VerifiedButton
                            label={'OK'}
                            isVerified
                            onPress={onPress} />
                    </View>
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
        width: wp(60),
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonArea: {
        width: wp(60) - 20,
        marginTop: 15,
        marginHorizontal: wp(15)
    }
});

export default Info;