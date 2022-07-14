import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import Login from './src/screens/login'

const App = () => {
  return (
    <View>
      <StatusBar hidden={true} />
      <Login />
    </View>
  );
};

export default App;
