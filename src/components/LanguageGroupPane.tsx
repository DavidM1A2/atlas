'use client';

import { useState } from 'react';
import type { LanguageGroup } from '@/types/languageGroup';
import { useAuth } from '@/context/AuthContext';
import { useLanguageGroups } from '@/context/LanguageGroupContext';
import { canEditLanguageGroup } from '@/utils/permissions';
import CloseButton from './CloseButton';
import { OverviewTab, VitalityTab, ChurchTab, ResourcesTab, NotesTab } from './tabs';
import styles from './LanguageGroupPane.module.css';

interface LanguageGroupPaneProps {
    languageGroup: LanguageGroup;
    onClose: () => void;
}

type TabId = 'overview' | 'vitality' | 'church' | 'resources' | 'notes';

const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'vitality', label: 'Vitality' },
    { id: 'church', label: 'Church' },
    { id: 'resources', label: 'Resources' },
    { id: 'notes', label: 'Notes' },
];

export default function LanguageGroupPane({
    languageGroup,
    onClose,
}: LanguageGroupPaneProps) {
    const { user } = useAuth();
    const { updateLanguageGroup, getLanguageGroupWithEdits } = useLanguageGroups();
    const [activeTab, setActiveTab] = useState<TabId>('overview');

    const canEdit = canEditLanguageGroup(user, languageGroup);
    const currentData = getLanguageGroupWithEdits(languageGroup.id) || languageGroup;

    const handleUpdate = (field: string, value: unknown) => {
        updateLanguageGroup(languageGroup.id, { [field]: value } as Partial<LanguageGroup>);
    };

    const handleNestedUpdate = (
        parentField: keyof LanguageGroup,
        childField: string,
        value: unknown
    ) => {
        const parent = currentData[parentField];
        if (typeof parent === 'object' && parent !== null) {
            updateLanguageGroup(languageGroup.id, {
                [parentField]: { ...parent, [childField]: value },
            } as Partial<LanguageGroup>);
        }
    };

    const tabProps = {
        data: currentData,
        canEdit,
        onUpdate: handleUpdate,
        onNestedUpdate: handleNestedUpdate,
    };

    return (
        <div className={styles.pane}>
            <div className={styles.header}>
                <h2 className={styles.title}>{currentData.name}</h2>
                <CloseButton onClick={onClose} />
            </div>

            <div className={styles.tabs}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                {activeTab === 'overview' && <OverviewTab {...tabProps} />}
                {activeTab === 'vitality' && <VitalityTab {...tabProps} />}
                {activeTab === 'church' && <ChurchTab {...tabProps} />}
                {activeTab === 'resources' && <ResourcesTab {...tabProps} />}
                {activeTab === 'notes' && <NotesTab {...tabProps} />}
            </div>

            {canEdit && (
                <div className={styles.editIndicator}>
                    Editing enabled - changes stored locally
                </div>
            )}
        </div>
    );
}
