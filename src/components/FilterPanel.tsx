'use client';

import React, { useState, useMemo } from 'react';
import type { LanguageGroup } from '@/types/languageGroup';
import { CHURCH_PRESENCE_OPTIONS, SOURCE_RELIABILITY_OPTIONS } from '@/types/languageGroup';
import type { LanguageGroupFilters, PopulationRange } from '@/types/filters';
import {
    POPULATION_RANGES,
    EGIDS_TIERS,
    SCRIPTURE_TIERS,
    DEFAULT_FILTERS,
    countActiveFilters,
} from '@/types/filters';
import { getUniqueCountries, getUniqueFamilies, getCountryName } from '@/utils/filterUtils';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
    languageGroups: LanguageGroup[];
    filters: LanguageGroupFilters;
    onFiltersChange: (filters: LanguageGroupFilters) => void;
    filteredCount: number;
    isOpen?: boolean;
    onToggle?: () => void;
    isUserMenuOpen?: boolean;
    onUserMenuToggle?: () => void;
    showFilters?: boolean;
}

interface FilterSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
    return (
        <div className={styles.section}>
            <button className={styles.sectionHeader} onClick={onToggle}>
                <span>{title}</span>
                <span className={styles.chevron}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className={styles.sectionContent}>{children}</div>}
        </div>
    );
}

interface SearchableFilterSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    options: { value: string; label: string }[];
    selectedValues: string[];
    onToggleValue: (value: string) => void;
}

