import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ErrorComponment } from '../componments/error'
import GroupDetailsHeader from '../componments/groupDetailsHeader'
import HeaderNavigation from '../componments/headerNavigation'
import { Loading } from '../componments/loading'
import PaymentCard from '../componments/paymentCard'
import { GetPaymentData } from '../models/data/getPaymentData'
import { PaymentData } from '../models/data/paymentData'
import { GroupService } from '../service/groupService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const GroupPayments = ({ navigation, route }: any) => {
  const [groupData, setGroupData] = useState<GetPaymentData>()

  const getGroupMembers = async () => {
    if (!groupData) {
      const response = await GroupService.getPayments(route.params?.id || "")
      if (response.isSuccess) {
        setGroupData(response.data)
      }
    }
  }

  useEffect(() => {
    getGroupMembers()
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

  const renderTransactionCard  = ({ item }: {item: PaymentData}) => (
    <View
      style={{
        margin: 1,
        marginBottom: 15
      }}>
      <PaymentCard payment={item} />
    </View>
  )


  return (
    <>
      <HeaderNavigation navigation={navigation} title={'Group'} />

      <View style={LayoutStyle.container}>
        <GroupDetailsHeader 
          title={groupData.name} 
          groupCode={"QWERTY"} 
          isClosed={true} 
          style={[styles.headerRow]}
        />
        <View style={[styles.paymentRow]}>
          <Text style={[FontStyle.header6]}>Payments</Text>          
        </View>
      </View>
      <FlatList
        data={groupData.payments}
        renderItem={renderTransactionCard}
        style={LayoutStyle.containerWithoutCenter}
        ListEmptyComponent={<Text style={FontStyle.body2}>Hooray, there is no payments!</Text>}
      />
    </>
  )
}

const styles = StyleSheet.create({
  headerRow: {
    marginBottom: 30
  }, 
  paymentRow: {
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
    marginTop: 30,
    marginBottom: 20
  },
})

export default GroupPayments