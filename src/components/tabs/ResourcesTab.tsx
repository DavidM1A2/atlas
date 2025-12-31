'use client';

import EditableField from '../EditableField';
import type { TabProps } from './types';
import styles from '../LanguageGroupPane.module.css';

export default function ResourcesTab({ data, canEdit, onNestedUpdate }: TabProps) {
    return (
        <>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Links & Resources</div>
                {data.links.length > 0 ? (
                    <div className={styles.linkList}>
                        {data.links.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                                {link.label}
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className={styles.emptyState}>No resources available</p>
                )}
            </div>

            <div className={styles.section}>
                <div className={styles.sectionTitle}>Attribution</div>
                <EditableField
                    label="Primary Source"
                    value={data.attribution.primarySource}
                    canEdit={canEdit}
                    onSave={(v) => onNestedUpdate('attribution', 'primarySource', String(v))}
                />
                <EditableField
                    label="Last Updated"
                    value={data.attribution.lastUpdated}
                    canEdit={canEdit}
                    onSave={(v) => onNestedUpdate('attribution', 'lastUpdated', String(v))}
                />
            </div>
        </>
    );
}
