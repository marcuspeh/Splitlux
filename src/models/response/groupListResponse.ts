import { SimpleGroupData } from "../data/simpleGroupData";

export type GroupListResponse = {
    isSuccess: boolean,
    errorMessage?: string
    data?: SimpleGroupData[]
}