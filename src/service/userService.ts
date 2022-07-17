import axios, { AxiosError } from 'axios';
import { UserProfileResponse } from '../models/response/userProfileResponse';
import customAxios from './utilities/customAxios';
import getHeader from './utilities/headerUtilities';

const API_URL="http://10.0.2.2:8000"

const getProfile = async (n?: number, searchTerm?: string): Promise<UserProfileResponse> => {
  try {
    var uri: string = `${API_URL}/auth/users/`
    const result = await customAxios.get(uri, {headers: await getHeader()})

    return {
      isSuccess: true, 
      data: result.data[0]
    }
  } catch (error: AxiosError | any) {
    console.log(error)

    return {
      isSuccess: false
    }
  }
}
  

export const UserService = {
  getProfile
};