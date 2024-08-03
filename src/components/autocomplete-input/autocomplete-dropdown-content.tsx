import { MouseEvent, MutableRefObject } from 'react';
import { AutocompleteInputProps, AutocompleteOption } from './types';
import { defaultGetOptionLabel } from './utils';

type AutocompleteDropdownContentProps<T> = {
	ref: MutableRefObject<HTMLUListElement | null>;

	options: AutocompleteOption<T>[];
	getOptionLabel: AutocompleteInputProps<T, any>['getOptionLabel'];
	onOptionClick: (
		option: AutocompleteOption<T>
	) => (event: MouseEvent) => void;

	addOptionMessage?: string;
	onAddOptionClick?: (event: MouseEvent) => void;
};

export default function AutocompleteDropdownContent<T>(
	props: AutocompleteDropdownContentProps<T>
) {
	const {
		ref,
		options,
		getOptionLabel = defaultGetOptionLabel,
		onOptionClick,
		addOptionMessage,
		onAddOptionClick,
	} = props;
	const hasOptions = options.length > 0;

	return (
		<div className="dropdown-content z-[1] mt-1 max-h-80 w-full flex-nowrap overflow-auto rounded-box bg-base-100 p-2 shadow">
			<ul ref={ref} tabIndex={0} className="menu">
				{hasOptions &&
					options.map((option, index) => (
						<li
							key={getOptionLabel(option)}
							tabIndex={index + 1}
							className="text-lg"
						>
							<button
								type="button"
								onClick={onOptionClick(option)}
							>
								{getOptionLabel(option)}
							</button>
						</li>
					))}
				{!hasOptions && addOptionMessage && (
					<li className="text-lg">
						<button type="button" onClick={onAddOptionClick}>
							{addOptionMessage}
						</button>
					</li>
				)}
			</ul>
		</div>
	);
}
