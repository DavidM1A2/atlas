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
        <div className="fixed right-4 top-4 w-80 bg-white shadow-xl z-[1000] flex flex-col rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {country.name}
                </h2>
                <button
                    onClick={onClose}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    title="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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

            {/* Content */}
            <div className="p-4">
                <div className="space-y-3">
                    <div>
                        <span className="text-sm text-gray-500">Country Code</span>
                        <p className="text-gray-800 font-medium">{country.code}</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">Population</span>
                        <p className="text-gray-800 font-medium">
                            {country.population.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
