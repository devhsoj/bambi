import { Link, useOutletContext } from '@remix-run/react';
import type { V2_MetaFunction } from '@remix-run/node';
import type { User } from '@/types/user';

export const meta: V2_MetaFunction = () => {
    return [
        { title: 'bambi | Home' },
        { name: 'description', content: 'A place to hold the passwords you hold deerly safe.' },
    ];
};

export default function Index() {
    const user = useOutletContext<User | null>();

    return (
        <div className="flex flex-col w-full">
            <div className="grid h-20 p-4">
                <div className="font-bold text-2xl mb-2">bambi</div>
                <p>A place to hold the passwords you hold deerly safe.</p>
                <div className="divider"></div>
                <div className="flex flex-row">
                    {!user?.active ? (
                        <Link className="link text-accent mr-2" to="/auth/login">
                            Login
                        </Link>
                    ) : (
                        <Link className="link text-accent mr-2" to="/dashboard">
                            Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
