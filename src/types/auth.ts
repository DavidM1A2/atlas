export type UserRole = 'Field Worker' | 'Admin' | 'Editor' | 'Viewer' | 'Default';

export interface User {
    username: string;
    role: UserRole;
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}
