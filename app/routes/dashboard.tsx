import { getSession } from '../lib/session.server';
import type { LoaderArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node';

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'));

    if (session.get('user')) return redirect('/');

    return null;
}