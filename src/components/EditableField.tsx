'use client';

import { useState, useEffect } from 'react';
import styles from './EditableField.module.css';

interface EditableFieldProps {
    label: string;
    value: string | number;
    canEdit: boolean;
    type?: 'text' | 'number' | 'textarea' | 'select';
    options?: { value: string; label: string }[];
    onSave: (value: string | number) => void;
}

export default function EditableField({
    label,
    value,
    canEdit,
    type = 'text',
    options,
    onSave,
}: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(String(value));

    useEffect(() => {
        setEditValue(String(value));
    }, [value]);

    const handleSave = () => {
        const finalValue = type === 'number' ? Number(editValue) : editValue;
        onSave(finalValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(String(value));
        setIsEditing(false);
    };

    if (!canEdit) {
        return (
            <div className={styles.field}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
            </div>
        );
    }

    if (!isEditing) {
        return (
            <div className={styles.field}>
                <span className={styles.label}>{label}</span>
                <div className={styles.fieldRow}>
                    <span className={styles.valueWithEdit}>{value}</span>
                    <button
                        onClick={() => setIsEditing(true)}
                        className={styles.editButton}
                    >
                        Edit
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.field}>
            <span className={styles.label}>{label}</span>
            <div className={styles.editContainer}>
                {type === 'select' && options ? (
                    <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={styles.select}
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                ) : type === 'textarea' ? (
                    <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={styles.textarea}
                    />
                ) : (
                    <input
                        type={type}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className={styles.input}
                    />
                )}
                <div className={styles.editActions}>
                    <button onClick={handleSave} className={styles.saveButton}>
                        Save
                    </button>
                    <button onClick={handleCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
