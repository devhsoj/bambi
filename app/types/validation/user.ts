import { type } from 'arktype';

export const UserCredentials = type({
    username: '(string>0 & string<16)',
    password: '(string>0 & string<256)'
});