import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { fs } from '../common/fontSizeData';
import { cd } from '../common/colorData';
import Ripple from 'react-native-material-ripple';
import shadowUi from '../common/shadowUi';
import { Label } from '../common/label';

const VerifiedButton = props => {
    const { isVerified, label, onPress, block, isPrimary, isSecondary } = props
    return (
        <View style={block ? styles.buttonBlockArea : styles.buttonArea}>
            <Ripple
                disabled={isVerified ? false : true}
                onPress={onPress}
                rippleOpacity={0.2}
                rippleColor={cd.rippleColorLight}
                style={!isVerified ? styles.buttonUnverified : isPrimary ? styles.buttonPrimary : styles.button}>
                <Label size={fs.xxl} text={label} color={isPrimary || isSecondary ? cd.title : cd.primary} />
            </Ripple>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonArea: {
        margin: 5,
        // borderRadius: 5,
        // ...shadowUi
    },
    buttonBlockArea: {
        width: wp(100) - 40,
        // borderRadius: 5,
        // ...shadowUi
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: cd.title,
        borderWidth: 1.5,
        borderColor: cd.primary,
        // borderRadius: 5,
    },
    buttonPrimary: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: cd.primary,
        backgroundColor: cd.primary,
        borderWidth: 1.5,
        // borderRadius: 5,
    },
    buttonUnverified: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: cd.border,
        backgroundColor: cd.border,
        borderWidth: 1.5,
        borderRadius: 5,
    },
});

export default VerifiedButton;