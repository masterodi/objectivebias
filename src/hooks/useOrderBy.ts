import { OrderBySearchParam, OrderDirSearchParam } from '@/utils';
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
		const orderBy = sps.get(OrderBySearchParam.name);
		const orderDir = sps.get(OrderDirSearchParam.name);
		return `${orderBy}${orderDir ? `:${orderDir}` : ''}`;
	};

	const update = (
		value?: { orderBy?: string; orderDir?: string } | string
	) => {
		let newSearchParams = new URLSearchParams(sps.toString());

		if (!value) {
			newSearchParams.delete(OrderBySearchParam.name);
			newSearchParams.delete(OrderDirSearchParam.name);
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
			newSearchParams.set(OrderBySearchParam.name, orderBy);
		} else {
			newSearchParams.delete(OrderDirSearchParam.name);
		}

		if (orderDir) {
			newSearchParams.set(OrderDirSearchParam.name, orderDir);
		} else {
			newSearchParams.delete(OrderDirSearchParam.name);
		}

		return router.push(`${pathname}?${newSearchParams}`);
	};

	return { toValue, update };
};

export default useOrderBy;
