import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'

import { auth, db } from '../config/firebase.js'

const SignUp = ({ history }) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Sign in user with firebase auth and create user object
     * in firestore database. If successful, switches to 
     * Home screen.
     */
    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("Signed in user: " + userCredential.user.email)
            db.collection("users").add({
                id: userCredential.user.uid,
                first: firstName,
                last: lastName,
                email: email,
                transactions: []
            }).then((docRef) => {
                console.log("User added to database with id ", docRef.id)
                history.push("/home")
            })
            .catch(err => {
                console.log("Error Code: " + err.code + "\nError Message: " + err.message)
            })
        }).catch(err => {
            console.log("Error Code: " + err.code + "\nError Message: " + err.message)
        })
    }

    return (
        <View style={styles.container}>
            <Text h1>Repay</Text>
            <Input placeholder='First Name' onChangeText={value => setFirstName(value)}/>
            <Input placeholder='Last Name' onChangeText={value => setLastName(value)}/>
            <Input placeholder='Email' leftIcon={{ type: 'font-awesome', name: 'envelope', color:'grey' }} onChangeText={value => setEmail(value)}/>
            <Input placeholder='Password' leftIcon={{ type: 'font-awesome', name: 'lock', color:'grey' }} secureTextEntry={true} onChangeText={value => setPassword(value)}/>
            <Button title="Sign up" onPress={signUp}/>
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

export default SignUp