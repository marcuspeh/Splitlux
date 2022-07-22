import { UserProfileData } from "../data/userProfileData"

export type UserProfileResponse = {
    isSuccess: boolean,
    errorMessage?: string
    data?: UserProfileData
}