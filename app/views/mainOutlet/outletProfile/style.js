import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  container: {
    flex: 1,
  },

  headerArea: {
    backgroundColor: cd.primary,
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },

  profileArea: {
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 5,
    borderRadius: cd.title,
    backgroundColor: cd.title,
    borderRadius: 10,
  },

  profileImg: {
    width: hp(12),
    height: hp(12),
    borderRadius: 10,
  },

  buttonImgArea: {
    position: 'absolute',
    padding: 10,
    top: 0,
    right: 0,
  },

  editImg: {
    width: hp(4),
    height: hp(4),
  },

  dataArea: {
    borderBottomWidth: 1,
    borderColor: cd.border,
    marginBottom: 10,
    ...shadowUi
  },

  dataTitleArea: {
    backgroundColor: cd.title,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: cd.border,
  },

  dataSubTitleArea: {
    backgroundColor: cd.background,
    paddingHorizontal: 10,
    paddingVertical: 5
  },

  culinaryRegionArea: {
    height: hp(25),
    marginBottom: 10
  }

}