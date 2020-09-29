import React, { PureComponent } from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import shadowUi from '../common/shadowUi';
import { Label } from '../common/label';
import { cd } from '../common/colorData';
import { fs } from '../common/fontSizeData';
import FastImage from 'react-native-fast-image';
import { icBack, icAllFood } from '../common/assetData';

class FormMOutletMenu extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        const { isShowForm, isEdit, onClose, onConfirm } = this.props
        return (
            <Modal
                isVisible={isShowForm}
                animationInTiming={10}
                animationOutTiming={10}
                onBackButtonPress={onClose}
                onBackdropPress={onClose}
                style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.titleArea}>
                        <FastImage style={styles.closeImg} source={icAllFood} />
                        <Label text={'TITLE FORM'} color={cd.label} size={fs.xl} bold />
                    </View>
                    {/* <View style={styles.line} /> */}
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({

    modal: {
        flex: 1,
        margin: 0,
        backgroundColor: cd.title,
        justifyContent: 'flex-start',
    },

    modalContainer: {
    },

    titleArea: {
        height: fs.xl * 3,
        flexDirection: 'row',
        alignItems: 'center',
    },

    closeImg:{
        width: fs.xl * 3,
        height: fs.xl * 3,
        marginHorizontal: 20
    },

    line: {
        height: 1.5,
        marginVertical: 5,
        backgroundColor: cd.border,
        width: wp(100) - 20
    }

})

export default FormMOutletMenu