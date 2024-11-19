import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

/**
 * @type {Linter.Config[]}
 */
const config = [
	...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
	{
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	},
];

export default config;
