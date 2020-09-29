import React, { PureComponent } from 'react';
import { View, ScrollView, FlatList, Alert } from 'react-native'
import styles from './style'
import { connect } from 'react-redux';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import UserVoucherList from '../../../components/list/userVoucherList';
import { Separator } from '../../../components/common/separator';
import Ripple from 'react-native-material-ripple';
import { Label } from '../../../components/common/label';
import { fs } from '../../../components/common/fontSizeData';
import { cd } from '../../../components/common/colorData';
import { timeoutService, getService, postService } from '../../../services/serviceApi';
import { rtoHandlingService, errorHandlingServiceCatch } from '../../../services/serviceErrorHandling';
import { snackbarInfo } from '../../../modules/snackbarInfo';

class UserVouchers extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 1,
            vouchersAvailableData: [],
            vouchersOwnedData: [],
            isLoadingAvailable: false,
            isLoadingOwned: false
        }
    }

    componentDidMount = async () => {
        this._onUserVoucherAvailableGet()
        this._onUserVoucherOwnedGet()
    }

    _onUserVoucherAvailableGet = () => {
        this.setState({
            isLoadingAvailable: true
        })
        const { accessToken } = this.props
        const url = "userVoucherAvailableGet"
        const body = {
            "access-token": accessToken
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.status) {
                    let vouchersAvailableData = response.data
                    this.setState({
                        vouchersAvailableData,
                        isLoadingAvailable: false,
                    })
                } else {
                    this.setState({
                        isLoadingAvailable: false
                    })
                    let message = response.message
                    snackbarInfo(message)
                }
            } catch (error) {
                this.setState({
                    isLoadingAvailable: false
                })
                errorHandlingServiceCatch()
            }
        }).catch((error) => {
            rtoHandlingService()
        })
    }

    _onUserVoucherOwnedGet = () => {
        this.setState({
            isLoadingOwned: true
        })
        const { accessToken, userData } = this.props
        const url = "userVoucherOwnedGet"
        const body = {
            "access-token": accessToken,
            "userid": userData.userid
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.status) {
                    let vouchersOwnedData = response.data
                    this.setState({
                        vouchersOwnedData,
                        isLoadingOwned: false,
                    })
                } else {
                    this.setState({
                        isLoadingOwned: false
                    })
                    let message = response.message
                    // snackbarInfo(message)
                }
            } catch (error) {
                this.setState({
                    isLoadingOwned: false
                })
                errorHandlingServiceCatch()
            }
        }).catch((error) => {
            rtoHandlingService()
        })
    }

    _onUserVoucherClaimPost = (voucherId) => {
        this.props.onSetLoader(true, "Memproses Klaim Voucher")
        const { accessToken, userData } = this.props
        const url = "userVoucherClaimPost"
        const body = {
            "access-token": accessToken,
            "userid": userData.userid,
            "id_kupon": voucherId
        }
        timeoutService(60000, postService(url, body)).then((response) => {
            try {
                if (response.status) {
                    let message = response.message
                    this.props.onSetLoader(false)
                    setTimeout(() => {
                        snackbarInfo(message, 'success')
                    }, 200);
                    this._onUserVoucherOwnedGet()
                } else {
                    let message = response.message
                    this.props.onSetLoader(false)
                    setTimeout(() => {
                        snackbarInfo(message)
                    }, 200);
                }
            } catch (error) {
                this.props.onSetLoader(false)
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

    _onPromoDiscountDetail = (id, name) => {
        Alert.alert(
            name,
            `Apakah anda akan mengambil kupon ${name}?`,
            [
                {
                    text: "Batal",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Ya", onPress: () => this._onUserVoucherClaimPost(id)
                }
            ]
        )
    }

    _onChangeTab = (selectedTab) => {
        this.setState({
            selectedTab
        })
    }

    render() {
        const { selectedTab, vouchersAvailableData, vouchersOwnedData } = this.state
        let tabsLabel = [
            { id: 1, label: "Tersedia" },
            { id: 2, label: "Dimiliki" }
        ]
        let vouchersData = selectedTab == 1 ? vouchersAvailableData : vouchersOwnedData
        return (
            <View style={styles.container}>
                <View style={styles.tabButtonArea}>
                    {
                        tabsLabel.map((x) => {
                            let id = x.id
                            let label = x.label
                            let isSelected = selectedTab == id ? true : false
                            return (
                                <Ripple
                                    key={id}
                                    onPress={() => this._onChangeTab(id)}
                                    style={[styles.tabButton, { borderBottomWidth: isSelected ? 3 : 0 }]}>
                                    <Label text={label} size={fs.lg} bold={isSelected} color={isSelected ? cd.label : cd.subLabel} />
                                </Ripple>
                            )
                        })
                    }
                </View>
                <View style={styles.containerArea}>
                    <FlatList
                        data={vouchersData}
                        renderItem={this._renderPromoDiscountList}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.flatlistArea}
                        keyExtractor={(item, index) => index.toString()} />
                    <Separator height={10} />
                </View>
            </View>
        );
    }

    _renderPromoDiscountList = ({ item }) => {
        const { selectedTab } = this.state
        return (
            <UserVoucherList
                onPress={selectedTab == 1 ? this._onPromoDiscountDetail : ()=>console.log('owned')}
                item={item} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserVouchers)