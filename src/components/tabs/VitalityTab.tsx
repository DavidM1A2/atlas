'use client';

import EditableField from '../EditableField';
import { LANGUAGE_SHIFT_RISKS } from '@/types/languageGroup';
import type { LanguageShiftRisk } from '@/types/languageGroup';
import type { TabProps } from './types';
import styles from '../LanguageGroupPane.module.css';

function getRiskClass(risk: LanguageShiftRisk): string {
    switch (risk) {
        case 'Low':
            return styles.riskLow;
        case 'Moderate':
            return styles.riskModerate;
        case 'High':
            return styles.riskHigh;
        case 'Critical':
            return styles.riskCritical;
        default:
            return '';
    }
}

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
            <div style={{ marginTop: '12px' }}>
                <span
                    style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        display: 'block',
                        marginBottom: '4px',
                    }}
                >
                    Language Shift Risk
                </span>
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
                    <span
                        className={`${styles.riskBadge} ${getRiskClass(data.vitality.languageShiftRisk)}`}
                    >
                        {data.vitality.languageShiftRisk}
                    </span>
                )}
            </div>
        </div>
    );
}
