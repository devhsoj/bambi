import { getSession } from '@/lib/session.server';
import { removeAll } from '@/lib/user/password.server';
import type { ActionArgs } from '@remix-run/node';
import { Response } from '@remix-run/node';

export async function action({ request }: ActionArgs) {
    const session = await getSession(request.headers.get('Cookie'));
    const user = session.get('user');

    if (request.method !== 'DELETE') {
        return new Response(null, { status: 400 });
    }

    await removeAll(user);

    return new Response(null, { status: 200 });
}