import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, FlatList } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import UserMenuSearchList from '../../../components/list/userMenuSearchList';
import { Title } from '../../../components/common/title';
import OutletMenuSkeleton from '../../../components/skeletonLoader/outletMenuSkeleton';
import { timeoutService, getService } from '../../../services/serviceApi';
import { rtoHandlingService, errorHandlingServiceCatch } from '../../../services/serviceErrorHandling';
import { snackbarInfo } from '../../../modules/snackbarInfo';
import DefaultHeader from '../../../components/common/header';
import { imgHeaderAllMenu } from '../../../components/common/assetData';
import { Separator } from '../../../components/common/separator';
import { Label } from '../../../components/common/label';
import { fs } from '../../../components/common/fontSizeData';
import { cd } from '../../../components/common/colorData';
import SearchList from '../../../components/list/searchList';
import { addRecentSearch, deleteAllRecentSearch } from '../../../redux/actions/recentSearch';
import Ripple from 'react-native-material-ripple';

class UserMenuSearch extends PureComponent {
    constructor(props) {
        super(props);
        const { keywordSearch } = this.props.navigation.state.params
        this.state = {
            // data
            menuData: [],
            keywordSearch,
            // boolean
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this._onUserMenuSearchGet()
        this._onsetActionHeader()
    }

    _onsetActionHeader = () => {
        const { keywordSearch } = this.state
        this.props.navigation.setParams({
            onChange: (keywordSearch) => this._onChangeFormInput(keywordSearch),
            onSearch: keywordSearch.length >= 3 ? this._onUserMenuSearchGet : ()=>snackbarInfo("Kata pencarian tidak valid")
        })
    }

    _onUserMenuSearchGet = () => {
        this.setState({
            isLoading: true,
            menuData: []
        })
        const { keywordSearch } = this.state
        this.props.onSaveRecentSearch(keywordSearch)
        const { accessToken } = this.props
        let url = 'userMenuSearchGet'
        let body = {
            "access-token": accessToken,
            "cari": keywordSearch
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            console.log(response)
            try {
                if (response.status) {
                    let menuData = response.data
                    this.setState({
                        menuData,
                        isLoading: false,
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

    _onChangeFormInput = (keywordSearch) => {
        this.setState({
            keywordSearch
        })
        this.props.navigation.setParams({ keywordSearch })
    }

    _onSearchByRecent = (keywordSearch) => {
        this.setState({
            keywordSearch
        })
        this._onUserMenuSearchGet()
    }

    _onSelectMenu = (id, status) => {
        const { navigate } = this.props.navigation
        let pageName = status == 0 ? "UserCulinaryDetail" : "UserMenuDetail"
        navigate(pageName, { id })
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            header: props =>
                <DefaultHeader
                    home
                    searchInput
                    largeHeader
                    title={"Hasil Pencarian"}
                    value={params.keywordSearch}
                    onChange={params.onChange}
                    onSearch={params.onSearch} />
        }
    }

    render() {
        const { menuData, isLoading } = this.state
        const { recentSearchData } = this.props
        return (
            <View>
                {
                    recentSearchData.length > 0 ?
                        <View style={styles.baseArea}>
                            <Separator height={10} />
                            <View style={styles.listLabelArea}>
                                <View style={styles.listLabel}>
                                    <Label text={'Pencarian Terakhir'} bold size={fs.xxl} color={cd.primary} ml={10} />
                                </View>
                                <Ripple onPress={this.props.onDeleteRecentSearch}>
                                    <Label text={'Hapus'} size={fs.lg} color={cd.subLabel} ml={10} mr={10} mb={10} />
                                </Ripple>
                            </View>
                            <FlatList
                                contentContainerStyle={styles.flatListBadgeArea}
                                data={recentSearchData}
                                extraData={this.props}
                                renderItem={this._renderRecentSearch}
                                keyExtractor={(item, index) => index.toString()} />
                        </View> :
                        null
                }
                {
                    isLoading ?
                        <OutletMenuSkeleton /> :
                        <FlatList
                            data={menuData}
                            renderItem={this._renderMenuList}
                            keyExtractor={(item, index) => index.toString()}
                        />
                }
            </View>
        );
    }

    _renderRecentSearch = ({ item }) => {
        return (
            <SearchList
                onPress={() => this._onSearchByRecent(item)}
                label={item}
            />
        )
    }

    _renderMenuList = ({ item }) => {
        return (
            <UserMenuSearchList
                item={item}
                onPress={this._onSelectMenu} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.auth.accessToken,
        recentSearchData: state.recentSearch.recentSearchData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetLoader: (isLoading, loaderMessage) => {
            dispatch(
                onSetLoader(isLoading, loaderMessage)
            )
        },
        onSaveRecentSearch: (recentSearchData) => {
            dispatch(
                addRecentSearch(recentSearchData)
            )
        },
        onDeleteRecentSearch: () => {
            dispatch(
                deleteAllRecentSearch()
            )
        },
        onSetLoggedIn: (isLoggedIn, token) => {
            dispatch(
                onSetLoggedIn(isLoggedIn, token)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuSearch)