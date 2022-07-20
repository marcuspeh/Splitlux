import { AxiosError } from 'axios';
import { GenericResponse } from '../models/response/genericResponse';
import customAxios from './utilities/customAxios';

const API_URL="http://10.0.2.2:8000"

const checkServer = async (n?: number, searchTerm?: string): Promise<GenericResponse> => {
  try {
    var uri: string = `${API_URL}/auth/checkServer/`
    await customAxios.get(uri)

    return {
      isSuccess: true,
    }
  } catch (error: AxiosError | any) {
    console.log(error)

    return {
      isSuccess: false
    }
  }
}


export const ServerService = {
  checkServer
};