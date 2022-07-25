import { GroupMemberNameData } from "../data/groupMemberNameData";

export type GetGroupMembersNameResponse = {
    isSuccess: boolean,
    errorMessage?: string
    data?: GroupMemberNameData
}