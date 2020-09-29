import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import { Label } from '../common/label';
import { cd } from '../common/colorData';
import { fs } from '../common/fontSizeData';
import shadowUi from '../common/shadowUi';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import VerifiedButton from '../button/verifiedButton';

class UserVoucherList extends React.Component {

    _setHeightForPromo = () => {
        let width = wp(100)
        let countWidth = 700 / width
        let voucherImageHeight = 390 / countWidth
        return voucherImageHeight
    }

    render() {
        const { item, onPress } = this.props
        let id = item.id
        let image = item.cover
        let promoImgHeight = this._setHeightForPromo()
        let name = item.judul
        let date = moment(item.created_at).format('DD MMMM YYYY')
        let term = item.deskripsi
        let code = item.kode
        let status = item.status
        let codeInfo = status == 1 ? 'Kupon Telah Digunakan' : `Kode Kupon: ${code}`.toUpperCase()
        return (
            <View style={styles.containerArea} >
                <FastImage source={{ uri: image }} style={[styles.promoImg, { height: promoImgHeight }]} />
                {
                    code == undefined ? null :
                        <View style={[styles.codeArea, { top: promoImgHeight - (20 + fs.xxl) }]}>
                            <Label text={codeInfo} color={cd.primary} size={fs.xxl} bold />
                        </View>
                }
                <View style={styles.labelArea}>
                    <Label text={name} size={fs.xl} bold lines={1} mt={5} color={cd.primary} />
                    {
                        code != undefined ?
                            <View style={styles.labelRowArea}>
                                <View style={styles.flexLabelArea}>
                                    <Label text={'Berlaku sampai:'} size={fs.lg} lines={2} mt={3} color={cd.subLabel} />
                                    <Label text={date} size={fs.lg} lines={2} mt={3} bold color={cd.label} />
                                </View>
                                <View style={styles.flexLabelArea}>
                                    <Label text={'Syarat:'} size={fs.lg} lines={2} mt={3} color={cd.subLabel} />
                                    <Label text={term} size={fs.lg} lines={2} mt={3} bold color={cd.label} />
                                </View>
                            </View> :
                            <View>
                                <VerifiedButton
                                    onPress={() => onPress(id, name)}
                                    isPrimary
                                    isVerified
                                    label={'Klaim Kupon'} />
                            </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    containerArea: {
        marginHorizontal: 10,
        marginVertical: 5,
        flex: 1,
        borderRadius: 10,
        ...shadowUi,
        alignContent: 'center',
        backgroundColor: cd.title
    },

    promoImg: {
        width: wp(100) - 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    labelArea: {
        marginHorizontal: 5,
        marginBottom: 10,
    },

    labelRowArea: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    flexLabelArea: {
        flex: 1
    },

    codeArea: {
        position: 'absolute',
        padding: 10,
        width: wp(100) - 20,
        backgroundColor: cd.rippleColorLight,
        borderBottomColor: cd.border,
        borderBottomWidth: 0.5
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

});

export default UserVoucherList