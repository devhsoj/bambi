const { randomBytes, createCipheriv, pbkdf2Sync } = require('crypto');
const Database = require('better-sqlite3');
const { hashSync } = require('bcrypt');
const { resolve } = require('path');
const { readFileSync, existsSync } = require('fs');

function encryptKey(data, key) {
    const iv = randomBytes(32);
    const salt = randomBytes(32);

    const derivedKey = pbkdf2Sync(key, salt, process.env.PBKDF2_USER_KEY_ITERATIONS ? parseInt(process.env.PBKDF2_USER_KEY_ITERATIONS) : 250_000, 32, 'sha512');
    const cipher = createCipheriv('aes-256-gcm', derivedKey, iv);

    const encrypted = Buffer.concat([
        cipher.update(typeof data === 'string' ? Buffer.from(data, 'utf-8') : data),
        cipher.final()
    ]).toString('hex') + '$' + iv.toString('hex') + '$' + salt.toString('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return encrypted + '$' + authTag;
}

(() => {
    const sqliteFilepath = resolve(__dirname, '../', 'build/', 'bambi.db');
    const sqliteFileExists = existsSync(sqliteFilepath);
    const db = new Database(sqliteFilepath);

    if (!sqliteFileExists) {
        const schema = readFileSync(resolve(__dirname, '../', 'app/', 'lib/', 'db/', 'sql/', 'schema.sql')).toString();

        db.exec(schema);
    }

    const [
        username,
        password,
        bcryptRounds
    ] = process.argv.slice(2);

    if (!username || !password) {
        console.error('usage: node scripts/add-user.js [username] [password] [optional: bcrypt rounds (default: 14)]');
        process.exit(1);
    }

    const exists = db.prepare('SELECT 1 FROM users WHERE username = ?').get([ username ]) !== undefined;

    if (exists) {
        console.log(`'${username}' already exists!`);
        process.exit(1);
    }

    db.prepare('INSERT INTO users (username, password, key) VALUES (?, ?, ?)').run([
        username,
        hashSync(password, bcryptRounds ? parseInt(bcryptRounds) : 14),
        encryptKey(randomBytes(256), password)
    ]);

    db.close();
})();