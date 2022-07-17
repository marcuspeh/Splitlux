import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HeaderNavigation from '../componments/headerNavigation'
import GroupHomeList from '../componments/homePage/groupHomeList'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const GroupList = ({ navigation }: any) => {
  return (
    <>
      <HeaderNavigation navigation={navigation} title={'List'} />

      <View style={[LayoutStyle.container]}>
        <Text style={[FontStyle.header6, styles.headerText]}>All Groups</Text>
        <GroupHomeList navigation={navigation} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 40,
    textAlign: 'left',
    width: '100%'
  },
  characterCount: {
    width: '100%',
    textAlign: "right",
    marginTop: 5,
    marginBottom: 50
  }
})

export default GroupList