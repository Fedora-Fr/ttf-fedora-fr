/* global __dirname */
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig( {
	build: {
		outDir: resolve( __dirname, 'assets/dist' ),
		emptyOutDir: true,
		rollupOptions: {
			input: resolve( __dirname, 'assets/src/main.js' ),
			output: {
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
		},
		cssCodeSplit: false,
		minify: 'oxc',
	},
} );
