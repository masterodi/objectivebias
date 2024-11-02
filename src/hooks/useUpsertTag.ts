import { UPSERT_ID_NAME, UPSERT_TAG_NAME } from '@/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useUpsertTag = () => {
	const router = useRouter();
	const pathname = usePathname();
	const sps = useSearchParams();

	const isActive = sps.get(UPSERT_TAG_NAME) === 'true';

	const closeDialog = () => {
		const newSearchParams = new URLSearchParams(sps.toString());
		newSearchParams.delete(UPSERT_TAG_NAME);
		newSearchParams.delete(UPSERT_ID_NAME);
		return router.push(`${pathname}?${newSearchParams}`);
	};

	return { isActive, closeDialog };
};

export default useUpsertTag;
