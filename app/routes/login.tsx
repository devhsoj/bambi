import type { ActionArgs, V2_MetaFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
    return [
        { title: 'bambi | Login' }
    ];
};

export async function action({ request }: ActionArgs) {
    const body = await request.formData();

    return null;
}

export default function Login() {
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
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                    <div className="form-control mt-4">
                        <Link className="link text-accent" to="/">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
}
