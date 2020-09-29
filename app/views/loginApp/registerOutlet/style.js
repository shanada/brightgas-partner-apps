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
    marginTop: 10,
    // alignItems: 'center',
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
  },

  checkArea: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  sectionCheckArea: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkImg: {
    width: wp(5),
    height: wp(5),
    marginRight: 5
  },

  myPertaminaImg: {
    width: wp(7),
    height: wp(7),
    marginLeft: 5
  },

  modalArea: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContainer: {
    backgroundColor: cd.title,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  myPertaminaModalImg: {
    width: wp(25),
    height: wp(25),
    marginBottom: 10
  },

  buttonModalArea: {
    width: wp(50)
  },

}