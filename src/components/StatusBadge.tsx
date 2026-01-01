'use client';

import type { ChurchPresence, LanguageShiftRisk } from '@/types/languageGroup';
import styles from './LanguageGroupPane.module.css';

type BadgeType = 'church' | 'risk';

interface StatusBadgeProps {
    type: BadgeType;
    value: ChurchPresence | LanguageShiftRisk;
}

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

export default function StatusBadge({ type, value }: StatusBadgeProps) {
    const baseClass = type === 'church' ? styles.churchBadge : styles.riskBadge;
    const statusClass =
        type === 'church'
            ? getChurchClass(value as ChurchPresence)
            : getRiskClass(value as LanguageShiftRisk);

    return <span className={`${baseClass} ${statusClass}`}>{value}</span>;
}
