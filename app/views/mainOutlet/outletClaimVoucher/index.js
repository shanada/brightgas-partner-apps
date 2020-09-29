import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, Alert } from 'react-native';
import { onSetLoader } from '../../../redux/actions/componentState';
import { onSetLoggedIn } from '../../../redux/actions/auth';
import { timeoutService, postService } from '../../../services/serviceApi';
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling';
import TextFormInput from '../../../components/form/textFormInput';
import VerifiedButton from '../../../components/button/verifiedButton';
import { Label } from '../../../components/common/label';
import { cd } from '../../../components/common/colorData';
import { fs } from '../../../components/common/fontSizeData';
import validator from 'validator';
import { snackbarInfo } from '../../../modules/snackbarInfo';

class OutletClaimVoucher extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            voucherCode: ''
        }
    }

    componentDidMount = async () => {
        // this._onGet()
    }

    _onOutletClaimVoucherPost = () => {
        this.props.onSetLoader(true, "Mohon tunggu")
        const { voucherCode } = this.state
        const { accessToken } = this.props
        let url = 'outletClaimVoucherPost'
        let body = {
            "access-token": accessToken,
            "kode_kupon": voucherCode,
        }
        timeoutService(60000, postService(url, body)).then((response) => {
           this.props.onSetLoader(false)
            try {
                if (response.status) {
                    let message = response.message
                    setTimeout(() => {
                        Alert.alert(
                            message,
                            "Klaim kupon telah berhasil"
                        )
                    }, 200);
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
            onSetLoader(false)
            setTimeout(() => {
                rtoHandlingService()
            }, 200);
        })
    }

    _onValidateClaim = () => {
        const { voucherCode } = this.state
        let isVoucherCodeValid = validator.isLength(voucherCode, { "min": 1 })
        if (isVoucherCodeValid) {
            this._onOutletClaimVoucherPost()
        } else {
            let errorMessage = "Kode kupon harus di isi"
            this.setState({
                errorMessage,
                isShowError: true
            })
        }
        setTimeout(() => {
            this.setState({
                isShowError: false
            })
        }, 3000);
    }

    _onChangeText = (value, type) => {
        this.setState({
            errorMessage: ''
        })
        type == "id" ?
            this.setState({
                userId: value
            }) :
            this.setState({
                voucherCode: value
            })
    }

    render() {
        const { userId, voucherCode, isShowError, errorMessage } = this.state
        return (
            <View>
                <View>
                    {/* <TextFormInput
                        label={"ID User"}
                        placeholder={'ID User'}
                        name
                        onChangeText={(value) => this._onChangeText(value, 'id')}
                        value={userId} /> */}
                    <TextFormInput
                        label={'Kode Kupon'}
                        placeholder={'Kode Kupon'}
                        name
                        onChangeText={(value) => this._onChangeText(value, 'code')}
                        value={voucherCode} />
                    {
                        isShowError ?
                            <View style={styles.errorArea}>
                                <Label text={errorMessage} color={cd.danger} align={'center'} size={fs.md} />
                            </View> :
                            null
                    }
                </View>
                <View style={styles.buttonArea}>
                    <VerifiedButton
                        label={'KLAIM KUPON'}
                        onPress={this._onValidateClaim}
                        isVerified
                        block
                        isPrimary />
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutletClaimVoucher)