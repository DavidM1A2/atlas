'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';
import styles from './AuthHeader.module.css';

export default function AuthHeader() {
    const { user, isLoading, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await logout();
        setIsLoggingOut(false);
    };

    if (isLoading) {
        return <div className={styles.header} />;
    }

    return (
        <>
            <div className={styles.header}>
                {user ? (
                    <>
                        <div className={styles.userBadge}>
                            <span className={styles.username}>{user.username}</span>
                            <span className={styles.role}>{user.role}</span>
                        </div>
                        <button onClick={handleLogout} className={styles.button} disabled={isLoggingOut}>
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className={styles.button}
                    >
                        Login
                    </button>
                )}
            </div>

            {showLoginModal && (
                <LoginModal onClose={() => setShowLoginModal(false)} />
            )}
        </>
    );
}
