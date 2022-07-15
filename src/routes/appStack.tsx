import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/home'

const Stack = createNativeStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'default'}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default AppStack;
