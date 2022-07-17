import axios, { AxiosError } from 'axios';
import { GroupListResponse } from '../models/response/groupListResponse';
import customAxios from './utilities/customAxios';
import getHeader from './utilities/headerUtilities';

const API_URL="http://10.0.2.2:8000"

const getGroupList = async (n?: number): Promise<GroupListResponse> => {
  try {
    const uri = n ? `${API_URL}/group/list/?n=${n}` : `${API_URL}/group/list/`

    const result = await customAxios.get(uri, {headers: await getHeader()})

    return {
      isSuccess: true, 
      data: result.data
    }
  } catch (error: AxiosError | any) {
    console.log(error)

    return {
      isSuccess: false
    }
  }
}
  

export const GroupService = {
  getGroupList
};