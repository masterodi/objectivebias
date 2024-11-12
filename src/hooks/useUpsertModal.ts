import { upsertModalParsers, upsertModalUrlKeys } from '@/searchParams';
import { useQueryStates } from 'nuqs';

const useUpsertModal = () => {
	const [upsert, setUpsert] = useQueryStates(upsertModalParsers, {
		urlKeys: upsertModalUrlKeys,
		shallow: false,
		history: 'push',
	});

	const close = () => {
		setUpsert(null);
	};

	return { active: !!upsert.active, close };
};

export default useUpsertModal;
