import { commitSession, getSession } from '../lib/session.server';
import type { LoaderArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Outlet, useOutletContext } from '@remix-run/react';
import type { User } from '../types/user';
import Dashboard from '../components/Dashboard';

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'));

    session.set('lastVisitedUrl', request.url);

    if (!session.get('user')) {

        return redirect('/auth/login', {
            headers: {
                'Set-Cookie': await commitSession(session)
            }
        });

    }

    return null;
}

export default function Dashboard_() {
    const user = useOutletContext<User>();

    return (
        <Dashboard>
            <Outlet context={user} />
        </Dashboard>
    );
}