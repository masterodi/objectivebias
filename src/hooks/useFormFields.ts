import { useState } from 'react';

type Fields<T extends object> = T;
type FieldsError<T extends object> = Partial<{ [k in keyof T]: string[] }>;

const useFormFields = <T extends object>(initialState: Fields<T>) => {
	const [fields, setFields] = useState(initialState);
	const [fieldsError, setFieldsError] = useState<null | FieldsError<T>>();

	return { fields, setFields, fieldsError, setFieldsError };
};

export default useFormFields;
