import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		svg({
			// Scoped to the pictogram set only — brand logos under assets/logos and
			// assets/orol_logos + used_orol_logos must keep resolving to plain asset URLs for <img src>.
			includePaths: ['src/lib/assets/icons/'],
			// Emit the artwork untouched, exactly as {@html} used to inline it.
			svgoOptions: false
		})
	],
	optimizeDeps: {
		// Pre-bundling breaks maplibre-gl's ESM worker (its sibling-chunk
		// imports 404 under .vite/deps); serve it from source instead.
		exclude: ['maplibre-gl']
	},
	server: {
		// Allow access through Cloudflare quick tunnels (phone testing).
		allowedHosts: ['.trycloudflare.com']
	}
});
