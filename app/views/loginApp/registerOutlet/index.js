import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styles from './style'
import { snackbarInfo } from '../../../modules/snackbarInfo'
import { View, ScrollView, Linking, Alert } from 'react-native'
import { onSetLoader } from '../../../redux/actions/componentState'
import TextFormInput from '../../../components/form/textFormInput'
import validator from 'validator'
import VerifiedButton from '../../../components/button/verifiedButton'
import { onSetLoggedIn } from '../../../redux/actions/auth'
import { Label } from '../../../components/common/label'
import { cd } from '../../../components/common/colorData'
import { fs } from '../../../components/common/fontSizeData'
import subDistrict from '../../../json/3372.json'
import vo010 from '../../../json/3372010.json'
import vo020 from '../../../json/3372020.json'
import vo030 from '../../../json/3372030.json'
import vo040 from '../../../json/3372040.json'
import vo050 from '../../../json/3372050.json'
import { timeoutService, postService } from '../../../services/serviceApi'
import { errorHandlingServiceCatch, rtoHandlingService } from '../../../services/serviceErrorHandling'
import FastImage from 'react-native-fast-image'
import { icCheck, icUncheck, icMyPertamina } from '../../../components/common/assetData'
import Ripple from 'react-native-material-ripple'
import Modal from 'react-native-modal'

