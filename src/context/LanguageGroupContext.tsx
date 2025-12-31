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
import {
    getAllLanguageGroups,
    getLanguageGroupById,
    applyLanguageGroupEdits,
} from '@/utils/backendService';

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
    const [languageGroups] = useState<LanguageGroup[]>(() =>
        getAllLanguageGroups()
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
            const base = getLanguageGroupById(id);
            if (!base) return undefined;

            const groupEdits = edits[id];
            if (!groupEdits) return base;

            return applyLanguageGroupEdits(base, groupEdits);
        },
        [edits]
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
