import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import FontStyle from '../style/fontStyle'

interface Props {
  message?: string
}

export const ErrorComponment = (props: Props) => {
  return (
    <>
      <Text style={FontStyle.header6}>An error occured :(</Text>
      {props.message && (
        <Text>{props.message}</Text>
      )}
    </>
  )
}