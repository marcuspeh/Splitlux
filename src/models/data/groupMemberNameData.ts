export type UserNameData = {
    id: string,
    name: string
}

export type GroupMemberNameData = {
    name: string, 
    code_id: string, 
    members: UserNameData[]
}