import React from 'react'
import { View, Text, StyleSheet, Dimensions  } from 'react-native'
import FontStyle from '../../style/fontStyle'
import LayoutStyle from '../../style/layoutStyle'
import GroupHomeList from './groupHomeList'

interface Props {
  navigation: any
  name: string
}

export const GroupHomeView = (props: Props) => {
  const groupListClick = () => {
    props.navigation.navigate('GroupList')
  }

  const n = Math.floor(Dimensions.get('window').height / 200)

  return (
  <>
    <View style={[LayoutStyle.containerWithoutCenter, styles.greetingView]}>
      <Text style={FontStyle.subtitle2}>Hello,</Text>
      <Text style={FontStyle.header5}>{props.name}</Text>
    </View>
    <View style={[styles.row, LayoutStyle.container]}>
      <Text style={[FontStyle.header6]}>Groups</Text>
      <Text onPress={groupListClick} style={[FontStyle.body2, styles.seeAllText]}>See all</Text>
    </View>
    <GroupHomeList navigation={props.navigation} n={n}/>
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
  },
  greetingView: {
    width: '100%',
    marginBottom: 40
  }
})