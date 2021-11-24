import React, {useState} from "react";
import {View, TouchableOpacity, Text} from 'react-native'
import styles from './styles.js'
import {Overlay,Input,Button} from 'react-native-elements'
import { Formik } from 'formik';

export const Form = ({visible,toggleOverlay,additems}) => {
    const [requesting,setRequesting] = useState(false)
    
    const toggleRequesting = (request) => {
        setRequesting(request)
    }

    return (
        <Overlay overlayStyle = {styles.overlay} isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text style={{fontSize: 20, }}>Add a new Item!</Text>
            <View style = {styles.switchContainer}>
                <TouchableOpacity style = {requesting ? styles.button1Green: styles.button1grey} onPress = {()=>toggleRequesting(true)}><Text>Requesting</Text></TouchableOpacity>
                <TouchableOpacity style = {requesting ? styles.button1grey:  styles.button1Green} onPress = {()=>toggleRequesting(false)}><Text>Sending</Text></TouchableOpacity>
            </View>
            <Formik
                initialValues={{ title: '', description: '', user: '', amount: '',request: requesting, icon: requesting? "arrow-redo-outline":"arrow-undo-outline" }}
                onSubmit={values => additems(values)}
            >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={{width: '100%', alignItems: 'center'}}>
                <Input placeholder = 'Title' onChangeText={handleChange('title')}  onBlur={handleBlur('title')} value={values.title}/>
                <Input placeholder = 'Description'  onChangeText={handleChange('description')} onBlur={handleBlur('description')} value={values.description}/>
                <Input placeholder = 'User'  onChangeText={handleChange('user')} onBlur={handleBlur('user')} value={values.user}/>
                <Input placeholder = '$'  onChangeText={handleChange('amount')} onBlur={handleBlur('amount')} value={values.amount}/>
                    <View style = {styles.buttonsContainer}>
                        <Button
                            title="Cancel"
                            onPress={()=>toggleOverlay()}
                            containerStyle={{width: '40%'}}
                        />
                        <Button
                            title="Add "
                            onPress={() => {handleSubmit()}}
                            containerStyle={{width: '40%'}}
                        />
                    </View>
            </View>
    
            )}
            </Formik>
        </Overlay>
    )

}