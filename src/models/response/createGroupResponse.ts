import { CreateGroupData } from "../data/createGroupData";

export interface CreateGroupResponse {
    isSuccess: boolean
    errorMessage?: string
    data?: CreateGroupData
}