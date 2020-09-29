import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cd } from './colorData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fs } from './fontSizeData';
import LottieView from 'lottie-react-native';
import { animationsAvatar, imgSplashScreen, loadingAnim } from './assetData'
import Ripple from 'react-native-material-ripple';
import { snackbarInfo } from '../../modules/snackbarInfo';
import FastImage from 'react-native-fast-image';

class TemplateComponent extends PureComponent {

  render() {
    const { onPress, onSelectLoader, navigate } = this.props
    const dataTemplate = [
      "Loader",
      "SnackbarInfo",
      "ReduxProps",
      "LottieFiles",
      "and other still TBC on progress",
      "Navigate to development screen"
    ]
    return (
      <View>
        <Ripple onPress={onPress} style={styles.animationArea}>
          <LottieView
            resizeMode='contain'
            autoPlay
            loop
            source={loadingAnim} />
            {/* <FastImage source={ imgSplashScreen } style={styles.avatarImg} /> */}
        </Ripple>
        <View style={styles.labelArea}>
          <Text style={styles.titleTemplate}>Template Base</Text>
          {dataTemplate.map((item, i) => {
            return (
              <Ripple
                key={i}
                onPress={item == "Loader" ? onSelectLoader : item.includes('Navigate to') ? navigate : () => snackbarInfo(item + ' pressed', 'success')}>
                <Text style={styles.subTitleTemplate}>{item}</Text>
              </Ripple>
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  animationArea: {
    height: 250,
    width: wp(100) - 30,
    borderRadius: 15,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cd.background
  },

  avatarImg: {
    height: 150,
    width: 150,
  },

  labelArea: {
    padding: 15
  },

  titleTemplate: {
    fontWeight: 'bold',
    fontSize: fs.xl,
    color: cd.primary
  },

  subTitleTemplate: {
    marginVertical: 5,
    fontSize: cd.sm,
    color: cd.label
  }

});

export default TemplateComponent;