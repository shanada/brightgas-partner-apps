import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

    animationArea: {
      height: 250,
      width: wp(100) - 30,
      borderRadius: 15,
      margin: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: cd.background
    },



}