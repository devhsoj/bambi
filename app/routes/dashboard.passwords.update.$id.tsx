import { getSession } from '@/lib/session.server';
import { update } from '@/lib/user/password.server';
import type { Password } from '@/types/password';
import type { ActionArgs} from '@remix-run/node';
import { Response } from '@remix-run/node';

export async function action({ params, request }: ActionArgs) {
    const id = params['id'];
    const session = await getSession(request.headers.get('Cookie'));
    const user = session.get('user');

    if (!id || request.method !== 'POST') {
        return new Response(null, { status: 404 });
    }

    const data = await request.json() as Password;

    await update(user, parseInt(id), data);

    return new Response(null, { status: 200 });
}