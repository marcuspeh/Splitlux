import React from 'react'
import { StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Router from './src/routes/router'
import { AuthProvider } from './src/contexts/auth'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Router />
    </AuthProvider>
  )
}

export default App;
