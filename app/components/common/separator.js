import React from "react"
import { View } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { cd } from "./colorData";

export const Separator = props => {
    let { height, bgColor, vertical, bgVertical } = props
    let bg = bgColor == null ? 'transparent' : bgColor
    return (
        <View>
            {vertical ?
                <View style={{width: wp(0.25), height: height, backgroundColor: bgVertical}}/> :
                    <View style={{width: wp(100), height: height, backgroundColor: bg}}/>
            }
        </View>
    )
}