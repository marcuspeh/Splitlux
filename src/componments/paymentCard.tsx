import React from "react"
import { StyleSheet, Text, View } from "react-native"
import FontStyle from "../style/fontStyle"


import LayoutStyle from "../style/layoutStyle"
import { PaymentData } from "../models/data/paymentData"

interface Props {
  payment: PaymentData
  style?: {}
}

const PaymentCard = (props: Props) => {

  return (
    <View style={[LayoutStyle.background, styles.container, styles.row, props.style]}>
      <View style={[styles.payerText]}>
        <Text style={FontStyle.body1}>{props.payment.payer.name}</Text>
        <Text style={FontStyle.caption}>From</Text>
      </View>

      <View style={[styles.amountText]}>
        <Text style={FontStyle.body1}>${props.payment.amount}</Text>
      </View>

      <View style={[styles.payeeText]}>
        <Text style={FontStyle.body1}>{props.payment.payee.name}</Text>
        <Text style={FontStyle.caption}>To</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
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
  amountText: {
    height: "100%",
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
  payerText: {
    height: "100%",
    display: 'flex',
    justifyContent: "center",
    alignItems: 'flex-start',
  },
  payeeText: {
    height: "100%",
    display: 'flex',
    justifyContent: "center",
    alignItems: 'flex-end',
  }
});
  
export default PaymentCard