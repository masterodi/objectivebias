import { postsFiltersParsers, postsFiltersUrlKeys } from '@/searchParams';
import { useQueryStates } from 'nuqs';

const useFilters = () => {
	const [filters, setFilters] = useQueryStates(postsFiltersParsers, {
		shallow: false,
		history: 'push',
		clearOnDefault: false,
		urlKeys: postsFiltersUrlKeys,
	});

	const updateTag = (value: string, op: 'append' | 'remove') => {
		setFilters((prev) => {
			const newTag =
				op === 'remove' ?
					(prev.tag ?? []).filter((tag) => tag !== value)
				:	[...(prev.tag ?? []), value];

			return { ...prev, tag: newTag.length > 0 ? newTag : null };
		});
	};

	const isTagInFilter = (value: string) => {
		return !!filters.tag?.find((tg) => tg === value);
	};

	return {
		value: filters,
		updateTag,
		isTagInFilter,
	};
};

export default useFilters;
