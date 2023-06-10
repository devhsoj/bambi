import type { Password } from '@/types/password';
import { useState } from 'react';

function HiddenColumn({ children }: { children: string }) {
    const [ hidden, setHidden ] = useState(true);

    return (
        <td
            className="select-none hover:cursor-pointer w-4/12"
            onClick={() => setHidden(!hidden)}
        >
            {hidden ? '•'.repeat(16) : children}
        </td>
    );
}

function Operations({ item, removeItem }: { item: Password, removeItem: (password: Password) => void }) {
    const [ copyText, setCopyText ] = useState('Copy');
    const [ deleting, setDeleting ] = useState(false);

    return (
        <td className="w-1/12">
            {/* Copy */}
            <button
                className="btn-xs hover:font-bold hover:bg-secondary-content"
                onClick={async () => {
                    await navigator.clipboard.writeText(item.password);
                    setCopyText('Copied!');

                    setTimeout(() => setCopyText('Copy'), 1_000);
                }}
            >
                {copyText}
            </button>
            {/* Remove */}
            <button
                className="btn-xs hover:font-bold hover:bg-error hover:text-black"
                onClick={async () => {
                    setDeleting(true);

                    const res = await fetch(`/dashboard/passwords/remove/${item.id}`, { method: 'DELETE' });

                    if (res.status === 200) {
                        setDeleting(false);
                        removeItem(item);
                    }
                }}
            >
                {
                    deleting ? (
                        <span className="loading loading-xs loading-spinner"></span>
                    ) : 'Remove'
                }
            </button>
        </td>
    );
}

export default function PasswordTable({ items }: { items?: Password[] }) {
    const [ visibleItems, setVisibleItems ] = useState(items);

    return (
        <div className="overflow-x-scroll">
            <div className="italic ml-4">
                {visibleItems && visibleItems?.length > 0 && `${visibleItems.length} total passwords`}
            </div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        visibleItems && visibleItems?.length > 0 ? visibleItems.map(item => (
                            <tr key={item.id}>
                                <td className="w-3/12">{item.name}</td>
                                <td className="w-3/12">{item.username}</td>
                                <HiddenColumn>{item.password}</HiddenColumn>
                                <Operations
                                    item={item}
                                    removeItem={(item) => {
                                        setVisibleItems(visibleItems.filter(item_ => item_.id !== item.id));
                                    }}
                                />
                            </tr>
                        )) : (
                            <tr>
                                <td className="italic">Empty...</td>
                                <td className="italic">Empty...</td>
                                <td className="italic">Empty...</td>
                                <td className="italic">Empty...</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}