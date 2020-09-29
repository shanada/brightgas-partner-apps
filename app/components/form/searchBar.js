import React from 'react'
import { View, Image, TextInput, StyleSheet } from 'react-native'
import Ripple from 'react-native-material-ripple'
import { icSearch } from '../common/assetData';
import { cd } from '../common/colorData';
import { fs } from '../common/fontSizeData';
import shadowUi from '../common/shadowUi';


class SearchBar extends React.Component {
    render() {
        const { onPress, placeholder } = this.props
        return (
            <View style={styles.container}>
                <Ripple
                    onPress={onPress}
                    style={styles.searchButton}
                    rippleOpacity={0}>
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={cd.subLabel}
                        returnKeyType='search' 
                    />
                </Ripple>
                <Image source={icSearch} style={styles.searchImg} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    searchButton: {
        flex: 1
    },
    input: {
        fontSize: fs.md,
        paddingLeft: fs.icon + 30,
        borderRadius: 10,
        color: cd.dark,
        backgroundColor: cd.title,
        // flex: 1,
        borderRadius: 10,
        paddingVertical: 2,
        height: fs.icon + 20,
        ...shadowUi
    },
    searchImg: {
        width: fs.icon,
        height: fs.icon,
        position: 'absolute',
        top: 20,
        left: 35,
    },
})

export default SearchBar
