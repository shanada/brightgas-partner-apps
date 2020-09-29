import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import styles from './style'
import { View, ScrollView } from 'react-native';
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
import ImagePicker from 'react-native-image-picker'
import { icDummy } from '../../../components/common/assetData';
import FastImage from 'react-native-fast-image';
import { Title } from '../../../components/common/title';

class OutletMenuForm extends PureComponent {
    constructor(props) {
        super(props);
        const { isEdited, item } = this.props.navigation.state.params
        let menuId = isEdited ? item.id : ''
        let menuName = isEdited ? item.nama_makanan : ''
        let menuPrice = isEdited ? item.harga : ''
        let menuDiscount = isEdited ? item.diskon : '0'
        let menuStatus = isEdited ? item.status : 0
        let imageCache = isEdited ? item.img_makanan : null
        this.state = {
            errorMessage: '',
            menuId,
            isEdited,
            menuName,
            menuPrice,
            menuDiscount,
            menuStatus,
            imageCache,
            imageFile: "",
            isUploadImage: false
        }
    }

    componentDidMount = async () => {
        this.props.onSetLoader(false, 'Memproses')
    }

    _onOutletMenuAddPost = () => {
        const { menuId, menuName, menuPrice, menuDiscount, menuStatus, imageFile } = this.state
        this.props.onSetLoader(true, 'Memproses')
        const { accessToken, userData } = this.props
        let url = 'outletMenuAddPost'
        let body = {
            "access-token": accessToken,
            "id": menuId,
            "id_kuliner": userData.id_kuliner,
            "nama_makanan": menuName,
            "harga": menuPrice.replace(/\./g, ''),
            "diskon": menuDiscount.replace(/\./g, ''),
            "status": menuStatus,
            "img": imageFile
        }
        timeoutService(60000, postService(url, body, "FORMDATA")).then((response) => {
            this.props.onSetLoader(false)
            try {
                if (response.status) {
                    setTimeout(() => {
                        this.props.navigation.state.params.action()
                        this.props.navigation.goBack()
                    }, 200);
                } else {
                    setTimeout(() => {
                        let message = response.message
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

    _onValidateAddUpdate = () => {
        const { menuName, menuPrice, imageCache } = this.state
        let isNameValid = validator.isLength(menuName, { "min": 1 })
        let isPriceValid = validator.isLength(menuPrice, { "min": 1 })
        if (isNameValid && isPriceValid && imageCache != null) {
            this._onOutletMenuAddPost()
        } else if (!isNameValid) {
            let errorMessage = "Nama makanan harus di isi"
            this.setState({
                errorMessage,
                isShowError: true
            })
        } else if (!isPriceValid) {
            let errorMessage = "Harga harus di isi"
            this.setState({
                errorMessage,
                isShowError: true
            })
        } else if (imageCache == null) {
            let errorMessage = "Gambar wajib dipilih"
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
        type == "name" ?
            this.setState({
                menuName: value
            }) :
            type == "price" ?
                this.setState({
                    menuPrice: value
                }) :
                this.setState({
                    menuDiscount: value
                })
    }

    _onChangeStatus = (menuStatus) => {
        this.setState({
            menuStatus
        })
    }

    _onSelectImage = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 1,
            maxWidth: 1020,
            maxHeight: 760
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log(`response height => ${response.height} and width is => ${response.width}`)
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                let size = parseInt(response.fileSize)
                if (size > 2000000) {
                    snackbarInfo('Maksimal ukuran foto adalah 2 MB')
                } else {
                    const imageCache = { uri: response.uri }
                    let imageName = response.fileName
                    this.setState({
                        imageCache,
                        imageName,
                        isUploadImage: true,
                        imageFile: response
                    });
                }
            }
        });
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        let title = params.isEdited ? "Update Menu" : "Tambah Menu"
        return {
            headerTitle: () => <Title title={title} />
        };
    };

    render() {
        const { menuName, menuPrice, menuStatus, menuDiscount, imageCache, isEdited, isUploadImage, isShowError, errorMessage } = this.state
        const statusData = [
            { id: 0, nama: 'Normal' },
            { id: 1, nama: 'Terlaris' },
            { id: 2, nama: 'Diskon' }
        ]
        let sourceImage =  !isUploadImage && isEdited ? { uri: imageCache } : imageCache
        let isSelectedImage = imageCache == null ? false : true
        let buttonLabel = isEdited ? "UPDATE MENU" : "TAMBAH MENU"
        return (
            <ScrollView>
                <View>
                    <TextFormInput
                        label={"Nama Makanan"}
                        placeholder={'Nama Makanan'}
                        name
                        onChangeText={(value) => this._onChangeText(value, 'name')}
                        value={menuName} />
                    <TextFormInput
                        label={'Harga Makanan'}
                        placeholder={'Harga Makanan'}
                        price
                        onChangeText={(value) => this._onChangeText(value, 'price')}
                        value={menuPrice} />
                    <TextFormInput
                        label={'Status'}
                        picker
                        pickerData={statusData}
                        onChangePicker={(value) => this._onChangeStatus(value)}
                        value={parseInt(menuStatus)} />
                    <TextFormInput
                        disabled={menuStatus == 2 ? false : true}
                        label={'Harga Diskon'}
                        placeholder={'Harga Diskon'}
                        price
                        onChangeText={(value) => this._onChangeText(value, 'discount')}
                        value={menuDiscount} />
                    <View style={styles.selectImageArea}>
                        <Label text={'Pilih Foto Makanan'} size={fs.xxl} color={cd.subLabel} bold />
                        <FastImage style={isSelectedImage ? styles.selectedCachedImg : styles.dummyImg} source={isSelectedImage ? sourceImage : icDummy} resizeMode={isSelectedImage ? 'cover' : 'contain'} />
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
                        label={buttonLabel}
                        onPress={this._onValidateAddUpdate}
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OutletMenuForm)