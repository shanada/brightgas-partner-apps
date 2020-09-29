import React from "react"
import { StyleSheet, Image } from "react-native"
import Ripple from "react-native-material-ripple"
import { icBackLight, icBack } from "../common/assetData"

export const BackButton = props => {
    let {onBackButton} = props
    return (
        <Ripple
            rippleOpacity={0.25} rippleSize={100} rippleDuration={200}
            onPress={onBackButton}>
            <Image
                source={ icBack }
                style={styles.icon} />
        </Ripple>
    )
}

const styles = StyleSheet.create({
    icon: {
        margin: 20,
        height: 20,
        width: 20
    }
})