import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fs } from '../common/fontSizeData';
import { cd } from '../common/colorData';
import { Label } from '../common/label'
import shadowUi from '../common/shadowUi';
import Ripple from 'react-native-material-ripple';
import FastImage from 'react-native-fast-image';
import { thousandFormat } from '../../modules/thousandFormat';


class UserMenuSearchList extends PureComponent {

    render() {
        const { onPress, item } = this.props;
        let id = item.id
        let status = item.status
        let name = item.nama
        let price = thousandFormat(item.harga)
        let discount = thousandFormat(item.diskon)
        let description = item.kuliner
        let img = item.img

        return (
            <Ripple
                style={styles.menuArea}
                disabled={onPress == null ? true : false}
                rippleOpacity={0.4}
                onPress={() => onPress(id, status)}>
                <View style={styles.rowArea}>
                    <FastImage
                        source={{ uri: img }}
                        style={styles.menuImg} />
                    <View style={styles.descriptionArea}>
                        <Label
                            text={name}
                            size={fs.xl}
                            bold
                            color={cd.subLabel} />
                        <View style={styles.rowArea}>
                            <Label
                                text={price}
                                size={fs.lg}
                                bold
                                color={cd.label}
                                mt={5}
                                mr={5}
                                decoration={discount == 0 ? 'normal' : 'line-through'} />
                            {
                                discount == 0 ?
                                    null :
                                    <Label
                                        text={discount}
                                        size={fs.lg}
                                        bold
                                        color={cd.label}
                                        mt={5} />
                            }
                        </View>
                        <Label
                            text={description}
                            size={fs.lg}
                            color={cd.subLabel}
                            lines={3}
                            mt={5} />

                    </View>
                </View>
            </Ripple>
        )
    }
}

const styles = StyleSheet.create({

    menuArea: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: cd.title,
        marginBottom: 10,
        ...shadowUi
    },

    rowArea: {
        flexDirection: 'row'
    },

    menuImg: {
        width: wp(25),
        height: hp(10),
        marginRight: 10,
        borderRadius: 10,
        ...shadowUi
    },

    descriptionArea: {
        flexGrow: 1,
        width: 0
    },

    buttonArea: {
        flex: 1,
        marginTop: 5,
        alignItems: 'flex-end'
    },

    addButtonArea: {
        paddingVertical: 5,
        width: wp(25),
    },

    addButton: {
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: cd.primary,
        borderRadius: 5,
        alignItems: 'center',
        ...shadowUi
    }

});

export default UserMenuSearchList;