import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { View, FlatList, ScrollView, Alert, Image} from 'react-native'
import styles from './style'
import { addRecentSearch } from '../../../redux/actions/recentSearch';
import { icBrightGasHome } from '../../../components/common/assetData';
import { Banner } from '../../../components/common/banner';
import { timeoutService, getService } from '../../../services/serviceApi';
import { homeListData } from '../../../json/homeListData';
import UserHomeList from '../../../components/list/userHomeList';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { onSetLoggedIn } from '../../../redux/actions/auth'
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import DefaultHeader from '../../../components/common/header';
import FastImage from 'react-native-fast-image';
import { snackbarInfo } from '../../../modules/snackbarInfo';

class UserHome extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowIndicator: false,
            bannerHeight: 0,
            bannerData: [],
            keywordSearch: ''
        }
    }

    componentDidMount = async () => {
        this._setHeightForBanner()
        this._onUserSliderGet()
        this._onsetLogoutButton()
    }

    _onsetLogoutButton = () => {
        this.props.navigation.setParams({
            onLogout: () => this.props.onSetLoggedIn(3, []),
            onChange: (keywordSearch) => this.setState({ keywordSearch }),
            onSearch: this._onSearchKeyword
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
            try {
                if (response.status) {
                    let bannerData = response.data
                    let imgUrl = bannerData[0].name
                    this._getImage(imgUrl)
                    this.setState({
                        bannerData,
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
        let countWidth = 1668 / width
        let bannerHeight = 704 / countWidth
        this.setState({ bannerHeight: bannerHeight })
    }

    _getImage = (url) => {
        Image.getSize(url, (width, height) => {
            let newWidth = responsiveWidth(100)
            let countWidth = width / newWidth
            let bannerHeight = height / countWidth
            this.setState({ bannerHeight })
        }, (error) => {
            
        })
    }

    _onBannerDetail = (id) => {
        const { navigate } = this.props.navigation
        navigate('PromoDiscountDetail', { id })
    }

    _onShowLoginAlert=()=>{
        Alert.alert(
            "Masuk Sebagai Pengguna",
            "Masuk sebagai pengguna agar dapat mendapatkan informasi promo dan klaim kupon",
            [
                {
                    text: "Batal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Ya", onPress: () => this.props.onSetLoggedIn(null)
                }
            ]
        )
    }

    _onSearchKeyword=()=>{
        const { keywordSearch } = this.state
        if(keywordSearch.length >= 3){
            const { navigate } = this.props.navigation
            navigate("UserMenuSearch", { keywordSearch })
        } else {
            snackbarInfo("Kata pencarian tidak valid")
        }

    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            header: () =>
                <DefaultHeader
                    home
                    searchInput
                    largeHeader
                    title={"Selamat Datang\nDi Kota Solo"}
                    onChange={params.onChange}
                    onSearch={params.onSearch}
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
                                onPress={this._onBannerDetail}
                                data={bannerData}
                                height={bannerHeight} />
                        </View>
                        <FlatList
                            numColumns={3}
                            data={homeListData}
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
        const { isLoggedIn } = this.props
        let name = item.name
        let path = item.path
        let img = item.img
        const { navigate } = this.props.navigation
        return (
            <UserHomeList
                onPress={ path == "UserVouchers" && isLoggedIn == 2 ? this._onShowLoginAlert : () => navigate(path, { name })}
                name={name}
                img={img} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken,
        isLoggedIn: state.auth.isLoggedIn,
        recentSearchData: state.recentSearch.recentSearchData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveRecentSearch: (recentSearchData) => {
            dispatch(
                addRecentSearch(recentSearchData)
            )
        },
        onSetLoggedIn: (isLoggedIn, token) => {
            dispatch(
                onSetLoggedIn(isLoggedIn, token)
            )
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)