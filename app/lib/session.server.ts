import { createCookieSessionStorage } from '@remix-run/node';
import type { User } from '../types/user';
import { randomBytes } from 'crypto';

type Session = {
    user: User,
    lastVisitedUrl: string
}

export const { getSession, commitSession, destroySession } = createCookieSessionStorage<Session>({
    cookie: {
        name: 'bambi.session',
        secrets: [
            process.env.SESSION_SECRET ?? randomBytes(256)
        ],
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hr
        secure: true
    }
});