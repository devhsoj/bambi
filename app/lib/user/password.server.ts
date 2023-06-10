import type { ApiResponse } from '@/types/response';
import type { User } from '@/types/user';
import { encryptSHA256Derivation } from '@/lib/encryption/encrypt.server';
import { db } from '@/lib/db/sqlite.server';
import type { Password, PasswordFormData, PasswordRow } from '@/types/password';
import { decryptSHA256Derivation } from '@/lib/encryption/decrypt.server';
import { PasswordItem } from '@/types/validation/password';

const insertPasswordByUser = db.prepare('INSERT INTO passwords (user_id, data) VALUES (?, ?)');

export async function create(user: User | undefined, passwordData: PasswordFormData): Promise<ApiResponse> {
    if (!user) {
        return {
            success: false,
            status: 401,
            message: 'Not Authenticated'
        };
    }

    const { data, problems } = PasswordItem(passwordData);

    if (problems) {
        return {
            success: false,
            status: 401,
            message: problems.summary
        };
    }

    const key = Buffer.from(user.data.key, 'hex');
    const encryptedPasswordItemData = encryptSHA256Derivation(JSON.stringify(data), key);

    insertPasswordByUser.run([
        user.data.id,
        encryptedPasswordItemData
    ]);

    return {
        success: true,
        status: 200,
        message: 'Password Created'
    };
}

const getPasswordsByUser = db.prepare('SELECT id,data FROM passwords WHERE user_id = ?');

export async function list(user: User | undefined): Promise<ApiResponse<Password[]>> {
    if (!user) {
        return {
            success: false,
            status: 401,
            message: 'Not Authenticated'
        };
    }

    const rows = getPasswordsByUser.all([user.data.id]) as PasswordRow[] | undefined;
    const key = Buffer.from(user.data.key, 'hex');

    const data = rows?.map(item => {

        return {
            id: item.id,
            ...JSON.parse(decryptSHA256Derivation(item.data, key).toString())
        };

    });

    return {
        success: true,
        status: 200,
        message: '',
        data
    };
}

const deletePasswordsByUserById = db.prepare('DELETE FROM passwords WHERE user_id = ? AND id = ?');

export async function remove(user: User | undefined, id: Password['id']): Promise<ApiResponse> {
    if (!user) {
        return {
            success: false,
            status: 401,
            message: 'Not Authenticated'
        };
    }

    deletePasswordsByUserById.run([
        user.data.id,
        id
    ]);

    return {
        success: true,
        status: 200,
        message: ''
    };
}

const deletePasswordsByUser = db.prepare('DELETE FROM passwords WHERE user_id = ?');

export async function removeAll(user: User | undefined): Promise<ApiResponse> {
    if (!user) {
        return {
            success: false,
            status: 401,
            message: 'Not Authenticated'
        };
    }

    deletePasswordsByUser.run([user.data.id]);

    return {
        success: true,
        status: 200,
        message: ''
    };
}