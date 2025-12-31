'use client';

import type { Country } from '@/types/country';

interface CountryInfoPaneProps {
    country: Country;
    onClose: () => void;
}

export default function CountryInfoPane({
    country,
    onClose,
}: CountryInfoPaneProps) {
    return (
        <div className="country-pane">
            <div className="country-pane-header">
                <h2>{country.name}</h2>
                <button
                    onClick={onClose}
                    className="close-button"
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

            <div className="country-pane-content">
                <div className="info-group">
                    <span className="info-label">Country Code</span>
                    <p className="info-value">{country.code}</p>
                </div>
                <div className="info-group">
                    <span className="info-label">Population</span>
                    <p className="info-value">
                        {country.population.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