class RegisterOutlet extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            // bolean
            isLoading: false,
            isShowError: false,
            isBrightGasOwned: false,
            isShowDownloadConfirmation: false,
            // string
            formOwnerName: '',
            formName: '',
            formDesc: '',
            formEmail: '',
            formPassword: '',
            formNumber: '',
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
        const { formName, formNumber, formEmail, formAddress, formPassword, formOwnerName, formDesc, subDistrictId, villageOfficeId } = this.state
        let url = 'outletRegisterPost'

        let body = {
            "access-token": accessToken,
            "pemilik": formOwnerName,
            "nama_kuliner": formName,
            "deskripsi": formDesc,
            "tlp_kuliner": formNumber,
            "email": formEmail,
            "password": formPassword,
            "alamat_kuliner": formAddress,
            "id_kecamatan": subDistrictId.toString(),
            "id_kelurahan": villageOfficeId.toString(),
        }
        timeoutService(60000, postService(url, body)).then((response) => {
            console.warn(response)
            try {
                if (response.status) {
                    this.props.onSetLoader(false)
                    Alert.alert(
                        'Berhasil',
                        'Terimakasih sudah mendaftarkan usaha kuliner anda'
                    )
                    const { navigate } = this.props.navigation
                    navigate("LoginOutlet")
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

    _onValidateSignUp = () => {
        const { formName, formOwnerName, formNumber, formDesc, formEmail, formAddress, formPassword } = this.state
        let isNameValid = validator.isLength(formName, { "min": 4, "max": 100 })
        let isOwnerNameValid = validator.isLength(formOwnerName, { "min": 4, "max": 24 })
        let isDescValid = validator.isLength(formDesc, { "min": 16, "max": 256 })
        let isNumberValid = validator.isLength(formNumber, { "min": 8, "max": 14 })
        let isPasswordValid = validator.isLength(formPassword, { "min": 6, "max": 16 })
        let isEmailValid = validator.isEmail(formEmail)
        let isAddressValid = validator.isLength(formAddress, { "min": 6, "max": 64 })
        if (isNameValid && isOwnerNameValid && isDescValid && isNumberValid && isPasswordValid && isEmailValid && isAddressValid) {
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
        } else if (!isAddressValid) {
            let errorMessage = "Alamat minimal 6 karakter dan maksimal 64 karakter"
            this.setState({
                errorMessage,
                isShowError: true
            })
        } else if (!isOwnerNameValid) {
            let errorMessage = "Nama Pemilik minimal 4 karakter dan maksimal 24 karakter"
            this.setState({
                errorMessage,
                isShowError: true
            })
        } else if (!isDescValid) {
            let errorMessage = "Deskripsi Kuliner minimal 16 karakter dan maksimal 256 karakter"
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

    // _onSetRegister = () => {
    //     this.props.onSetLoggedIn(true)
    // }

    _onChangeText = (value, type) => {
        this.setState({
            errorMessage: ''
        })
        type == 'name' ?
            this.setState({
                formName: value
            }) :
            type == 'ownerName' ?
                this.setState({
                    formOwnerName: value
                }) :
                type == 'email' ?
                    this.setState({
                        formEmail: value
                    }) :
                    type == 'desc' ?
                        this.setState({
                            formDesc: value
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

    _onCheckedBrightGas = () => {
        const { isBrightGasOwned, isShowDownloadConfirmation } = this.state
        if (isBrightGasOwned == false) {
            this.setState({
                isShowDownloadConfirmation: !isShowDownloadConfirmation
            })
        }
        this.setState({
            isBrightGasOwned: !isBrightGasOwned,
        })
    }

    _onOpenMyPertaminaApps = () => {
        Linking.openURL("https://play.google.com/store/apps/details?id=com.dafturn.mypertamina")
    }

    render() {
        const { formDesc, formPassword, formName, formOwnerName, formNumber, formEmail, formAddress, subDistrictId, villageOfficeId, villageOfficeData, errorMessage, isShowError, isBrightGasOwned, isShowDownloadConfirmation } = this.state
        return (
            <ScrollView style={styles.contentFlex}>

                <Modal
                    style={styles.modalArea}
                    isVisible={isShowDownloadConfirmation}
                    onBackButtonPress={() => this.setState({ isShowDownloadConfirmation: false })}
                    onBackdropPress={() => this.setState({ isShowDownloadConfirmation: false })} >
                    <View style={styles.modalContainer}>
                            <Label text={'Download Aplikasi\nMy Pertamina'} bold color={cd.primary} size={fs.xxl} align={'center'} mb={10} lines={2} />
                        <FastImage style={styles.myPertaminaModalImg} source={icMyPertamina} />
                        <View style={styles.buttonModalArea}>
                            <VerifiedButton
                                label={'DOWNLOAD'}
                                onPress={this._onOpenMyPertaminaApps}
                                isVerified
                                isPrimary />
                        </View>
                    </View>
                </Modal>

                <View style={styles.container}>
                    <TextFormInput
                        label={'Nama Usaha Kuliner'}
                        placeholder={'Nama Usaha Kuliner'}
                        name
                        onChangeText={(value) => this._onChangeText(value, 'name')}
                        value={formName} />
                    <TextFormInput
                        label={'Nama Pemilik'}
                        placeholder={'Nama Pemilik'}
                        name
                        onChangeText={(value) => this._onChangeText(value, 'ownerName')}
                        value={formOwnerName} />
                    <TextFormInput
                        label={'Telepon Pemilik'}
                        placeholder={'Telepon Pemilik'}
                        number
                        onChangeText={(value) => this._onChangeText(value, 'number')}
                        value={formNumber} />
                    <TextFormInput
                        label={'Deskripsi Kuliner'}
                        placeholder={'Deskripsi Kuliner'}
                        email
                        onChangeText={(value) => this._onChangeText(value, 'desc')}
                        value={formDesc} />
                    <TextFormInput
                        label={'Email'}
                        placeholder={'Email'}
                        email
                        onChangeText={(value) => this._onChangeText(value, 'email')}
                        value={formEmail} />
                    <TextFormInput
                        label={'Password'}
                        placeholder={'Password'}
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
                    <View
                        style={styles.checkArea}>
                        <Ripple
                            onPress={this._onCheckedBrightGas}
                            style={styles.sectionCheckArea}>
                            <FastImage style={styles.checkImg} source={isBrightGasOwned ? icCheck : icUncheck} />
                            <Label text={'Pengguna Bright Gas'} color={cd.primary} size={fs.lg} />
                        </Ripple>
                        <Ripple
                            onPress={this._onOpenMyPertaminaApps}
                            style={styles.sectionCheckArea}>
                            <Label text={'Download'} color={cd.primary} size={fs.lg} />
                            <FastImage style={styles.myPertaminaImg} source={icMyPertamina} />
                        </Ripple>
                    </View>
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
                        isVerified={isBrightGasOwned ? true : false}
                        block
                        isPrimary />
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOutlet)