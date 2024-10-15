import { DialogSearchParams } from '@/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useSearchParamsManager = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const closeDialog = (...dialogSearchParams: string[]) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());

		dialogSearchParams.forEach((sp) => {
			newSearchParams.delete(sp);
		});

		const url = `${pathname}?${newSearchParams}`;
		router.push(url);
	};

	const isUpsertTagDialogOpen =
		searchParams.get(DialogSearchParams.upsertTag) === 'true';

	const closeUpsertTagDialog = () => {
		closeDialog(DialogSearchParams.upsertTag, 'tag');
	};

	return { isUpsertTagDialogOpen, closeUpsertTagDialog };
};

export default useSearchParamsManager;
