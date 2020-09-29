import { widthPercentageToDP as wp } from 'react-native-responsive-screen'


export async function setBannerHeight () {
    // use ratio 16:9
    let screenWidth = wp(100)
    let screenWidthRatioPart = screenWidth / 16
    let height = screenWidthRatioPart * 9
    console.warn(height)
    return height
}