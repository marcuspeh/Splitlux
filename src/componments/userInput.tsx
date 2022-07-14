import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import FontStyle from "../style/fontStyle";
import LayoutStyle from "../style/layoutStyle";

interface Props {
  label: string
  autoCapitalize?: boolean
  defaultValue?: string
  isPassword?: boolean
  isError?: boolean
  errorMessage?: string
  onChange?: (text: string) => void
  placeHolder?: string
  style?: {}
}

const UserInput = (props: Props) => {
  const onChange = (event: any): void => {
    if (props.onChange) {
      props.onChange(event)
    }
  }
  
  return (
    <View style={[styles.container, props.style]}>
      <Text style={FontStyle.subtitle2}>{props.label}</Text>
      {props.isError 
        ?
          <TextInput 
            style = {[FontStyle.body1, styles.textInputError]}
            underlineColorAndroid = "transparent"
            placeholder = {props.placeHolder || "$plilux"}
            defaultValue = {props.defaultValue || ""}
            secureTextEntry = {props.isPassword || false}
            onChangeText={onChange}
          />
        : 
          <TextInput 
            style = {[FontStyle.body1, styles.textInput]}
            underlineColorAndroid = "transparent"
            placeholder = {props.placeHolder || "$plilux"}
            defaultValue = {props.defaultValue || ""}
            secureTextEntry = {props.isPassword || false}
            onChangeText={onChange}
          />
      }
      {
        props.errorMessage ? 
          <Text style={[FontStyle.error, styles.errorMessage]}>{props.errorMessage}</Text> 
        : <></>
      }
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  textInput: {
    alignself: 'self',
    paddingBottom: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1
  },
  textInputError: {
    alignself: 'self',
    color: "background: rgba(223, 15, 15, 0.7)",
    paddingBottom: 0,
    borderBottomColor: 'background: rgba(223, 15, 15, 0.7)',
    borderBottomWidth: 1
  }, 
  errorMessage: {
    textAlign: 'left'
  }
});
  
export default UserInput