'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';

export default function AuthHeader() {
    const { user, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <>
            <div className="auth-header">
                {user ? (
                    <>
                        <div className="user-badge">
                            <span className="username">{user.username}</span>
                            <span className="role">{user.role}</span>
                        </div>
                        <button onClick={logout} className="auth-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className="auth-button"
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
