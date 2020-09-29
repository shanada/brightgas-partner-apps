import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  flatListBadgeArea: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 5
  },

  listLabelArea: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  listLabel: {
    flex: 1
  }

}