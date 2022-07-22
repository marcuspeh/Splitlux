export type SimplifiedUserProfileData = {
  id: string
  name: string
  profile_pic: string
}

export type SimplifiedTransactionData = {
  id: string
  title: string
  amount: number
  created_at: Date
}

export type GroupData = {
  id: string
  name: string
  owner: SimplifiedUserProfileData,
  members: SimplifiedUserProfileData[]
  member_count: number,
  transactions: SimplifiedTransactionData[]
  is_closed: boolean
  is_owner: boolean
  code_id: string
}