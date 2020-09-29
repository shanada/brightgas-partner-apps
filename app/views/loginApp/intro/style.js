import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  introArea: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    // backgroundColor: cd.primary,
    paddingBottom: hp(25),
    paddingTop: 20,
  },

  activeDotIntro: {
    backgroundColor: cd.primary,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: hp(35),
    ...shadowUi
  },

  inActiveDotIntro: {
    backgroundColor: cd.subLabel,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: hp(35),
    ...shadowUi
  },

  introImg: {
    width: wp(65),
    height: wp(65)
  },

  buttonArea: {
    position: 'absolute',
    width: wp(100) - 40,
    bottom: hp(3)
  },

  buttonUserArea: {
    position: 'absolute',
    width: wp(100) - 40,
    bottom: 0
  },

  skipArea: {
    marginTop: 5,
    alignItems: 'center',
    width: wp(100) - 40,
    paddingVertical: 10,
  },

  skipUserArea: {
    alignItems: 'center',
    width: wp(100) - 40,
    paddingVertical: 10,
  }

}