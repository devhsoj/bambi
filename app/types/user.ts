export type User = {
    active: boolean,
    data: {
        username: string,
        key: string
    }
}

export type UserRow = {
    username: string,
    password: string,
    key: string
}