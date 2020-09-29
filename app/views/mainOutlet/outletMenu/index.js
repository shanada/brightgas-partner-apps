import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, FlatList, Alert } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import { Title } from '../../../components/common/title';
import OutletMenuSkeleton from '../../../components/skeletonLoader/outletMenuSkeleton';
import { timeoutService, getService, deleteService } from '../../../services/serviceApi';
import { rtoHandlingService, errorHandlingServiceCatch } from '../../../services/serviceErrorHandling';
import { snackbarInfo } from '../../../modules/snackbarInfo';
import OutletMenuList from '../../../components/list/outletMenuList';
import { Label } from '../../../components/common/label';
import Ripple from 'react-native-material-ripple';
import { fs } from '../../../components/common/fontSizeData';
import { cd } from '../../../components/common/colorData';

class OutletMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // data
            menuData: [],
            // boolean
            isLoading: false,
            isEdit: false
        }
    }

    componentDidMount = async () => {
        this._onOutletMenuGet()
    }

    _onOutletMenuGet = () => {
        this.setState({
            isLoading: true
        })
        const { accessToken, userData } = this.props
        let url = 'outletMenuGet'
        let body = {
            "access-token": accessToken,
            "id_kuliner": userData.id_kuliner
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

    _onOutletMenuDelete = (id) => {
        this.props.onSetLoader(true, "Mohon tunggu")
        const { accessToken } = this.props
        let url = 'outletMenuDelete'
        let body = {
            "access-token": accessToken,
            "id": id
        }
        timeoutService(60000, deleteService(url, body)).then((response) => {
            this.props.onSetLoader(false)
            console.log(response)
            try {
                if (response.status) {
                    let message = response.message
                    Alert.alert(
                        'Berhasil',
                        message
                    )
                    this._onOutletMenuGet()
                } else {
                    let message = response.message
                    setTimeout(() => {
                        snackbarInfo(message)
                    }, 200);
                }
            } catch (error) {
                setTimeout(() => {
                    errorHandlingServiceCatch()
                }, 200);
            }
        }).catch((error) => {
            this.props.onSetLoader(false)
            setTimeout(() => {
                rtoHandlingService()
            }, 200);
        })
    }

    _onAddMenu = () => {
        const { navigate } = this.props.navigation
        let isEdited = false
        navigate("OutletMenuForm", { isEdited, item: null, action: this._onOutletMenuGet })
    }

    _onSelectMenu = (item) => {
        let id = item.id
        let name = item.nama_makanan
        Alert.alert(
            `Menu`,
            name,
            [
                {
                    text: "Batal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Hapus", onPress: () => this._onOutletMenuDelete(id)
                },
                {
                    text: "Edit", onPress: () => this._onEditMenu(item)
                }
            ]
        )
    }

    _onEditMenu = (item) => {
        const { navigate } = this.props.navigation
        let isEdited = true
        navigate("OutletMenuForm", { isEdited, item, action: this._onOutletMenuGet })
    }

    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params
        return {
            headerTitle: () => <Title title={name} />
        }
    }

    render() {
        const { menuData, isLoading } = this.state
        return (
            <View style={styles.containerArea}>
                <View style={styles.topArea}>
                    <Label text={"Daftar Menu"} size={fs.xxl} color={cd.subLabel} />
                    <Ripple
                        onPress={this._onAddMenu}
                        style={styles.addButtonArea}>
                        <Label text={'Tambah Menu'} size={fs.lg} color={cd.title} />
                    </Ripple>
                </View>

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
            <OutletMenuList
                item={item}
                onPress={this._onSelectMenu} />
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(OutletMenu)