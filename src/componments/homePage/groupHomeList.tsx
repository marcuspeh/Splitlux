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
  n?: number,
  searchTerm?: string
}

const GroupHomeList = (props: Props) => {
  const [groupList, setGroupList] = useState<SimpleGroupData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getGroupList = async () => {
    if (groupList.length === 0) {
      const result: GroupListResponse = await GroupService.getGroupList(props.n)
      if (result.isSuccess) {
        setGroupList(result.data || [])
      } else {
        setIsError(true)
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGroupList()
  })

  const renderGroupCard  = ({ item }: {item: SimpleGroupData}) => (
    <View
      style={{
        margin: 1,
        marginBottom: 15
      }}>
    <GroupCard 
      group={item}
      key={item.id}
      navigation={props.navigation}
    />
    </View>
  )

  const filterGroup = (word: string) => {
    return groupList.filter((group) => {
        return group.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())
      })
  }
  
  if (isLoading && groupList.length == 0) {
    return <Loading />
  } else if (props.searchTerm && props.searchTerm.length > 0) {
    return (
      <FlatList
        data={filterGroup(props.searchTerm)}
        renderItem={renderGroupCard}
        style={LayoutStyle.containerWithoutCenter}
        ListEmptyComponent={<Text style={FontStyle.body2}>There is no group found :(</Text>}
      />
    )
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