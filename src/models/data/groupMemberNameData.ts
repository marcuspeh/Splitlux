export type UserNameData = {
    id: string,
    name: string,
    index?: number
}

export type GroupMemberNameData = {
    name: string, 
    code_id: string, 
    members: UserNameData[]
}