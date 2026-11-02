<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import orolMark from '$lib/assets/used_orol_logos/orol_all_white.svg';

	// OROL, spol. s r.o., Kpt. Nálepku 2218, Liptovský Mikuláš
	const center: [number, number] = [19.6254822, 49.0835165];

	// Brand-styled vector map: white ground, Orol-red roads, eagle mark as pin.
	function initMap(el: HTMLElement) {
		let map: import('maplibre-gl').Map | undefined;
		let cancelled = false;

		(async () => {
			// maplibre-gl ships CJS: the runtime namespace nests everything under
			// `default`, while its types declare named exports — support both.
			const mod = await import('maplibre-gl');
			const maplibregl = (mod as unknown as { default?: typeof mod }).default ?? mod;
			if (cancelled) return;

			const m = new maplibregl.Map({
				container: el,
				style: 'https://tiles.openfreemap.org/styles/positron',
				center,
				zoom: 13,
				cooperativeGestures: true,
				attributionControl: { compact: true }
			});
			map = m;
			m.addControl(new maplibregl.NavigationControl({ showCompass: false }));

			m.on('load', () => {
				for (const layer of m.getStyle().layers ?? []) {
					const sourceLayer = 'source-layer' in layer ? layer['source-layer'] : undefined;
					if (layer.type === 'background') {
						m.setPaintProperty(layer.id, 'background-color', '#ffffff');
					} else if (layer.type === 'line' && sourceLayer === 'transportation') {
						m.setPaintProperty(layer.id, 'line-color', '#c0281c');
					} else if (
						layer.type === 'fill' &&
						(sourceLayer === 'landcover' || sourceLayer === 'landuse' || sourceLayer === 'park')
					) {
						m.setPaintProperty(layer.id, 'fill-color', '#f7f8f8');
					} else if (layer.type === 'fill' && sourceLayer === 'water') {
						m.setPaintProperty(layer.id, 'fill-color', '#e2e6e8');
					}
				}
			});

			const pin = document.createElement('div');
			pin.className = 'orol-pin';
			const img = document.createElement('img');
			img.src = orolMark;
			img.alt = '';
			pin.appendChild(img);
			new maplibregl.Marker({ element: pin, anchor: 'center' }).setLngLat(center).addTo(m);
		})();

		return () => {
			cancelled = true;
			map?.remove();
		};
	}
</script>

<div class="map" {@attach initMap}></div>

<style>
	.map {
		width: 100%;
		height: 100%;
		min-height: 420px;
	}

	.map :global(.orol-pin) {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background-color: var(--color-brand-primary);
		border: 3px solid var(--color-white);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.map :global(.orol-pin img) {
		width: 26px;
		height: 26px;
		display: block;
	}

	@media (max-width: 900px) {
		.map {
			min-height: 320px;
		}
	}
</style>
