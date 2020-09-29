import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { snackbarInfo } from '../../../modules/snackbarInfo';
import { View, ScrollView, Share, Linking } from 'react-native';
import { timeoutService, getService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import MapView, { Marker } from 'react-native-maps';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import { Label } from '../../../components/common/label';
import { cd } from '../../../components/common/colorData';
import { fs } from '../../../components/common/fontSizeData';
import OutletDetailSkeleton from '../../../components/skeletonLoader/outletDetailSkeleton';
import VerifiedButton from '../../../components/button/verifiedButton';

class UserCulinaryDetail extends PureComponent {
    constructor(props) {
        super(props);
        const { restaurantImg } = this.props.navigation.state.params
        this.state = {
            isLoading: false,
            restaurantDetailData: null,
            storeUrl: null,
            restaurantRegion: null,
            restaurantImg
        }
    }

    componentDidMount = async () => {
        this._userCulinaryGet()
    }

    _userCulinaryGet = () => {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        const { id } = this.props.navigation.state.params
        let url = 'userCulinaryGet'
        let body = {
            "access-token": accessToken,
            "id": id
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.status) {
                    let restaurantDetailData = response.data
                    let lat = response.data.latitude
                    let lng = response.data.longitude
                    let name = response.data.nama
                    let latitude = parseFloat(lat == null ? -7.569842 : lat)
                    let longitude = parseFloat(lng == null ? 110.829401 : lng)
                    let storeUrl = 'http://maps.google.com/maps?ll=' + latitude + ',' + longitude + '&z=15&q=' + name
                    let restaurantRegion = {
                        latitude,
                        longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005 * (wp(100) / hp(100)),
                    }
                    this.setState({
                        restaurantDetailData,
                        restaurantRegion,
                        storeUrl
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                    let message = data.message
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
        const {storeUrl, restaurantDetailData } = this.state
        let name = restaurantDetailData.nama
        let address = restaurantDetailData.alamat
        let phone = restaurantDetailData.telp
        try {
            const result = await Share.share({
                message:
                `*${name}*\n${address}\n*${phone}*\n\n${storeUrl}`
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
        const { restaurantDetailData, isLoading } = this.state
        return (
            <View>
                {
                    restaurantDetailData != null ?
                        this._renderRestaurantDetail(restaurantDetailData) :
                        isLoading ?
                            <OutletDetailSkeleton /> :
                            null
                }
            </View>
        );
    }

    _renderRestaurantDetail = (item) => {
        const { restaurantRegion } = this.state
        let name = item.nama
        let image = item.img
        let address = item.alamat
        let phone = item.telp
        return (
            <ScrollView>
                <FastImage source={{ uri: image }} style={styles.restuarantImg} />
                <View style={styles.detailLabelArea}>
                    <Label text={name} color={cd.primary} bold size={fs.xl} lines={2} />
                    <Label text={address} color={cd.subLabel} size={fs.lg} lines={2} mt={3} />
                    {/* <Label text={locality} color={cd.subLabel} size={fs.lg} mt={3} /> */}
                    {/* <Label text={`Kategori: ${cuisines}`} color={cd.subLabel} bold size={fs.md} lines={2} mt={3} /> */}
                    {/* <Label text={time} color={cd.label} bold size={fs.md} lines={2} mt={3} /> */}
                    {/* <Label text={facility.join(', ')} /> */}
                    <Label text={phone} color={cd.label} size={fs.md} mt={3} />
                </View>
                <MapView
                    liteMode
                    style={styles.restaurantRegionArea}
                    initialRegion={restaurantRegion}
                >
                    <Marker
                        title={name}
                        coordinate={restaurantRegion}
                    />
                </MapView>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCulinaryDetail)