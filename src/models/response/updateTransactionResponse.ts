import { TransactionData } from "../data/transactionData";

export interface UpdateTransactionResponse {
    isSuccess: boolean
    errorMessage?: string
    data?: TransactionData
}