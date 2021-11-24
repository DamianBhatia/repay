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
    },
    overlay: {
        height: '60%',
        width: '80%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    switchContainer:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        width: "90%"
    },
    buttonsContainer:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        width: '70%'
    },

    button1grey: {
        padding: '4%',
        borderRadius: 15,
        width: '45%',
        backgroundColor: '#eff5f5',
        alignItems: 'center'
    },
    button1Green: {
        backgroundColor: '#66a3ff',
        padding: '4%',
        borderRadius: 15,
        width: '45%',
        alignItems: 'center'
    },
    
    


});