'use client';

import type { Country } from '@/types/country';
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
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                    title="Close"
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <div className={styles.content}>
                <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>Country Code</span>
                    <p className={styles.infoValue}>{country.code}</p>
                </div>
                <div className={styles.infoGroup}>
                    <span className={styles.infoLabel}>Population</span>
                    <p className={styles.infoValue}>
                        {country.population.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
