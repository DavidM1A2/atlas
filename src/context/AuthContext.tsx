'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { User, AuthContextType } from '@/types/auth';

const TOKEN_KEY = 'atlas_auth_token';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // On mount, check for existing token and validate it
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        if (!storedToken) {
            setIsLoading(false);
            return;
        }

        fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` },
        })
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error('Invalid token');
            })
            .then((data) => {
                setToken(storedToken);
                setUser(data.user);
            })
            .catch(() => {
                localStorage.removeItem(TOKEN_KEY);
                setToken(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const login = useCallback(async (username: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                return false;
            }

            const data = await res.json();
            localStorage.setItem(TOKEN_KEY, data.accessToken);
            setToken(data.accessToken);
            setUser(data.user);
            return true;
        } catch {
            return false;
        }
    }, []);

    const logout = useCallback(async (): Promise<void> => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        if (storedToken) {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${storedToken}` },
            }).catch(() => {
                // Ignore errors - we're logging out anyway
            });
        }
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
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
