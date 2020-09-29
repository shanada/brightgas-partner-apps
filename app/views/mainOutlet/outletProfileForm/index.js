import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styles from './style'
import { snackbarInfo } from '../../../modules/snackbarInfo'
import { View, ScrollView } from 'react-native'
import { onSetLoader } from '../../../redux/actions/componentState'
import ImagePicker from 'react-native-image-picker'
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

class OutletProfileForm extends PureComponent {
    constructor(props) {
        super(props);
        const { userData } = this.props
        let formName = userData.nama_kuliner
        let formDesc = userData.deskripsi
        let formOwnerName = userData.pemilik
        let formEmail = userData.email
        let formNumber = userData.tlp_kuliner
        let formAddress = userData.alamat_kuliner
        let villageOfficeName = userData.kelurahan
        let subDistrictName = userData.kecamatan
        let subDistrictId = subDistrict.filter(x => x.nama == subDistrictName).map(x => x.id)[0]
        let villageOfficeData = this._onSelectVillageOffice(subDistrictId)
        let villageOfficeId = villageOfficeData.filter(x => x.nama == villageOfficeName).map(x => x.id)[0]
        let imageCache = userData.img_kuliner
        this.state = {
            // bolean
            isLoading: false,
            isShowError: false,
            isBrightGasOwned: false,
            // string
            formOwnerName,
            formName,
            formDesc,
            formEmail,
            formNumber,
            formAddress,
            errorMessage: '',
            villageOfficeData: vo010,
            subDistrictId,
            villageOfficeId,
            imageCache,
            imageFile: ""
        }
    }

    componentDidMount = async () => {
        this.props.onSetLoader(false, "Mohon Tunggu")
    }

    _onSetRegister = () => {
        this.props.onSetLoader(true, "Mohon Tunggu")
        const { accessToken, userData } = this.props
        const { formName, formNumber, formEmail, formAddress, formOwnerName, formDesc, subDistrictId, villageOfficeId, imageFile } = this.state
        let url = 'outletProfileEditPost'
        let body = {
            "access-token": accessToken,
            "userid": userData.userid,
            "id_kuliner": userData.id_kuliner,
            "pemilik": formOwnerName,
            "nama_kuliner": formName,
            "deskripsi": formDesc,
            "tlp_kuliner": formNumber,
            "email": formEmail,
            "alamat_kuliner": formAddress,
            "id_kecamatan": subDistrictId.toString(),
            "id_kelurahan": villageOfficeId.toString(),
            "img": imageFile
        }
        timeoutService(60000, postService(url, body, "FORMDATA")).then((response) => {
            this.props.onSetLoader(false)
            try {
                if (response.status) {
                    let message = response.message
                    setTimeout(() => {
                        snackbarInfo(message, 'success')
                    }, 200);
                    let userData = response.data
                    this.props.onSetLoggedIn(1, userData)
                    this.props.navigation.goBack()
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
            this.props.onSetLoader(false)
            setTimeout(() => {
                rtoHandlingService()
            }, 200);
        })
    }

    _onValidateSignUp = () => {
        const { formName, formOwnerName, formNumber, formDesc, formEmail, formAddress } = this.state
        let isNameValid = validator.isLength(formName, { "min": 4, "max": 100 })
        let isOwnerNameValid = validator.isLength(formOwnerName, { "min": 4, "max": 24 })
        let isDescValid = validator.isLength(formDesc, { "min": 16, "max": 256 })
        let isNumberValid = validator.isLength(formNumber, { "min": 8, "max": 14 })
        let isEmailValid = validator.isEmail(formEmail)
        let isAddressValid = validator.isLength(formAddress, { "min": 6, "max": 64 })
        if (isNameValid && isOwnerNameValid && isDescValid && isNumberValid && isEmailValid && isAddressValid) {
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
        } else {
            let errorMessage = "Telepon Pemilik minimal 8 karakter dan maksimal 14 karakter"
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
                            this.setState({
                                formAddress: value
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

    _onSelectImage = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 1,
            maxWidth: 768,
            maxHeight: 768
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                let size = parseInt(response.fileSize)
                if (size > 2000000) {
                    snackbarInfo('Maksimal ukuran foto adalah 2 MB')
                } else {
                    const imageCache = { uri: response.uri }
                    this.setState({
                        imageCache,
                        isUploadImage: true,
                        imageFile: response
                    });
                }
            }
        });
    }

    render() {
        const { formDesc, formName, formOwnerName, formNumber, formEmail, formAddress, subDistrictId, villageOfficeId, villageOfficeData, errorMessage, isShowError, imageCache, isUploadImage } = this.state
        let sourceImage =  !isUploadImage ? { uri: imageCache } : imageCache
        return (
            <ScrollView style={styles.contentFlex}>
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
                    <View style={styles.selectImageArea}>
                        <Label text={'Pilih Foto Makanan'} size={fs.xxl} color={cd.subLabel} bold />
                        <FastImage style={styles.selectedCachedImg} source={sourceImage} resizeMode={'cover'} />
                        <View style={styles.buttonUploadArea}>
                            <VerifiedButton
                                label={'PILIH'}
                                onPress={this._onSelectImage}
                                isVerified />
                        </View>
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
                        label={'UPDATE PROFILE'}
                        onPress={this._onValidateSignUp}
                        isVerified
                        block
                        isPrimary />
                </View>
            </ScrollView>
        );
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
        },
        onSaveUserData: (userData) => {
            dispatch(

            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutletProfileForm)