import { Link, useOutletContext } from '@remix-run/react';
import type { User } from '@/types/user';

export default function Account() {
    const user = useOutletContext<User>();

    return (
        <>
            <p>Username: {user.data.username}</p>
            <Link className="link text-accent mr-2" to="/dashboard/logout">
                Logout
            </Link>
        </>
    );
}