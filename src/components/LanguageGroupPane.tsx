'use client';

import type { LanguageGroup } from '@/types/languageGroup';
import CloseButton from './CloseButton';
import styles from './LanguageGroupPane.module.css';

interface LanguageGroupPaneProps {
    languageGroup: LanguageGroup;
    onClose: () => void;
}

export default function LanguageGroupPane({
    languageGroup,
    onClose,
}: LanguageGroupPaneProps) {
    return (
        <div className={styles.pane}>
            <div className={styles.header}>
                <h2 className={styles.title}>{languageGroup.name}</h2>
                <CloseButton onClick={onClose} />
            </div>
            <div className={styles.content}>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Population</div>
                    <div className={styles.value}>
                        {languageGroup.population.toLocaleString()}
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Location</div>
                    {languageGroup.coordinates.length > 0 ? (
                        <div className={styles.tagList}>
                            {languageGroup.coordinates.map((coord, i) => (
                                <span key={i} className={styles.tag}>
                                    {coord.lat.toFixed(4)}°, {coord.lng.toFixed(4)}°
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className={styles.emptyState}>No coordinates available</span>
                    )}
                </div>
            </div>
        </div>
    );
}
