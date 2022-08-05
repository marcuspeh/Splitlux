import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DeleteTransactionModal from '../componments/deleteModal'
import { ErrorComponment } from '../componments/error'
import GroupDetailsHeader from '../componments/groupDetailsHeader'
import HeaderNavigation from '../componments/headerNavigation'
import LargeButton from '../componments/largeButton'
import { Loading } from '../componments/loading'
import TransactionNameAmountSection from '../componments/transactionPage/transactionNameAmountSection'
import UserInput from '../componments/userInput'
import { GroupMemberNameData } from '../models/data/groupMemberNameData'
import { TransactionNameAmountData } from '../models/data/transactionNameAmountData'
import { GroupService } from '../service/groupService'
import { TransactionService } from '../service/transactionService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const GroupTransactions = ({ navigation, route }: any) => {
  const [groupData, setGroupData] = useState<GroupMemberNameData>()

  const [description, setDescription] = useState("")
  const [descriptionError, setDescriptionError] = useState(" ")
  const [totalAmount, setTotalAmount] = useState("")
  const [totalAmountError, setTotalAmountError] = useState(" ")
  const [paymentDetails, setPaymentDetails] = useState<TransactionNameAmountData[]>([])
  const [paymentDetailsError, setPaymentDetailsError] = useState("")
  const [expenseDetails, setExpenseDetails] = useState<TransactionNameAmountData[]>([])
  const [expenseDetailsError, setExpenseDetailsError] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  if (!route.params?.id) {
    return (
    <>
      <HeaderNavigation navigation={navigation} title={'Group'} />

      <View style={LayoutStyle.container}>
        <ErrorComponment message='Please try again'/>
      </View>
    </>
  )}

    const getTransactionData = async (transactionId: string) => {
      const response = await TransactionService.getTransaction(transactionId)
      if (response.isSuccess && response.data) {
        setDescription(response.data?.title || "")
        setTotalAmount(String(response.data?.amount || ""))
        setPaymentDetails(response.data?.payers as TransactionNameAmountData[])
        setExpenseDetails(response.data?.expenses as TransactionNameAmountData[])
      }
    }

  const getGroupMemberNameData = async () => {
    const response = await GroupService.getGroupMembersName(route.params?.id)
    if (response.isSuccess) {
      setGroupData(response.data)
    }
  }

  useEffect(() => {
    if (!groupData) {
      getGroupMemberNameData()
      if (route.params.transactionId) getTransactionData(route.params.transactionId)
    }
    
    const willFocusSubscription = navigation.addListener('focus', () => {
        getGroupMemberNameData()
        if (route.params.transactionId) getTransactionData(route.params.transactionId)
      })
    return willFocusSubscription
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
  
  const onSubmitClick = async () => {
    setPaymentDetailsError("")
    setExpenseDetailsError("")

    const paymentMap = new Map<string, number>()
    const paymentToBalance = new Set<string>()
    var paymentRemainder: number = Number(totalAmount)

    const expenseMap = new Map<string, number>()
    const expenseToBalance = new Set<string>()
    var expenseRemainder: number = Number(totalAmount)

    var isPaymentError = false
    var isExpenseError = false

    // Verify payments amount
    for (var i = 0; i < paymentDetails.length; i++) {
      const userId = paymentDetails[i].user.id
      if (paymentDetails[i].amount === "") {
        if (userId !== "") {
          paymentToBalance.add(userId)
        }
      } else {
        const amount = Number(paymentDetails[i].amount)
        if (isNaN(amount)) {
          setPaymentDetailsError("Amount must be a number")
          isPaymentError = true
          break
        } else if (userId === "") {
          setPaymentDetailsError("Member field(s) is/are unselected")
          isPaymentError = true
          break
        }
        
        paymentMap.set(userId, amount)
        paymentRemainder -= amount
      }
    }

    // Verify expenses amount
    for (var i = 0; i < expenseDetails.length; i++) {
      const userId = expenseDetails[i].user.id
      if (expenseDetails[i].amount === "") {
        if (userId !== "") {
          expenseToBalance.add(userId)
        }
      } else {
        const amount = Number(expenseDetails[i].amount)
        if (isNaN(amount)) {
          setExpenseDetailsError("Amount must be a number")
          isExpenseError = true
          break
        } else if (userId === "") {
          setExpenseDetailsError("Member field(s) is/are unselected")
          isExpenseError = true
          break
        } 
        expenseMap.set(userId, amount)
        expenseRemainder -= amount
      }
    }


    const isPaymentTotalError = paymentRemainder < 0 || (paymentRemainder > 0 && paymentToBalance.size === 0)
    if (isPaymentTotalError && !isPaymentError) {
      setPaymentDetailsError("Total amount does not tally")
      isPaymentError = true
    }

    const isExpenseTotalError = expenseRemainder < 0 || (expenseRemainder > 0 && expenseToBalance.size === 0)
    if (isExpenseTotalError && !isExpenseError) {
      setExpenseDetailsError("Total amount does not tally")
      isExpenseError = true
    }

    if (!isExpenseError && !isPaymentError) {
      const paymentSplit = paymentRemainder / paymentToBalance.size
      paymentToBalance.forEach((member) => {paymentMap.set(member, paymentSplit)})

      const expenseSplit = expenseRemainder / expenseToBalance.size
      expenseToBalance.forEach((member) => {expenseMap.set(member, expenseSplit)})

      const parsedPayers = []
      for (const [key, value] of paymentMap.entries()) {
        parsedPayers.push({
          user: key,
          amount: value
        })
      }

      const parsedExpenses = []
      for (const [key, value] of expenseMap.entries()) {
        parsedExpenses.push({
          user: key,
          amount: value
        })
      }

      const response = await TransactionService.addTransaction(route.params?.id, description, Number(totalAmount), parsedPayers, parsedExpenses)
      if (response.isSuccess) {
        navigation.goBack()
      }

    }
  }

  const onUpdateClick = async () => {
    setPaymentDetailsError("")
    setExpenseDetailsError("")

    const paymentMap = new Map<string, number>()
    const paymentToBalance = new Set<string>()
    var paymentRemainder: number = Number(totalAmount)

    const expenseMap = new Map<string, number>()
    const expenseToBalance = new Set<string>()
    var expenseRemainder: number = Number(totalAmount)

    var isPaymentError = false
    var isExpenseError = false
    
    // Verify payments amount
    for (var i = 0; i < paymentDetails.length; i++) {
      const userId = paymentDetails[i].user.id
      if (paymentDetails[i].amount === "") {
        if (userId !== "") {
          paymentToBalance.add(userId)
        }
      } else {
        const amount = Number(paymentDetails[i].amount)
        if (isNaN(amount)) {
          setPaymentDetailsError("Amount must be a number")
          isPaymentError = true
          break
        } else if (userId === "") {
          setPaymentDetailsError("Member field(s) is/are unselected")
          isPaymentError = true
          break
        }
        
        paymentMap.set(userId, amount)
        paymentRemainder -= amount
      }
    }

    // Verify expenses amount
    for (var i = 0; i < expenseDetails.length; i++) {
      const userId = expenseDetails[i].user.id
      if (expenseDetails[i].amount === "") {
        if (userId !== "") {
          expenseToBalance.add(userId)
        }
      } else {
        const amount = Number(expenseDetails[i].amount)
        if (isNaN(amount)) {
          setExpenseDetailsError("Amount must be a number")
          isExpenseError = true
          break
        } else if (userId === "") {
          setExpenseDetailsError("Member field(s) is/are unselected")
          isExpenseError = true
          break
        } 
        expenseMap.set(userId, amount)
        expenseRemainder -= amount
      }
    }


    const isPaymentTotalError = paymentRemainder < 0 || (paymentRemainder > 0 && paymentToBalance.size === 0)
    if (isPaymentTotalError && !isPaymentError) {
      setPaymentDetailsError("Total amount does not tally")
      isPaymentError = true
    }

    const isExpenseTotalError = expenseRemainder < 0 || (expenseRemainder > 0 && expenseToBalance.size === 0)
    if (isExpenseTotalError && !isExpenseError) {
      setExpenseDetailsError("Total amount does not tally")
      isExpenseError = true
    }

    if (!isExpenseError && !isPaymentError) {
      const paymentSplit = paymentRemainder / paymentToBalance.size
      paymentToBalance.forEach((member) => {paymentMap.set(member, paymentSplit)})

      const expenseSplit = expenseRemainder / expenseToBalance.size
      expenseToBalance.forEach((member) => {expenseMap.set(member, expenseSplit)})

      const parsedPayers = []
      for (const [key, value] of paymentMap.entries()) {
        parsedPayers.push({
          user: key,
          amount: value
        })
      }

      const parsedExpenses = []
      for (const [key, value] of expenseMap.entries()) {
        parsedExpenses.push({
          user: key,
          amount: value
        })
      }

      const response = await TransactionService.updateTransaction(route.params?.transactionId, description, Number(totalAmount), parsedPayers, parsedExpenses)
      if (response.isSuccess) {
        navigation.goBack()
      }

    }
  }


  if (!groupData) {
    return <Loading />
  }

  if (route.params.transactionId && (expenseDetails.length === 0 || paymentDetails.length === 0)) {
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
        {paymentDetailsError.length === 0 ? (
          <Text style={[FontStyle.caption, styles.messageRow]}>Leave amount blank to auto calculate</Text>
        ) : (
          <Text style={[FontStyle.error, styles.messageRow]}>{paymentDetailsError}</Text>
        )}   
        <TransactionNameAmountSection members={groupData.members} onChange={setPaymentDetails} transactionData={paymentDetails} />

        <Text style={[FontStyle.header6, styles.formRow]}>Expenses</Text>       
        {expenseDetailsError.length === 0 ? (
          <Text style={[FontStyle.caption, styles.messageRow]}>Leave amount blank to auto calculate</Text>
        ) : (
          <Text style={[FontStyle.error, styles.messageRow]}>{expenseDetailsError}</Text>
        )}    
        <TransactionNameAmountSection members={groupData.members} onChange={setExpenseDetails} transactionData={expenseDetails}/>
        {route.params.transactionId ? (
          <>
            <LargeButton label={'Update'} onPress={onUpdateClick} style={styles.updateBtn}/>
            <Text style={[FontStyle.subtitle2, styles.deleteText]} onPress={() => setIsDeleteModalOpen(true)}>Delete</Text>
          </>
        ) : (
          <LargeButton label={'Save'} onPress={onSubmitClick} style={styles.updateBtn}/>
        )}
        <DeleteTransactionModal 
          isActive={isDeleteModalOpen} 
          navigation={navigation} 
          onClose={() => setIsDeleteModalOpen(false)} 
          transactionId={route.params?.transactionId} 
        />
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
  },
  updateBtn: {
    marginTop: 30,
    marginBottom: 10
  },
  deleteText: {
    color: 'red'
  }
})

export default GroupTransactions