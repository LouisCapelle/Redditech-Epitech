import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export const ViewConnection = ({ Title, description, width, isEnabled }) => {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '400', color: isEnabled ? "white" : "black" }}> {Title} </Text>
            <Text style={[{width: width - 70, color: isEnabled ? "white" : "black" }, styles.description]}>
                {description}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    description: {
        textAlign: 'justify',
        marginTop: 15,
        fontWeight: '300',
        fontSize: 15,
    }
});