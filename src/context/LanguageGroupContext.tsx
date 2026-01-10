'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
    ReactNode,
} from 'react';
import type { LanguageGroup } from '@/types/languageGroup';
import { useAuth } from './AuthContext';

interface LanguageGroupContextType {
    languageGroups: LanguageGroup[];
    loading: boolean;
    error: string | null;
    getLanguageGroupById: (id: string) => LanguageGroup | undefined;
    refreshLanguageGroups: () => Promise<void>;
}

const LanguageGroupContext = createContext<LanguageGroupContextType | null>(null);

export function LanguageGroupProvider({ children }: { children: ReactNode }) {
    const { token, isLoading: authLoading } = useAuth();
    const [languageGroups, setLanguageGroups] = useState<LanguageGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLanguageGroups = useCallback(async (authToken: string | null) => {
        setLoading(true);
        setError(null);
        try {
            const headers: HeadersInit = {};
            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }

            const response = await fetch('/api/language-groups', { headers });
            if (!response.ok) {
                throw new Error('Failed to fetch language groups');
            }
            const data = await response.json();
            setLanguageGroups(data.languageGroups);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch language groups when auth state changes (after auth loading completes)
    useEffect(() => {
        if (!authLoading) {
            fetchLanguageGroups(token);
        }
    }, [token, authLoading, fetchLanguageGroups]);

    const refreshLanguageGroups = useCallback(async () => {
        await fetchLanguageGroups(token);
    }, [token, fetchLanguageGroups]);

    const getLanguageGroupById = useMemo(() => {
        const map = new Map(languageGroups.map((lg) => [lg.id, lg]));
        return (id: string) => map.get(id);
    }, [languageGroups]);

    const value = useMemo(
        () => ({
            languageGroups,
            loading,
            error,
            getLanguageGroupById,
            refreshLanguageGroups,
        }),
        [languageGroups, loading, error, getLanguageGroupById, refreshLanguageGroups]
    );

    return (
        <LanguageGroupContext.Provider value={value}>
            {children}
        </LanguageGroupContext.Provider>
    );
}

export function useLanguageGroups(): LanguageGroupContextType {
    const context = useContext(LanguageGroupContext);
    if (!context) {
        throw new Error(
            'useLanguageGroups must be used within a LanguageGroupProvider'
        );
    }
    return context;
}
