export type User = {
    active: boolean,
    data: {
        id: number,
        username: string,
        key: string
    }
}

export type UserRow = {
    id: number,
    username: string,
    password: string,
    key: string
}