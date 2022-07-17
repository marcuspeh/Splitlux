import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SimpleGroupData } from '../../models/data/simpleGroupData'
import { GroupListResponse } from '../../models/response/groupListResponse'
import { GroupService } from '../../service/groupService'
import FontStyle from '../../style/fontStyle'
import LayoutStyle from '../../style/layoutStyle'
import GroupCard from '../groupCard'
import { Loading } from '../loading'

interface Props {
  navigation: any,
  n?: number
}

const GroupHomeList = (props: Props) => {
  const [groupList, setGroupList] = useState<SimpleGroupData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getGroupList = async () => {
    // get groupList from backend
    const result: GroupListResponse = await GroupService.getGroupList(props.n)
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

  const renderGroupCard  = ({ item }: {item: SimpleGroupData}) => (
    <View
      style={{
        margin: 1,
        marginBottom: 15
      }}>
    <GroupCard 
      title={item.name} 
      groupCode={item.code_id} 
      memberCount={item.member_count} 
      onClick={createGroupClick(item.id)}
      key={item.id}
    />
    </View>
)

  if (isLoading && groupList.length == 0) {
    return <Loading />
  } else {
    return (
      <FlatList
        data={groupList}
        renderItem={renderGroupCard}
        style={LayoutStyle.containerWithoutCenter}
        ListEmptyComponent={<Text style={FontStyle.body2}>There is no group found :(</Text>}
      />
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

export default GroupHomeList