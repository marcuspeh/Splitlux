import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ErrorComponment } from '../componments/error'
import GroupDetailsHeader from '../componments/groupDetailsHeader'
import HeaderNavigation from '../componments/headerNavigation'
import { Loading } from '../componments/loading'
import TransactionNameAmountSection from '../componments/transactionPage/transactionNameAmountSection'
import UserInput from '../componments/userInput'
import { GroupMemberNameData } from '../models/data/groupMemberNameData'
import { TransactionNameAmountData } from '../models/data/transactionNameAmountData'
import { GroupService } from '../service/groupService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const GroupTransactions = ({ navigation, route }: any) => {
  const [groupData, setGroupData] = useState<GroupMemberNameData>()

  const [description, setDescription] = useState("")
  const [descriptionError, setDescriptionError] = useState(" ")
  const [totalAmount, setTotalAmount] = useState("")
  const [totalAmountError, setTotalAmountError] = useState(" ")
  const [paymentDetails, setPaymentDetails] = useState<TransactionNameAmountData>()
  const [paymentDetailsError, setPaymentDetailsError] = useState(" ")
  const [expenseDetails, setExpenseDetails] = useState<TransactionNameAmountData>()
  const [expenseDetailsError, setExpenseDetailsError] = useState("")

  const [paymentError, setPaymentError] = useState("")
  const [expenseError, setExpenseError] = useState("")

  if (!route.params?.id) {
    return (
    <>
      <HeaderNavigation navigation={navigation} title={'Group'} />

      <View style={LayoutStyle.container}>
        <ErrorComponment message='Please try again'/>
      </View>
    </>
  )}

  const getGroupMemberNameData = async () => {
    if (!groupData) {
      const response = await GroupService.getGroupMembersName(route.params?.id)
      if (response.isSuccess) {
        setGroupData(response.data)
      }
    }
  }

  useEffect(() => {
    getGroupMemberNameData()
  })

  const descriptionInput = (text: string): void => {
    if (description.length <= 255) {
      setDescription(text)
      setDescriptionError(" ")
    } else {
      setDescriptionError("Max characters exceeded")
    }
  }

  const totalAmountInput = (text: string): void => {
    setTotalAmount(text)
    if (isNaN(Number(text))) {
      setTotalAmountError("Total amount must be a number")
    } else {
      setTotalAmountError(" ")
    }
  }
  
  if (!groupData) {
    return <Loading />
  }

  return (
    <>
      <HeaderNavigation navigation={navigation} title={'Group'} />

      <View style={LayoutStyle.container}>
        <GroupDetailsHeader 
          title={groupData.name} 
          groupCode={groupData.code_id} 
          isClosed={false} 
          style={[styles.headerRow]}
        />
        <View style={[styles.transactionRow]}>
          <Text style={[FontStyle.header6]}>Transaction</Text>          
        </View>
        <UserInput 
          label={'Description'} 
          onChange={descriptionInput}
          defaultValue={description}
          placeHolder={"Enter the description"}
          errorMessage={descriptionError}
          isError={descriptionError.length > 1}
        />
        <Text style={[FontStyle.caption, styles.characterCount]}>Characters: {description.length}/255</Text>
        <UserInput 
          label={'Total amount'} 
          onChange={totalAmountInput}
          defaultValue={totalAmount}
          keyboardType={'decimal-pad'}
          placeHolder={"Enter the total amount"}
          errorMessage={totalAmountError}
          isError={totalAmountError.length > 1}
          style={{marginTop: 20}}
        />

        <Text style={[FontStyle.header6, styles.formRow]}>Payers</Text>          
        {paymentError.length === 0 ? (
          <Text style={[FontStyle.caption, styles.messageRow]}>Leave amount blank to auto calculate</Text>
        ) : (
          <Text style={[FontStyle.error, styles.messageRow]}>{paymentError}</Text>
        )}   
        <TransactionNameAmountSection members={groupData.members} onChange={() => {}} />

        <Text style={[FontStyle.header6, styles.formRow]}>Expenses</Text>       
        {expenseError.length === 0 ? (
          <Text style={[FontStyle.caption, styles.messageRow]}>Leave amount blank to auto calculate</Text>
        ) : (
          <Text style={[FontStyle.error, styles.messageRow]}>{expenseError}</Text>
        )}    
        <TransactionNameAmountSection members={groupData.members} onChange={() => {}} />

      </View>
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
  formRow: {
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
    marginTop: 30,
  },
  messageRow: {
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 20
  },
  characterCount: {
    width: '100%',
    textAlign: "right"
  }
})

export default GroupTransactions