import { ORDER_BY_NAME, ORDER_DIR_NAME } from '@/utils';
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
		const orderBy = sps.get(ORDER_BY_NAME);
		const orderDir = sps.get(ORDER_DIR_NAME);
		return `${orderBy}${orderDir ? `:${orderDir}` : ''}`;
	};

	const update = (
		value?: { orderBy?: string; orderDir?: string } | string
	) => {
		let newSearchParams = new URLSearchParams(sps.toString());

		if (!value) {
			newSearchParams.delete(ORDER_BY_NAME);
			newSearchParams.delete(ORDER_DIR_NAME);
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
			newSearchParams.set(ORDER_BY_NAME, orderBy);
		} else {
			newSearchParams.delete(ORDER_DIR_NAME);
		}

		if (orderDir) {
			newSearchParams.set(ORDER_DIR_NAME, orderDir);
		} else {
			newSearchParams.delete(ORDER_DIR_NAME);
		}

		return router.push(`${pathname}?${newSearchParams}`);
	};

	return { toValue, update };
};

export default useOrderBy;
