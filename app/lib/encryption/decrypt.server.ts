import config from '@/config.server';
import { createDecipheriv, pbkdf2Sync } from 'crypto';
import { hash } from '@/lib/hash/hash.server';

export function decrypt(concatenatedEncryptionData: string, key: Buffer | string, keyIterations: number = config.crypto.pbkdf2.userKeyIterations) {
    const [ data, iv, salt, authTag ] = concatenatedEncryptionData.split('$').map(s => Buffer.from(s, 'hex'));
    const derivedKey = pbkdf2Sync(key, salt, keyIterations, 32, 'sha512');
    const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv);

    decipher.setAuthTag(authTag);

    return Buffer.concat([
        decipher.update(data),
        decipher.final()
    ]);
}

export function decryptSHA256Derivation(concatenatedEncryptionData: string, key: Buffer | string) {
    const [ data, iv, salt, authTag ] = concatenatedEncryptionData.split('$').map(s => Buffer.from(s, 'hex'));

    const key_ = hash(key, salt, 'sha256');
    const decipher = createDecipheriv('aes-256-gcm', key_, iv);

    decipher.setAuthTag(authTag);

    return Buffer.concat([
        decipher.update(data),
        decipher.final()
    ]);
}