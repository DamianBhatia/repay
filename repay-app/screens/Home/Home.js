import React, { useState, useEffect } from "react";
import { View } from 'react-native'
import { Avatar } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ListItem, Button } from 'react-native-elements'

import styles from './styles.js'

import { auth, db } from '../../config/firebase.js'
import Form from './Form.js'

const Home = ({ history }) => {
    const [transactions, setTransactions] = useState([])
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [visible, setVisible] = useState(false)

    const getUser = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection("users").where("id", "==", user.uid).get()
                .then(query => {
                    if (query.docs[0].exists) {
                        let user = query.docs[0]
                        setUserId(user.id)
                        setUser(user.data())
                        setTransactions(user.data().transactions)
                    } else {
                        console.log("No such document!")
                    }
                }).catch(err => {
                    console.log("Error Code: " + err.code + "\nError Message: " + err.message)
                })
            } else {
                history.push("/")
            }
        })
    }

    useEffect(() => {
        getUser();
    }, [])
   
    const deleteItems = title => {
        let newData = transactions.filter(({title : t}) => t != title)
        db.collection('users').doc(userId).update({
            "transactions": newData
        })
        getUser();
    }

    const addItems = items => {
        let temp = transactions
        temp.push(items)
        db.collection('users').doc(userId).update({
            "transactions": temp
        })
        setVisible(!visible)
    }
   
    return (
        <View>
            <View>
                <Form visible={visible} toggleOverlay={() => setVisible(!visible)} addItems={addItems}/>

                <View style={styles.add}>
                    <Button
                        title="Add +"
                        onPress={() => setVisible(!visible)}
                    />
                </View>

                <View style={styles.profileContainer}>
                    <View style={styles.profile}>  
                        <Avatar
                            size="xlarge"
                            title={ user && user.first[0] + user.last[0]}
                            containerStyle={{backgroundColor: 'grey', borderRadius: '100px'}}
                        />
                    </View>
                    <View style={styles.text}>
                        <Text h3>{ user && user.first + " " + user.last }</Text>
                    </View>
                </View>

                <View>
                    {   
                        transactions && transactions.map(({title, amount, icon, request}) =>
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
                                    onPress={() => deleteItems(title)}
                                />
                                }
                            >
                                <Icon name={icon} color={request ? 'green' : 'red'} type='ionicon' />
                                <ListItem.Content style={{display: 'flex', justifyContent: 'space-between', flexDirection:'row'}}>
                                    <ListItem.Title>{title}</ListItem.Title>
                                    <ListItem.Title>{amount}</ListItem.Title>
                                </ListItem.Content>

                                <ListItem.Chevron />
                            </ListItem.Swipeable>
                    )}
                </View>    
            </View>    
        </View> 
    )
}

export default Home