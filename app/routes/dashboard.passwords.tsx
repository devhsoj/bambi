import { useOutletContext } from '@remix-run/react';
import type { User } from '../types/user';

export default function Passwords() {
    const user = useOutletContext<User>();

    return (
        <>

        </>
    );
}