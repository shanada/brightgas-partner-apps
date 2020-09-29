import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo"
import { cd } from './colorData';
import VerifiedButton from '../button/verifiedButton';
import { disconnectAnim } from './assetData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fs } from './fontSizeData';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { Label } from './label';

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
    modalShow: false
  };

  componentDidMount() {
    // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    // NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected, modalShow: false });
    } else {
      this.setState({ isConnected, modalShow: true });
    }
  };

  closeInfo=()=>{
    this.setState({ 
      modalShow: !this.state.modalShow 
    })
  }

  render() {
    const { isConnected, modalShow } = this.state
    if (!isConnected) {
      return (
        <Modal
          isVisible={modalShow}
          animationIn='fadeIn'
          animationOut='fadeOut'
          animationInTiming={10}
          animationOutTiming={10}
          onBackButtonPress={this.closeInfo}
          onBackdropPress={this.closeInfo}
          style={styles.modal}>
          <View style={styles.modalArea}>
            <View style={styles.animationArea}>
              <LottieView
                resizeMode='contain'
                autoPlay
                loop
                source={disconnectAnim} />
            </View>
            <Label text={'Harap Periksa Koneksi Internet Anda'} size={fs.xl} color={cd.dark} align={'center'} bold lines={2} />
            <View style={styles.buttonArea}>
            <VerifiedButton
              label='TUTUP'
              isPrimary
              isVerified
              onPress={() => this.closeInfo()} />
            </View>
          </View>
        </Modal>
      )
    }
    return null;
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center'
  },

  modalArea: {
    padding: 15,
    backgroundColor: cd.title,
    borderRadius: 10,
    padding: 10,
    width: wp(60) - 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  animationArea: {
    width: wp(60) - 60,
    height: 100,
  },

  modalLabel: {
    fontSize: fs.xl,
    marginVertical: 10,
    fontWeight: 'bold',
    color: cd.label
  },
  buttonArea: {
    width: wp(60) - 40,
  }
});

export default OfflineNotice;