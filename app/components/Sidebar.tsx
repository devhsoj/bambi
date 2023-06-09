import { Link } from '@remix-run/react';
import type { ReactNode } from 'react';

const navbarLinks = [
    { text: 'Passwords', href: '/dashboard/passwords' },
    { text: 'Account', href: '/dashboard/account' },
];

export default function Sidebar({ children }: { children?: ReactNode | ReactNode[] }) {
    return (
        <div className="drawer">
            <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar bg-base-300">
                    <div className="flex-none lg:hidden">
                        {/* Hamburger */}
                        <label className="btn btn-square btn-ghost" htmlFor="sidebar-toggle">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">
                        <Link to="/">
                            <span className="text-lg font-bold">bambi</span>
                        </Link>
                    </div>
                    {/* Large Screen Display */}
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {navbarLinks.map(link => (
                                <li key={link.href}>
                                    <Link to={link.href}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Dashboard Content Passed Here */}
                <div className="p-4">
                    {children}
                </div>
            </div>
            {/* Small Screen Display */}
            <div className="drawer-side">
                <label className="drawer-overlay" htmlFor="sidebar-toggle"></label>
                <ul className="menu p-4 w-60 h-full bg-base-200">
                    <Link to="/">
                        <span className="text-lg font-bold">bambi</span>
                    </Link>
                    <div className="divider"></div>
                    {navbarLinks.map(link => (
                        <li key={link.href}>
                            <Link to={link.href} onClick={() => {
                                setTimeout(() => {
                                    const toggle = document.getElementById('sidebar-toggle') as HTMLInputElement;

                                    toggle.checked = !toggle.checked;
                                }, 125);
                            }}>
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}