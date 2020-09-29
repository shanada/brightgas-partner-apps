import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

    

  userMenuRegionArea: {
    height: hp(25)
  },

  menuImg: {
    height: hp(25),
    width: wp(100)
  },
  
  detailLabelArea: {
    padding: 10,
    marginBottom: 10,
    ...shadowUi,
    backgroundColor: cd.title
  },

  rowArea: {
    flexDirection: 'row'
  },

  onShareArea: {
    width: wp(100),
    margin: 15
  },

}