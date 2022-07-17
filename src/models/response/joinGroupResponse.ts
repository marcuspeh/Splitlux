import { CreateGroupData } from "../data/createGroupData";

export interface JoinGroupResponse {
    isSuccess: boolean
    errorMessage?: string
    data?: CreateGroupData
}