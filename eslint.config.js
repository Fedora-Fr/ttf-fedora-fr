import wordpress from '@wordpress/eslint-plugin';

export default [
	{
		ignores: [ 'node_modules/**', 'assets/dist/**', 'vendor/**' ],
	},
	...wordpress.configs.esnext,
	{
		languageOptions: {
			globals: {
				document: 'readonly',
				setTimeout: 'readonly',
				window: 'readonly',
			},
		},
	},
];
