import { postsOrderParsers, postsOrderUrlKeys } from '@/searchParams';
import { OrderDir, PostsOrderBy } from '@/types';
import { ORDER_OPTIONS } from '@/utils';
import { useQueryStates } from 'nuqs';
import { useMemo } from 'react';

const usePostsOrder = () => {
	const [postsOrder, setPostsOrder] = useQueryStates(postsOrderParsers, {
		history: 'push',
		shallow: false,
		clearOnDefault: false,
		urlKeys: postsOrderUrlKeys,
	});

	const fieldValue = useMemo(() => {
		return ORDER_OPTIONS.find(
			(option) => option.value === `${postsOrder.by}:${postsOrder.dir}`
		)?.value;
	}, [postsOrder]);

	const update = (orderValue: string) => {
		const [orderBy, orderDir] = orderValue.split(':') as [
			PostsOrderBy,
			OrderDir,
		];
		setPostsOrder({ by: orderBy, dir: orderDir });
	};

	return { order: postsOrder, update, fieldValue };
};

export default usePostsOrder;
