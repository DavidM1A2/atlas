'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import CloseButton from './CloseButton';
import styles from './LoginModal.module.css';

interface LoginModalProps {
    onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        const success = login(username, password);
        if (success) {
            onClose();
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Login</h2>
                    <CloseButton onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
