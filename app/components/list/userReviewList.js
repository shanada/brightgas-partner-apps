import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import { Label } from '../common/label';
import { cd } from '../common/colorData';
import { fs } from '../common/fontSizeData';
import shadowUi from '../common/shadowUi';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

class UserReviewList extends React.Component {
    render() {
        const { item, onPress } = this.props;
        let id = item.id
        let title = item.judul
        let description = item.artikel
        let date = moment(item.created_at).format('DD MMMM YYYY')
        let img = item.cover
        return (
            <Ripple style={styles.containerArea} onPress={()=>onPress(id)}>
                <FastImage source={{ uri: img}} style={styles.coverImg} />
                <View style={styles.labelArea}>
                    <Label text={title} size={fs.xl} bold lines={1} mt={5} color={cd.primary} />
                    <Label text={date} size={fs.md} lines={2} mt={3} color={cd.subLabel} />
                    <Label text={description} size={fs.lg} bold lines={10} mt={3} color={cd.subLabel} />
                </View>
            </Ripple>
        )
    }
}

const styles = StyleSheet.create({

    containerArea: {
        margin: 10,
        marginTop: 0,
        flex: 1,
        borderRadius: 5,
        ...shadowUi,
        alignContent: 'center',
        backgroundColor: cd.title,
        flexDirection: 'row'

    },
    labelArea: {
        marginHorizontal: 5,
        marginBottom: 10,
        flexGrow: 1,
        width: 0
    },
    horizontalContainerArea: {
        margin: 10,
        flex: 1,
        alignContent: 'center',
        maxWidth: (wp(100) / 2) - 20,
        minWidth: (wp(100) / 2) - 20
    },
    coverImg: {
        margin: 10,
        width: wp(15),
        height: wp(15),
        borderRadius: 10,
    },

});

export default UserReviewList