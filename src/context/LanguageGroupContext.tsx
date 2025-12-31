'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    ReactNode,
} from 'react';
import type { LanguageGroup } from '@/types/languageGroup';
import { mockLanguageGroups } from '@/data/languageGroups';
import { enrichLanguageGroupsWithCountry } from '@/utils/countryDetection';

type LanguageGroupEdits = {
    [languageGroupId: string]: Partial<LanguageGroup>;
};

interface LanguageGroupContextType {
    languageGroups: LanguageGroup[];
    edits: LanguageGroupEdits;
    updateLanguageGroup: (id: string, changes: Partial<LanguageGroup>) => void;
    getLanguageGroupWithEdits: (id: string) => LanguageGroup | undefined;
    clearEdits: () => void;
}

const LanguageGroupContext = createContext<LanguageGroupContextType | null>(null);

export function LanguageGroupProvider({ children }: { children: ReactNode }) {
    // Enrich with country codes on initial load
    const [languageGroups] = useState<LanguageGroup[]>(() =>
        enrichLanguageGroupsWithCountry(mockLanguageGroups)
    );

    const [edits, setEdits] = useState<LanguageGroupEdits>({});

    const updateLanguageGroup = useCallback(
        (id: string, changes: Partial<LanguageGroup>) => {
            setEdits((prev) => ({
                ...prev,
                [id]: { ...prev[id], ...changes },
            }));
        },
        []
    );

    const getLanguageGroupWithEdits = useCallback(
        (id: string): LanguageGroup | undefined => {
            const base = languageGroups.find((lg) => lg.id === id);
            if (!base) return undefined;

            const groupEdits = edits[id];
            if (!groupEdits) return base;

            return { ...base, ...groupEdits };
        },
        [languageGroups, edits]
    );

    const clearEdits = useCallback(() => {
        setEdits({});
    }, []);

    const value = useMemo(
        () => ({
            languageGroups,
            edits,
            updateLanguageGroup,
            getLanguageGroupWithEdits,
            clearEdits,
        }),
        [languageGroups, edits, updateLanguageGroup, getLanguageGroupWithEdits, clearEdits]
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
