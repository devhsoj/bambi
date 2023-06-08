import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
    return [
        { title: 'bambi | Home' },
        { name: 'description', content: 'A place to hold the passwords you hold deerly safe.' },
    ];
};

export default function Index() {
    return (
        <div className="flex flex-col w-full">
            <div className="grid h-20 p-4 prose">
                <h2>bambi</h2>
                <p>A place to hold the passwords you hold deerly safe.</p>
                <div className="divider mt-0 mb-2"></div>
                <div className="flex flex-row">
                    <Link className="link text-accent mr-2" to="login">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
