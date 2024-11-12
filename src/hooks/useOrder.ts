import { orderParsers, orderUrlKeys } from '@/searchParams';
import { ORDER_OPTIONS } from '@/utils';
import { useQueryStates } from 'nuqs';
import { useMemo } from 'react';

const useOrder = () => {
	const [order, setOrder] = useQueryStates(orderParsers, {
		history: 'push',
		shallow: false,
		clearOnDefault: false,
		urlKeys: orderUrlKeys,
	});
	const fieldValue = useMemo(
		() =>
			ORDER_OPTIONS.find(
				(option) => option.value === `${order.field}:${order.dir}`
			)?.value,
		[order]
	);

	const update = (orderValue: string) => {
		const [orderBy, orderDir] = orderValue.split(':') as [
			string,
			'asc' | 'desc',
		];
		setOrder({ field: orderBy, dir: orderDir });
	};

	return { value: order, update, fieldValue };
};

export default useOrder;
