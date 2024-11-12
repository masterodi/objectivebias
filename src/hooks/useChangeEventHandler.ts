import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

const useChangeEventHandler = <T>(
	setter: Dispatch<SetStateAction<T>>
): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> => {
	return (e) => {
		setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
};

export default useChangeEventHandler;
