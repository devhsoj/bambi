import { createDecipheriv, pbkdf2Sync } from 'crypto';

export function decrypt(encryptedDataWithIV: string, key: string) {
    const [ data, iv, authTag ] = encryptedDataWithIV.split('$').map(s => Buffer.from(s, 'hex'));
    const derivedKey = pbkdf2Sync(key, iv, 200_000, 32, 'sha512');
    const decipher = createDecipheriv('aes-256-gcm', derivedKey, iv);

    decipher.setAuthTag(authTag);

    return Buffer.concat([
        decipher.update(data),
        decipher.final()
    ]);
}