'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageGroupProvider } from '@/context/LanguageGroupContext';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <LanguageGroupProvider>{children}</LanguageGroupProvider>
        </AuthProvider>
    );
}
