import type { LoaderArgs } from '@remix-run/node';
import { commitSession, getSession } from '../lib/session.server';

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'));
    
    session.unset('user');

    return new Response(null, {
        headers: {
            'X-Remix-Redirect': '/auth/login',
            'Set-Cookie': await commitSession(session)
        }
    });
}