import React, { Component, PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import { Label } from '../common/label';
import { cd } from '../common/colorData';
import { fs } from '../common/fontSizeData';
import FastImage from 'react-native-fast-image';
import shadowUi from '../common/shadowUi';

class UserCulinaryList extends PureComponent {
    render() {
        const { item, onPress } = this.props
        let id = item.id
        let name = item.nama
        let image = item.img
        // let address = item.restaurant.location.address
        // let locality = item.restaurant.location.locality
        return (
            <Ripple style={styles.containerArea} onPress={() => onPress(id, name, image)}>
                <FastImage source={{ uri: image }} style={styles.iconImg} />
                <View style={styles.labelArea}>
                    <Label text={name} size={fs.xl} bold lines={1} mt={5} color={cd.primary} />
                    {/* <Label text={address} size={fs.md} lines={2} mt={3} color={cd.subLabel} /> */}
                    {/* <Label text={locality} size={fs.lg} bold lines={1} mt={3} color={cd.subLabel} /> */}
                </View>
            </Ripple>
        )
    }
}

const styles = StyleSheet.create({

    containerArea: {
        margin: 10,
        flex: 1,
        borderRadius: 5,
        ...shadowUi,
        alignContent: 'center',
        backgroundColor: cd.title,
        maxWidth: (wp(100) / 2) - 20,
        minWidth: (wp(100) / 2) - 20
    },

    horizontalContainerArea: {
        margin: 10,
        flex: 1,
        alignContent: 'center',
        maxWidth: (wp(100) / 2) - 20,
        minWidth: (wp(100) / 2) - 20
    },

    iconImg: {
        width: null,
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    labelArea: {
        marginHorizontal: 5,
        marginBottom: 10
    }

});

export default UserCulinaryList;