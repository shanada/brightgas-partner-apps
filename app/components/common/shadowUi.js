import { Platform } from 'react-native'
import { cd } from './colorData';
export default shadow = {
    shadowOffset: Platform.OS === 'ios' ? { width: 1, height: 1 } : { width: 2, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0.5,
    shadowRadius: Platform.OS === 'ios' ? 1 : 2,
    elevation: 3,
    shadowColor: cd.subLabel,
    borderLeftWidth: 0.2,
    borderColor: cd.border, 
  }