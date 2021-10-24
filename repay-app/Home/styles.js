import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      //flex: 1,
    },
    profileContainer: {
        marginTop: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    Text:{
        alignItems: 'center',
        marginBottom: '10%'
    },
    profile: {
        alignItems: 'center',
        marginBottom: '5%'
    },
    content: {
        marginHorizontal: '10%'
    },
    add:{
        marginTop: '15%',
        marginRight: '3%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});