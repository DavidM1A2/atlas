'use client';

import EditableField from '../EditableField';
import StatusBadge from '../StatusBadge';
import { CHURCH_PRESENCE_OPTIONS } from '@/types/languageGroup';
import type { TabProps } from './types';
import styles from '../LanguageGroupPane.module.css';

export default function ChurchTab({ data, canEdit, onUpdate }: TabProps) {
    const churchOptions = CHURCH_PRESENCE_OPTIONS.map((option) => ({
        value: option,
        label: option,
    }));

    return (
        <div className={styles.section}>
            <div className={styles.sectionTitle}>Church Presence</div>
            {canEdit ? (
                <EditableField
                    label="Status"
                    value={data.churchPresence}
                    canEdit={canEdit}
                    type="select"
                    options={churchOptions}
                    onSave={(v) => onUpdate('churchPresence', v)}
                />
            ) : (
                <div>
                    <span className={styles.fieldLabel}>Status</span>
                    <StatusBadge type="church" value={data.churchPresence} />
                </div>
            )}
        </div>
    );
}
