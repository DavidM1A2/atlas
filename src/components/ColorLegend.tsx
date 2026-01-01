'use client';

import type { ColorMetric } from '@/types/colorCoding';
import { COLOR_METRICS } from '@/types/colorCoding';
import styles from './ColorLegend.module.css';

interface ColorLegendProps {
    selectedMetrics: ColorMetric[];
}

export default function ColorLegend({ selectedMetrics }: ColorLegendProps) {
    if (selectedMetrics.length === 0) return null;

    const activeLabels = COLOR_METRICS.filter((m) =>
        selectedMetrics.includes(m.key)
    ).map((m) => m.label);

    return (
        <div className={styles.legend}>
            <div className={styles.title}>Color by: {activeLabels.join(', ')}</div>
            <div className={styles.gradient}>
                <div className={styles.gradientBar} />
                <div className={styles.labels}>
                    <span>Needs Attention</span>
                    <span>Doing Well</span>
                </div>
            </div>
        </div>
    );
}
