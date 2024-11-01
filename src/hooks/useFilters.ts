import { TagFilterSearchParam } from '@/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useFilters = () => {
	const router = useRouter();
	const pathname = usePathname();
	const sps = useSearchParams();

	const getValue =
		(name: string) =>
		(all: boolean = false) => {
			return all ? sps.getAll(name) : sps.get(name);
		};

	const pushUpdate =
		(name: string) =>
		(
			value?: string,
			{ action }: { action: 'set' | 'append' | 'remove' } = {
				action: 'set',
			}
		) => {
			const newSps = new URLSearchParams(sps);

			if (value) {
				if (action === 'set') {
					newSps.set(name, value);
				} else if (action === 'append') {
					newSps.append(name, value);
				} else if (action === 'remove') {
					newSps.delete(name, value);
				}
			} else {
				newSps.delete(name);
			}

			const url = `${pathname}?${newSps}`;
			return router.push(url);
		};

	return {
		postsTag: {
			getValue: getValue(TagFilterSearchParam.name),
			pushUpdate: pushUpdate(TagFilterSearchParam.name),
			hasTag: (tag: string) =>
				sps.has(
					TagFilterSearchParam.name,
					TagFilterSearchParam.value(tag)
				),
		},
	};
};

export default useFilters;
