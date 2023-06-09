import { compare } from 'bcrypt';
import { db } from '../db/index.server';
import type { User, UserRow } from '~/app/types/user';
import type { ApiResponse } from '~/app/types/response';
import { decrypt } from '../encryption/decrypt.server';

const findUserByUsername = db.prepare('SELECT * FROM users WHERE username = ? LIMIT 1');

export async function login(username: FormDataEntryValue | null, password: FormDataEntryValue | null): Promise<ApiResponse<User>> {
    if (!username || !password) {
        return {
            success: false,
            status: 401,
            message: 'Invalid Form Submission'
        };
    }

    const user = findUserByUsername.get([ username.toString() ]) as UserRow;

    if (!user) {
        return {
            success: false,
            status: 401,
            message: 'Invalid Credentials'
        };
    }

    const success = await compare(password.toString(), user.password);

    return {
        success,
        status: success ? 200 : 401,
        message: success ? 'Authenticated' : 'Invalid Credentials',
        data: success ? {
            active: true,
            data: {
                username: username.toString(),
                key: decrypt(user.key, password.toString()).toString('hex')
            }
        } : undefined
    };
}