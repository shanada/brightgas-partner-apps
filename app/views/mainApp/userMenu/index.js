import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, FlatList } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import UserMenuList from '../../../components/list/userMenuList';
import { Title } from '../../../components/common/title';
import OutletMenuSkeleton from '../../../components/skeletonLoader/outletMenuSkeleton';
import { timeoutService, getService } from '../../../services/serviceApi';
import { rtoHandlingService, errorHandlingServiceCatch } from '../../../services/serviceErrorHandling';
import { snackbarInfo } from '../../../modules/snackbarInfo';
import DefaultHeader from '../../../components/common/header';
import { imgHeaderFavorite, imgHeaderAllMenu, imgHeaderDiscount } from '../../../components/common/assetData';

class UserMenu extends PureComponent {
    constructor(props) {
        super(props);
        const { name } = this.props.navigation.state.params
        this.state = {
            // data
            statusMenu: name == "Terlaris" ? 1 : name == "Diskon Resto" ? 2 : null,
            menuData: [],
            // boolean
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this._onUserMenuGet()
    }

    _onUserMenuGet = () => {
        this.setState({
            isLoading: true
        })
        const { statusMenu } = this.state
        const { accessToken } = this.props
        let url = 'userMenuGet'
        let body = {
            "access-token": accessToken,
            "status": statusMenu
        }
        timeoutService(60000, getService(url, body)).then((response) => {
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

    _onSelectMenu = (id) => {
        const { navigate } = this.props.navigation
        navigate("UserMenuDetail", { id })
    }

    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params
        let headerImg = name == "Terlaris" ? imgHeaderFavorite : name == "Semua Makanan" ? imgHeaderAllMenu : imgHeaderDiscount
        return {
            header: props => <DefaultHeader userHeader userHeaderImg={headerImg} />
        }
    }

    render() {
        const { menuData, isLoading } = this.state
        return (
            <View>
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

    _renderMenuList = ({ item }) => {
        return (
            <UserMenuList
                item={item}
                onPress={this._onSelectMenu} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)