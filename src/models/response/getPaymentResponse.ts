import { GetPaymentData } from "../data/getPaymentData"

export type GetPaymentResponse = {
    isSuccess: boolean,
    errorMessage?: string
    data?: GetPaymentData
}