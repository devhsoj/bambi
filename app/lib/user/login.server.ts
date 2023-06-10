import { compare } from 'bcrypt';
import { db } from '@/lib/db/sqlite.server';
import type { User, UserRow } from '@/types/user';
import type { ApiResponse } from '@/types/response';
import { decrypt } from '@/lib/encryption/decrypt.server';
import { UserCredentials } from '@/types/validation/user';

const findUserByUsername = db.prepare('SELECT * FROM users WHERE username = ? LIMIT 1');

export async function login(username: FormDataEntryValue | null, password: FormDataEntryValue | null): Promise<ApiResponse<User>> {
    const { data, problems } = UserCredentials({
        username,
        password
    });

    if (problems) {
        return {
            success: false,
            status: 401,
            message: problems.summary
        };
    }

    const user = findUserByUsername.get([ data.username ]) as UserRow;

    if (!user) {
        return {
            success: false,
            status: 401,
            message: 'Invalid Credentials'
        };
    }

    const success = await compare(data.password, user.password);

    return {
        success,
        status: success ? 200 : 401,
        message: success ? 'Authenticated' : 'Invalid Credentials',
        data: success ? {
            active: true,
            data: {
                id: user.id,
                username: data.username,
                key: decrypt(user.key, data.password).toString('hex')
            }
        } : undefined
    };
}