import { existsSync, readFileSync } from 'fs';
import Database from 'better-sqlite3';
import { resolve } from 'path';

const sqliteFilepath = resolve(__dirname, 'bambi.db');
const sqliteFileExists = existsSync(sqliteFilepath);

export const db = new Database(sqliteFilepath);

if (!sqliteFileExists) {
    const schema = readFileSync(resolve(__dirname, '../', 'app/', 'lib/', 'db/', 'sql/', 'schema.sql')).toString();

    db.exec(schema);
}

process.on('exit', () => db.close());