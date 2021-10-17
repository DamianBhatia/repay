import React from 'react'
import { Text, View } from 'react-native'
import { NativeRouter, Route, Switch } from "react-router-native"

import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import HomePage from './HomePage/homePage'

export default App = () => {
  return (
    <View>
      <NativeRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup"  component={SignUp} />
            <Route path="/home" component={HomePage} />
        </Switch>
      </NativeRouter>
    </View>
  )
}