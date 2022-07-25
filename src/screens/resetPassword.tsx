import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import LargeButton from '../componments/largeButton'
import UserInput from '../componments/userInput'
import { AuthService } from '../service/authService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const ResetPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState("")
  const [emailErrorMessage, setEmailErrorMessage] = useState(" ")

  const goBackClick = (): void => {
    navigation.navigate('Login')
  }

  const resetClick = async (): Promise<void> => {
    if ( email.length === 0 ) {
      setEmailErrorMessage("Email is required")
    } else if (
        !/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(email)
      ) {
        setEmailErrorMessage("Please enter a valid email address")
    } else {
      await AuthService.resetPassword(email)
      Alert.alert(
        "Success",
        "Instructions will be sent via email if the email address matches our records. Please check your spam folder if you have not received the email after 5 mins.",
        [
          {
            text: "Go back",
            onPress: () => navigation.navigate('Login'),
            style: "default",
          },
        ],
      )
    }
  }

  const emailInput = (text: string): void => {
    setEmailErrorMessage(" ")
    setEmail(text)
  }

  return (
    <View style={LayoutStyle.container}>
      <Text style={styles.logo}>$plitlux</Text>
      <Text style={[FontStyle.header6, styles.loginText]}>Forget Password</Text>
      <UserInput 
        label={'Your Email'} 
        placeHolder={'Enter your email'}
        onChange={emailInput}
        style={{marginTop: 50}}
        defaultValue={email}
        isError={emailErrorMessage.length > 1}
        errorMessage={emailErrorMessage}
        keyboardType={'email-address'}
      />
      <LargeButton 
        label={'Reset'} 
        onPress={resetClick}
        style={{marginTop: 50}}
      />
      <Text style={[LayoutStyle.linkText, styles.goBackText]} onPress={goBackClick}>
        Go Back To Login
      </Text>
    </View>
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
  goBackText: {
    marginTop: 30,
  },
  errorMessage: {
    textAlign: 'left'
  }
})

export default ResetPassword