function SearchableFilterSection({
    title,
    isOpen,
    onToggle,
    options,
    selectedValues,
    onToggleValue,
}: SearchableFilterSectionProps) {
    const [search, setSearch] = useState('');

    const filteredOptions = useMemo(() => {
        if (!search) return options;
        const lower = search.toLowerCase();
        return options.filter((opt) => opt.label.toLowerCase().includes(lower));
    }, [options, search]);

    return (
        <div className={styles.section}>
            <button className={styles.sectionHeader} onClick={onToggle}>
                <span>
                    {title}
                    {selectedValues.length > 0 && (
                        <span className={styles.selectedCount}> ({selectedValues.length})</span>
                    )}
                </span>
                <span className={styles.chevron}>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
                <div className={styles.sectionContent}>
                    {options.length > 6 && (
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    )}
                    <div className={styles.optionsList}>
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt) => (
                                <label key={opt.value} className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={selectedValues.includes(opt.value)}
                                        onChange={() => onToggleValue(opt.value)}
                                        className={styles.checkbox}
                                    />
                                    <span>{opt.label}</span>
                                </label>
                            ))
                        ) : (
                            <span className={styles.noResults}>No matches</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function CheckboxOption({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className={styles.checkboxLabel}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className={styles.checkbox}
            />
            <span>{label}</span>
        </label>
    );
}

export default function FilterPanel({
    languageGroups,
    filters,
    onFiltersChange,
    filteredCount,
    isOpen: controlledIsOpen,
    onToggle: controlledOnToggle,
    isUserMenuOpen: controlledIsUserMenuOpen,
    onUserMenuToggle: controlledOnUserMenuToggle,
    showFilters: showFiltersEnabled = true,
}: FilterPanelProps) {
    const { user, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [internalShowUserMenu, setInternalShowUserMenu] = useState(false);
    const [internalShowFilters, setInternalShowFilters] = useState(false);

    // Use controlled state if provided, otherwise use internal state
    const showFilters = controlledIsOpen ?? internalShowFilters;
    const toggleFilters = controlledOnToggle ?? (() => setInternalShowFilters(!internalShowFilters));
    const showUserMenu = controlledIsUserMenuOpen ?? internalShowUserMenu;
    const toggleUserMenu = controlledOnUserMenuToggle ?? (() => setInternalShowUserMenu(!internalShowUserMenu));
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        church: false,
        egids: false,
        population: false,
        region: false,
        family: false,
        source: false,
        scripture: false,
    });

    const activeCount = countActiveFilters(filters);

    const countries = useMemo(() => getUniqueCountries(languageGroups), [languageGroups]);
    const families = useMemo(() => getUniqueFamilies(languageGroups), [languageGroups]);

    const countryOptions = useMemo(
        () => countries.map((code) => ({ value: code, label: getCountryName(code) })),
        [countries]
    );
    const familyOptions = useMemo(
        () => families.map((f) => ({ value: f, label: f })),
        [families]
    );

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleClearAll = () => {
        onFiltersChange(DEFAULT_FILTERS);
    };

    const toggleArrayFilter = <T,>(
        key: keyof LanguageGroupFilters,
        value: T,
        currentArray: T[]
    ) => {
        const newArray = currentArray.includes(value)
            ? currentArray.filter((v) => v !== value)
            : [...currentArray, value];
        onFiltersChange({ ...filters, [key]: newArray });
    };

    return (
        <>
            {/* Small floating buttons */}
            <div className={styles.buttonRow}>
                {/* User button */}
                {user ? (
                    <button
                        className={styles.iconButton}
                        onClick={toggleUserMenu}
                        title={user.username}
                    >
                        <span className={styles.userInitial}>{user.username[0].toUpperCase()}</span>
                    </button>
                ) : (
                    <button
                        className={styles.iconButton}
                        onClick={() => setShowLoginModal(true)}
                        title="Login"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>
                )}

                {/* Filter button - only shown if filters are enabled */}
                {showFiltersEnabled && (
                    <button
                        className={`${styles.iconButton} ${showFilters ? styles.iconButtonActive : ''}`}
                        onClick={toggleFilters}
                        title="Filters"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                        </svg>
                        {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
                    </button>
                )}
            </div>

            {/* User dropdown */}
            {showUserMenu && user && (
                <div className={styles.userMenu}>
                    <div className={styles.userMenuHeader}>
                        <span className={styles.username}>{user.username}</span>
                        <span className={styles.userRole}>{user.role}</span>
                    </div>
                    <button onClick={() => { logout(); toggleUserMenu(); }} className={styles.menuButton}>
                        Logout
                    </button>
                </div>
            )}

            {/* Filter panel */}
            {showFiltersEnabled && showFilters && (
                <div className={styles.filterPanel}>
                    <div className={styles.filterHeader}>
                        <span className={styles.filterTitle}>Filters</span>
                        <span className={styles.resultCount}>
                            {filteredCount}/{languageGroups.length}
                        </span>
                    </div>

                    <div className={styles.sections}>
                        <FilterSection
                            title="Church Status"
                            isOpen={openSections.church}
                            onToggle={() => toggleSection('church')}
                        >
                            {CHURCH_PRESENCE_OPTIONS.map((status) => (
                                <CheckboxOption
                                    key={status}
                                    label={status}
                                    checked={filters.churchStatus.includes(status)}
                                    onChange={() =>
                                        toggleArrayFilter('churchStatus', status, filters.churchStatus)
                                    }
                                />
                            ))}
                        </FilterSection>

                        <FilterSection
                            title="EGIDS Vitality"
                            isOpen={openSections.egids}
                            onToggle={() => toggleSection('egids')}
                        >
                            {EGIDS_TIERS.map((tier) => (
                                <CheckboxOption
                                    key={tier.tier}
                                    label={tier.label}
                                    checked={filters.egidsVitality.includes(tier.tier)}
                                    onChange={() =>
                                        toggleArrayFilter('egidsVitality', tier.tier, filters.egidsVitality)
                                    }
                                />
                            ))}
                        </FilterSection>

                        <FilterSection
                            title="Population"
                            isOpen={openSections.population}
                            onToggle={() => toggleSection('population')}
                        >
                            {POPULATION_RANGES.map((range) => (
                                <CheckboxOption
                                    key={range}
                                    label={range}
                                    checked={filters.populationRange.includes(range)}
                                    onChange={() =>
                                        toggleArrayFilter(
                                            'populationRange',
                                            range as PopulationRange,
                                            filters.populationRange
                                        )
                                    }
                                />
                            ))}
                        </FilterSection>

                        <SearchableFilterSection
                            title="Country"
                            isOpen={openSections.region}
                            onToggle={() => toggleSection('region')}
                            options={countryOptions}
                            selectedValues={filters.countries}
                            onToggleValue={(code) =>
                                toggleArrayFilter('countries', code, filters.countries)
                            }
                        />

                        <SearchableFilterSection
                            title="Language Family"
                            isOpen={openSections.family}
                            onToggle={() => toggleSection('family')}
                            options={familyOptions}
                            selectedValues={filters.languageFamilies}
                            onToggleValue={(family) =>
                                toggleArrayFilter('languageFamilies', family, filters.languageFamilies)
                            }
                        />

                        <FilterSection
                            title="Source Reliability"
                            isOpen={openSections.source}
                            onToggle={() => toggleSection('source')}
                        >
                            {SOURCE_RELIABILITY_OPTIONS.map((source) => (
                                <CheckboxOption
                                    key={source}
                                    label={source}
                                    checked={filters.sourceReliability.includes(source)}
                                    onChange={() =>
                                        toggleArrayFilter('sourceReliability', source, filters.sourceReliability)
                                    }
                                />
                            ))}
                        </FilterSection>

                        <FilterSection
                            title="Scripture Access"
                            isOpen={openSections.scripture}
                            onToggle={() => toggleSection('scripture')}
                        >
                            {SCRIPTURE_TIERS.map((tier) => (
                                <CheckboxOption
                                    key={tier.tier}
                                    label={tier.label}
                                    checked={filters.scriptureAccess.includes(tier.tier)}
                                    onChange={() =>
                                        toggleArrayFilter('scriptureAccess', tier.tier, filters.scriptureAccess)
                                    }
                                />
                            ))}
                        </FilterSection>
                    </div>

                    {activeCount > 0 && (
                        <button className={styles.clearButton} onClick={handleClearAll}>
                            Clear all
                        </button>
                    )}
                </div>
            )}

            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </>
    );
}
