import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/home'
import LayoutStyle from '../style/layoutStyle'
import JoinGroup from '../screens/joinGroup'
import CreateGroup from '../screens/createGroup'
import Profile from '../screens/profile'
import GroupList from '../screens/groupList'

const Stack = createNativeStackNavigator()

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false, 
      animation: 'default',
      contentStyle: {
        ...LayoutStyle.background
      }
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="JoinGroup" component={JoinGroup} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="GroupList" component={GroupList} />
    </Stack.Navigator>
  )
}

export default AppStack;
