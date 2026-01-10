import 'server-only';
import type { UserRole } from '@/types/auth';

// TODO: Replace with API call to backend
export interface TestUser {
    username: string;
    password: string;
    role: UserRole;
    assignedCountries?: string[];
}

export const testUsers: TestUser[] = [
    {
        username: 'admin',
        password: 'admin',
        role: 'Admin',
        assignedCountries: undefined,
    },
    {
        username: 'editor',
        password: 'editor',
        role: 'Editor',
        assignedCountries: undefined,
    },
    {
        username: 'fieldworker',
        password: 'fieldworker',
        role: 'Field Worker',
        assignedCountries: ['LAO'],
    },
    {
        username: 'viewer',
        password: 'viewer',
        role: 'Viewer',
        assignedCountries: ['LAO'],
    },
];
