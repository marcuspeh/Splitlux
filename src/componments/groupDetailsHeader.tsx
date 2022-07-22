import React from "react"
import { StyleSheet, Text, View } from "react-native"
import FontStyle from "../style/fontStyle"

interface Props {
  title: string
  groupCode: string
  isClosed: boolean
  style?: {}
}

const GroupDetailsHeader = (props: Props) => {


  return (
  <View style={[styles.row, props.style]}>
    <Text style={[FontStyle.header5]}>{props.title}</Text>
    <View style={[styles.groupCodeRow]}>
      <Text style={[FontStyle.caption]}>Group Code</Text>
      <Text style={[FontStyle.body2, styles.groupCode]}>{" "} 
        {props.isClosed ? "* * * * * *" : props.groupCode}
      </Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
  },
  groupCodeRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  groupCode: {
    textTransform: "uppercase"
  }
});
  
export default GroupDetailsHeader