'use client';

import React, { useState } from 'react';
import type { LanguageGroup } from '@/types/languageGroup';
import type { LanguageGroupFilters } from '@/types/filters';
import { countActiveFilters } from '@/types/filters';
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

export default function FilterPanel({
    languageGroups,
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

    const activeCount = countActiveFilters({});

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

            {/* Filter panel - currently empty since data model is simplified */}
            {showFiltersEnabled && showFilters && (
                <div className={styles.filterPanel}>
                    <div className={styles.filterHeader}>
                        <span className={styles.filterTitle}>Filters</span>
                        <span className={styles.resultCount}>
                            {filteredCount}/{languageGroups.length}
                        </span>
                    </div>
                    <div className={styles.sections}>
                        <p className={styles.emptyMessage}>
                            No filters available yet.
                        </p>
                    </div>
                </div>
            )}

            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </>
    );
}
