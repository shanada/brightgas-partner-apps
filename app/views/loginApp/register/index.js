import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styles from './style'
import { snackbarInfo } from '../../../modules/snackbarInfo'
import { View, ScrollView, Alert } from 'react-native'
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
import subDistrict from '../../../json/3372.json'
import vo010 from '../../../json/3372010.json'
import vo020 from '../../../json/3372020.json'
import vo030 from '../../../json/3372030.json'
import vo040 from '../../../json/3372040.json'
import vo050 from '../../../json/3372050.json'

class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // bolean
            isLoading: false,
            isShowError: false,
            // string
            formName: '',
            formNumber: '',
            formEmail: '',
            formPassword: '',
            formAddress: '',
            errorMessage: '',
            villageOfficeData: vo010,
            subDistrictId: subDistrict[0].id,
            villageOfficeId: vo010[0].id
        }
    }

    componentDidMount = async () => {

    }

    _onSetRegister = () => {
        this.props.onSetLoader(true, "Mohon Tunggu")
        const { accessToken } = this.props
        const { formName, formNumber, formEmail, formAddress, formPassword, subDistrictId, villageOfficeId } = this.state
        let url = 'userRegisterPost'

        let body = {
            "access-token": accessToken,
            "nama": formName,
            "telp": formNumber,
            "email": formEmail,
            "password": formPassword,
            "alamat": formAddress,
            "id_kecamatan": subDistrictId.toString(),
            "id_kelurahan": villageOfficeId.toString(),
        }
        timeoutService(60000, postService(url, body)).then((response) => {
            try {
                if (response.status) {
                    this.props.onSetLoader(false)
                    Alert.alert(
                        'Berhasil',
                        'Proses pendaftaran berhasil'
                    )
                    const { navigate } = this.props.navigation
                    navigate("Login")
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

    _onValidateSignUp = async () => {
        const { formName, formEmail, formNumber, formDesc, formPassword, formAddress } = this.state
        let isNameValid = validator.isLength(formName, { "min": 4, "max": 100 })
        let isEmailValid = validator.isEmail(formEmail)
        let isNumberValid = validator.isLength(formNumber, { "min": 8, "max": 14 })
        let isPasswordValid = validator.isLength(formPassword, { "min": 6, "max": 16 })
        let isAddressValid = validator.isLength(formAddress, { "min": 6, "max": 64 })
        if (isNameValid && isEmailValid && isNumberValid && isPasswordValid && isAddressValid) {
            this._onSetRegister()
        } else if (!isNameValid) {
            let errorMessage = "Nama Usaha minimal 4 karakter dan maksimal 100 karakter"
            this.setState({
                errorMessage,
                isShowError: true
            })
        } else if (!isEmailValid) {
            let errorMessage = "Format email tidak valid"
            this.setState({
                errorMessage,
                isShowError: true
            })
        } else if (!isNumberValid) {
            let errorMessage = "Telepon Pemilik minimal 8 karakter dan maksimal 14 karakter"
            this.setState({
                errorMessage,
                isShowError: true
            })
        } else if (!isAddressValid) {
            let errorMessage = "Alamat minimal 6 karakter dan maksimal 64 karakter"
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

    _onSetLogin = () => {
        this.props.onSetLoggedIn(true)
    }

    _onChangeText = (value, type) => {
        this.setState({
            errorMessage: ''
        })
        type == 'name' ?
            this.setState({
                formName: value
            }) :
            type == 'email' ?
                this.setState({
                    formEmail: value
                }) :
                type == 'number' ?
                    this.setState({
                        formNumber: value
                    }) :
                    type == 'address' ?
                        this.setState({
                            formAddress: value
                        }) :
                        this.setState({
                            formPassword: value
                        })
    }

    _onSetSubDistrict = (subDistrictId) => {
        let villageOfficeData = this._onSelectVillageOffice(subDistrictId)
        this.setState({
            villageOfficeData,
            subDistrictId
        })
    }

    _onSetVillageOffice = (villageOfficeId) => {
        this.setState({
            villageOfficeId
        })
    }

    _onSelectVillageOffice = (id) => {
        return {
            3372010: vo010,
            3372020: vo020,
            3372030: vo030,
            3372040: vo040,
            3372050: vo050,
        }[id]
    }

    render() {
        const { formEmail, formPassword, formName, formNumber, formAddress, subDistrictId, villageOfficeId, villageOfficeData, errorMessage, isShowError } = this.state
        return (
            <ScrollView style={styles.contentFlex}>
                <View style={styles.container}>
                    <TextFormInput
                        label={'Nama'}
                        placeholder={'Nama'}
                        name
                        onChangeText={(value) => this._onChangeText(value, 'name')}
                        value={formName} />
                    <TextFormInput
                        label={'Nomor Telepon'}
                        placeholder={'Nomor Telepon'}
                        number
                        onChangeText={(value) => this._onChangeText(value, 'number')}
                        value={formNumber} />
                    <TextFormInput
                        label={'Email'}
                        placeholder={'Email'}
                        email
                        onChangeText={(value) => this._onChangeText(value, 'email')}
                        value={formEmail} />
                    <TextFormInput
                        label={'Kata Sandi'}
                        placeholder={'Kata Sandi'}
                        password
                        onChangeText={(value) => this._onChangeText(value, 'password')}
                        value={formPassword} />
                    <TextFormInput
                        label={'Alamat'}
                        placeholder={'Alamat'}
                        name
                        onChangeText={(value) => this._onChangeText(value, 'address')}
                        value={formAddress} />
                    <TextFormInput
                        label={'Kecamatan'}
                        picker
                        pickerData={subDistrict}
                        onChangePicker={(value) => this._onSetSubDistrict(value)}
                        value={subDistrictId} />
                    <TextFormInput
                        label={'Kelurahan'}
                        picker
                        pickerData={villageOfficeData}
                        onChangePicker={(value) => this._onSetVillageOffice(value)}
                        value={villageOfficeId} />
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
                        label={'DAFTAR SEKARANG'}
                        onPress={this._onValidateSignUp}
                        isVerified
                        block
                        isPrimary />
                    {/* <View>
                        <Label text={'Lewati'} color={cd.danger} align={'center'} size={fs.md} />
                    </View> */}
                </View>
            </ScrollView>
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
        },
        onSaveUserData: (userData) => {
            dispatch(

            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)