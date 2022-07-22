import { SimplifiedUserProfileData } from "./groupData";

export type PaymentData = {
  id: string
  payer: SimplifiedUserProfileData
  payee: SimplifiedUserProfileData
  amount: number
}