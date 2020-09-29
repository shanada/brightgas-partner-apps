import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from "rn-placeholder";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { cd } from '../common/colorData';
import { FlatList } from 'react-native-gesture-handler';
import shadowUi from '../common/shadowUi';

class outletReviewSkeleton extends PureComponent {
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
                data={arrayData}
                renderItem={this._renderskeletonList}
                keyExtractor={(item, index) => index.toString()} />
        )
    }

    _renderskeletonList = () => {
        return (
            <View style={styles.placeholderArea}>
                <View style={styles.rowArea}>
                    <Placeholder
                        style={styles.thumbnailArea}
                        Animation={Fade} >
                        <PlaceholderMedia style={styles.thumbnailImg} />
                    </Placeholder>
                    <Placeholder style={styles.linelArea}>
                        <PlaceholderLine style={styles.line} />
                        <PlaceholderLine style={styles.line} />
                    </Placeholder>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    placeholderArea: {
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

    thumbnailArea: {
        marginRight: 10,
        maxWidth: wp(25),
    },

    thumbnailImg: {
        width: wp(25),
        height: hp(10),
        borderRadius: 10,
        ...shadowUi
    },

    line: {
        width: wp(60),
        height: hp(1.8),
        borderRadius: 0,
        marginTop: 5
    }
})

export default outletReviewSkeleton;