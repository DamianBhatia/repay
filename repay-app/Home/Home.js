import React, { useState, useEffect } from "react";
import {View} from 'react-native'
import { Avatar } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ListItem, Button,Overlay} from 'react-native-elements'
import styles from './styles.js'

import { auth, db } from '../config/firebase.js'
import { Form } from './Form'
const Home = ({ history }) => {
    const [Transactions, setTransactions] = useState([])
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [visible1,setVisable1] = useState(false)

    const getUser = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection("users").where("id", "==", user.uid).get()
                .then(query => {
                    if (query.docs[0].exists) {
                        console.log('entered/')
                        setUserId(query.docs[0].id)
                        setUser(query.docs[0].data())
                        setTransactions(query.docs[0].data().transactions)
                     
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
        getUser();
    }, [])

   
    const deleteItems = (title) => {
        let newData = Transactions.filter(({title : t})=>t!=title)
        db.collection('users').doc(userId).update({
            "transactions": newData
        })
        getUser();

    }

    const additems = (items) => {
        let temp = Transactions
        temp.push(items)
        db.collection('users').doc(userId).update({
            "transactions": temp
        })
        toggleOverlay()
    }

    const toggleOverlay = () => {
        setVisable1(!visible1)
    }
   
    return (
        <View style={styles.container}>
            <View>
                <Form visible = {visible1} toggleOverlay={toggleOverlay} additems = {additems}/>

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
                 {   
                    Transactions && Transactions.map(({title,amount,icon,request})=>
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
                            onPress={()=>{deleteItems(title)}}
                        />
                        }
                        >
                        <Icon name={icon} color={request ? 'green':'red'} type='ionicon'/>
                        <ListItem.Content style={{ display: 'flex',justifyContent: 'space-between',flexDirection:'row'}}>
                            <ListItem.Title>{title}</ListItem.Title>
                            <ListItem.Title>{amount}</ListItem.Title>
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