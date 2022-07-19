import React from "react"
import { Image, StyleSheet, View } from "react-native"

interface Props {
  picture: string
  onPress?: () => void
  style?: {}
}

const ProfilePicture = (props: Props) => {
  const onClick = () => {
    if (props.onPress) {
      props.onPress()
    }
  }

  var base64Icon = `data:image/png;base64,${props.picture}`;

  return (
    <View onTouchStart={onClick}>
      <Image style={[styles.container, props.style]} source={{uri: base64Icon}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 50, 
    height: 50, 
    resizeMode: "cover", 
    borderWidth: 1, 
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 100
  },
});
  
export default ProfilePicture