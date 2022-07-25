import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { UserNameData } from "../../models/data/groupMemberNameData"
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronDown, faChevronUp, faClose } from "@fortawesome/free-solid-svg-icons"
import LayoutStyle from "../../style/layoutStyle"
import FontStyle from "../../style/fontStyle"
import { TransactionNameAmountData } from "../../models/data/transactionNameAmountData"

interface Props {
  members: UserNameData[]
  onChange: (data: TransactionNameAmountData[]) => void
  style?: {}
  transactionData?: TransactionNameAmountData[]
}

const newTransactionData = () => ({
  user: {
    name: "",
    id: "",
  }, 
  amount: ""
})

const TransactionNameAmountSection = (props: Props) => {
  const [memberList, setMemberList] = useState(props.members.map(member => [member.name, member.id]))
  const [transactionList, setTransactionList] = useState<TransactionNameAmountData[]>(props.transactionData || [newTransactionData()])

  useEffect(() => {
    props.onChange(transactionList)
  }, [transactionList])

  const onMemberSelect = (key: number) => {
    return (selectedItem: string[], index: number) => {
      var temp: TransactionNameAmountData[] = transactionList
      temp[key].user = {
        name: selectedItem[0],
        id: selectedItem[1]
      }
      setTransactionList(temp)
    }
  }

  const amountInput = (key: number) => {
    return (amount: string) => {
      var temp: TransactionNameAmountData[] = transactionList
      temp[key].amount = amount
      setTransactionList(temp)
    }
  }

  const removeRow = (key: number) => {
    return () => {
      var temp: TransactionNameAmountData[] = [...transactionList]
      temp.splice(key, 1)
      setTransactionList(temp)
    }
  }

  const addRow = () => {
    var temp: TransactionNameAmountData[] = [...transactionList]
    temp.push(newTransactionData())
    setTransactionList(temp)
  }

  const renderRow = () => {
    return transactionList.map((element, index) => {
      return (
      <View style={[styles.container]} key={index}>
        <View style={{width: '65%'}}>
          <SelectDropdown 
            data={memberList}
            onSelect={onMemberSelect(index)}
            defaultButtonText={'Select member'}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem[0]}
            rowTextForSelection={(item, index) => item[0]}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={LayoutStyle.background}
            rowStyle={LayoutStyle.background}
            rowTextStyle={styles.dropdownRowTxtStyle}
          />
        </View>
        <View style={[styles.amountView]}>
          <Text style={FontStyle.body2}>$</Text>
          <TextInput 
            style = {[FontStyle.body1]}
            underlineColorAndroid = "transparent"
            placeholder = {"Enter amount"}
            defaultValue = {""}
            keyboardType={'decimal-pad'}
            onChangeText={amountInput(index)}
          />
        </View>
        <View onTouchStart={removeRow(index)}>
          <FontAwesomeIcon icon={faClose} />
        </View>
      </View>
    )})
  }

  return (
    <>
      { renderRow() }
      <Text 
        style={[FontStyle.caption, LayoutStyle.linkText, styles.addModeText]}
        onPress={addRow}
      >Add more</Text>
    </>    
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 10
  },
  dropdownBtnStyle: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderColor: 'rgba(0, 0, 0, 0.5)',    
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 5
  },
  dropdownBtnTxtStyle: {
    textAlign: 'left',
  },
  dropdownRowTxtStyle: {
    textAlign: 'left'
  },
  amountView: {
    width: '30%',
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1,

    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',

    borderColor: 'rgba(0, 0, 0, 0.5)',    
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 5
  },
  addModeText: {
    width: '100%',
    textAlign: 'right',
  },
});
  
export default TransactionNameAmountSection