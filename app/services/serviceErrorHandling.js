import Snackbar from "react-native-snackbar"
import { cd } from "../components/common/colorData"

export async function errorHandlingServiceCatch() {
    Snackbar.show({
        text: 'Mohon ulangi kembali',
        duration: 5000,
        backgroundColor: cd.primary,
        action: {
            text: 'OK',
            textColor: cd.title
        }
    })
}


export async function rtoHandlingService() {
    Snackbar.show({
        text: 'Waktu proses telah habis',
        duration: 5000,
        backgroundColor: cd.primary,
        action: {
            text: 'OK',
            textColor: cd.title
        }
    })
}
