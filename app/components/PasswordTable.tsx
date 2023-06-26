import { updatePassword, generatePassword } from '@/lib/frontend/password.client';
import type { Password } from '@/types/password';
import { classes } from '@/utils/styles';
import { useState } from 'react';

function PasswordActionColumns({ item, onSave, removeItem }: {
    item: Password,
    onSave?: (value: string) => void,
    removeItem: (password: Password) => void
}) {
    const [ hidden, setHidden ] = useState(true);
    const [ value_, setValue_ ] = useState(item.password);

    const [ copyText, setCopyText ] = useState('Copy');
    const [ deleting, setDeleting ] = useState(false);

    return (
        <>
            <td className="select-none hover:cursor-pointer w-3/12">
                <input
                    className={
                        classes(
                            'input h-full p-0 m-0 rounded-none disabled:bg-base-100 disabled:border-none',
                            !hidden ? 'border border-primary-focus w-full min-w-full max-w-full' : 'w-32 min-w-32 max-w-32'
                        )
                    }
                    style={{ borderWidth: 1 }}
                    value={hidden ? '•'.repeat(16) : value_}
                    onChange={e => setValue_(e.target.value)}
                    disabled={hidden}
                />
            </td>
            <td className="w-2/12 flex justify-start space-x-2">
                <button
                    className="btn btn-xs hover:font-bold hover:bg-secondary-content"
                    onClick={async () => {
                        await navigator.clipboard.writeText(value_);
                        setCopyText('Copied!');

                        setTimeout(() => setCopyText('Copy'), 1_000);
                    }}
                >
                    {copyText}
                </button>
                <button className="btn btn-xs hover:bg-warning-content" onClick={() => setHidden(!hidden)}>
                    Show
                </button>
                {!hidden && (
                    <>
                        <button className="btn btn-xs hover:bg-info" onClick={() => setValue_(generatePassword())}>
                            Generate
                        </button>
                        <button className="btn btn-xs hover:bg-primary" onClick={() => {
                            setHidden(true);
                            onSave?.(value_);
                        }}>
                            Save
                        </button>
                    </>
                )}
                <button
                    className="btn btn-xs hover:font-bold hover:bg-error-content"
                    onClick={async () => {
                        const remove = confirm(`Are you sure you want to remove password '${item.name}'?`);

                        if (!remove) return;

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
        </>
    );
}

export default function PasswordTable({ items }: { items?: Password[] }) {
    const [ visibleItems, setVisibleItems ] = useState(items);
    const [ searching, setSearching ] = useState(false);

    return (
        <div className="overflow-x-scroll">
            <div className={classes(items && items?.length > 0 ? 'ml-4 mt-4' : '')}>
                {
                    items && items?.length > 0 ? (
                        <>
                            <input
                                className="bg-inherit rounded-none mr-2 border border-base-200 active:border-primary-focus p-1"
                                placeholder="Search"
                                onChange={(e) => {
                                    const search = e.target.value;

                                    setVisibleItems(items?.filter((item) => {
                                        return item.name.toLowerCase().includes(search)
                                            || item.username.toLowerCase().includes(search);
                                    }));

                                    setSearching(e.target.value.length > 0);
                                }}
                            />
                            <span>{items.length} total passwords <i>{searching ? `(${visibleItems?.length ?? 0} passwords filtered)` : ''}</i></span>
                        </>
                    ) : ''
                }
            </div>
            <table className="table">
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
                                <PasswordActionColumns
                                    item={item}
                                    onSave={(password) => updatePassword({
                                        ...item,
                                        password
                                    })}
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