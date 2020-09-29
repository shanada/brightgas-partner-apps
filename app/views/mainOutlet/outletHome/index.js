import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { View, FlatList, ScrollView, Alert, } from 'react-native'
import styles from './style'
import { icBrightGasHome } from '../../../components/common/assetData';
import UserHomeList from '../../../components/list/userHomeList';
import { onSetLoggedIn } from '../../../redux/actions/auth'
import DefaultHeader from '../../../components/common/header';
import FastImage from 'react-native-fast-image';
import { outletHomeListData } from '../../../json/outletHomeListData';
import { bannerData } from '../../../json/bannerData';
import { Banner } from '../../../components/common/banner';
import { timeoutService, getService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

class OutletHome extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowIndicator: false,
            bannerHeight: 0,
            bannerData: bannerData,
            keywordSearch: ''
        }
    }

    componentDidMount = async () => {
        this._setHeightForBanner()
        this._onsetLogoutButton()
        this._onUserSliderGet()
    }

    _onsetLogoutButton = () => {
        this.props.navigation.setParams({
            onLogout: () => this.props.onSetLoggedIn(3, []),
            onChange: (keywordSearch) => this.setState({ keywordSearch }),
            onSearch: () => Alert.alert("Masih dalam tahap pengembangan")
        })
    }

    _onUserSliderGet = () => {
        this.setState({
            isLoading: true,
            isShowIndicator: true
        })
        const { accessToken } = this.props
        let url = 'userSliderGet'
        let body = {
            "access-token": accessToken
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            console.log(response)
            try {
                if (response.status) {
                    this.setState({
                        isLoading: false,
                        isShowIndicator: false,
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        isShowIndicator: false
                    })
                }
            } catch (error) {
                this.setState({
                    isLoading: false,
                    isShowIndicator: false
                })
                errorHandlingServiceCatch()
            }
        }).catch((error) => {
            this.setState({
                isLoading: false,
                isShowIndicator: false
            })
            rtoHandlingService()
        })
    }

    _setHeightForBanner = () => {
        let width = wp(100)
        let countWidth = 700 / width
        let bannerHeight = 390 / countWidth
        this.setState({ bannerHeight: bannerHeight - 50 })
    }

    _getImage = (url) => {
        Image.getSize(url, (width, height) => {
            let newWidth = responsiveWidth(100)
            let countWidth = width / newWidth
            let voucherImageHeight = height / countWidth
            this.setState({ voucherImageHeight })
        }, (error) => {
            
        })
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            header: () =>
                <DefaultHeader
                    home
                    largeHeader
                    title={"Selamat Datang\nDi Kota Solo"}
                    onLogout={params.onLogout} />
        };
    };

    render() {
        const { isLoading, bannerData, bannerHeight, isShowIndicator } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.contentArea}>
                    <ScrollView style={styles.listArea}>
                        <View>
                            <Banner
                                isShowIndicator={isShowIndicator}
                                isLocal
                                onPress={this._onBannerDetail}
                                data={bannerData}
                                height={bannerHeight} />
                        </View>
                        <FlatList
                            numColumns={3}
                            data={outletHomeListData}
                            renderItem={this._renderMenu}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.flatlistArea}
                            keyExtractor={(item, index) => index.toString()} />
                    </ScrollView>
                    <View style={styles.footerImgArea}>
                        <FastImage resizeMode="contain" source={icBrightGasHome} style={styles.footerImg} />
                    </View>
                </View>
            </View>
        );
    }

    _renderMenu = ({ item }) => {
        let name = item.name
        let path = item.path
        let img = item.img
        const { navigate } = this.props.navigation
        return (
            <UserHomeList
                onPress={() => navigate(path, { name })}
                name={name}
                img={img} />
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
        onSetLoggedIn: (isLoggedIn, token) => {
            dispatch(
                onSetLoggedIn(isLoggedIn, token)
            )
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutletHome)