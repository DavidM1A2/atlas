'use client';

import type { TabProps } from './types';
import styles from '../LanguageGroupPane.module.css';

export default function NotesTab({ data }: TabProps) {
    return (
        <>
            <div className={styles.section}>
                <div className={styles.sectionTitle}>Field Notes</div>
                {data.fieldNotes.length > 0 ? (
                    data.fieldNotes.map((note) => (
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

            {data.surveySubmissions.length > 0 && (
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Survey Submissions</div>
                    {data.surveySubmissions.map((survey) => (
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
    );
}
