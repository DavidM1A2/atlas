'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User, AuthContextType } from '@/types/auth';
import { testUsers } from '@/data/users';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = useCallback((username: string, password: string): boolean => {
        const matchedUser = testUsers.find(
            (u) => u.username === username && u.password === password
        );
        if (matchedUser) {
            setUser({
                username: matchedUser.username,
                role: matchedUser.role,
                assignedCountries: matchedUser.assignedCountries,
            });
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
