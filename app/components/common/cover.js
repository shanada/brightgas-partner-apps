import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-view';

import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import Ripple from 'react-native-material-ripple';
import { cd } from './colorData';
import { fs } from './fontSizeData';
import { Label } from './label';
import { setBannerHeight } from '../../modules/setHeight';

class Cover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullImage: false,
            height: 0
        }
    }

    componentDidMount = async () => {
        let height = await setBannerHeight()
        this.setState({
            height
        })
    }

    render() {
        const { source, name } = this.props
        const { isFullImage, height } = this.state
        return (
            <Ripple onPress={() => this.setState({ isFullImage: true })} style={[styles.containerArea, { height: height }]}>
                <FastImage
                    source={{ uri: source }}
                    style={[styles.coverImg, { height: height }]}
                    resizeMode={FastImage.resizeMode.contain}
                />

                <Modal
                    onRequestClose={() => this.setState({ isFullImage: false })}
                    visible={isFullImage} >
                    <ImageViewer
                        onCancel={() => this.setState({ isFullImage: false })}
                        imageUrls={[{ url: source }]}
                        enableSwipeDown
                        renderIndicator={()=> null}
                        renderFooter={(item) => {
                            return (
                                <View style={styles.photoNameArea}>
                                    <Label color={cd.title} bold size={fs.xl} align={'center'} text={name} lines={3} />
                                </View>
                            )
                        }} />
                </Modal>

                {/* <ImageView
                    animationType={'slide'}
                    images={[{ source: { uri: source } }]}
                    isVisible={isFullImage}
                    onClose={() => this.setState({ isFullImage: false })}
                    renderFooter={(item) => {
                        return (
                            <View style={styles.photoNameArea}>
                                <Label color={cd.title} bold size={fs.xl} align={'center'} text={name} lines={3} />
                            </View>
                        )
                    }}
                /> */}
            </Ripple>
        )
    }
}

const styles = StyleSheet.create({

    containerArea: {
        width: wp(100),
        backgroundColor: cd.border
    },

    coverImg: {
        width: wp(100),
    },

    photoNameArea: {
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: cd.shape,
        flexGrow: 1,
    },
});

export default Cover;