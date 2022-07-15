import React from "react"
import { StyleSheet, Text, View } from "react-native"
import FontStyle from "../style/fontStyle"

import LayoutStyle from "../style/layoutStyle"

interface Props {
    title: String
    date: String
    amount: String
}

const TransactionCard = (props: Props) => {
    return (
      <View style={[LayoutStyle.background, styles.container]}>
        <View style={styles.row}>
          <View>
            <Text style={FontStyle.body1}>{props.title}</Text>
            <Text style={FontStyle.caption}>{props.date}</Text>
          </View>
          <View style={styles.amountView}>
            <Text style={[FontStyle.body1, styles.amountText]}>${' '}{props.amount}</Text>
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