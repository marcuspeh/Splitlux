import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GroupHomeView } from '../componments/homePage/groupHomeView'
import LargeButton from '../componments/largeButton'
import NavBar from '../componments/navBar'
import { useAuth } from '../contexts/auth'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const Home = ({ navigation }: any) => {
  const auth = useAuth()

  const logoutClick = async () => {
    await auth.signOut()
  }

  return (
    <>
      <View style={styles.navBarContainer}>
        <View style={LayoutStyle.container}>
          <Text style={[FontStyle.body2, styles.messageText]}>
            Hello World
          </Text>
          <LargeButton label={'Log out'} onPress={logoutClick} />
        </View>
        <GroupHomeView navigation={navigation} name={"Mike Tyson"}/>
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
  },
  navBarContainer: {
    marginBottom: 200
  }
})

export default Home