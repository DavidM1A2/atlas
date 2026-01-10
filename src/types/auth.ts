export type UserRole = 'Field Worker' | 'Admin' | 'Editor' | 'Viewer';

export interface User {
    username: string;
    role: UserRole;
    assignedCountries?: string[];
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}
