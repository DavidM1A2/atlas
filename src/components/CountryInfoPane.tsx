'use client';

import type { Country } from '@/types/country';
import CloseButton from './CloseButton';
import { formatPopulation, formatGDP, formatPercent } from '@/utils/formatters';
import styles from './CountryInfoPane.module.css';

interface CountryInfoPaneProps {
    country: Country;
    onClose: () => void;
}

export default function CountryInfoPane({
    country,
    onClose,
}: CountryInfoPaneProps) {
    return (
        <div className={styles.pane}>
            <div className={styles.header}>
                <h2 className={styles.title}>{country.name}</h2>
                <CloseButton onClick={onClose} />
            </div>

            <div className={styles.content}>
                <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>Population</span>
                    <p className={styles.infoValue}>
                        {formatPopulation(country.population)}
                    </p>
                </div>
                <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>GDP</span>
                    <p className={styles.infoValue}>
                        {formatGDP(country.gdp)}
                    </p>
                </div>
                <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>Poverty Rate</span>
                    <p className={styles.infoValue}>{formatPercent(country.povertyRate)}</p>
                </div>
                <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>People Groups</span>
                    <p className={styles.infoValue}>{country.peopleGroups}</p>
                </div>
                <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>Christian Population</span>
                    <p className={styles.infoValue}>{formatPercent(country.christianPercent)}</p>
                </div>
            </div>
        </div>
    );
}
