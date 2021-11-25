import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        top: '50%',
        display: 'flex',
        alignItems: 'center',
    },
    searchContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent' 
    },
    searchInputContainer: {
        backgroundColor: '#efefef',
        borderRadius: 12
    },
    loading: {
        top: '50%'
    },
    result: {
        width: '100%',
        display: 'flex'
    },
    user: {
        fontWeight: '700',
        flex: 1
    },
    email: {
        color: '#808080'
    }
})