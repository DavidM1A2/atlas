'use client';

import { useState } from 'react';
import type { ColorMetric, ColorCodingState } from '@/types/colorCoding';
import { COLOR_METRICS } from '@/types/colorCoding';
import styles from './ColorCodingPanel.module.css';

interface ColorCodingPanelProps {
    colorCoding: ColorCodingState;
    onColorCodingChange: (colorCoding: ColorCodingState) => void;
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function ColorCodingPanel({
    colorCoding,
    onColorCodingChange,
    isOpen: controlledIsOpen,
    onToggle: controlledOnToggle,
}: ColorCodingPanelProps) {
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    // Use controlled state if provided, otherwise use internal state
    const isOpen = controlledIsOpen ?? internalIsOpen;
    const toggleOpen = controlledOnToggle ?? (() => setInternalIsOpen(!internalIsOpen));

    const toggleMetric = (metric: ColorMetric) => {
        const current = colorCoding.selectedMetrics;
        const updated = current.includes(metric)
            ? current.filter((m) => m !== metric)
            : [...current, metric];
        onColorCodingChange({ selectedMetrics: updated });
    };

    const activeCount = colorCoding.selectedMetrics.length;

    return (
        <>
            <button
                className={`${styles.toggleButton} ${isOpen ? styles.toggleButtonActive : ''}`}
                onClick={toggleOpen}
                title="Color Coding"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="13.5" cy="6.5" r="3" />
                    <circle cx="6.5" cy="17.5" r="3" />
                    <circle cx="17.5" cy="17.5" r="3" />
                    <path d="M13.5 9.5v2.5" />
                    <path d="M9 15l2-2.5" />
                    <path d="M15 15l-2-2.5" />
                </svg>
                {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
            </button>

            {isOpen && (
                <div className={styles.panel}>
                    <div className={styles.header}>
                        <span className={styles.title}>Color Coding</span>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.description}>
                            Select metrics to color-code markers. Multiple metrics are averaged.
                        </p>
                        {COLOR_METRICS.map(({ key, label }) => (
                            <label key={key} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={colorCoding.selectedMetrics.includes(key)}
                                    onChange={() => toggleMetric(key)}
                                    className={styles.checkbox}
                                />
                                <span>{label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
