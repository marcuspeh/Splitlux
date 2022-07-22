import { GroupData } from "../data/groupData"

export type GroupDataResponse = {
    isSuccess: boolean,
    errorMessage?: string
    data?: GroupData
}