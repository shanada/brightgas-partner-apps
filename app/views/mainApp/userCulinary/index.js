import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { snackbarInfo } from '../../../modules/snackbarInfo';
import { View, FlatList } from 'react-native';
import { timeoutService, getService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import OutletList from '../../../components/list/userCulinaryList';
import OutletSkeleton from '../../../components/skeletonLoader/outletSkeleton';

class UserCulinary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            culinaryData: []
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
        let url = 'userCulinaryGet'
        let body = {
            "access-token": accessToken
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.status) {
                    let culinaryData = response.results
                    this.setState({
                        isLoading: false,
                        culinaryData
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

    _onSelectRestaurant = (id, name, restaurantImg) => {
        const { navigate } = this.props.navigation
        navigate('UserCulinaryDetail', { id, name, restaurantImg })
    }

    render() {
        const { isLoading, culinaryData } = this.state
        return (
            <View>
                {
                    isLoading ?
                        <OutletSkeleton /> :
                        <FlatList
                            data={culinaryData}
                            renderItem={this._renderRestaurantList}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                        />
                }
            </View>
        );
    }

    _renderRestaurantList = ({ item }) => {
        return (
            <OutletList
                onPress={this._onSelectRestaurant}
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCulinary)