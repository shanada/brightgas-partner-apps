import React, { PureComponent } from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { cd } from "./colorData"

class Avatar extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        let { size, rounded, bordered, borderColor, name } = this.props
        const finalSize = size == null || size == undefined ? 15 : size
        let source = name != null ? `https://ui-avatars.com/api/?name=${name}&size=192&background=18A1CC&color=FFF&bold=true` : `https://ui-avatars.com/api/?name=AVATAR&size=192&background=18A1CC&color=FFF&bold=true`
        return (
            <View
                style={{
                    width: wp(finalSize) + 3,
                    height: wp(finalSize) + 3,
                    margin: 5,
                    borderWidth: bordered ? 1.5 : 0,    
                    borderColor: bordered ? cd.title : borderColor == null ? 'transparent' : borderColor,
                    borderRadius: rounded ? wp(finalSize) : 0
                }}>
                <FastImage
                    source={{
                        uri: source
                    }}
                    style={{
                        width: wp(finalSize),
                        height: wp(finalSize),
                        borderRadius: rounded ? wp(finalSize) : 0
                    }} />
            </View>
        )
    }

}

export default Avatar

