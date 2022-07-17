import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderNavigation from '../componments/headerNavigation'
import LargeButton from '../componments/largeButton'
import NavBar from '../componments/navBar'
import UserInput from '../componments/userInput'
import { GroupService } from '../service/groupService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const JoinGroup = ({ navigation }: any) => {
  const [groupCode, setGroupCode] = useState("")
  const [errorMessage, setErrorMessage] = useState(" ")

  const groupCodeInput = (text: string): void => {
    if (groupCode.length <= 6) {
      setGroupCode(text)
      setErrorMessage(" ")
    } else {
      setErrorMessage("Max characters exceeded")
    }
  }

  const createGroupClick = async (): Promise<void> => {
    if (groupCode.length < 6) {
      setErrorMessage("Max characters exceeded")
    } else if (groupCode.length > 6) {
      setErrorMessage("Max characters exceeded")
    } else {
      const response = await GroupService.joinGroup(groupCode)

      if (response.isSuccess) {
        setGroupCode("")
        setErrorMessage(" ")
        console.log(response.data?.id || "Success")
      } else {
        setErrorMessage("An unknown error occured")
      }
    }
  }

  return (
    <>
      <HeaderNavigation navigation={navigation} title={'Join'} />

      <View style={LayoutStyle.container}>
        <Text style={[FontStyle.header6, styles.headerText]}>Join Group</Text>
        <UserInput 
          label={'Group Code'} 
          defaultValue={groupCode}
          placeHolder={'Enter your group code'} 
          onChange={groupCodeInput}
          errorMessage={errorMessage}
          isError={errorMessage.length > 1}
        />
        <Text style={[FontStyle.caption, styles.characterCount]}>Characters: {groupCode.length}/6</Text>
        <LargeButton label={'Create'} onPress={createGroupClick}/>
      </View>
      <NavBar navigation={navigation} />
    </>
  )
}

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 40,
    textAlign: 'left',
    width: '100%'
  },
  messageText: {
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center'
  },
  characterCount: {
    width: '100%',
    textAlign: "right",
    marginBottom: 50
  }
})

export default JoinGroup