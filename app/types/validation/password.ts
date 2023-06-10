import { type } from 'arktype';

export const PasswordItem = type({
    name: '(string>0 & string<=32)',
    username: '(string>0 & string<=64)',
    password: '(string>0 & string<=256)'
});