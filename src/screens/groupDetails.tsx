import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ErrorComponment } from '../componments/error'
import GroupDetailsMember from '../componments/groupDetailMember'
import GroupDetailsHeader from '../componments/groupDetailsHeader'
import HeaderNavigation from '../componments/headerNavigation'
import LargeButton from '../componments/largeButton'
import { Loading } from '../componments/loading'
import TransactionCard from '../componments/transactionCard'
import { GroupData, SimplifiedTransactionData } from '../models/data/groupData'
import { GroupService } from '../service/groupService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const GroupDetails = ({ navigation, route }: any) => {
  const [groupData, setGroupData] = useState<GroupData>()

  const getGroupData = async () => {
    if (!groupData) {
      const response = await GroupService.getGroupData(route.params?.id || "")
      if (response.isSuccess) {
        setGroupData(response.data)
      }
    }
  }

  const groupMemberListClick = async () => {
    navigation.navigate("GroupMembers", { id: route.params?.id || ""})
  }

  const addTransactionClick = async () => {
    console.log('Add transaction click')
  }

  const viewPaymentsClick = async () => {
    navigation.navigate("GroupPayments", { id: route.params?.id || ""})
  }

  const closeGroupClick = async () => {
    const response = await GroupService.calculatePayments(route.params?.id || "")
    if (response.isSuccess) {
      setGroupData(response.data)
    }
  }

  const openGroupClick = async () => {
    const response = await GroupService.reopenGroup(route.params?.id || "")
    if (response.isSuccess) {
      setGroupData(response.data)
    }
  }

  useEffect(() => {
    getGroupData()
  })

  if (!groupData) {
    return <Loading />
  }

  const renderTransactionCard  = ({ item }: {item: SimplifiedTransactionData}) => (
    <View
      style={{
        margin: 1,
        marginBottom: 15
      }}>
    <TransactionCard transaction={item} />
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
        <GroupDetailsMember 
          creatorName={groupData.owner.name} 
          creatorPic={groupData.owner.profile_pic} 
          memberPic={groupData.members.map((member) => member.profile_pic)} 
          memberCount={groupData.member_count} 
          onClick={groupMemberListClick}
        />
        <View style={[styles.transactionRow]}>
          <Text style={[FontStyle.header6]}>Transactions</Text>
          {groupData.is_closed ? (
            <Text style={[LayoutStyle.linkText]} onPress={viewPaymentsClick}>View Payments</Text>
          ) : (
            <TouchableOpacity
              onPress={addTransactionClick}
              style={[LayoutStyle.linkBackground, styles.plusButton]}
              activeOpacity={0.5}
            >
              <FontAwesomeIcon icon={faPlus} style={styles.plusText}/>
            </TouchableOpacity> 
          )}
          
        </View>
      </View>
      <FlatList
        data={groupData.transactions}
        renderItem={renderTransactionCard}
        style={LayoutStyle.containerWithoutCenter}
        ListEmptyComponent={<Text style={FontStyle.body2}>There is no transaction found :(</Text>}
      />
      {groupData.is_owner && (
        <View style={[LayoutStyle.containerWithoutCenter, styles.bottomButton]}>
          { groupData.is_closed ? (
            <LargeButton 
              label={'Reopen group'} 
              onPress={openGroupClick} 
            />
          ) : (
            <LargeButton 
              label={'Close group'} 
              onPress={closeGroupClick} 
            />
          )}
        </View>
      )}
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
  plusButton: {
    width: 70,
    borderRadius: 50,

    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    elevation: 2,
    padding: 5
  },
  plusText: {
    color: "white"
  },
  bottomButton: {
    marginTop: 20,
    marginBottom: 30
  }
})

export default GroupDetails