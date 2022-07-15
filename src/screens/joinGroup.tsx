import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderNavigation from '../componments/headerNavigation'
import LargeButton from '../componments/largeButton'
import NavBar from '../componments/navBar'
import UserInput from '../componments/userInput'
import FontStyle from '../style/fontStyle'


const JoinGroup = ({ navigation }: any) => {
  const [groupCode, setGroupCode] = useState("")

  const groupCodeInput = (text: string): void => {
    if (groupCode.length < 6) {
      setGroupCode(text)
    }
  }

  const createGroupClick = (): void => {
    console.log(groupCode)
  }

  return (
    <>
      <HeaderNavigation navigation={navigation} title={'Join'} />

      <View style={styles.container}>
        <Text style={[FontStyle.header6, styles.headerText]}>Join Group</Text>
        <UserInput 
          label={'Group Code'} 
          defaultValue={groupCode}
          placeHolder={'Enter your group code'} 
          onChange={groupCodeInput}
        />
        <Text style={[FontStyle.caption, styles.characterCount]}>Characters: {groupCode.length}/6</Text>
        <LargeButton label={'Create'} onPress={createGroupClick}/>
      </View>
      <NavBar navigation={navigation} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
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
    marginTop: 5,
    marginBottom: 50
  }
})

export default JoinGroup