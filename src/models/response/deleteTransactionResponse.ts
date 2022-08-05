import { SimplifiedTransactionData } from "../data/groupData";

export interface DeleteTransactionResponse {
    isSuccess: boolean
    errorMessage?: string
    data?: SimplifiedTransactionData
}