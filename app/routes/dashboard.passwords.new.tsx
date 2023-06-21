import ServerResponse from '@/components/ServerResponse';
import { getSession } from '@/lib/session.server';
import { create } from '@/lib/user/password.server';
import type { ApiResponse } from '@/types/response';
import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';

export async function action({ request }: ActionArgs) {
    const session = await getSession(request.headers.get('Cookie'));
    const user = session.get('user');
    const body = await request.formData();

    const result = await create(user, {
        name: body.get('name'),
        username: body.get('username'),
        password: body.get('password')
    });

    if (!result.success) {
        return json(result, { status: result.status });
    }

    return result;
}

export default function NewPassword() {
    const response = useActionData() as ApiResponse;
    const navigation = useNavigation();

    return (
        <>
            <div className="text-3xl font-bold m-0">New Password</div>
            <div className="divider mb-0"></div>
            <div className="menu menu-horizontal m-0">
                <Link to="../passwords">
                    <button className="btn-xs btn-accent mr-4">
                        {'<'} Back to List
                    </button>
                </Link>
            </div>
            <div className="divider mt-0 mb-0"></div>
            <Form className="w-1/2" method="POST">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        className="input input-bordered"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        className="input input-bordered"
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        className="input input-bordered"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="form-control mt-4">
                    <button className="btn btn-primary" type="submit">
                        {
                            navigation.state === 'submitting'
                                ? <span className="loading loading-spinner">Loading...</span>
                                : 'Add'
                        }
                    </button>
                </div>
                {
                    navigation.state !== 'submitting'
                        ? <ServerResponse response={response} />
                        : ''
                }
            </Form>
        </>
    );
}