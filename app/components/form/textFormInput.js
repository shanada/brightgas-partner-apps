import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text, Image } from 'react-native';
import { fs } from '../common/fontSizeData';
import { cd } from '../common/colorData';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Label } from '../common/label';
// import Icon from 'react-native-vector-icons/FontAwesome'
import Ripple from 'react-native-material-ripple';
import { icEyeSlash, icEye, icMail, icLock, icDropdown } from '../common/assetData';
import { Picker } from '@react-native-community/picker'
import {TextInputMask} from 'react-native-masked-text'

const Item = Picker.Item

class TextFormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordIcon: icEyeSlash,
            passwordHide: true
        }
    }

    _changeIcon = () => {
        this.setState(prevState => ({
            passwordIcon: prevState.passwordIcon === icEye ? icEyeSlash : icEye,
            passwordHide: !prevState.passwordHide
        }))
    }

    render() {
        const { passwordIcon, passwordHide } = this.state
        const { label, onChangeText, name, username, password, email, value, placeholder, number, onClearText, useIcon, center, disabled, width, picker, pickerData, onChangePicker, price } = this.props;
        let iconName = email ? icMail : password ? icLock : icDropdown
        const isPassword = password ? passwordHide : false
        return (
            <View style={[styles.inputArea, { width: width != null ? wp(width) : wp(100) }]}>
                {
                    label == null ?
                        null :
                        <Label text={label} bold size={fs.xxl} color={cd.primary} mb={5} />
                }
                {
                    picker && pickerData == null ?
                        null :
                        picker ?
                            <View style={styles.pickerArea}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={(value) => onChangePicker(value)}>
                                    {
                                        pickerData.map((x, i) => {
                                            let id = x.id
                                            let name = x.nama
                                            return (
                                                <Picker.Item key={id} label={name} value={id} color={cd.colorInput} />
                                            )
                                        })
                                    }
                                </Picker>
                            </View> :
                            <View>
                                {
                                    price ?
                                        <TextInputMask
                                            ref={(ref) => this.myCurrency = ref}
                                            type='money'
                                            options={{
                                                unit: '',
                                                precision: 0,
                                                delimiter: '.',
                                            }}
                                            editable={disabled ? false : true}
                                            onChangeText={(e) => onChangeText(e)}
                                            keyboardType='number-pad'
                                            customTextInput={TextInput}
                                            maxLength={9}
                                            placeholder={placeholder}
                                            placeholderTextColor={cd.colorInput} 
                                            value={value}
                                            style={[styles.input, { textAlign: center ? 'center' : 'auto', paddingLeft: !useIcon ? 0 : 35 }]} /> :
                                        <View>
                                            <TextInput
                                                editable={disabled ? false : true}
                                                placeholder={placeholder}
                                                placeholderTextColor={cd.colorInput}
                                                keyboardType={name || username || password ? "default" : email ? "email-address" : number ? "numeric" : "default"}
                                                autoCapitalize={name ? "words" : username || email || password ? 'none' : 'none'}
                                                onChangeText={(e) => onChangeText(e)}
                                                secureTextEntry={password ? isPassword : false}
                                                value={value}
                                                style={[styles.input, { textAlign: center ? 'center' : 'auto', paddingLeft: !useIcon ? 0 : 35 }]} />
                                            {
                                                !useIcon ?
                                                    null :
                                                    <View style={styles.iconArea}>
                                                        <Image source={iconName} style={styles.iconImg} />
                                                        {/* <Icon name={iconName} size={20} color={value.length == 0 ? cd.subLabel : cd.label} /> */}
                                                    </View>
                                            }
                                            {
                                                password ?
                                                    <Ripple onPress={this._changeIcon} style={styles.iconDeleteArea}>
                                                        <Image source={passwordIcon} style={styles.iconImg} />
                                                    </Ripple> :
                                                    null
                                            }
                                        </View>
                                }
                            </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    inputArea: {
        paddingHorizontal: 15,
        marginVertical: 10
    },

    input: {
        fontSize: fs.lg,
        paddingBottom: 5,
        paddingTop: 0,
        // borderRadius: 5,
        color: cd.lightLabel,
        borderColor: cd.subLabel,
        borderBottomWidth: 0.5,
        backgroundColor: cd.background,
    },

    iconArea: {
        alignSelf: 'center',
        position: 'absolute',
        padding: 5,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'row'
    },

    iconDeleteArea: {
        alignSelf: 'center',
        position: 'absolute',
        padding: 5,
        top: 0,
        right: 5,
        bottom: 0,
        alignItems: 'center',
        flexDirection: 'row'
    },

    pickerArea: {
        borderBottomColor: cd.subLabel,
        borderBottomWidth: 0.5,
    },

    iconImg: {
        width: 20,
        height: 20
    }
});

export default TextFormInput;