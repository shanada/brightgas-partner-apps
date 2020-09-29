import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from "rn-placeholder";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { cd } from '../common/colorData';
import shadowUi from '../common/shadowUi';

class OutletDetailSkeleton extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View>
                <View style={styles.placeholderTopArea}>
                    <Placeholder
                        Animation={Fade} >
                        <PlaceholderMedia style={styles.thumbnailImg} />
                    </Placeholder>
                    <Placeholder style={styles.linelArea}>
                        <PlaceholderLine style={styles.lineTitle} />
                        <PlaceholderLine style={styles.lineAddress} />
                        <PlaceholderLine style={styles.lineCommon} />
                        <PlaceholderLine style={styles.lineCommonMedium} />
                        <PlaceholderLine style={styles.lineCommonLarge} />
                    </Placeholder>
                </View>
                <Placeholder
                    Animation={Fade} >
                    <PlaceholderMedia style={styles.thumbnailMaps} />
                </Placeholder>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    placeholderTopArea: {
        backgroundColor: cd.title,
        width: wp(100),
        ...shadowUi
    },

    thumbnailImg: {
        width: wp(100),
        height: hp(25),
        backgroundColor: cd.title
    },

    thumbnailMaps: {
        width: wp(100),
        height: hp(25),
        backgroundColor: cd.title
    },

    linelArea: {
        width: wp(50) - 40,
        height: hp(20),
        padding: 10,
        marginBottom: 10,
        backgroundColor: cd.title
    },

    lineTitle: {
        width: wp(40),
        height: hp(1.8),
        borderRadius: 0,
        marginTop: 5,
    },

    lineAddress: {
        width: wp(90),
        height: hp(1.8),
        borderRadius: 0,
        marginTop: 3,
    },

    lineCommon: {
        width: wp(50),
        height: hp(1.8),
        borderRadius: 0,
        marginTop: 5,
    },

    lineCommonMedium: {
        width: wp(60),
        height: hp(1.8),
        borderRadius: 0,
        marginTop: 2,
    },

    lineCommonLarge: {
        width: wp(75),
        height: hp(1.8),
        borderRadius: 0,
        marginTop: 2,
    }
})

export default OutletDetailSkeleton;