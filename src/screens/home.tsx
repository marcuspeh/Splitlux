import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontStyle from '../style/fontStyle'


const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={[FontStyle.body2, styles.messageText]}>
        Hello World
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
  logo: {
    fontSize: 72,
    margin: 60
  },
  loginText: {
    marginBottom: 50
  },
  messageText: {
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center'
  }
})

export default Home