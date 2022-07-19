import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import FontStyle from "../style/fontStyle"

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
  const [isCencored, setIsCencored] = useState(props.isPassword || false)

  const onChange = (event: any): void => {
    if (props.onChange) {
      props.onChange(event)
    }
  }

  const passwordViewClick = () => {
    if (props.isPassword) {
      setIsCencored(!isCencored)
    }
  }
  
  return (
    <View style={[styles.container, props.style]}>
      <Text style={FontStyle.subtitle2}>{props.label}</Text>
      {props.isError 
        ?
        <View style={styles.textInputError}>
          <TextInput 
            style = {[FontStyle.body1]}
            underlineColorAndroid = "transparent"
            placeholder = {props.placeHolder || "$plilux"}
            defaultValue = {props.defaultValue || ""}
            secureTextEntry = {isCencored}
            onChangeText={onChange}
          />
          </View>
        : 
          <View style={styles.textInput}>
            <TextInput 
              style = {[FontStyle.body1]}
              underlineColorAndroid = "transparent"
              placeholder = {props.placeHolder || "$plilux"}
              defaultValue = {props.defaultValue || ""}
              secureTextEntry = {isCencored}
              onChangeText={onChange}
            />
            {props.isPassword && 
              <View onTouchStart={passwordViewClick} onTouchEnd={passwordViewClick}>
                <FontAwesomeIcon style={styles.eyeIcon} icon={faEye} />
              </View>
            }
          </View>
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
    borderBottomWidth: 1,

    display: 'flex',
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: 'center'
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
  },
  eyeIcon: {
    marginLeft: 10,
    marginRight: 5,
    color: "rgba(0, 0, 0, 0.8)",
  }
});
  
export default UserInput