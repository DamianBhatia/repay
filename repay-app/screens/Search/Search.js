import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { SearchBar, ListItem } from 'react-native-elements'

import styles from './styles.js'

import { db } from '../../config/firebase.js'

const Search = () => {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    const handleChangeText = text => {
        setSearch(text)
        setLoading(true)
    }

    const getUsers = () => {
        db.collection("users").where("firstChoices", 'array-contains', search).limit(20).get()
        .then(query => {
            setUsers(query.docs)
        })
        .catch(err => console.log("Error Code: " + err.code + "\nError Message: " + err.message))
    }

    useEffect(() => {
        if (search.length == 1) { // do query
            getUsers()
            setLoading(false)
        } else if (search.length == 0) { // empty
            setUsers([])
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [search])

    return (
        <View style={styles.container}>
            <SearchBar 
                lightTheme 
                placeholder="Search users" 
                value={search} 
                onChangeText={(e) => handleChangeText(e)}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
            />

            {loading && <Text style={styles.loading}>Loading...</Text>}

            {
                users && users.filter(user => user.data().firstChoices.includes(search)).map(user => {
                    let { id, first, last, email } = user.data()
                    return (
                        <ListItem key={id} style={styles.result}>
                            <Text style={styles.user}>{first} {last}</Text>
                            <Text style={styles.email}>{email}</Text>
                        </ListItem>
                    )
                })
            }
        </View>
    )
}

export default Search