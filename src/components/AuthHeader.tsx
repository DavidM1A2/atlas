'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';

export default function AuthHeader() {
    const { user, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <>
            <div className="fixed left-4 top-4 z-[1000] flex items-center gap-3">
                {user ? (
                    <>
                        <div className="bg-white shadow-lg rounded-lg px-3 py-2 flex items-center gap-2">
                            <span className="text-gray-800 font-medium">{user.username}</span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {user.role}
                            </span>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-white shadow-lg rounded-lg px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className="bg-white shadow-lg rounded-lg px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
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
