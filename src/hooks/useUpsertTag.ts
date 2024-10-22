import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useUpsertTag = () => {
	const router = useRouter();
	const pathname = usePathname();
	const sps = useSearchParams();

	const isActive = sps.get('upsert-tag') === 'true';

	const closeDialog = () => {
		const newSearchParams = new URLSearchParams(sps.toString());
		newSearchParams.delete('upsert-tag');
		newSearchParams.delete('tag');
		return router.push(`${pathname}?${newSearchParams}`);
	};

	return { isActive, closeDialog };
};

export default useUpsertTag;
