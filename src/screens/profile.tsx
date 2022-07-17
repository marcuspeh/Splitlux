import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderNavigation from '../componments/headerNavigation'
import NavBar from '../componments/navBar'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const Profile = ({ navigation }: any) => {

  return (
    <>
      <HeaderNavigation navigation={navigation} title={'Home'} />
      <View style={LayoutStyle.container}>
        <Text style={[FontStyle.body2, styles.messageText]}>
          Profile
        </Text>
      </View>
      <NavBar navigation={navigation} />
    </>
  )
}

const styles = StyleSheet.create({
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

export default Profile