import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const pages = width * 2;

export default styles = StyleSheet.create({
    connectionButton: {
        backgroundColor: 'white',
        width: '80%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 1,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        width: pages,
        height: height,
    },
    bottomView: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        width: '100%',
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