import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from "rn-placeholder";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { cd } from '../common/colorData';
import { FlatList } from 'react-native-gesture-handler';
import shadowUi from '../common/shadowUi';

class OutletSkeleton extends PureComponent {
    constructor(props) {
        super(props);

    }

    _setArrayData = (length) => {
        let arrayData = Array(length).fill(1)
        return arrayData
    }

    render() {
        const { length } = this.props
        let finalLength = length == null || length == undefined ? 6 : length
        let arrayData = this._setArrayData(finalLength)
        return (
            <FlatList
                numColumns={2}
                data={arrayData}
                renderItem={this._renderskeletonList}
                keyExtractor={(item, index) => index.toString()} />
        )
    }

    _renderskeletonList = () => {
        return (
            <View style={styles.placeholderArea}>
                <Placeholder
                    Animation={Fade} >
                    <PlaceholderMedia style={styles.thumbnailImg} />
                </Placeholder>
                <Placeholder style={styles.linelArea}>
                    <PlaceholderLine style={styles.line} />
                    <PlaceholderLine style={styles.line} />
                </Placeholder>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    placeholderArea: {
        backgroundColor: cd.title,
        borderRadius: 5,
        width: wp(50) -20,
        margin: 10,
        ...shadowUi
    },

    thumbnailImg: {
        width: wp(50) -20,
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: cd.title
    },

    linelArea: {
        width: wp(50)-40,
        height: hp(6)+15,
        marginHorizontal: 5,
        marginBottom: 10,
    },

    line:{
        width: wp(40),
        height: hp(1.8),
        borderRadius: 0,
        marginTop: 5
    }
})

export default OutletSkeleton;