import React from 'react'
import { View } from 'react-native'
import { NativeRouter, Route, Switch } from "react-router-native"

import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import Home from './Home/Home'

export default App = () => {
  return (
      <View>
        <NativeRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup"  component={SignUp} />
            <Route path="/home" component={Home} />
          </Switch>
        </NativeRouter>
      </View>
  )
}