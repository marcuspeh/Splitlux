import { SimplifiedUserProfileData } from "./groupData";
import { UserNameData } from "./groupMemberNameData";

export type PaymentData = {
  id: string
  payer: UserNameData
  payee: UserNameData
  amount: number
}