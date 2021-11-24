import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import { Link } from "react-router-native"

import { auth } from '../../config/firebase.js'

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /*
     * Login user with firebase auth and switch to Home screen.
     */
    const login = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(() => history.push("/home"))
        .catch(err => {
            console.log("Error Code: " + err.code + "\nError Message: " + err.message)
        })
    }

    return (
        <View style={styles.container}>
            <Text h1>Repay</Text>
            <Input placeholder='Email' leftIcon={{ type: 'font-awesome', name: 'envelope', color:'grey' }} onChangeText={value => setEmail(value)} />
            <Input placeholder='Password' leftIcon={{ type: 'font-awesome', name: 'lock', color:'grey' }} secureTextEntry={true} onChangeText={value => setPassword(value)} />
            <Button title="Login" onPress={login} />
            <Link to="/signup">
                <Text>Don't have an account? Sign up</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Login