import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SearchBar } from 'react-native-elements'

import styles from './styles.js'

const Search = () => {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChangeText = text => {
        setSearch(text)
        setLoading(true)
    }

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
        </View>
    )
}

export default Search