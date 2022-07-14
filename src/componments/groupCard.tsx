import React from "react"
import { StyleSheet, Text, View } from "react-native"
import FontStyle from "../style/fontStyle"
import UserSolidIcon from '../assets/images/people-group-solid.svg'

interface Props {
    title: String
    groupCode: String
    memberCount: String
}

const GroupCard = (props: Props) => {
    return (
      <View style={styles.container}>
        <Text style={FontStyle.body1}>{props.title}</Text>
        <View style={styles.row}>
          <Text style={FontStyle.caption}>Group Code: {props.groupCode}</Text>
          <Text style={[FontStyle.caption, styles.personCount]}>
            <UserSolidIcon style={styles.image} width={12} height={12}/>
            {' '}{props.memberCount}
          </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    border: "solid",
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 2,
    width: "100%"
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
    width: "12%"
  }
});
  
export default GroupCard