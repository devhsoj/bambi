import { getSession } from '@/lib/session.server';
import { remove } from '@/lib/user/password.server';
import type { ActionArgs} from '@remix-run/node';
import { Response } from '@remix-run/node';

export async function action({ params, request }: ActionArgs) {
    const id = params['id'];
    const session = await getSession(request.headers.get('Cookie'));
    const user = session.get('user');

    if (!id || request.method !== 'DELETE') {
        return new Response(null, { status: 404 });
    }

    await remove(user, parseInt(id));

    return new Response(null, { status: 200 });
}