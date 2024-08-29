import { ValidationError } from '@/errors';

export type ActionState<T extends object> =
	| {
			payload: T;
			validation: ReturnType<ValidationError<T>['serialize']>;
			error?: never;
	  }
	| { payload: T; validation?: never; error: string };
