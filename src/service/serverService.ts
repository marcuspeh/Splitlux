import { AxiosError } from 'axios';
import { GenericResponse } from '../models/response/genericResponse';
import customAxios from './utilities/customAxios';
import API_URL from '../common'


const checkServer = async (n?: number, searchTerm?: string): Promise<GenericResponse> => {
  try {
    var uri: string = `${API_URL}/auth/checkServer`
    await customAxios.get(uri)

    return {
      isSuccess: true,
    }
  } catch (error: AxiosError | any) {
    console.log(error.response.data)

    return {
      isSuccess: false,
      errorMessage: error.response.data
    }
  }
}


export const ServerService = {
  checkServer
};