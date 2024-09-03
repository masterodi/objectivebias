import {
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
	PlateElement,
	PlateElementProps,
} from '@udecode/plate';
import React, { createElement, forwardRef } from 'react';

type HeadingLeafProps = PlateElementProps & {
	as:
		| typeof ELEMENT_H1
		| typeof ELEMENT_H2
		| typeof ELEMENT_H3
		| typeof ELEMENT_H4
		| typeof ELEMENT_H5
		| typeof ELEMENT_H6;
	children: React.ReactNode;
};

const HeadingLeaf = forwardRef<typeof PlateElement, HeadingLeafProps>(
	({ children, as, ...rest }, ref) => {
		return (
			<PlateElement asChild ref={ref} {...rest}>
				{createElement(as, {}, children)}
			</PlateElement>
		);
	}
);

export default HeadingLeaf;
