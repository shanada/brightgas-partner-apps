import React from 'react'
import { View, Image, TextInput, StyleSheet } from 'react-native'
import { icSearch } from '../common/assetData';
import { cd } from '../common/colorData';
import { fs } from '../common/fontSizeData';
import shadowUi from '../common/shadowUi';

class SearchBar extends React.Component {
    render() {
        const { onSearch, onChange, value, placeholder } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.searchButton}>
                    {/* <TextInput
                        value={value}
                        style={styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={cd.subLabel}
                        onSubmitEditing={onSearch}
                        onChange={onChange}
                        returnKeyType='search'
                        
                    /> */}
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        value={value}
                        placeholderTextColor={cd.subLabel}
                        returnKeyType='search'
                        onChangeText={(e) => onChange(e)}
                        onSubmitEditing={onSearch}
                        maxLength={20}
                    />
                    <Image source={icSearch} style={styles.searchImg} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        paddingBottom: 5
    },
    searchButton: {
        flex: 1
    },
    input: {
        fontSize: fs.lg,
        paddingLeft: fs.icon + 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: cd.bgInput,
        color: cd.dark,
        backgroundColor: cd.title,
        flex: 1,
        borderRadius: 10,
        paddingVertical: 2,
    },
    searchImg: {
        width: fs.icon,
        height: fs.icon,
        position: 'absolute',
        top: 7,
        left: 10,
    },
})

export default SearchBar
