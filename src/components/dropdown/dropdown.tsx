'use client';

import { cn } from '@/utils';
import { ReactNode, useEffect, useRef } from 'react';

type DropdownProps = {
	children: ReactNode;
	align?: 'end';
};

export default function Dropdown({ children, align }: DropdownProps) {
	const dropdownRef = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const dropdownEl = dropdownRef.current!;

		const toggle = (e: MouseEvent) => {
			if (!dropdownEl.contains(e.target as Node)) {
				dropdownEl.removeAttribute('open');
			}
		};

		document.addEventListener('click', toggle);

		return () => {
			document.removeEventListener('click', toggle);
		};
	}, []);

	return (
		<details
			ref={dropdownRef}
			className={cn('dropdown', align === 'end' && 'dropdown-end')}
		>
			{children}
		</details>
	);
}
