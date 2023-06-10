import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react';

import styles from '@/styles/app.css';
import { getSession } from './lib/session.server';

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles }
];

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'));
    const user = session.get('user');

    if (!user) return null;

    const safeUserData = {
        active: user.active,
        data: {
            id: user.data.id,
            username: user.data.username,
        }
    };

    return safeUserData;
}

export default function App() {
    const user = useLoaderData<typeof loader>();

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet context={user} />
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV !== 'production' && <LiveReload />}
            </body>
        </html>
    );
}
