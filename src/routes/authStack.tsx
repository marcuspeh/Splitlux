import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/login'
import Register from '../screens/register'
import ResetPassword from '../screens/resetPassword'
import LayoutStyle from '../style/layoutStyle'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
    headerShown: false, 
    animation: 'default',
    contentStyle: {
      ...LayoutStyle.background
    }
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  )
}

export default AuthStack;
