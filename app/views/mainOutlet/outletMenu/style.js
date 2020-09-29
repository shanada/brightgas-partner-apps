import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  containerArea: {
    flex: 1
  },

  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10
  },

  addButtonArea: {
    padding: 10,
    width: wp(50),
    backgroundColor: cd.primary,
    alignItems: 'center'
  }

}