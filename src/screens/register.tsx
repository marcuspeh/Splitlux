import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import LargeButton from '../componments/largeButton'
import UserInput from '../componments/userInput'
import { AuthService } from '../service/authService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'



const Register = ({ navigation }: any) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [nameErrorMessage, setNameErrorMessage] = useState(" ")
  const [emailErrorMessage, setEmailErrorMessage] = useState(" ")
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(" ")
  const [password2ErrorMessage, setPassword2ErrorMessage] = useState(" ")

  const signInClick = (): void => {
    navigation.navigate('Login')
  }

  const signupClick = async (): Promise<void> => {
    var isValid: boolean = true
    if ( name.length === 0 ) {
      setNameErrorMessage("Name is required")
      isValid = false
    } else if ( name.length > 255) {
      setNameErrorMessage("Max characters exceeded")
      isValid = false
    }

    if ( email.length === 0 ) {
      setEmailErrorMessage("Email is required")
      isValid = false
    } else if ( email.length > 255) {
      setEmailErrorMessage("Max characters exceeded")
      isValid = false
    } else if (
      !/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(email)
      ) {
        setEmailErrorMessage("Please enter a valid email address")
        isValid = false
    }

    if ( password.length === 0 ) {
      setPasswordErrorMessage("Password is required")
      isValid = false
    } else if ( password.length > 255) {
      setPasswordErrorMessage("Max characters exceeded")
      isValid = false
    } 

    if ( password2.length === 0 ) {
      setPassword2ErrorMessage("Confirm password is required")
      isValid = false
    } else if ( password2.length > 255) {
      setPassword2ErrorMessage("Max characters exceeded")
      isValid = false
    } else if ( password !== password2 ) {
      setPassword2ErrorMessage("Passwords does not match")
      isValid = false
    }
  
    if (isValid) {
      const response = await AuthService.register(name, email, password, password2)
      if (response.isSuccess) {
        Alert.alert(
          "Success",
          "Account Registered",
          [
            {
              text: "Go back",
              onPress: () => navigation.navigate('Login'),
              style: "default",
            },
          ],
        )
      } else {
        if (response.nameError) setNameErrorMessage(response.nameError)
        if (response.emailError) setEmailErrorMessage(response.emailError)
        if (response.passwordError) setPasswordErrorMessage(response.passwordError)
        if (response.password2Error) setPassword2ErrorMessage(response.password2Error)
      }
    }
  }

  const nameInput = (text: string): void => {
    if (text.length <= 255) {
      setNameErrorMessage(" ")
      setName(text)
    } else {
      setNameErrorMessage("Max characters exceeded")
    }
  }

  const emailInput = (text: string): void => {
    if (text.length <= 255) {
      setEmailErrorMessage(" ")
      setEmail(text)
    } else {
      setEmailErrorMessage("Max characters exceeded")
    }
  }

  const passwordInput = (text: string): void => {
    if (text.length <= 255) {
      setPasswordErrorMessage(" ")
      setPassword2ErrorMessage(" ")
      setPassword(text)
    } else {
      setPasswordErrorMessage("Max characters exceeded")
      setPassword2ErrorMessage(" ")
    }
  }

  const password2Input = (text: string): void => {
    if (text.length <= 255) {
      setPasswordErrorMessage(" ")
      setPassword2ErrorMessage(" ")
      setPassword2(text)
    } else {
      setPasswordErrorMessage(" ")
      setPassword2ErrorMessage("Max characters exceeded")
    }
  }

  return (
    <View style={LayoutStyle.container}>
      <Text style={styles.logo}>$plitlux</Text>
      <Text style={[FontStyle.header6, styles.loginText]}>Sign Up To $plitlux</Text>
      <UserInput 
        label={'Your Name'} 
        placeHolder={'Enter your name'}
        onChange={nameInput}
        style={{marginTop: 50}}
        defaultValue={name}
        isError={nameErrorMessage.length > 1}
        errorMessage={nameErrorMessage}
      />
      <UserInput 
        label={'Your Email'} 
        placeHolder={'Enter your email'}
        onChange={emailInput}
        style={{marginTop: 50}}
        defaultValue={email}
        isError={emailErrorMessage.length > 1}
        errorMessage={emailErrorMessage}
      />
      <UserInput 
        label={'Password'} 
        isPassword={true} 
        placeHolder={'Enter your password'} 
        onChange={passwordInput}
        style={{marginTop: 50}}
        defaultValue={password}
        isError={passwordErrorMessage.length > 1}
        errorMessage={passwordErrorMessage}
      />
      <UserInput 
        label={'Confirm Password'} 
        isPassword={true} 
        placeHolder={'Enter your password again'} 
        onChange={password2Input}
        style={{marginTop: 50}}
        defaultValue={password2}
        isError={password2ErrorMessage.length > 1}
        errorMessage={password2ErrorMessage}
      />
      <LargeButton 
        label={'Sign up'} 
        onPress={signupClick}
        style={{marginTop: 50}}
      />
      <Text style={[styles.haveAccount]}>
        Have Account? {" "}
        <Text style={[LayoutStyle.linkText]} onPress={signInClick}>
          Log In
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
  haveAccount: {
    marginTop: 30
  },
  errorMessage: {
    textAlign: 'left'
  }
})

export default Register