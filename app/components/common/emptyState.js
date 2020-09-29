import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fs } from './fontSizeData';
import { cd } from './colorData';
import { Label } from './label';
import VerifiedButton from '../button/verifiedButton';
// import { Icon } from 'native-base';


class EmptyState extends React.Component {

    render() {
        const { title, message, onPress } = this.props;
        return (
            <View style={styles.emptyStateArea}>
                {/* <Icon name='ios-folder-open' style={styles.icon} /> */}
                <Label text={title} size={fs.xxl} bold color={cd.label} align={'center'} mt={20} mb={10} />
                <Label text={message} size={fs.md} color={cd.subLabel} align={'center'} mb={20} lines={2} />
                {
                    onPress != null ?
                        <View style={styles.buttonArea}>
                            <VerifiedButton
                                isPrimary
                                isVerified
                                label={'OK'}
                                onPress={onPress} />
                        </View> :
                        null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    emptyStateArea: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        fontSize: wp(50),
        color: cd.border
    },

    buttonArea: {   
        width: wp(70)
    }

});

export default EmptyState;