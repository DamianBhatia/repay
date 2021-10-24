import React, { useState, useEffect } from "react";
import {View} from 'react-native'
import { Avatar } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { ListItem, Button,Overlay} from 'react-native-elements'

import styles from './styles.js'

import { auth, db } from '../config/firebase.js'

const Home = ({ history }) => {
    const [user, setUser] = useState(null)
    const [visible,setVisable] = useState(false)    

    const getUser = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection("users").where("id", "==", user.uid).get()
                .then(query => {
                    if (query.docs[0].exists) {
                        setUser(query.docs[0].data())
                    } else {
                        console.log("No such document!")
                    }
                }).catch(err => {
                    console.log("Error Code: " + err.code + "\nError Message: " + err.message)
                })
            } else {
                console.log("No user logged in, redirecting to login page...")
                history.push("/")
            }
        })
    }

    useEffect(() => {
        getUser()
    }, [])

    const [list, setList] = useState([
        {
        title: 'Movies',
        icon: 'av-timer',
        },
        {
        title: 'Bar',
        icon: 'flight-takeoff',
        },
        {
        title: 'Laurier',
        icon: 'av-timer',
        },
        {
        title: 'gas',
        icon: 'flight-takeoff',
        }
    ])

    const updateState = (title) => {
        console.log(title)
        var newlist = list.filter(({title:t}) => (t !== title))
        console.log(newlist)
        setList(newlist)
    }

    const toggleOverlay = () => {
        setVisable(!visible)
    }
   
    return (
        <View style={styles.container}>
            <View>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <Text>Hello from Overlay!</Text>
                </Overlay>

                <View style={styles.add}>
                    <Button
                        title="Add +"
                        onPress={()=>toggleOverlay()}
                    />
                </View>

                <View style ={styles.profileContainer}>
                    <View style={styles.profile}>  
                        <Avatar
                            size="xlarge"
                            title={ user && user.first[0] + user.last[0]}
                            containerStyle={{backgroundColor: 'grey', borderRadius: '100px'}}
                        />
                    </View>
                    <View style = {styles.Text}>
                        <Text h3>{user && user.first + " " + user.last}</Text>
                    </View>
                </View>

                <View>
                { list.map(({title,icon})=>
                    <ListItem.Swipeable
                        key={title}
                        leftContent={
                        <Button
                            title="Info"
                            icon={{ name: 'info', color: 'white' }}
                            buttonStyle={{ minHeight: '100%' }}
                        />
                        }
                        rightContent={
                        <Button
                            title="Delete"
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                            onPress={()=>{updateState(title)}}
                        />
                        }
                        >
                        <ListItem.Content style={{ display: 'flex',justifyContent: 'space-between',flexDirection:'row'}}>
                            <ListItem.Title>{title}</ListItem.Title>
                            <ListItem.Title>$25</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem.Swipeable>
                )

                }
                </View>    
            </View>    
        </View> 
    )
}

export default Home