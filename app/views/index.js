import React, { PureComponent } from "react";
import { View } from 'react-native';
import OfflineNotice from '../components/common/offlineNotice'
import { connect } from "react-redux";
import Loader from "../components/common/loader";
import { MainNavigator, LoginNavigator, OutletNavigator } from "./navigation";
import { onSetLoader } from "../redux/actions/componentState";

class Application extends PureComponent {

    componentDidMount = () => {
        this.props.onSetLoader(false)
    }

    render() {
        const { isLoggedIn, isLoading, loaderMessage } = this.props
        return (
            <View style={{ flex: 1 }}>
                {
                    isLoggedIn == 0 || isLoggedIn == 2 ?
                        <MainNavigator /> :
                        isLoggedIn == 1 ?
                            <OutletNavigator /> :
                            <LoginNavigator />
                }
                <OfflineNotice />
                <Loader isLoading={isLoading} loaderMessage={loaderMessage} />s
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // auth status
        isLoggedIn: state.auth.isLoggedIn,
        //loader state
        isLoading: state.componentState.isLoading,
        loaderMessage: state.componentState.loaderMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetLoader: (isLoading, loaderMessage) => {
            dispatch(
                onSetLoader(isLoading, loaderMessage)
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)