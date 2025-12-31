'use client';

import { useState } from 'react';
import type { LanguageGroup, LanguageShiftRisk } from '@/types/languageGroup';
import { useAuth } from '@/context/AuthContext';
import { useLanguageGroups } from '@/context/LanguageGroupContext';
import { canEditLanguageGroup } from '@/utils/permissions';
import EditableField from './EditableField';
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

function getChurchClass(presence: string): string {
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

    return (
        <div className={styles.pane}>
            <div className={styles.header}>
                <h2 className={styles.title}>{currentData.name}</h2>
                <button onClick={onClose} className={styles.closeButton} title="Close">
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
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
                {activeTab === 'overview' && (
                    <>
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Classification</div>
                            <EditableField
                                label="Language Family"
                                value={currentData.classification.family}
                                canEdit={canEdit}
                                onSave={(v) =>
                                    handleNestedUpdate('classification', 'family', v)
                                }
                            />
                            {currentData.classification.branch && (
                                <EditableField
                                    label="Branch"
                                    value={currentData.classification.branch}
                                    canEdit={canEdit}
                                    onSave={(v) =>
                                        handleNestedUpdate('classification', 'branch', v)
                                    }
                                />
                            )}
                            {currentData.classification.group && (
                                <EditableField
                                    label="Group"
                                    value={currentData.classification.group}
                                    canEdit={canEdit}
                                    onSave={(v) =>
                                        handleNestedUpdate('classification', 'group', v)
                                    }
                                />
                            )}
                            {currentData.classification.isoCode && (
                                <EditableField
                                    label="ISO Code"
                                    value={currentData.classification.isoCode}
                                    canEdit={canEdit}
                                    onSave={(v) =>
                                        handleNestedUpdate('classification', 'isoCode', v)
                                    }
                                />
                            )}
                        </div>

                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Population</div>
                            <EditableField
                                label="Estimated Population"
                                value={currentData.population.toLocaleString()}
                                canEdit={canEdit}
                                type="number"
                                onSave={(v) => handleUpdate('population', v)}
                            />
                        </div>

                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Alternative Names</div>
                            {currentData.alternativeNames.endonyms.length > 0 && (
                                <div style={{ marginBottom: '8px' }}>
                                    <span className={styles.sectionTitle} style={{ fontSize: '0.7rem' }}>
                                        Endonyms
                                    </span>
                                    <div className={styles.tagList}>
                                        {currentData.alternativeNames.endonyms.map((name, i) => (
                                            <span key={i} className={styles.tag}>
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {currentData.alternativeNames.exonyms.length > 0 && (
                                <div style={{ marginBottom: '8px' }}>
                                    <span className={styles.sectionTitle} style={{ fontSize: '0.7rem' }}>
                                        Exonyms
                                    </span>
                                    <div className={styles.tagList}>
                                        {currentData.alternativeNames.exonyms.map((name, i) => (
                                            <span key={i} className={styles.tag}>
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {currentData.alternativeNames.dialects.length > 0 && (
                                <div>
                                    <span className={styles.sectionTitle} style={{ fontSize: '0.7rem' }}>
                                        Dialects
                                    </span>
                                    <div className={styles.tagList}>
                                        {currentData.alternativeNames.dialects.map((name, i) => (
                                            <span key={i} className={styles.tag}>
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'vitality' && (
                    <>
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Ethnolinguistic Vitality</div>
                            <EditableField
                                label="Percent Monolingual"
                                value={`${currentData.vitality.percentMonolingual}%`}
                                canEdit={canEdit}
                                type="number"
                                onSave={(v) =>
                                    handleNestedUpdate('vitality', 'percentMonolingual', v)
                                }
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
                                        value={currentData.vitality.languageShiftRisk}
                                        canEdit={canEdit}
                                        type="select"
                                        options={[
                                            { value: 'Low', label: 'Low' },
                                            { value: 'Moderate', label: 'Moderate' },
                                            { value: 'High', label: 'High' },
                                            { value: 'Critical', label: 'Critical' },
                                        ]}
                                        onSave={(v) =>
                                            handleNestedUpdate('vitality', 'languageShiftRisk', v)
                                        }
                                    />
                                ) : (
                                    <span
                                        className={`${styles.riskBadge} ${getRiskClass(currentData.vitality.languageShiftRisk)}`}
                                    >
                                        {currentData.vitality.languageShiftRisk}
                                    </span>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'church' && (
                    <>
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Church Presence</div>
                            {canEdit ? (
                                <EditableField
                                    label="Status"
                                    value={currentData.churchPresence}
                                    canEdit={canEdit}
                                    type="select"
                                    options={[
                                        { value: 'None', label: 'None' },
                                        { value: 'Emerging', label: 'Emerging' },
                                        { value: 'Growing', label: 'Growing' },
                                        { value: 'Healthy Indigenous-Led', label: 'Healthy Indigenous-Led' },
                                    ]}
                                    onSave={(v) => handleUpdate('churchPresence', v)}
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
                                        className={`${styles.churchBadge} ${getChurchClass(currentData.churchPresence)}`}
                                    >
                                        {currentData.churchPresence}
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'resources' && (
                    <>
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Links & Resources</div>
                            {currentData.links.length > 0 ? (
                                <div className={styles.linkList}>
                                    {currentData.links.map((link, i) => (
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
                                value={currentData.attribution.primarySource}
                                canEdit={canEdit}
                                onSave={(v) =>
                                    handleNestedUpdate('attribution', 'primarySource', String(v))
                                }
                            />
                            <EditableField
                                label="Last Updated"
                                value={currentData.attribution.lastUpdated}
                                canEdit={canEdit}
                                onSave={(v) =>
                                    handleNestedUpdate('attribution', 'lastUpdated', String(v))
                                }
                            />
                        </div>
                    </>
                )}

                {activeTab === 'notes' && (
                    <>
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Field Notes</div>
                            {currentData.fieldNotes.length > 0 ? (
                                currentData.fieldNotes.map((note) => (
                                    <div key={note.id} className={styles.noteCard}>
                                        <div className={styles.noteMeta}>
                                            <span>{note.author}</span>
                                            <span>{note.date}</span>
                                        </div>
                                        <p className={styles.noteContent}>{note.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.emptyState}>No field notes yet</p>
                            )}
                        </div>

                        {currentData.surveySubmissions.length > 0 && (
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>Survey Submissions</div>
                                {currentData.surveySubmissions.map((survey) => (
                                    <div key={survey.id} className={styles.noteCard}>
                                        <div className={styles.noteMeta}>
                                            <span>{survey.surveyType}</span>
                                            <span>{survey.date}</span>
                                        </div>
                                        <p className={styles.noteContent}>
                                            Submitted by {survey.submittedBy}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {canEdit && (
                <div className={styles.editIndicator}>
                    Editing enabled - changes stored locally
                </div>
            )}
        </div>
    );
}
