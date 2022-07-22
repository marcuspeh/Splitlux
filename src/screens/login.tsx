import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LargeButton from '../componments/largeButton'
import UserInput from '../componments/userInput'
import { useAuth } from '../contexts/auth'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'



const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(" ")
  const auth = useAuth()

  const forgetPasswordClick = (): void => {
    navigation.navigate('ResetPassword')
  }

  const createAccountClick = (): void => {
    navigation.navigate('Register')
  }

  const loginClick = async (): Promise<void> => {
    if ( email.length === 0 || password.length === 0 ) {
      setErrorMessage("Please fill up both email and password")
    } else if (
      !/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(email)
      ) {
      setErrorMessage("Please enter a valid email address")
    } else {
      const isSuccess = await auth.signIn(email, password)
      if (!isSuccess) {
        setErrorMessage("Invalid credentials")
      }
    }
  }

  const emailInput = (text: string): void => {
    setErrorMessage(" ")
    setEmail(text)
  }

  const passwordInput = (text: string): void => {
    setErrorMessage(" ")
    setPassword(text)
  }

  return (
    <View style={LayoutStyle.container}>
      <Text style={styles.logo}>$plitlux</Text>
      <Text style={[FontStyle.header6, styles.loginText]}>Log In To $plitlux</Text>
      <UserInput 
        label={'Your Email'} 
        placeHolder={'Enter your email'}
        onChange={emailInput}
        style={{marginTop: 50}}
        defaultValue={email}
        isError={errorMessage.length > 1}
        errorMessage={errorMessage}
      />
      <UserInput 
        label={'Password'} 
        isPassword={true} 
        defaultValue={password}
        placeHolder={'Enter your password'} 
        onChange={passwordInput}
        style={{marginTop: 50}}
      />
      <View style={styles.fullRow}>
        <Text style={[styles.forgetPasswordText]} onPress={forgetPasswordClick}>
          Forget Password?
        </Text>
      </View>
      <LargeButton 
        label={'Log in'} 
        onPress={loginClick}
        style={{marginTop: 50}}
      />
      <Text style={[styles.newUser]}>
        New User? {" "}
        <Text style={[LayoutStyle.linkText]} onPress={createAccountClick}>
          Create Account
        </Text>
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
  forgetPasswordText: {
    textAlign: 'right',
    marginTop: 5
  },
  newUser: {
    marginTop: 30
  },
  errorMessage: {
    textAlign: 'left'
  },
  fullRow: {
    width: "100%"
  },
})

export default Login