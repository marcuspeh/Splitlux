import React from "react"
import { StyleSheet, Text, View } from "react-native"
import LayoutStyle from "../style/layoutStyle"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import FontStyle from "../style/fontStyle"

interface Props {
  navigation: any
}

const NavBar = (props: Props) => {
  const homeClick = () => {
    props.navigation.navigate('Home')
  }

  const joinClick = () => {
    props.navigation.navigate('JoinGroup')
  }

  const createClick = () => {
    props.navigation.navigate('CreateGroup')
  }

  const profileClick = () => {
    props.navigation.navigate('Profile')
  }


  return (
  <View style={[LayoutStyle.background, styles.container]}>
    <View style={styles.group} onTouchStart={homeClick}>
      <FontAwesomeIcon icon={ faHome } />
      <Text style={[FontStyle.body3, styles.groupText]}>Home</Text>
    </View>
    <View style={styles.group} onTouchStart={joinClick}>
      <FontAwesomeIcon icon={ faRightToBracket } />
      <Text style={[FontStyle.body3, styles.groupText]}>Join</Text>
    </View>
    <View style={styles.group} onTouchStart={createClick}>
      <FontAwesomeIcon icon={ faPlus } />
      <Text style={[FontStyle.body3, styles.groupText]}>Create</Text>
    </View>
    <View style={styles.group} onTouchStart={profileClick}>
      <FontAwesomeIcon icon={ faUser } />
      <Text style={[FontStyle.body3, styles.groupText]}>Profile</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    width: "100%",

    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,

    display: 'flex',
    justifyContent: "space-around",
    flexDirection: "row",

    position: 'absolute',
    bottom: 0
  },
  group: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
  },
  groupText: {
    marginTop: 5
  }
});
  
export default NavBar