import axios, { AxiosError } from 'axios';
import { CreateGroupResponse } from '../models/response/createGroupResponse';
import { GroupDataResponse } from '../models/response/groupDataResponse';
import { GroupListResponse } from '../models/response/groupListResponse';
import { JoinGroupResponse } from '../models/response/joinGroupResponse';
import customAxios from './utilities/customAxios';
import getHeader from './utilities/headerUtilities';

const API_URL="http://10.0.2.2:8000"

const getGroupList = async (n?: number): Promise<GroupListResponse> => {
  try {
    var uri: string = n ? `${API_URL}/group/list/?n=${n}` :  `${API_URL}/group/list/`

    const result = await customAxios.get(uri, {headers: await getHeader()})

    return {
      isSuccess: true, 
      data: result.data
    }
  } catch (error: AxiosError | any) {
    console.log(error.response.data)

    return {
      isSuccess: false,
      errorMessage: error.response.data
    }
  }
}
  
const createGroup = async (name: string): Promise<CreateGroupResponse> => {
  try {
    var uri: string = `${API_URL}/group/create/`

    const result = await customAxios.post(uri, {name: name}, {headers: await getHeader()})

    return {
      isSuccess: true, 
      data: result.data
    }
  } catch (error: AxiosError | any) {
    console.log(error.response.data)

    return {
      isSuccess: false,
      errorMessage: error.response.data
    }
  }
}
  
const joinGroup = async (groupCode: string): Promise<JoinGroupResponse> => {
  try {
    var uri: string = `${API_URL}/group/join/`

    const result = await customAxios.put(uri, {group_id: groupCode}, {headers: await getHeader()})

    return {
      isSuccess: true, 
      data: result.data
    }
  } catch (error: AxiosError | any) {
    console.log(error.response.data)

    return {
      isSuccess: false,
      errorMessage: error.response.data
    }
  }
}  

const getGroupData = async (groupId: string): Promise<GroupDataResponse> => {
  try {
    var uri: string = `${API_URL}/group/${groupId}/`

    const result = await customAxios.get(uri, {headers: await getHeader()})

    return {
      isSuccess: true, 
      data: result.data
    }
  } catch (error: AxiosError | any) {
    console.log(error.response.data)

    return {
      isSuccess: false,
      errorMessage: error.response.data
    }
  }
}

export const GroupService = {
  getGroupList,
  createGroup,
  joinGroup,
  getGroupData
};