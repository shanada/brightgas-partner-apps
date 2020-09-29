import React from "react"
import { StyleSheet, Platform, View, Image } from "react-native"
import { cd } from "./colorData";
import { icLogoTitle } from "./assetData";
import { Label } from "./label";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const Title = props => {
    const { title, center, image, extraLabel } = props
    let titleLabel = image ? '' : title
    if (image) {
        return (
            <View style={center ? styles.titleAreaCenter : styles.titleArea}>
                <Image source={icLogoTitle} style={styles.logoImg} />
                {
                    extraLabel != null ?
                    <Label text={extraLabel} color={cd.title} size={18} bold />: 
                    null
                }
            </View>
        )
    } else {
        return (
            <View style={center ? styles.titleAreaCenter : styles.titleArea}>
                <Label text={titleLabel} color={cd.title} size={18} bold mr={20} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleArea: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexGrow: 1
    },
    titleAreaCenter: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: cd.title
    },
    logoImg: {
        height: 40,
        resizeMode: 'contain',
        // backgroundColor: cd.label,
        width: wp(100),
        marginLeft: -15
    }
})