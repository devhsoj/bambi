import config from '@/config.server';
import { createCipheriv, pbkdf2Sync, randomBytes } from 'crypto';
import { hash } from '@/lib/hash/hash.server';

export function encrypt(data: Buffer | string, key: Buffer | string, keyIterations: number = config.crypto.pbkdf2.userKeyIterations) {
    const iv = randomBytes(32);
    const salt = randomBytes(32);

    const derivedKey = pbkdf2Sync(key, salt, keyIterations, 32, 'sha512');
    const cipher = createCipheriv('aes-256-gcm', derivedKey, iv);

    const encrypted = Buffer.concat([
        cipher.update(typeof data === 'string' ? Buffer.from(data, 'utf-8') : data),
        cipher.final()
    ]).toString('hex') + '$' + iv.toString('hex') + '$' + salt.toString('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return encrypted + '$' + authTag;
}

export function encryptSHA256Derivation(data: Buffer | string, key: Buffer | string) {
    const iv = randomBytes(32);
    const salt = randomBytes(32);

    const key_ = hash(key, salt, 'sha256');
    const cipher = createCipheriv('aes-256-gcm', key_, iv);

    const encrypted = Buffer.concat([
        cipher.update(typeof data === 'string' ? Buffer.from(data, 'utf-8') : data),
        cipher.final()
    ]).toString('hex') + '$' + iv.toString('hex') + '$' + salt.toString('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return encrypted + '$' + authTag;
}