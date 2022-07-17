import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GroupCard from '../componments/groupCard'
import HeaderNavigation from '../componments/headerNavigation'
import { Loading } from '../componments/loading'
import { SimpleGroupData } from '../models/data/simpleGroupData'
import { GroupListResponse } from '../models/response/groupListResponse'
import { GroupService } from '../service/groupService'
import FontStyle from '../style/fontStyle'
import LayoutStyle from '../style/layoutStyle'


const GroupList = ({ navigation }: any) => {
  const [groupList, setGroupList] = useState<SimpleGroupData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getGroupList = async () => {
    // get groupList from backend
    const result: GroupListResponse = await GroupService.getGroupList()
    if (result.isSuccess) {
      setGroupList(result.data || [])
    } else {
      setIsError(true)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getGroupList()
  })

  const createGroupClick = (id: string): ()=>void => {
    const cardClick = () => {
      console.log(id)
    }
    return cardClick
  }

  if (isLoading && groupList.length == 0) {
    return <Loading />
  } else {
    return (
      <>
        <HeaderNavigation navigation={navigation} title={'List'} />
  
        <View style={[LayoutStyle.container]}>
          <Text style={[FontStyle.header6, styles.headerText]}>All Groups</Text>
          {
            ( groupList.map((group) =>
              <GroupCard 
                title={group.name} 
                groupCode={group.code_id} 
                memberCount={group.member_count} 
                onClick={createGroupClick(group.id)}
                style={{
                  marginBottom: 15
                }}
                key={group.id}
              />
            )) 
          }
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 40,
    textAlign: 'left',
    width: '100%'
  },
  messageText: {
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center'
  },
  characterCount: {
    width: '100%',
    textAlign: "right",
    marginTop: 5,
    marginBottom: 50
  }
})

export default GroupList