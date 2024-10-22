import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useOrderBy = () => {
	const router = useRouter();
	const pathname = usePathname();
	const sps = useSearchParams();

	const toSearchParams = (value: string) => {
		const [orderBy, orderDir] = value.split(':');
		return [orderBy, orderDir];
	};

	const toValue = () => {
		const orderBy = sps.get('orderBy');
		const orderDir = sps.get('orderDir');
		return `${orderBy}${orderDir ? `:${orderDir}` : ''}`;
	};

	const update = (
		value?: { orderBy?: string; orderDir?: string } | string
	) => {
		let newSearchParams = new URLSearchParams(sps.toString());

		if (!value) {
			newSearchParams.delete('orderBy');
			newSearchParams.delete('orderDir');
			return router.push(`${pathname}?${newSearchParams}`);
		}

		const orderBy =
			typeof value === 'string' ?
				toSearchParams(value)[0]
			:	value.orderBy;
		const orderDir =
			typeof value === 'string' ?
				toSearchParams(value)[1]
			:	value.orderDir;

		if (orderBy) {
			newSearchParams.set('orderBy', orderBy);
		} else {
			newSearchParams.delete('orderBy');
		}

		if (orderDir) {
			newSearchParams.set('orderDir', orderDir);
		} else {
			newSearchParams.delete('orderDir');
		}

		return router.push(`${pathname}?${newSearchParams}`);
	};

	return { toValue, toSearchParams, update };
};

export default useOrderBy;
