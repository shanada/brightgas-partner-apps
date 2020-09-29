import Snackbar from 'react-native-snackbar'
import { cd } from '../components/common/colorData';

export async function snackbarInfo (message, type) {
    Snackbar.show({
        text: message,
        textColor: cd.title,
        backgroundColor: type == 'success' ? cd.primary : cd.dark,
        duration: Snackbar.LENGTH_LONG
    })
}