import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LargeButton from '../componments/largeButton'
import UserInput from '../componments/userInput'
import FontStyle from '../style/fontStyle'


const goBackClick = (): void => {
  console.log("Go back")
}

const ResetPasswordSuccess = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>$plitlux</Text>
      <Text style={[FontStyle.header6, styles.loginText]}>Success</Text>
      <Text style={[FontStyle.body2, styles.messageText]}>
        Instructions will be sent via email if the email 
        address matches our records. Please check
        your spam folder if you have not received the 
        email after 5 mins.
      </Text>
      <LargeButton 
        label={'Back to log in'} 
        onPress={goBackClick}
        style={{marginTop: 50}}
      />

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

export default ResetPasswordSuccess