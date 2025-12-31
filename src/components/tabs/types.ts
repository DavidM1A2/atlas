import type { LanguageGroup } from '@/types/languageGroup';

export interface TabProps {
    data: LanguageGroup;
    canEdit: boolean;
    onUpdate: (field: string, value: unknown) => void;
    onNestedUpdate: (parentField: keyof LanguageGroup, childField: string, value: unknown) => void;
}
