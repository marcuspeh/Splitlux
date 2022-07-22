import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { SimplifiedUserProfileData } from "../models/data/groupData"
import FontStyle from "../style/fontStyle"

import LayoutStyle from "../style/layoutStyle"
import ProfilePicture from "./profilePicture"

interface Props {
    person: SimplifiedUserProfileData
}

const PersonCard = (props: Props) => {
  return (
  <View style={[LayoutStyle.background, styles.container]}>
    <View style={styles.row}>
      <ProfilePicture picture={props.person.profile_pic} style={{width: 30, height: 30, marginRight: 10}}/>
      <View style={styles.nameView}>
        <Text style={[FontStyle.body1, styles.nameText]}>{props.person.name}</Text>
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    width: "100%",
    borderColor: 'rgba(0, 0, 0, 0.01)',
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: "row"
  },
  nameView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  nameText: {
    textAlign: "left",
    width: '100%'
  }
});
  
export default PersonCard