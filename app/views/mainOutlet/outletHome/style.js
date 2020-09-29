import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  container: {
    flex: 1,
    backgroundColor: cd.title
  },

  contentArea: {
    flex: 1,
    justifyContent: 'space-between',
  },

  listArea: {
    flex: 1,
  },

  flatlistArea: {
    marginHorizontal: 20
  },

  footerArea: {
    height: 58,
    width: wp(100),
    justifyContent: 'center',
    backgroundColor: cd.primary,
    borderColor: cd.secondary,
    borderTopWidth: 0.5,
  },

  indicator: {
    height: 280,
    width: wp(100) - 30,
    borderRadius: 15,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: cd.background
  },

  shape: {
    height: 240,
    borderRadius: 100,
    position: 'absolute',
    width: wp(100),
    backgroundColor: cd.primary,
    top: -100,
    ...shadowUi
  },

  footerImg: {
    width: wp(30),
    height: wp(15),
  },

  footerImgArea:{
    alignItems: 'center',
  }

}