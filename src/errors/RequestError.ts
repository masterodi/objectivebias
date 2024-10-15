import { ErrorCode } from './utils';

export default abstract class RequestError extends Error {
	code: string;

	constructor(props?: { message?: string; code?: ErrorCode }) {
		super(props?.message ?? 'Something went wrong.');
		this.code = props?.code ?? 'error:request';
	}
}
