import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, ScrollView, StatusBar } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import { cd } from '../../../components/common/colorData';
import { icDummy, icEdit } from '../../../components/common/assetData';
import FastImage from 'react-native-fast-image';
import { Label } from '../../../components/common/label';
import { fs } from '../../../components/common/fontSizeData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import Ripple from 'react-native-material-ripple';

class OutletProfile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = async () => {
        
    }

    _onEditProfile=()=>{
        const { navigate } = this.props.navigation
        navigate('OutletProfileForm')
    }

    render() {
        const { userData } = this.props
        let culinaryName = userData.nama_kuliner
        let description = userData.deskripsi
        let owner = userData.pemilik
        let email = userData.email
        let phoneNumber = userData.tlp_kuliner
        let address = userData.alamat_kuliner
        let villageOffice = userData.kelurahan
        let subDistrict = userData.kecamatan
        let profileImg = userData.img_kuliner
        let culinaryRegion = {
            latitude: parseInt(userData.latitude),
            longitude: parseInt(userData.longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005 * (wp(100) / hp(100)),
        }
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={cd.secondary}
                    barStyle="light-content"
                />
                <View style={styles.headerArea}>
                    <View style={styles.profileArea}>
                        <FastImage style={styles.profileImg} source={{ uri: profileImg }} />
                    </View>
                    <Ripple
                        onPress={this._onEditProfile}
                        style={styles.buttonImgArea}>
                        <FastImage source={icEdit} style={styles.editImg} />
                    </Ripple>
                </View>
                <ScrollView>
                    <View style={styles.dataArea}>
                        <View style={styles.dataTitleArea}>
                            <Label text={"Nama Kuliner"} bold size={fs.xl} color={cd.primary} />
                        </View>
                        <View style={styles.dataSubTitleArea}>
                            <Label text={culinaryName} size={fs.md} color={cd.subLabel} />
                        </View>
                    </View>
                    <View style={styles.dataArea}>
                        <View style={styles.dataTitleArea}>
                            <Label text={"Deskripsi"} bold size={fs.xl} color={cd.primary} />
                        </View>
                        <View style={styles.dataSubTitleArea}>
                            <Label text={description} size={fs.md} color={cd.subLabel} lines={2} />
                        </View>
                    </View>
                    <View style={styles.dataArea}>
                        <View style={styles.dataTitleArea}>
                            <Label text={"Pemilik"} bold size={fs.xl} color={cd.primary} />
                        </View>
                        <View style={styles.dataSubTitleArea}>
                            <Label text={owner} size={fs.md} color={cd.subLabel} />
                        </View>
                    </View>
                    <View style={styles.dataArea}>
                        <View style={styles.dataTitleArea}>
                            <Label text={"Email"} bold size={fs.xl} color={cd.primary} />
                        </View>
                        <View style={styles.dataSubTitleArea}>
                            <Label text={email} size={fs.md} color={cd.subLabel} />
                        </View>
                    </View>
                    <View style={styles.dataArea}>
                        <View style={styles.dataTitleArea}>
                            <Label text={"Telepon"} bold size={fs.xl} color={cd.primary} />
                        </View>
                        <View style={styles.dataSubTitleArea}>
                            <Label text={phoneNumber} size={fs.md} color={cd.subLabel} />
                        </View>
                    </View>
                    <View style={styles.dataArea}>
                        <View style={styles.dataTitleArea}>
                            <Label text={"Alamat"} bold size={fs.xl} color={cd.primary} lines={2} />
                        </View>
                        <View style={styles.dataSubTitleArea}>
                            <Label text={address} size={fs.md} color={cd.subLabel} />
                        </View>
                    </View>
                    <View style={styles.dataArea}>
                        <View style={styles.dataTitleArea}>
                            <Label text={"Kelurahan"} bold size={fs.xl} color={cd.primary} />
                        </View>
                        <View style={styles.dataSubTitleArea}>
                            <Label text={villageOffice} size={fs.md} color={cd.subLabel} />
                        </View>
                    </View>
                    <View style={styles.dataArea}>
                        <View style={styles.dataTitleArea}>
                            <Label text={"Kecamatan"} bold size={fs.xl} color={cd.primary} />
                        </View>
                        <View style={styles.dataSubTitleArea}>
                            <Label text={subDistrict} size={fs.md} color={cd.subLabel} />
                        </View>
                    </View>
                    <MapView
                        liteMode
                        style={styles.culinaryRegionArea}
                        initialRegion={culinaryRegion}
                    >
                        <Marker
                            title={culinaryName}
                            coordinate={culinaryRegion}
                        />
                    </MapView>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken,
        userData: state.auth.userData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetLoader: (isLoading, loaderMessage) => {
            dispatch(
                onSetLoader(isLoading, loaderMessage)
            )
        },
        onSetLoggedIn: (isLoggedIn, token) => {
            dispatch(
                onSetLoggedIn(isLoggedIn, token)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutletProfile)