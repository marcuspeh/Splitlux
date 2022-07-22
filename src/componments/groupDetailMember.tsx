import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import LayoutStyle from "../style/layoutStyle"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import FontStyle from "../style/fontStyle"
import ProfilePicture from "./profilePicture"

interface Props {
  creatorName: string
  creatorPic: string,
  memberPic: string[],
  memberCount: number,
  onClick: () => void
}

const GroupDetailsMember = (props: Props) => {

  const generateMemberPic = () => {
    if (props.memberPic.length == 1) {
      return (
        <ProfilePicture picture={props.memberPic[0]} style={[styles.profilePicSize1]}/>
      )
    } else if (props.memberPic.length == 2) {
      return (
        <>
          <ProfilePicture picture={props.memberPic[0]} style={[styles.profilePicSize1]}/>
          <ProfilePicture picture={props.memberPic[1]} style={[styles.profilePicSize2]}/>
        </>
      )
    } else if (props.memberPic.length == 3) {
      return (
        <>
          <ProfilePicture picture={props.memberPic[0]} style={[styles.profilePicSize1]}/>
          <ProfilePicture picture={props.memberPic[1]} style={[styles.profilePicSize2]}/>
          <ProfilePicture picture={props.memberPic[2]} style={[styles.profilePicSize3]}/>
        </>
      )
    } else {
      return (
        <>
          <ProfilePicture picture={props.memberPic[0]} style={[styles.profilePicSize1]}/>
          <ProfilePicture picture={props.memberPic[1]} style={[styles.profilePicSize2]}/>
          <ProfilePicture picture={props.memberPic[2]} style={[styles.profilePicSize3]}/>
          <View style={[styles.profilePicExtraNumber]}> 
            <Text style={[FontStyle.body2]}>+{props.memberPic.length - 3}</Text>
          </View>
        </>
      )
    }
  }

  return (
  <View style={[styles.row]}>
    <View>
      <Text style={[FontStyle.caption]}>Created By:</Text>
      <View style={[styles.detailsRow]}>
        <ProfilePicture picture={props.creatorPic} style={[styles.profilePicSize]}/>
        <Text style={[FontStyle.body2]}>{" "}{props.creatorName}</Text>
      </View>
    </View>
    <View>
      <Text style={[FontStyle.caption]}>Members:</Text>
      <View style={[styles.detailsRow]} onTouchStart={props.onClick}>
        {generateMemberPic()}
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-end',
  },
  detailsRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    marginTop: 7
  },
  profilePicSize: {
    width: 30,
    height: 30,
  },
  profilePicSize1: {
    width: 30,
    height: 30,
    position: 'relative'
  },
  profilePicSize2: {
    width: 30,
    height: 30,
    position: 'relative',
    left: -4
  },
  profilePicSize3: {
    width: 30,
    height: 30,
    position: 'relative',
    left: -8
  },
  profilePicExtraNumber: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',

    width: 30,
    height: 30,
    backgroundColor: 'rgba(217, 217, 217, 1)',

    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',

    position: 'relative',
    left: -12
  }
});
  
export default GroupDetailsMember