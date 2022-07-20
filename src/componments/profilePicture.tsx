import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

interface Props {
  picture: string
  onPress?: () => void
  isEdit? : boolean
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
      <Image style={[styles.container, props.style]} source={{uri: base64Icon}} />
      {props.isEdit && (
        <Text style={styles.editLabel}>
          <FontAwesomeIcon icon={faPencil} />
        </Text>
      )}
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
  editLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#d9d9d9',
    padding: 5,
    borderRadius: 50,
    marginLeft: 5,
    marginBottom: 5,
  }
});
  
export default ProfilePicture