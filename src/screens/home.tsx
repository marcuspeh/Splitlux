import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GroupHomeList from '../componments/homePage/groupHomeList'
import { GroupHomeView } from '../componments/homePage/groupHomeView'
import { Loading } from '../componments/loading'
import NavBar from '../componments/navBar'
import ProfilePicture from '../componments/profilePicture'
import SearchInput from '../componments/searchInput'
import { useAuth } from '../contexts/auth'
import { UserProfileData } from '../models/data/userProfileData'
import { UserService } from '../service/userService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'

const Home = ({ navigation }: any) => {
  const [searchTerm,   setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfileData>()
  const auth = useAuth()

  const loadProfile = async () => {
    if (!userProfile) {
      const response = await UserService.getProfile()
      
      if (response.isSuccess) {
        setUserProfile(response.data)
      } else {
        auth.signOut()
      }
    }
  }

  useEffect(() => {
    loadProfile()
  })

  const searchInput = (text: string) => {
      setSearchTerm(text)
  }

  const searchClick = () => {
    setIsSearching(true)
    setSearchTerm("")
  }

  const cancelClick = () => {
    setIsSearching(false)
    setSearchTerm("")
  }

  if (!userProfile) {
    return <Loading />
  } 

  return (
    <>
      <View style={styles.navBarContainer}>
        <View style={LayoutStyle.container}>
          <View style={[styles.row]}>
            <SearchInput 
              style={{width: '85%'}} 
              onChange={searchInput}
              onClick={searchClick}
              defaultValue={isSearching ?   searchTerm : ""}
            />
            { isSearching ? (
              <Text style={[FontStyle.subtitle2, styles.cancelText]} onPress={cancelClick} >Cancel</Text>
            ) : (
              <ProfilePicture picture={userProfile.profile_pic} />
            )}
          </View>
        </View>
        { isSearching ? (
          <GroupHomeList navigation={navigation} searchTerm={searchTerm} />
        ): (
          <GroupHomeView navigation={navigation} name={userProfile.name} />
        )}
      </View>
      { isSearching ? <></> : <NavBar navigation={navigation} /> }
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
  },
  row: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 30,
    width: '100%',
  },
  cancelText: {
    color: "rgba(13, 153, 255, 1)",
  },
})

export default Home