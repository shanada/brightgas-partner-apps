import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';
import { Label } from '../common/label';
import { cd } from '../common/colorData';
import { fs } from '../common/fontSizeData';
import shadowUi from '../common/shadowUi';


class SearchList extends React.Component {
    render() {
        const { label, onPress, disabled } = this.props
        return (
            <Ripple style={styles.containerArea} disabled={disabled} onPress={onPress}>
                <Label text={label} size={fs.lg} color={cd.label} />
            </Ripple>
        )
    }
}

const styles = StyleSheet.create({

    containerArea: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        backgroundColor: cd.title,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: cd.border
    },

});

export default SearchList;