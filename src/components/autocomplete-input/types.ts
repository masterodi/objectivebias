export type ACOption<T> = { value: T; label: string };

export type ACValue<T, M extends boolean> =
	M extends true ? ACOption<T>[] : ACOption<T>;
