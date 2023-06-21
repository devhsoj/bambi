import type { Password } from '@/types/password';

export async function updatePassword(password: Password) {
    await fetch(`/dashboard/passwords/update/${password.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(password)
    });
}