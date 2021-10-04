import LottieView from 'lottie-react-native';
import React from "react";

export const LottieViewConnection = ({ height, width, source }) => {
    return (
        <LottieView
            ref={animation => {
                this.animation = animation;
            }}
            style={{
                width: width,
                height: height,
            }}
            source={source}
            autoPlay
        />
    );
}