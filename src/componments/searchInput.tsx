import React from "react"
import { StyleSheet, TextInput, View } from "react-native"
import FontStyle from "../style/fontStyle"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

interface Props {
  defaultValue?: string
  placeHolder?: string
  onChange?: (text: string) => void
  style?: {}
}

const SearchInput = (props: Props) => {
  const onChange = (event: any): void => {
    if (props.onChange) {
      props.onChange(event)
    }
  }
  
  return (
    <View style={[styles.container, props.style]}>
      <FontAwesomeIcon icon={ faSearch } />
      <TextInput 
        style = {[FontStyle.body1, styles.textInput]}
        underlineColorAndroid = "transparent"
        placeholder = {props.placeHolder || "Search here..."}
        defaultValue = {props.defaultValue || ""}
        onChangeText={onChange}
      />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: "rgba(13, 153, 255, 0.05)"
  },
  textInput: {
    padding: 0,
    paddingLeft: 10
  },
});
  
export default SearchInput