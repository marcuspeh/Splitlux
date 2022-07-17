import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GroupList from '../../screens/groupList'
import FontStyle from '../../style/fontStyle'
import GroupHomeList from './groupHomeList'

interface Props {
  navigation: any
}

export const GroupHomeView = (props: Props) => {
  const groupListClick = () => {
    props.navigation.navigate('GroupList')
  }

  return (
  <>
    <View style={[styles.row]}>
      <Text style={[FontStyle.header6]}>Groups</Text>
      <Text onPress={groupListClick} style={[FontStyle.body2, styles.seeAllText]}>See all</Text>
    </View>
    <GroupHomeList navigation={props.navigation} n={5}/>
  </>
  )
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: 'center',
    flexDirection: "row",
    marginBottom: 40,
    width: '100%',
  },
  seeAllText: {
    color: "rgba(13, 153, 255, 1)",
    textAlign: 'right'
  }
})