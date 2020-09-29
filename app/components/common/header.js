import React, { PureComponent } from "react"
import { View, StatusBar, StyleSheet, Platform, SafeAreaView, Image, TextInput } from "react-native"
import { cd } from "./colorData";
import { Header } from "react-navigation-stack";
import { icSearch, icCross, imgHeaderBg, imgHeaderBgCropped, icLogout, imgHeaderLogin, imgHeaderLoginOutlet, imgHeaderRegister, imgHeaderRegisterOutlet } from "./assetData";
import { fs } from "./fontSizeData";
import { BackButton } from "../button/backButton";
import Ripple from "react-native-material-ripple";
import { Label } from "./label";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import FastImage from "react-native-fast-image";
import TextFormInput from "../form/textFormInput";

class DefaultHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            headerImgHeight: 0
        }
    }

    _setHeightForHeader = (type, isNewLogin) => { // 1630 - 815
        let minus = isNewLogin ? 0 : type == null ? 40 : 0
        let cWidth = isNewLogin ? 816 : type == null ? 1630 : 816
        let cHeight = isNewLogin ? 414 : type == null ? 815 : 544
        let width = wp(100)
        let countWidth = cWidth / width
        let headerImageHeight = (cHeight / countWidth) - minus
        return headerImageHeight
    }

    _setHeightForHeaderUser = () => { 
        let cWidth = 816
        let cHeight = 295
        let width = wp(100)
        let countWidth = cWidth / width
        let headerImageHeight = (cHeight / countWidth)
        return headerImageHeight
    }

    render() {
        const { custom, userHeader, userHeaderImg, largeHeader, title, subTitle, onSearch, onChange, value, placeholder, onBack, onBackInput, onClear, isNewLogin, onLogout, searchInput, home, headerImg } = this.props
        let headerLargeImage = headerImg == "L" ? imgHeaderLogin : headerImg == "LO" ? imgHeaderLoginOutlet : headerImg == "R" ? imgHeaderRegister : headerImg == "RO" ? imgHeaderRegisterOutlet : imgHeaderBgCropped
        const headerImgHeight = this._setHeightForHeader(headerImg, isNewLogin)
        const userHeaderImgHeight = this._setHeightForHeaderUser()
        return (
            <View style={largeHeader || userHeader ? styles.largeHeader : styles.header}>
                <StatusBar
                    backgroundColor={cd.secondary}
                    barStyle="light-content"
                />
                {custom ?
                    <View style={styles.container}>
                        <BackButton light onBackButton={onBack} />
                        <View style={styles.searchButton}>
                            <TextInput
                                style={styles.input}
                                placeholder='Tes'
                                value={value}
                                placeholderTextColor={cd.subLabel}
                                returnKeyType='search'
                                onChangeText={(e) => onChange(e)}
                                onSubmitEditing={()=>onSearch(value)}
                                maxLength={20}
                            />
                        </View>
                        <View style={styles.searchImgArea}>
                            <Image source={icSearch} style={styles.searchImg} />
                        </View>
                        {
                            value.length >= 1 ?
                                <Ripple onPress={onClear} style={styles.crossImgArea}>
                                    <Image source={icCross} style={styles.searchImg} />
                                </Ripple> :
                                null
                        }
                    </View> :
                    onBackInput ?
                        <Ripple onPress={onBack} style={styles.container}>
                            <BackButton light onBackButton={onBack} />
                            <View style={styles.searchButton}>
                                <TextInput
                                    style={styles.input}
                                    value={value}
                                    placeholderTextColor={cd.subLabel}
                                    returnKeyType='search'
                                    maxLength={20}
                                />
                            </View>
                            <View style={styles.searchImgArea}>
                                <Image source={icSearch} style={styles.searchImg} />
                            </View>
                        </Ripple> :
                        largeHeader ?
                            <View style={{ height: headerImgHeight }}>
                                <FastImage source={headerLargeImage} style={[styles.headerImg, { height: headerImgHeight }]} />
                                {
                                    onLogout == null || onLogout == undefined ? null :
                                        <Ripple style={styles.logoutArea} onPress={onLogout} >
                                            <FastImage source={icLogout} style={styles.logoutImg} />
                                        </Ripple>
                                }
                                <View style={{ marginTop: -headerImgHeight / 1.2 }}>
                                    {
                                        home ?
                                            <View style={styles.largeHeaderTitleHomeArea}>
                                                <Label text={title} size={hp(4)} color={cd.title} bold lines={2} />
                                            </View> :
                                            <View style={styles.largeHeaderTitleArea}>
                                                <Label text={title} size={fs.icon} color={cd.title} center />
                                            </View>
                                    }
                                    {
                                        subTitle == null ? null :
                                            <View style={styles.largeHeaderSubtitleArea}>
                                                <Label text={subTitle} size={fs.lg} color={cd.title} lines={2} />
                                            </View>
                                    }
                                </View>
                                {
                                    searchInput ?
                                        <View>
                                            <View style={styles.searchButton}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder={'Jenis Makanan, Masakan, Restoran'}
                                                    value={value}
                                                    placeholderTextColor={cd.subLabel}
                                                    returnKeyType='search'
                                                    onChangeText={(e) => onChange(e)}
                                                    onSubmitEditing={onSearch}
                                                    maxLength={20}
                                                />
                                            </View>
                                            <View style={styles.searchImgArea}>
                                                <Image source={icSearch} style={styles.searchImg} />
                                            </View>
                                        </View> :
                                        null
                                }
                            </View> :
                            userHeader ?
                            <View style={{ height: userHeaderImgHeight }}>
                                <FastImage source={userHeaderImg} style={[styles.headerImg, { height: userHeaderImgHeight }]} />
                            </View> :
                            <Header {...this.props} />
                }
            </View>
            // </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        height: 56,
        flex: 0,
        backgroundColor: cd.primary
    },
    header: {
        backgroundColor: cd.primary,
        shadowOpacity: 0,
        height: 56,
        shadowRadius: 0,
        elevation: 0,
        justifyContent: 'flex-start',
        // flex: 1,
        // ...shadowUi
    },
    largeHeader: {
        // height: hp(20),
        // backgroundColor: cd.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerImg: {
        width: wp(100),
        // position: 'absolute'
    },
    largeHeaderTitleArea: {
        alignItems: 'center',
        marginVertical: hp(2)
    },
    largeHeaderTitleHomeArea: {
        alignItems: 'flex-start',
        marginLeft: 20,
        marginBottom: 20
    },
    largeHeaderSubtitleArea: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchButton: {
        position: 'relative',
        flex: 1,
        height: fs.lg * 2,
    },
    input: {
        fontSize: fs.lg,
        borderRadius: 10,
        color: cd.dark,
        backgroundColor: cd.title,
        paddingLeft: 50,
        marginHorizontal: 20,
        marginBottom: 10,
        paddingVertical: 2,
        height: fs.lg * 2,
    },
    searchImgArea: {
        position: 'absolute',
        left: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        height: fs.lg * 2,
    },
    crossImgArea: {
        position: 'absolute',
        top: 15,
        right: 30,
        justifyContent: 'center',
        height: 30,
    },
    searchImg: {
        width: fs.icon,
        height: fs.icon,
    },
    logoutArea: {
        position: 'absolute',
        padding: 20,
        justifyContent: "center",
        alignItems: 'center',
        right: 0
    },
    logoutImg: {
        width: fs.icon,
        height: fs.icon,
    }
})

export default DefaultHeader