import { withProps } from '@udecode/cn';
import {
	createBoldPlugin,
	createHeadingPlugin,
	createItalicPlugin,
	createPlugins,
	createStrikethroughPlugin,
	createUnderlinePlugin,
	ELEMENT_H1,
	ELEMENT_H2,
	ELEMENT_H3,
	ELEMENT_H4,
	ELEMENT_H5,
	ELEMENT_H6,
	PlateLeaf,
} from '@udecode/plate';
import HeadingLeaf from './components/heading-leaf';

const plugins = createPlugins(
	[
		createBoldPlugin({ component: withProps(PlateLeaf, { as: 'strong' }) }),
		createItalicPlugin({ component: withProps(PlateLeaf, { as: 'em' }) }),
		createUnderlinePlugin({ component: withProps(PlateLeaf, { as: 'u' }) }),
		createStrikethroughPlugin({
			component: withProps(PlateLeaf, { as: 's' }),
		}),
		createHeadingPlugin(),
	],
	{
		components: {
			[ELEMENT_H1]: withProps(HeadingLeaf, { as: 'h1' }),
			[ELEMENT_H2]: withProps(HeadingLeaf, { as: 'h2' }),
			[ELEMENT_H3]: withProps(HeadingLeaf, { as: 'h3' }),
			[ELEMENT_H4]: withProps(HeadingLeaf, { as: 'h4' }),
			[ELEMENT_H5]: withProps(HeadingLeaf, { as: 'h5' }),
			[ELEMENT_H6]: withProps(HeadingLeaf, { as: 'h6' }),
		},
	}
);

export default plugins;
