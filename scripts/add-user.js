const { randomBytes, createCipheriv, pbkdf2Sync } = require('crypto');
const Database = require('better-sqlite3');
const { hashSync } = require('bcrypt');
const { resolve } = require('path');

function encryptKey(data, password) {
    const iv = randomBytes(32);
    const derivedKey = pbkdf2Sync(password, iv, 200_000, 32, 'sha512');
    const cipher = createCipheriv('aes-256-gcm', derivedKey, iv);

    const encrypted = Buffer.concat([
        cipher.update(Buffer.from(data, 'utf-8')),
        cipher.final()
    ]).toString('hex') + '$' + iv.toString('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return encrypted + '$' + authTag;
}

(() => {
    const db = new Database(resolve(__dirname, '../', 'build/', 'bambi.db'));
    const [
        username,
        password,
        bcryptRounds
    ] = process.argv.slice(2);

    if (!username || !password) {
        console.error('usage: node scripts/add-user.js [username] [password] [optional: bcrypt rounds (default: 14)]');
        process.exit(1);
    }

    const exists = db.prepare('SELECT username FROM users WHERE username = ?').get([ username ]) !== undefined;

    if (exists) {
        console.log(`'${username}' already exists!`);
        process.exit(1);
    }

    db.prepare('INSERT INTO users (username, password, key) VALUES (?, ?, ?)').run([
        username,
        hashSync(password, bcryptRounds ? parseInt(bcryptRounds) : 14),
        encryptKey(randomBytes(64), password)
    ]);
})();