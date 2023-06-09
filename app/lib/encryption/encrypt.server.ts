import { createCipheriv, pbkdf2Sync, randomBytes } from 'crypto';

export function encrypt(data: string, key: string) {
    const iv = randomBytes(32);
    const derivedKey = pbkdf2Sync(key, iv, 200_000, 32, 'sha512');
    const cipher = createCipheriv('aes-256-gcm', derivedKey, iv);

    const encrypted = Buffer.concat([
        cipher.update(Buffer.from(data, 'utf-8')),
        cipher.final()
    ]).toString('hex') + '$' + iv.toString('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return encrypted + '$' + authTag;
}