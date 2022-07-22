import { SimplifiedUserProfileData } from "./groupData";

export type GroupMembersData = {
    name: string
    members: SimplifiedUserProfileData[]
    is_closed: boolean
    code_id: string
  }