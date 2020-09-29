import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styles from './style'
import { snackbarInfo } from '../../../modules/snackbarInfo'
import { View } from 'react-native'
import { onSetLoader } from '../../../redux/actions/componentState'
import TextFormInput from '../../../components/form/textFormInput'
import validator from 'validator'
import VerifiedButton from '../../../components/button/verifiedButton'
import { onSetLoggedIn } from '../../../redux/actions/auth'
import { Label } from '../../../components/common/label'
import { cd } from '../../../components/common/colorData'
import { fs } from '../../../components/common/fontSizeData'
import { timeoutService, postService } from '../../../services/serviceApi'
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling'
import DefaultHeader from '../../../components/common/header'

class Login extends PureComponent {
    constructor(props) {
        super(props);
        const { type } = this.props.navigation.state.params
        this.state = {
            // bolean
            isShowError: false,
            // string
            formEmail: '',
            formPassword: '',
            errorMessage: ''
        }
    }

    componentDidMount = async () => {
        const { type } = this.props.navigation.state.params
        this.props.navigation.setParams({type})
    }

    _onLogin = () => {
        this.props.onSetLoader(true, "Mohon Tunggu")
        const { accessToken } = this.props
        const { formEmail, formPassword } = this.state
        let url = 'loginPost'
        let body = {
            "access-token": accessToken,
            "email": formEmail,
            "password": formPassword,
        }
        timeoutService(60000, postService(url, body)).then((response) => {
            console.log(response)
            try {
                if (response.status) {
                    this.props.onSetLoader(false)
                    let userData = response.data
                    let userRole = userData.role == undefined ? 1 : 0
                    this.props.onSetLoggedIn(userRole, userData)
                } else {
                    this.props.onSetLoader(false)
                    let message = response.message
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

    _onValidateLogin = () => {
        const { formEmail, formPassword } = this.state
        let isEmailValid = validator.isEmail(formEmail)
        let isPasswordValid = validator.isLength(formPassword, { "min": 6, "max": 16 })
        if (isEmailValid && isPasswordValid) {
            this._onLogin()
        } else if (!isEmailValid) {
            let errorMessage = "Format email tidak valid"
            this.setState({
                errorMessage,
                isShowError: true
            })
        } else {
            let errorMessage = "Password minimal 6 karakter dan maksimal 16 karakter"
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
        type == 'email' ?
            this.setState({
                formEmail: value
            }) :
            this.setState({
                formPassword: value
            })  
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            header: () =>
                <DefaultHeader
                    largeHeader
                    headerImg={params.type}
                    isNewLogin={true} />
        };
    };

    render() {
        const { formEmail, formPassword, errorMessage, isShowError } = this.state
        return (
            <View style={styles.contentFlex}>
                <View style={styles.container}>
                    <TextFormInput
                        label={'Email'}
                        placeholder={'example@mail.com'}
                        email
                        onChangeText={(value) => this._onChangeText(value, 'email')}
                        onClearText={() => this._onClearText('email')}
                        value={formEmail} />
                    <TextFormInput
                        label={'Password'}
                        placeholder={'password'}
                        password
                        onChangeText={(value) => this._onChangeText(value, 'password')}
                        value={formPassword} />
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
                        label={'LOGIN'}
                        onPress={this._onValidateLogin}
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
        onSetLoggedIn: (isLoggedIn, userData) => {
            dispatch(
                onSetLoggedIn(isLoggedIn, userData)
            )
        },
        onSaveUserData: (userData) => {
            dispatch(

            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)