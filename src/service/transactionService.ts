import { AxiosError } from 'axios';
import { UserNameData } from '../models/data/groupMemberNameData';
import { CreateTransactionResponse } from '../models/response/createTransactionResposne';
import { DeleteTransactionResponse } from '../models/response/deleteTransactionResponse';
import { GetTransactionResponse } from '../models/response/getTransactionResponse';
import customAxios from './utilities/customAxios';
import getHeader from './utilities/headerUtilities';

const API_URL="http://10.0.2.2:8000"

const addTransaction = async (groupId: string, title: string, amount: number, payers: any, expenses: any): Promise<CreateTransactionResponse> => {
  try {
    var uri: string = `${API_URL}/transaction/create`
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

const getTransaction = async (transactionId: string): Promise<GetTransactionResponse> => {
  try {
    var uri: string = `${API_URL}/transaction/${transactionId}`
    const result = await customAxios.get(uri, {headers: await getHeader()})

    result.data.expenses.forEach((obj: { user: UserNameData; amount: number; }, index: number, arr: any[]) => {
      arr[index] = ({
        user: obj.user,
        amount: String(obj.amount)
      })
    })

    result.data.payers.forEach((obj: { user: UserNameData; amount: number; }, index: number, arr: any[]) => {
      arr[index] = ({
        user: obj.user,
        amount: String(obj.amount)
      })
    })

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

const updateTransaction = async (transactionId: string, title: string, amount: number, payers: any, expenses: any): Promise<CreateTransactionResponse> => {
  try {
    var uri: string = `${API_URL}/transaction/update/${transactionId}`
    await customAxios.patch(uri, {
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

const deleteTransaction = async (transactionId: string): Promise<DeleteTransactionResponse> => {
  try {
    var uri: string = `${API_URL}/transaction/delete/${transactionId}`
    await customAxios.delete(uri, {headers: await getHeader()})

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
    addTransaction,
    getTransaction,
    updateTransaction,
    deleteTransaction
};