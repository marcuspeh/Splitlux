import React from "react"
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import FontStyle from "../style/fontStyle";

interface Props {
  label: string
  onPress: () => void
  isDisabled?: boolean
  style?: {}
  textStyle?: {}
}

const LargeButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.isDisabled || false}
      style={[styles.button, props.style]}
      activeOpacity={0.5}
    >
      <Text style={[FontStyle.body2, styles.whteText, props.textStyle]}>{props.label}</Text>
    </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgba(13, 153, 255, 1)",
    alignItems: "center",
    borderRadius: 20,
    width: '100%',
    padding: 5,
    elevation: 2
  },
  whteText: {
    color: "rgba(255, 255, 255, 1)",
    margin: 10,
    textTransform: "uppercase"
  }
});
  
export default LargeButton