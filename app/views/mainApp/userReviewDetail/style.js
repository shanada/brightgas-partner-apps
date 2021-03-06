import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  coverImg: {
    height: hp(25),
    width: wp(100)
  },

  labelArea: {
    margin: 10
  },

  onShareArea: {
    width: wp(100),
    margin: 15
  },

}