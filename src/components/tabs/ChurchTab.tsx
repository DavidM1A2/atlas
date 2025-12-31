'use client';

import EditableField from '../EditableField';
import { CHURCH_PRESENCE_OPTIONS } from '@/types/languageGroup';
import type { ChurchPresence } from '@/types/languageGroup';
import type { TabProps } from './types';
import styles from '../LanguageGroupPane.module.css';

function getChurchClass(presence: ChurchPresence): string {
    switch (presence) {
        case 'None':
            return styles.churchNone;
        case 'Emerging':
            return styles.churchEmerging;
        case 'Growing':
            return styles.churchGrowing;
        case 'Healthy Indigenous-Led':
            return styles.churchHealthy;
        default:
            return '';
    }
}

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
                    <span
                        style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            display: 'block',
                            marginBottom: '4px',
                        }}
                    >
                        Status
                    </span>
                    <span
                        className={`${styles.churchBadge} ${getChurchClass(data.churchPresence)}`}
                    >
                        {data.churchPresence}
                    </span>
                </div>
            )}
        </div>
    );
}
