import { postsFiltersParsers, postsFiltersUrlKeys } from '@/searchParams';
import { useQueryStates } from 'nuqs';

const usePostsFilters = () => {
	const [postsFilters, setPostsFilters] = useQueryStates(
		postsFiltersParsers,
		{
			shallow: false,
			history: 'push',
			clearOnDefault: false,
			urlKeys: postsFiltersUrlKeys,
		}
	);

	const updateTag = (value: string, op: 'append' | 'remove') => {
		setPostsFilters((prev) => {
			const newTag =
				op === 'remove' ?
					(prev.tag ?? []).filter((tag) => tag !== value)
				:	[...(prev.tag ?? []), value];

			return { ...prev, tag: newTag.length > 0 ? newTag : null };
		});
	};

	const isTagInFilter = (value: string) => {
		return !!postsFilters.tag?.find((tg) => tg === value);
	};

	return {
		filters: postsFilters,
		updateTag,
		isTagInFilter,
	};
};

export default usePostsFilters;
