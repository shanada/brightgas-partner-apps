import React, { PureComponent } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from './style'
import { connect } from 'react-redux';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import UserReviewList from '../../../components/list/userReviewList';
import { Label } from '../../../components/common/label';
import { fs } from '../../../components/common/fontSizeData';
import { cd } from '../../../components/common/colorData';
import OutletReviewSkeleton from '../../../components/skeletonLoader/outletReviewSkeleton';
import { timeoutService, getService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import { snackbarInfo } from '../../../modules/snackbarInfo';
import TextFormInput from '../../../components/form/textFormInput';


class UserReview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 2,
            searchKeywordInfo: '',
            searchKeywordReview: '',
            // boolean
            isLoading: false,
            newsData: [],
            reviewData: [],
            status: 0
        }
    }

    componentDidMount = async () => {
        let statusData = [1, 0]
        statusData.map((x) => {
            this._onUserNewsGet(x)
        })
    }

    _onUserNewsGet = (status) => {
        this.setState({
            isLoading: true
        })
        const { accessToken } = this.props
        let url = 'userNewsGet'
        let body = {
            "access-token": accessToken,
            status: status
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.status) {
                    if (status == 0) {
                        let newsData = response.data
                        this.setState({
                            newsData,
                            isLoading: false,
                        })
                    } else {
                        let reviewData = response.data
                        this.setState({
                            reviewData,
                            isLoading: false,
                        })
                    }
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

    _onChangeTab = (selectedTab) => {
        this.setState({
            selectedTab
        })
    }

    _onSelectReview = (id) => {
        const { navigate } = this.props.navigation
        navigate("UserReviewDetail", { id })
    }

    render() {
        const { selectedTab, isLoading, newsData, reviewData, searchKeywordInfo, searchKeywordReview } = this.state
        let keyword = selectedTab == 2 ? searchKeywordReview : searchKeywordInfo
        const filterRegex = new RegExp(String(keyword.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")), 'i')
        const filter = item => filterRegex.test(item.judul) || filterRegex.test(item.artikel)
        let filteredNewsData = newsData.filter(filter)
        let filteredReviewData = reviewData.filter(filter)
        let tabsLabel = [
            { id: 2, label: "Ulasan Makanan" },
            { id: 1, label: "Info Kuliner" },
        ]
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
                    {
                        selectedTab == 2 ?
                            <TextFormInput
                                placeholder={'Cari ulasan makanan'}
                                name
                                onChangeText={(searchKeywordReview) => this.setState({ searchKeywordReview })}
                                value={searchKeywordReview} /> :
                            <TextFormInput
                                placeholder={'Cari info kuliner'}
                                name
                                onChangeText={(searchKeywordInfo) => this.setState({ searchKeywordInfo })}
                                value={searchKeywordInfo} />
                    }
                    {
                        isLoading ?
                            <OutletReviewSkeleton /> :
                            <FlatList
                                data={selectedTab == 1 ? filteredNewsData : filteredReviewData}
                                renderItem={this._renderReviewList}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()} />
                    }
                </View>
            </View>
        );
    }

    _renderReviewList = ({ item }) => {
        return (
            <UserReviewList
                onPress={this._onSelectReview}
                item={item} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserReview)