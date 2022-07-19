import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderNavigation from '../componments/headerNavigation'
import LargeButton from '../componments/largeButton'
import { Loading } from '../componments/loading'
import NavBar from '../componments/navBar'
import ProfilePicture from '../componments/profilePicture'
import UserInput from '../componments/userInput'
import { useAuth } from '../contexts/auth'
import { UserProfileData } from '../models/data/userProfileData'
import { UserProfileResponse } from '../models/response/userProfileResponse'
import { UserService } from '../service/userService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const Profile = ({ navigation }: any) => {
  const [userProfile, setUserProfile] = useState<UserProfileData>()
  const [displayName, setDisplayName] = useState("")
  const [nameError, setNameError] = useState(" ")
  const [emailError, setEmailError] = useState(" ")

  const auth = useAuth()
  
  const loadProfile = async () => {
    if (!userProfile) {
      const response = await UserService.getProfile()
      
      if (response.isSuccess) {
        setUserProfile(response.data)
        setDisplayName(response.data?.name || "")
      } else {
        auth.signOut()
      }
    }
  }

  useEffect(() => {
    loadProfile()
  })
  
  const logoutClick = async () => {
    await auth.signOut()
  }

  const nameInput = (text: string) => {
    if (userProfile) {
      if (text.length <= 255) {
        setUserProfile({
          ...userProfile,
          name: text
        })
        setNameError(" ")
      } else {
        setNameError("Max characters exceeded")
      }
    }
  }
  
  const emailInput = (text: string) => {
    if (userProfile) {
      if (text.length <= 255) {
        setUserProfile({
          ...userProfile,
          email: text
        })
        setEmailError(" ")
      } else {
        setEmailError("Max characters exceeded")
      }
    }
  }
  
  const saveClick = async () => {
    if (userProfile) {
      var isValid = true

      if (!userProfile.name || userProfile.name.length === 0) {
        setNameError("Name is required")
        isValid = false
      } else if (userProfile.name.length > 255) {
        setNameError("Max characters exceeded")
        isValid = false
      }

      if (!userProfile.email || userProfile.email.length === 0) {
        setEmailError("Email is required")
        isValid = false
      } else if (userProfile.email.length > 255) {
        setEmailError("Max characters exceeded")
        isValid = false
      } else if (
        !/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(userProfile.email)
        ) {
          setEmailError("Please enter a valid email address")
          isValid = false
      }

      if (isValid) {
        // save profile and update display name if successful
        const response: UserProfileResponse = await UserService.updateProfile(userProfile.name, userProfile.email)
        if (response.isSuccess) {
          setDisplayName(userProfile.name)
        }
      }
    }
  }

  if (!userProfile) {
    return <Loading />
  } 

  return (
    <>
      <HeaderNavigation navigation={navigation} title={'Profile'} />
      <View style={LayoutStyle.container}>
        <View style={styles.profileSection}>
          <ProfilePicture 
            picture={userProfile.profile_pic} 
            style={[styles.profilePic]}
          />
          <Text style={[FontStyle.header5, styles.nameText]}>{displayName}</Text>
        </View>
        <UserInput 
          label={'Name'}
          defaultValue={userProfile.name}
          onChange={nameInput}
          isError={nameError.length > 1}
          errorMessage={nameError} 
          style={{marginTop: 50}}
        />
        <UserInput 
          label={'Email'}
          defaultValue={userProfile.email}
          onChange={emailInput}
          isError={emailError.length > 1}
          errorMessage={emailError} 
          style={[styles.emailInput, {marginTop: 50}]}
        />
        <LargeButton label={'Save'} onPress={saveClick} />
        <Text 
          style={[FontStyle.subtitle2, styles.logoutText]}
          onPress={logoutClick}
        >
          LOG OUT
        </Text>
      </View>
      <NavBar navigation={navigation} />
    </>
  )
}

const styles = StyleSheet.create({
  profileSection: {
    marginBottom: 40,
    display: 'flex',
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100
  },
  nameText: {
    marginTop: 15
  },
  emailInput: {
    marginBottom: 50
  },
  logoutText: {
    color: 'red',
    marginTop: 10
  }
})

export default Profile