import { Toast } from './types';

export const PUSH_TOAST = 'push_toast';
export const DISMISS_TOAST = 'dismiss_toast';

type ToastAction =
	| {
			type: 'push_toast';
			payload: Toast;
	  }
	| {
			type: 'dismiss_toast';
			payload?: { id: string };
	  };

export function reducer(state: Toast[], action: ToastAction): Toast[] {
	if (action.type === PUSH_TOAST) {
		return [...state, action.payload];
	}

	if (action.type === DISMISS_TOAST) {
		if (action.payload?.id) {
			return state.filter((t) => t.id !== action.payload?.id);
		}

		return state.slice(1);
	}

	return state;
}
