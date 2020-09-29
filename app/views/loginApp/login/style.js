import { Platform } from 'react-native'
import { fs } from "../../../components/common/fontSizeData";
import { cd } from '../../../components/common/colorData';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import shadowUi from '../../../components/common/shadowUi';

export default styles = {

  contentFlex: {
    flex: 1
  },

  container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  errorArea: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center'
  },

  buttonArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  }

}