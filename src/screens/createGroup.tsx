import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderNavigation from '../componments/headerNavigation'
import LargeButton from '../componments/largeButton'
import NavBar from '../componments/navBar'
import UserInput from '../componments/userInput'
import { GroupService } from '../service/groupService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const CreateGroup = ({ navigation }: any) => {
  const [groupName, setGroupName] = useState("")
  const [errorMessage, setErrorMessage] = useState(" ")

  const groupNameInput = (text: string): void => {
    if (groupName.length <= 255) {
      setGroupName(text)
      setErrorMessage(" ")
    } else {
      setErrorMessage("Max characters exceeded")
    }
  }

  const createGroupClick = async (): Promise<void> => {
    if (!groupName || groupName.length === 0) {
      setErrorMessage("Group name cannot be empty")
    } else if (groupName.length > 255) {
      setErrorMessage("Max characters exceeded")
    } else {
      const response = await GroupService.createGroup(groupName)

      if (response.isSuccess) {
        setGroupName("")
        setErrorMessage(" ")
        console.log(response.data?.id || "Success")
      } else {
        setErrorMessage("An unknown error occured")
      }
    }
    
  }

  return (
    <>
      <HeaderNavigation navigation={navigation} title={'Create'} />

      <View style={[LayoutStyle.container]}>
        <Text style={[FontStyle.header6, styles.headerText]}>Create Group</Text>
        <UserInput 
          label={'Group Name'} 
          defaultValue={groupName}
          placeHolder={'Enter your group name'} 
          onChange={groupNameInput}
          isError={errorMessage.length > 1}
          errorMessage={errorMessage}
        />
        <Text style={[FontStyle.caption, styles.characterCount]}>Characters: {groupName.length}/255</Text>
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
    width: '100%',
    paddingLeft: 0
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

export default CreateGroup