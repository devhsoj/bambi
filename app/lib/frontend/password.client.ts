import type { Password } from '@/types/password';

export async function updatePassword(password: Password) {
    console.log(password);

    await fetch(`/dashboard/passwords/update/${password.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
    });
}

const specialCharacters = '$!?@$&*'.split('');
const alphaCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numericCharacters = '0123456789'.split('');

export function generatePassword({ special, numeric, length } = { special: true, numeric: true, length: 16 }) {
    let characters = alphaCharacters;
    let password = '';

    if (special) characters = characters.concat(specialCharacters);
    if (numeric) characters = characters.concat(numericCharacters);

    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    return password;
}