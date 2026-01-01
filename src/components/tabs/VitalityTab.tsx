'use client';

import EditableField from '../EditableField';
import StatusBadge from '../StatusBadge';
import { LANGUAGE_SHIFT_RISKS } from '@/types/languageGroup';
import type { TabProps } from './types';
import styles from '../LanguageGroupPane.module.css';

export default function VitalityTab({ data, canEdit, onNestedUpdate }: TabProps) {
    const riskOptions = LANGUAGE_SHIFT_RISKS.map((risk) => ({
        value: risk,
        label: risk,
    }));

    return (
        <div className={styles.section}>
            <div className={styles.sectionTitle}>Ethnolinguistic Vitality</div>
            <EditableField
                label="Percent Monolingual"
                value={`${data.vitality.percentMonolingual}%`}
                canEdit={canEdit}
                type="number"
                onSave={(v) => onNestedUpdate('vitality', 'percentMonolingual', v)}
            />
            <div className={styles.fieldWrapper}>
                <span className={styles.fieldLabel}>Language Shift Risk</span>
                {canEdit ? (
                    <EditableField
                        label=""
                        value={data.vitality.languageShiftRisk}
                        canEdit={canEdit}
                        type="select"
                        options={riskOptions}
                        onSave={(v) => onNestedUpdate('vitality', 'languageShiftRisk', v)}
                    />
                ) : (
                    <StatusBadge type="risk" value={data.vitality.languageShiftRisk} />
                )}
            </div>
        </div>
    );
}
