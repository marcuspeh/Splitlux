import React from "react"
import { StyleSheet, Text, View } from "react-native"
import FontStyle from "../style/fontStyle"

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup'
import LayoutStyle from "../style/layoutStyle"

interface Props {
    title: String
    groupCode: String
    memberCount: String
}

const GroupCard = (props: Props) => {
    return (
      <View style={[LayoutStyle.background, styles.container]}>
        <Text style={FontStyle.body1}>{props.title}</Text>
        <View style={styles.row}>
          <Text style={FontStyle.caption}>Group Code: {props.groupCode}</Text>
          <View style={styles.personCount}>
            <FontAwesomeIcon icon={ faPeopleGroup } />
            <Text style={[FontStyle.caption]}>
              {' '}{props.memberCount}
            </Text>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
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
  image: {
    backgroundColor: 'red',
    color: "black"
  },
  personCount: {
    display: 'flex',
    flexDirection: "row",
    width: "12%"
  }
});
  
export default GroupCard