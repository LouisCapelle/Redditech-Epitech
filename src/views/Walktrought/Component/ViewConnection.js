import React from "react";
import {View, Text} from 'react-native';

export const ViewConnection = ({ Title, description, width }) => {
    
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '400' }}> {Title} </Text>
            <Text style={{ textAlign: 'justify', width: width - 70, marginTop: 15, fontWeight: '300', fontSize: 15 }}>
                {description}
            </Text>
        </View>
    )

}