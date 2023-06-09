export type ApiResponse<T = void> = {
    success: boolean,
    status: number,
    message: string,
    data?: T
}