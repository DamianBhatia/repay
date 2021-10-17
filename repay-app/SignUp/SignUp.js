import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import { withRouter } from 'react-router-native'

import firebase from '../config/firebase'

const SignUp = withRouter((props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => props.history.push("/home"))
    }

    return (
        <View style={styles.container}>
            <Text h1>Repay</Text>
            <Input placeholder='First Name' />
            <Input placeholder='Last Name' />
            <Input placeholder='Email' leftIcon={{ type: 'font-awesome', name: 'envelope', color:'grey' }} onChangeText={value => setEmail(value)}/>
            <Input placeholder='Password' leftIcon={{ type: 'font-awesome', name: 'lock', color:'grey' }} secureTextEntry={true} onChangeText={value => setPassword(value)}/>
            <Button title="Sign up" onPress={signUp}/>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default SignUp