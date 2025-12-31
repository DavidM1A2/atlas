'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

const TEST_USER = {
    username: 'username',
    password: 'password',
    role: 'Admin' as const,
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback((username: string, password: string): boolean => {
        if (username === TEST_USER.username && password === TEST_USER.password) {
            setUser({ username, role: TEST_USER.role });
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
