import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import { timeoutService, getService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';

class Template extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = async () => {
        this._onGet()
    }

    _onGet = () => {
        this.setState({
            isLoadingList: true
        })
        const { accessToken } = this.props
        let url = 'Get'
        let body = {
            "access-token": accessToken
        }
        timeoutService(60000, getService(url, body)).then((response) => {
            try {
                if (response.status) {
                    console.log(response.data)
                    this.setState({
                        isLoadingList: false,
                    })
                } else {
                    this.setState({
                        isLoadingList: false
                    })
                }
            } catch (error) {
                this.setState({
                    isLoadingList: false
                })
                errorHandlingServiceCatch()
            }
        }).catch((error) => {
            this.setState({
                isLoadingList: false
            })
            rtoHandlingService()
        })
    }

    render() {
        return (
            <View>

            </View>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Template)