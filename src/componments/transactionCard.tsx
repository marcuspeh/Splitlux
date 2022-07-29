import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { SimplifiedTransactionData } from "../models/data/groupData"
import FontStyle from "../style/fontStyle"
import moment from 'moment'

import LayoutStyle from "../style/layoutStyle"

interface Props {
    transaction: SimplifiedTransactionData
    navigation: any
    groupId: string
    style?: {}
}

const TransactionCard = (props: Props) => {
  const cardClick = () => {
    props.navigation.navigate('GroupTransactions', { id: props.groupId, transactionId: props.transaction.id })
  }

  return (
    <View style={[LayoutStyle.background, styles.container, props.style]} onTouchEnd={cardClick}>
      <View style={styles.row}>
        <View>
          <Text style={FontStyle.body1}>{props.transaction.title}</Text>
          <Text style={FontStyle.caption}>{moment(props.transaction.created_at).format('DD MMM YYYY')}</Text>
        </View>
        <View style={styles.amountView}>
          <Text style={[FontStyle.body1, styles.amountText]}>${' '}{props.transaction.amount}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width: "100%",
    borderColor: 'rgba(0, 0, 0, 0.01)',
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: "row"
  },
  amountView: {
    width: '20%',
    display: 'flex',
    justifyContent: 'center'
  },
  amountText: {
    textAlign: "left",
    width: '100%'
  }
});
  
export default TransactionCard