export type Password = {
    id: number,
    name: string,
    username: string,
    password: string
}

export type PasswordFormData = {
    name: FormDataEntryValue | null,
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null
}

export type PasswordRow = {
    id: number,
    user_id: number,
    data: string
}