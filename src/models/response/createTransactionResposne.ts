import { SimplifiedTransactionData } from "../data/groupData";

export interface CreateTransactionResponse {
    isSuccess: boolean
    errorMessage?: string
    data?: SimplifiedTransactionData
}