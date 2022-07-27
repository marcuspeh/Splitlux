import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ErrorComponment } from '../componments/error'
import GroupDetailsHeader from '../componments/groupDetailsHeader'
import HeaderNavigation from '../componments/headerNavigation'
import { Loading } from '../componments/loading'
import PersonCard from '../componments/personCard'
import { GroupMembersData } from '../models/data/getMembersData'
import { SimplifiedUserProfileData } from '../models/data/groupData'
import { GroupService } from '../service/groupService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const GroupMembers = ({ navigation, route }: any) => {
  const [groupData, setGroupData] = useState<GroupMembersData>()

  const getGroupMembers = async () => {
    const response = await GroupService.getGroupMembers(route.params?.id || "")
    if (response.isSuccess) {
      setGroupData(response.data)
    }
  }

  useEffect(() => {
    if (!groupData) {
      getGroupMembers()
    }
    
    const willFocusSubscription = navigation.addListener('focus', () => {
        getGroupMembers()
    })
    return willFocusSubscription
  })

  if (!route.params?.id) {
    return (
    <>
      <HeaderNavigation navigation={navigation} title={'Group'} />

      <View style={LayoutStyle.container}>
        <ErrorComponment message='Please try again'/>
      </View>
    </>
  )}

  if (!groupData) {
    return <Loading />
  }

  const renderTransactionCard  = ({ item }: {item: SimplifiedUserProfileData}) => (
    <View
      style={{
        margin: 1,
        marginBottom: 15
      }}>
    <PersonCard person={item} />
    </View>
  )


  return (
    <>
      <HeaderNavigation navigation={navigation} title={'Group'} />

      <View style={LayoutStyle.container}>
        <GroupDetailsHeader 
          title={groupData.name} 
          groupCode={groupData.code_id} 
          isClosed={groupData.is_closed} 
          style={[styles.headerRow]}
        />
        <View style={[styles.transactionRow]}>
          <Text style={[FontStyle.header6]}>Members</Text>          
        </View>
      </View>
      <FlatList
        data={groupData.members}
        renderItem={renderTransactionCard}
        style={LayoutStyle.containerWithoutCenter}
        ListEmptyComponent={<Text style={FontStyle.body2}>There is no transaction found :(</Text>}
      />
    </>
  )
}

const styles = StyleSheet.create({
  headerRow: {
    marginBottom: 30
  }, 
  transactionRow: {
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
    marginTop: 30,
    marginBottom: 20
  },
})

export default GroupMembers