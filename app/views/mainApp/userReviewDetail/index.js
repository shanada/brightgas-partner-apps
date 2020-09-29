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
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { Label } from '../../../components/common/label';
import { fs } from '../../../components/common/fontSizeData';
import { cd } from '../../../components/common/colorData';
import VerifiedButton from '../../../components/button/verifiedButton';

class UserReviewDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userReviewDetail: null,
            isLoading: false
        }
    }

    componentDidMount = async () => {
        this._onUserReviewDetailGet()
    }

    _onUserReviewDetailGet = () => {
        this.setState({
            isLoading: true
        })
        const { id } = this.props.navigation.state.params
        const { accessToken } = this.props
        let url = 'userNewsGet'
        let body = {
            "access-token": accessToken,
            "id": id
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.status) {
                    let userReviewDetail = response.data
                    this.setState({
                        userReviewDetail,
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

    _onShareData = async () => {
        const { userReviewDetail } = this.state
        let title = userReviewDetail.judul
        let createdAt = moment(userReviewDetail.created_at).format('DD MMM YYYY, HH:mm')
        let content = userReviewDetail.artikel
        try {
            const result = await Share.share({
                message:
                `*${title}*\n${createdAt}\n${content}`
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

    render() {
        const { userReviewDetail, isLoading } = this.state
        return (
            <View>
                {
                    userReviewDetail != null ?
                        this._renderReviewDetail(userReviewDetail) :
                        isLoading ?
                            <OutletDetailSkeleton /> :
                            null
                }
            </View>
        );
    }

    _renderReviewDetail = (item) => {
        let title = item.judul
        let image = item.cover
        let createdAt = moment(item.created_at).format('DD MMM YYYY, HH:mm')
        let content = item.artikel
        return (
            <ScrollView>
                <FastImage source={{ uri: image }} style={styles.coverImg} />
                <View style={styles.labelArea}>
                    <Label text={title} color={cd.primary} bold size={fs.xl} lines={2} />
                    <Label text={createdAt} color={cd.subLabel} size={fs.md} mt={3} />
                    <Label text={content} color={cd.label} size={fs.md} mt={5} lines={100} />
                </View>
                <View style={styles.onShareArea}>
                    <VerifiedButton
                        isPrimary
                        block
                        isVerified
                        label={'BAGIKAN'}
                        onPress={this._onShareData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserReviewDetail)