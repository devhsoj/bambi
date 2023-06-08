import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
    return [
        { title: 'bambi' },
        { name: 'description', content: 'A place to hold the passwords you hold deerly safe.' },
    ];
};

export default function Index() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif' }}>
            <div>
                <h1>bambi</h1>
                <hr />
                <p>A place to hold the passwords you hold deerly safe.</p>
            </div>
        </div>
    );
}
