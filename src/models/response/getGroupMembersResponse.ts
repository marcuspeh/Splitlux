import { GroupMembersData } from "../data/getMembersData"

export type GetGroupMembersResponse = {
    isSuccess: boolean,
    errorMessage?: string
    data?: GroupMembersData
}