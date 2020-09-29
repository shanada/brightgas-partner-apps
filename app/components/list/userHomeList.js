import React, { PureComponent } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fs } from '../common/fontSizeData';
import { cd } from '../common/colorData';
import { Label } from '../common/label'
import shadowUi from '../common/shadowUi';
import Ripple from 'react-native-material-ripple';


class UserHomeList extends PureComponent {

    render() {
        const { onPress, name, img, small, sub } = this.props;
        if (small) {
            return (
                <Ripple
                    style={styles.footerArea}
                    onPress={onPress}>
                    <Image source={img} style={styles.footerImg} />
                    <Label
                        text={name}
                        size={fs.lg}
                        bold
                        color={cd.title}
                        mt={5} />
                </Ripple>
            )
        } else {
            return (
                <Ripple
                    style={sub ? styles.subStyle : styles.menuArea}
                    onPress={onPress}>
                    <Image source={img} style={styles.menuImg} />
                    <View style={styles.menuLabelArea}>
                        <Label
                            text={name}
                            size={fs.lg}
                            lines={2}
                            align={'center'}
                            color={cd.secondary}
                            mt={10} />
                    </View>
                </Ripple>
            )
        }
    }
}

const styles = StyleSheet.create({
    menuArea: {
        margin: 5,
        flex: 1,
        // padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    subStyle: {
        margin: 10,
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: cd.title,
        marginHorizontal: 15,
        ...shadowUi
    },

    menuLabelArea: {
        // width: wp(4),
        height: hp(6),
        marginBottom: 10
    },

    menuImageArea: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        backgroundColor: cd.bgInput,
        justifyContent: 'center',
        position: 'relative'
    },

    menuImg: {
        // position: 'absolute',
        alignSelf: 'center',
        width: wp(15),
        height: wp(15),
    },

    footerArea: {
        padding: 5,
        margin: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    footerImg: {
        width: wp(7),
        height: wp(7),
    }
});

export default UserHomeList;