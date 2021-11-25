import React from 'react'
import { View } from 'react-native'
import { NativeRouter, Route, Switch } from "react-router-native"

import Login from './screens/Login/Login'
import SignUp from './screens/SignUp/SignUp'
import Home from './screens/Home/Home'
import Search from './screens/Search/Search'

export default App = () => {
  return (
      <View>
        <NativeRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/home" component={Home} />
            <Route path="/search" component={Search} />
          </Switch>
        </NativeRouter>
      </View>
  )
}