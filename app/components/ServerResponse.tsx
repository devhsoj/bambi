import type { ApiResponse } from '../types/response';

export default function ServerResponse({ response }: { response?: ApiResponse }) {
    return response ? (
        <div className={`mt-4 ${ response.success ? 'text-success' : 'text-error' }`}>
            {response.message}
        </div>
    ) : (<></>);
}