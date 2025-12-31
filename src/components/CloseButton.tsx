'use client';

import styles from './CloseButton.module.css';

interface CloseButtonProps {
    onClick: () => void;
    className?: string;
}

export default function CloseButton({ onClick, className }: CloseButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${styles.closeButton} ${className || ''}`}
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
    );
}
