import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fs } from '../common/fontSizeData';
import { cd } from '../common/colorData';
import { imgEmptyCluster, imgEmptyMoney, imgEmptyEbook, imgEmptyFaq, imgEmptyCommon } from '../common/assetData';
import { Label } from '../common/label';


class EmptyState extends React.Component {

    render() {
        const { cluster, moneyChanger, ebook, faq } = this.props;
        let sourceImg = cluster ? imgEmptyCluster : moneyChanger ? imgEmptyMoney : ebook ? imgEmptyEbook : faq ? imgEmptyFaq : imgEmptyCommon
        return (
            <View style={styles.container}>
                <Image source={sourceImg} style={styles.emptyImg} />
                <Label text={'Data Tidak Ditemukan'} size={fs.xxl} color={cd.dark} bold mt={10} mb={10} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    emptyImg: {
        width: wp(80),
        height: wp(80)
    }
});

export default EmptyState;