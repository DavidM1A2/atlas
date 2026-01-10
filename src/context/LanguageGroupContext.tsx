'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from 'react';
import type { LanguageGroup } from '@/types/languageGroup';

interface LanguageGroupContextType {
    languageGroups: LanguageGroup[];
    loading: boolean;
    error: string | null;
    getLanguageGroupById: (id: string) => LanguageGroup | undefined;
}

const LanguageGroupContext = createContext<LanguageGroupContextType | null>(null);

export function LanguageGroupProvider({ children }: { children: ReactNode }) {
    const [languageGroups, setLanguageGroups] = useState<LanguageGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchLanguageGroups() {
            try {
                const response = await fetch('/api/language-groups');
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
        }

        fetchLanguageGroups();
    }, []);

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
        }),
        [languageGroups, loading, error, getLanguageGroupById]
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
