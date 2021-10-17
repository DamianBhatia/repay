import React, {useState} from "react";
import {View} from 'react-native'
import { Avatar } from 'react-native-elements';
import {styles} from './styles'
import { Text } from 'react-native-elements';
import { ListItem, Icon, Button,Overlay} from 'react-native-elements'


const HomePage = () => {
    
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
        console.log('gang')
        console.log(title)
        var newlist = list.filter(({title:t}) => (t !== title))
        console.log(newlist)
        setList(newlist)
    }
    const toggleOverlay = () => {
        setVisable(!visible)
    }
   
    const [visible,setVisable] = useState(false)
    

    return (
        <View style={styles.container}>
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
                        title="AS"
                        containerStyle={{backgroundColor: 'grey', borderRadius: '100px'}}
                    />
                </View>
                <View style = {styles.Text}>
                    <Text h3>Aleksandar Stojanovic</Text>
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
       
    )
}

export default HomePage