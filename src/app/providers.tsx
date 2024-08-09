'use client';

import { ToastProvider } from '@/components/toast';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
	return <ToastProvider>{children}</ToastProvider>;
}
