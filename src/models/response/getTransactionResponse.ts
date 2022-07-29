import { TransactionData } from "../data/transactionData";


export interface GetTransactionResponse {
    isSuccess: boolean
    errorMessage?: string
    data?: TransactionData
}