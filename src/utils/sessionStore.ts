import 'server-only';
import type { User } from '@/types/auth';

// In-memory session store
// Sessions are lost on server restart - fine for development
const sessions = new Map<string, User>();

function generateSessionId(): string {
    return crypto.randomUUID();
}

export function createSession(user: User): string {
    const sessionId = generateSessionId();
    sessions.set(sessionId, user);
    return sessionId;
}

export function getSession(sessionId: string): User | null {
    return sessions.get(sessionId) ?? null;
}

export function deleteSession(sessionId: string): boolean {
    return sessions.delete(sessionId);
}
