import { useState } from 'react';

// type DefaultChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;

// type ChangeHandlers<T extends object, U extends undefined | object> =
// 	U extends object ?
// 		{
// 			[K in keyof T]: K extends keyof U ? U[K] : DefaultChangeHandler;
// 		}
// 	:	{ [K in keyof T]: DefaultChangeHandler };

// const useFields = <
// 	T extends object,
// 	ChangeCfg extends undefined | Partial<Record<keyof T, unknown>> = undefined,
// >(
// 	initialState: T,
// 	config: { onChange?: ChangeCfg } = {}
// ) => {
// 	const [fields, setFields] = useState(initialState);
// 	const [errors, setErrors] = useState<
// 		Partial<Record<keyof T, string | string[]>> | null | undefined
// 	>();

// 	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
// 		setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// 	}, []);
// 	const changeHandlers = useMemo(
// 		() =>
// 			Object.keys(fields).reduce(
// 				(acc, key) => {
// 					const { onChange } = config ?? {};
// 					const handler = onChange?.[key as keyof T] ?? handleChange;
// 					return { ...acc, [key]: handler };
// 				},
// 				{} as ChangeHandlers<T, ChangeCfg>
// 			),
// 		[]
// 	);

// 	return { fields, setFields, errors, setErrors, changeHandlers };
// };

const useFields = <T extends object>(initialState: T) => {
	const [fields, setFields] = useState(initialState);
	const [errors, setErrors] = useState<
		Partial<Record<keyof T, string | string[]>> | null | undefined
	>();

	return { fields, setFields, errors, setErrors };
};

export default useFields;
