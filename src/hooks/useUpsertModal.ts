import { upsertModalParsers, upsertModalUrlKeys } from '@/searchParams';
import { useQueryStates } from 'nuqs';

const useUpsertModal = () => {
	const [upsertModal, setUpsertModal] = useQueryStates(upsertModalParsers, {
		urlKeys: upsertModalUrlKeys,
		shallow: false,
		history: 'push',
	});

	const close = () => {
		setUpsertModal(null);
	};

	return { isActive: !!upsertModal.upsertActive, close };
};

export default useUpsertModal;
