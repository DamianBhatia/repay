import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SearchBar } from 'react-native-elements'

import styles from './styles.js'

const Search = () => {
    const [search, setSearch] = useState("")

    return (
        <View style={styles.container}>
            <SearchBar 
                lightTheme 
                placeholder="Search users" 
                value={search} 
                onChangeText={(e) => setSearch(e)}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInputContainer}
            />
        </View>
    )
}

export default Search