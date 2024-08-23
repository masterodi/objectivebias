export type ActionState = {
	payload?: Record<string, FormDataEntryValue | null>;
	validationErrors?: Record<string, string[]>;
	error?: string | null;
};
