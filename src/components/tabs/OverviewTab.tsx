'use client';

import EditableField from '../EditableField';
import { formatPopulation } from '@/utils/formatters';
import type { TabProps } from './types';
import styles from '../LanguageGroupPane.module.css';

export default function OverviewTab({ data, canEdit, onUpdate, onNestedUpdate }: TabProps) {
    return (
        <>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Classification</div>
                <EditableField
                    label="Language Family"
                    value={data.classification.family}
                    canEdit={canEdit}
                    onSave={(v) => onNestedUpdate('classification', 'family', v)}
                />
                {data.classification.branch && (
                    <EditableField
                        label="Branch"
                        value={data.classification.branch}
                        canEdit={canEdit}
                        onSave={(v) => onNestedUpdate('classification', 'branch', v)}
                    />
                )}
                {data.classification.group && (
                    <EditableField
                        label="Group"
                        value={data.classification.group}
                        canEdit={canEdit}
                        onSave={(v) => onNestedUpdate('classification', 'group', v)}
                    />
                )}
                {data.classification.isoCode && (
                    <EditableField
                        label="ISO Code"
                        value={data.classification.isoCode}
                        canEdit={canEdit}
                        onSave={(v) => onNestedUpdate('classification', 'isoCode', v)}
                    />
                )}
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Population</div>
                <EditableField
                    label="Estimated Population"
                    value={formatPopulation(data.population)}
                    canEdit={canEdit}
                    type="number"
                    onSave={(v) => onUpdate('population', v)}
                />
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Alternative Names</div>
                {data.alternativeNames.endonyms.length > 0 && (
                    <div className={styles.nameSection}>
                        <span className={styles.subsectionTitle}>Endonyms</span>
                        <div className={styles.tagList}>
                            {data.alternativeNames.endonyms.map((name, i) => (
                                <span key={i} className={styles.tag}>
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {data.alternativeNames.exonyms.length > 0 && (
                    <div className={styles.nameSection}>
                        <span className={styles.subsectionTitle}>Exonyms</span>
                        <div className={styles.tagList}>
                            {data.alternativeNames.exonyms.map((name, i) => (
                                <span key={i} className={styles.tag}>
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {data.alternativeNames.dialects.length > 0 && (
                    <div>
                        <span className={styles.subsectionTitle}>Dialects</span>
                        <div className={styles.tagList}>
                            {data.alternativeNames.dialects.map((name, i) => (
                                <span key={i} className={styles.tag}>
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
