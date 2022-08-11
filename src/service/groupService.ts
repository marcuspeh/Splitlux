import axios, { AxiosError } from 'axios';
import { CreateGroupResponse } from '../models/response/createGroupResponse';
import { GetGroupMembersNameResponse } from '../models/response/getGroupMembersNameResponse';
import { GetGroupMembersResponse } from '../models/response/getGroupMembersResponse';
import { GetPaymentResponse } from '../models/response/getPaymentResponse';
import { GroupDataResponse } from '../models/response/groupDataResponse';
import { GroupListResponse } from '../models/response/groupListResponse';
import { JoinGroupResponse } from '../models/response/joinGroupResponse';
import customAxios from './utilities/customAxios';
import getHeader from './utilities/headerUtilities';
import API_URL from '../common'


const getGroupList = async (n?: number): Promise<GroupListResponse> => {
  try {
    var uri: string = n ? `${API_URL}/group/list?n=${n}` :  `${API_URL}/group/list`

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
    var uri: string = `${API_URL}/group/create`

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
    var uri: string = `${API_URL}/group/join`

    const result = await customAxios.put(uri, {group_id: groupCode.toUpperCase()}, {headers: await getHeader()})

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
    var uri: string = `${API_URL}/group/${groupId}`

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

const getGroupMembers = async (groupId: string): Promise<GetGroupMembersResponse> => {
  try {
    var uri: string = `${API_URL}/group/members/${groupId}`

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

const getGroupMembersName = async (groupId: string): Promise<GetGroupMembersNameResponse> => {
  try {
    var uri: string = `${API_URL}/group/membersName/${groupId}`

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

const calculatePayments = async (groupId: string): Promise<GroupDataResponse> => {
  try {
    var uri: string = `${API_URL}/group/calculatepayment/${groupId}`

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

const reopenGroup = async (groupId: string): Promise<GroupDataResponse> => {
  try {
    var uri: string = `${API_URL}/group/reopen/${groupId}`

    const result = await customAxios.put(uri, {}, {headers: await getHeader()})

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

const getPayments = async (groupId: string): Promise<GetPaymentResponse> => {
  try {
    var uri: string = `${API_URL}/group/payment/${groupId}`

    const result = await customAxios.get(uri, {headers: await getHeader()})

    return {
      isSuccess: true, 
      data: {
        name: result.data.name,
        payments: result.data.to_pay_list
      }
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
  getGroupData,
  getGroupMembers,
  calculatePayments,
  reopenGroup,
  getPayments,
  getGroupMembersName
};