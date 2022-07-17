import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderNavigation from '../componments/headerNavigation'
import LargeButton from '../componments/largeButton'
import NavBar from '../componments/navBar'
import UserInput from '../componments/userInput'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const CreateGroup = ({ navigation }: any) => {
  const [groupName, setGroupName] = useState("")

  const groupNameInput = (text: string): void => {
    if (groupName.length < 255) {
      setGroupName(text)
    }
  }

  const createGroupClick = (): void => {
    console.log(groupName)
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
    marginTop: 5,
    marginBottom: 50
  }
})

export default CreateGroup