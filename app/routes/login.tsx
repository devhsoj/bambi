import type { ActionArgs, LoaderArgs, V2_MetaFunction} from '@remix-run/node';
import { json} from '@remix-run/node';
import { Response} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';
import { commitSession, getSession } from '../lib/session.server';
import { login } from '../lib/user/login.server';
import type { ApiResponse } from '../types/response';
import ServerResponse from '../components/ServerResponse';
import { classes } from '../utils/styles';

export const meta: V2_MetaFunction = () => {
    return [
        { title: 'bambi | Login' }
    ];
};

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'));

    if (session.get('user')) return redirect('/');

    return null;
}

export async function action({ request }: ActionArgs) {
    const session = await getSession(request.headers.get('Cookie'));
    const body = await request.formData();

    const username = body.get('username');
    const password = body.get('password');

    const result = await login(username, password);

    if (!result.success) {
        return json(result, { status: result.status });
    }

    session.set('user', result.data!);

    return new Response(null, {
        headers: {
            'X-Remix-Redirect': '/',
            'Set-Cookie': await commitSession(session)
        }
    });
}

export default function Login() {
    const response = useActionData() as ApiResponse;
    const navigation = useNavigation();

    return (
        <div className="flex h-screen bg-base-200">
            <Form className="card p-8 min-w-fit w-1/3 min-h-fit h-1/2 bg-base-300 m-auto" method="POST">
                <div className="card-body prose">
                    <h2 className="mb-2 mt-0">Login</h2>
                    <div className="divider mt-0 mb-0"></div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
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
                                    : 'Login'
                            }
                        </button>
                    </div>
                    {navigation.state !== 'submitting' ? <ServerResponse response={response} /> : ''}
                </div>
            </Form>
        </div>
    );
}