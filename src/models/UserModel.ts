export class UserModel {
    name: string
    email: string
    id: string

    constructor(name: string, email: string, id: string) {
        this.name = name
        this.email = email
        this.id = id
    }
}