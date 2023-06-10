import type { BinaryToTextEncoding} from 'crypto';
import { createHash } from 'crypto';

export function hash(data: Buffer | string, salt?: Buffer | string, algorithm: string = 'sha256', encoding?: BinaryToTextEncoding) {
    const hasher = createHash(algorithm);

    hasher.update(data);

    if (salt) {
        hasher.update(hash(salt));
    }

    hasher.update(data);

    return encoding ? hasher.digest(encoding) : hasher.digest();
}