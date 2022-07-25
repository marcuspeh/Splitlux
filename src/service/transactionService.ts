import { AxiosError } from 'axios';
import { CreateTransactionResponse } from '../models/response/createTransactionResposne';
import customAxios from './utilities/customAxios';
import getHeader from './utilities/headerUtilities';

const API_URL="http://10.0.2.2:8000"

const addTransaction = async (groupId: string, title: string, amount: number, payers: any, expenses: any): Promise<CreateTransactionResponse> => {
  console.log(expenses)
  try {
    var uri: string = `${API_URL}/transaction/create/`
    await customAxios.post(uri, {
      group_id: groupId, 
      title, 
      amount, 
      payers, 
      expenses
    }, {headers: await getHeader()})

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


export const TransactionService = {
    addTransaction
};