import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const pages = width * 2;

export default styles = StyleSheet.create({
    textUser: {
        marginLeft: -5,
        fontWeight: 'bold',
        fontSize: 25
    },
    textEmail: {
        fontWeight: '400', 
        fontSize: 15, 
        justifyContent: 'center', textAlign: 
        'center'
    },
    imageProfile: {
        height: '80%',
        width: '80%',
        alignSelf: 'center' 
    },
    imageView: {
        backgroundColor: '#bdb1b1',
        borderRadius: 100,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: Platform.OS === 'android' ? 35 : 20
    },
    switch: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginRight: 10,
        justifyContent: "flex-start"
    },
    darkMode: {
        fontSize: 14,
        fontWeight: '500',
        alignSelf: 'center',
        justifyContent: 'center',
        marginRight: 10,
    }
});