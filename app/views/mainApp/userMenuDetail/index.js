import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, ScrollView, Share } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import { timeoutService, getService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import { snackbarInfo } from '../../../modules/snackbarInfo';
import OutletDetailSkeleton from '../../../components/skeletonLoader/outletDetailSkeleton';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Label } from '../../../components/common/label';
import { cd } from '../../../components/common/colorData';
import { fs } from '../../../components/common/fontSizeData';
import { thousandFormat } from '../../../modules/thousandFormat';
import VerifiedButton from '../../../components/button/verifiedButton';

class UserMenuDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userMenuDetail: null,
            detailMenuRegion: null,
            isLoading: false,
            storeUrl: null
        }
    }

    componentDidMount = async () => {
        this._onUserMenuDetailGet()
    }

    _onUserMenuDetailGet = () => {
        this.setState({
            isLoading: true
        })
        const { id } = this.props.navigation.state.params
        const { accessToken } = this.props
        let url = 'userMenuGet'
        let body = {
            "access-token": accessToken,
            "id": id
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            console.log(response)
            try {
                if (response.status) {
                    let userMenuDetail = response.data[0]
                    let lat = response.data[0].latitude
                    let lng = response.data[0].longitude
                    let name = response.data[0].kuliner
                    let latitude = parseFloat(lat == null ? -7.569842 : lat)
                    let longitude = parseFloat(lng == null ? 110.829401 : lng)
                    let storeUrl = 'http://maps.google.com/maps?ll=' + latitude + ',' + longitude + '&z=15&q=' + name
                    let detailMenuRegion = {
                        latitude,
                        longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005 * (wp(100) / hp(100))
                    }
                    this.setState({
                        userMenuDetail,
                        detailMenuRegion,
                        isLoading: false,
                        storeUrl
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                    let message = response.message
                    snackbarInfo(message)
                }
            } catch (error) {
                this.setState({
                    isLoading: false
                })
                errorHandlingServiceCatch()
            }
        }).catch((error) => {
            this.setState({
                isLoading: false
            })
            rtoHandlingService()
        })
    }

    _onShareData = async () => {
        const {storeUrl, userMenuDetail } = this.state
        let name = userMenuDetail.nama_makanan
        let culinary = userMenuDetail.kuliner
        let owner = userMenuDetail.pemilik
        let price = thousandFormat(userMenuDetail.harga)
        let discount = thousandFormat(userMenuDetail.diskon)
        let finalDiscount = discount == 0 ? `*${price}*` : `~${price}~ / *${discount}*`
        try {
            const result = await Share.share({
                message:
                `*${name}*\n*${culinary}* oleh *${owner}*\nHarga: ${finalDiscount}\n\n${storeUrl}`
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {

                } else {

                }
            } else if (result.action === Share.dismissedAction) {

            }
        } catch (error) {
            alert(error.message);
        }
    }

    _onDirectToGoogleMaps=()=>{
        const { storeUrl } = this.state
        Linking.openURL(storeUrl)
    }

    render() {
        const { userMenuDetail, isLoading } = this.state
        return (
            <View>
                {
                    userMenuDetail != null ?
                        this._renderMenuDetail(userMenuDetail) :
                        isLoading ?
                            <OutletDetailSkeleton /> :
                            null
                }
            </View>
        );
    }

    _renderMenuDetail = (item) => {
        const { detailMenuRegion } = this.state
        let name = item.nama_makanan
        let image = item.img
        let culinary = item.kuliner
        let owner = item.pemilik
        let price = thousandFormat(item.harga)
        let discount = thousandFormat(item.diskon)
        return (
            <ScrollView>
                <FastImage source={{ uri: image }} style={styles.menuImg} />
                <View style={styles.detailLabelArea}>
                    <Label text={name} color={cd.primary} bold size={fs.xl} lines={2} />
                    <View style={styles.rowArea}>
                        <Label
                            text={price}
                            size={fs.lg}
                            bold
                            color={cd.label}
                            mt={5}
                            mr={5}
                            decoration={discount == 0 ? 'normal' : 'line-through'} />
                        {
                            discount == 0 ?
                                null :
                                <Label
                                    text={discount}
                                    size={fs.lg}
                                    bold
                                    color={cd.label}
                                    mt={5} />
                        }
                    </View>
                    <Label text={culinary} color={cd.subLabel} size={fs.lg} lines={2} mt={3} />
                    <Label text={owner} color={cd.label} size={fs.md} mt={3} />
                </View>
                {/* <MapView
                    liteMode
                    style={styles.userMenuRegionArea}
                    initialRegion={detailMenuRegion}
                >
                    <Marker
                        title={name}
                        coordinate={detailMenuRegion}
                    />
                </MapView> */}
                <View style={styles.onShareArea}>
                    <VerifiedButton
                        isPrimary
                        block
                        isVerified
                        label={'BAGIKAN'}
                        onPress={this._onShareData} />
                </View>
                <View style={styles.onShareArea}>
                    <VerifiedButton
                        isPrimary
                        block
                        isVerified
                        label={'BUKA DI GOOGLE MAPS'}
                        onPress={this._onDirectToGoogleMaps} />
                </View>
            </ScrollView>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken
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

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuDetail)