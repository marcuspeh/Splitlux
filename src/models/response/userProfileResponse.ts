import { UserProfileData } from "../data/userProfileData"

export type UserProfileResponse = {
    isSuccess: boolean,
    data?: UserProfileData
}