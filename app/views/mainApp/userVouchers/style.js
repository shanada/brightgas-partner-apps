import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  container: {
    flex: 1,
  },
  
  containerArea: {
    flex: 1,
    ...shadowUi,
    backgroundColor: cd.title,
  },

  contentArea: {
    flex: 1,
    justifyContent: 'space-between',
  },

  listArea: {
    flex: 1,
  },

  tabButtonArea: {
    flexDirection: 'row',
    backgroundColor: cd.title
  },

  tabButton: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: cd.primary
  },
}