import { scope } from 'arktype';

export const BitwardenTypes = scope({
    BitwardenFolder: {
        id: 'string',
        name: 'string'
    },
    BitwardenItemUri: {
        match: 'string | null',
        uri: 'string | null'
    },
    BitwardenItem: {
        id: 'string',
        organizationId: 'string | null',
        folderId: 'string | null',
        type: 'number',
        reprompt: 'number',
        name: 'string | null',
        favorite: 'boolean',
        'login?': {
            'uris?': 'BitwardenItemUri[] | null',
            username: 'string | null',
            password: 'string | null',
            totp: 'string | null'
        },
        collectionIds: 'string[] | null'
    },
    BitwardenExport: {
        encrypted: 'boolean',
        folders: 'BitwardenFolder[]',
        items: 'BitwardenItem[]'
    }
}).compile();