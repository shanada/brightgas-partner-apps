import React from "react"
import { StyleSheet, View, ScrollView, Image } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Carousel } from 'teaset'
import { cd } from "./colorData";
import Ripple from "react-native-material-ripple";
import LottieView from 'lottie-react-native';
import { imageLoadAnim } from "./assetData";
import FastImage from "react-native-fast-image";

export const Banner = props => {
    let { data, onPress, isShowIndicator, isLocal, height } = props
    return (
        <ScrollView style={styles.scrollView}>
            <Carousel
                startIndex={0}
                style={[styles.carousel, { height: height }]}
                control={
                    <Carousel.Control
                        style={styles.carouselControlArea}
                        dot={<View style={styles.carouselControlDot} />}
                        activeDot={<View style={styles.carouselActiveDot} />}
                    />
                } >
                {
                    data.map((item, index) => {
                        let id = item.id
                        let img = item.name 
                        return (
                            <Ripple
                                // onPress={()=>onPress(id)}
                                rippleSize={200}
                                key={index} >
                                <View>
                                    {
                                        isShowIndicator ?
                                            <View style={[styles.indicator, {height: height}]}>
                                                <LottieView
                                                    resizeMode='contain'
                                                    autoPlay
                                                    loop
                                                    source={imageLoadAnim} />
                                            </View> :
                                            !isShowIndicator && isLocal ?
                                                <Image style={[styles.banner, { height: height }]} source={img} /> :
                                                <FastImage style={[styles.banner, { height: height }]} source={{ uri: img }} />
                                    }
                                </View>
                            </Ripple>
                        )
                    })
                }
            </Carousel>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    carousel: {
        marginBottom: 15
    },
    carouselControlArea: {
        alignItems: 'center',
        // marginBottom: 3,
    },
    carouselControlDot: {
        backgroundColor: cd.label,
        borderWidth: 0.5,
        borderColor: cd.background,
        width: 12,
        height: 12,
        borderRadius: 12,
        margin: 3
    },
    carouselActiveDot: {
        backgroundColor: cd.primary,
        borderWidth: 0.5,
        borderColor: cd.background,
        width: 15,
        height: 15,
        borderRadius: 15,
        margin: 3
    },
    banner: {
        resizeMode: "cover",
        width: null,    
        position: "relative",
        // borderRadius: 15,
        // margin: 15,
        backgroundColor: cd.background
    },
    indicator: {
        height: 180,
        width: wp(100),
        borderRadius: 15,
        margin: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: cd.background
    }
})