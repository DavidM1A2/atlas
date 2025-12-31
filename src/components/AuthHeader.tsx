'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';
import styles from './AuthHeader.module.css';

export default function AuthHeader() {
    const { user, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <>
            <div className={styles.header}>
                {user ? (
                    <>
                        <div className={styles.userBadge}>
                            <span className={styles.username}>{user.username}</span>
                            <span className={styles.role}>{user.role}</span>
                        </div>
                        <button onClick={logout} className={styles.button}>
                            Logout
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
