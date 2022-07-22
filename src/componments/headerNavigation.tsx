import React from "react"
import { StyleSheet, Text, View } from "react-native"
import LayoutStyle from "../style/layoutStyle"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import FontStyle from "../style/fontStyle"

interface Props {
  title: string
  navigation: any
}

const HeaderNavigation = (props: Props) => {
  const backClick = () => {
    props.navigation.goBack()
  }

  return (
  <View style={[LayoutStyle.background, styles.container]}>
    <View style={styles.backButton} onTouchStart={backClick}>
      <FontAwesomeIcon icon={faArrowLeft} style={LayoutStyle.linkText}/>
    </View>
    <View style={styles.title}>
      <Text style={[FontStyle.title]}>{props.title}</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 30,
    paddingRight: 30,
    paddingBottom: 15,
    paddingTop: 15, 
    paddingLeft: 30,

    display: 'flex',
    flexDirection: "row"
  },
  title: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',

    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backButton: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
});
  
export default HeaderNavigation