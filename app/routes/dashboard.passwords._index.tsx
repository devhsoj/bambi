import BitwardenImport from '@/components/BitwardenImport';
import PasswordTable from '@/components/PasswordTable';
import { getSession } from '@/lib/session.server';
import { list } from '@/lib/user/password.server';
import type { LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData, useNavigation } from '@remix-run/react';
import { useState } from 'react';

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'));
    const user = session.get('user');
    const data = await list(user);

    return data;
}
export default function Passwords() {
    const response = useLoaderData<typeof loader>();
    const navigation = useNavigation();

    const [ removingAll, setRemovingAll ] = useState(false);

    return (
        <>
            <div className="text-3xl font-bold m-0">Passwords</div>
            <div className="divider mb-0"></div>
            <div className="menu menu-horizontal m-0">
                <Link to="new">
                    <button className="btn btn-xs hover:bg-primary hover:text-black mr-2">
                        New Password
                    </button>
                </Link>
                <BitwardenImport />
                <button className="btn btn-xs mr-2 hover:bg-error-content" onClick={async () => {
                    setRemovingAll(true);

                    const res = await fetch('/dashboard/passwords/remove', { method: 'DELETE' });

                    if (res.status === 200) {
                        setTimeout(() => {
                            setRemovingAll(false);
                            window.location.reload();
                        }, 1_000);
                    }
                }}>
                    {removingAll ? <span className="loading loading-xs loading-spinner"></span> : 'Remove All'}
                </button>
            </div>
            <div className="divider mt-0 mb-0"></div>
            {
                navigation.state === 'idle'
                    ? <PasswordTable items={response?.data} />
                    : <span className="loading loading-spinner"></span>
            }
        </>
    );
}