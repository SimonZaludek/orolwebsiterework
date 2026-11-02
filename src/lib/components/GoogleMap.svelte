<script module lang="ts">
	import { env } from '$env/dynamic/public';

	const KEY = env.PUBLIC_GOOGLE_MAPS_KEY;

	/* Minimal typings for the Maps JS bootstrap — the SDK loads at runtime. */
	interface GMaps {
		importLibrary: (name: string) => Promise<Record<string, unknown>>;
		Point?: new (x: number, y: number) => unknown;
	}

	function getGoogleMaps(): GMaps | undefined {
		return (window as unknown as { google?: { maps?: GMaps } }).google?.maps;
	}

	// Singleton loader shared by every map instance on the page (footer +
	// contact both mount in the same hydration tick — without this they race
	// and inject the bootstrap twice, which crashes the Maps API).
	let loaderPromise: Promise<void> | undefined;

	function loadMapsApi(): Promise<void> {
		if (getGoogleMaps()) return Promise.resolve();
		loaderPromise ??= new Promise<void>((resolve, reject) => {
			const w = window as unknown as { __orolGmapsReady?: () => void };
			w.__orolGmapsReady = () => resolve();
			const s = document.createElement('script');
			s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=weekly&loading=async&callback=__orolGmapsReady`;
			s.onerror = () => reject(new Error('Google Maps JS failed to load'));
			document.head.appendChild(s);
		});
		return loaderPromise;
	}
</script>

<script lang="ts">
	import orolMark from '$lib/assets/used_orol_logos/orol_all_white.svg';
	import orolMarkRaw from '$lib/assets/used_orol_logos/orol_all_white.svg?raw';
	import { company, contact } from '$lib/site';

	// OROL, spol. s r.o., Kpt. Nálepku 2218, Liptovský Mikuláš
	const center = { lat: 49.0835165, lng: 19.6254822 };

	// Opens the listing on Google Maps rather than a raw coordinate pair.
	const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		`${company.name}, ${contact.address.street}, ${contact.address.city}`
	)}`;

	const infoHtml = `<div class="gm-card">
		<strong>${company.name}</strong>
		<p>${contact.address.street}<br>${contact.address.city}</p>
		<p><a href="${contact.phoneHref}">${contact.phone}</a></p>
		<p><a href="${directionsUrl}" target="_blank" rel="noopener noreferrer">Navigovať →</a></p>
	</div>`;

	const MAP_ID = env.PUBLIC_GOOGLE_MAPS_MAP_ID;

	// Brand styling used when no cloud-styled Map ID is configured. Once a
	// Map ID exists (with its style built in the Google console), it takes
	// over and this inline style is ignored.
	// White ground with Orol-red roads — matches the OrolMap fallback so the
	// deployed map and the local one read the same.
	const inlineStyles = [
		{ elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
		{ elementType: 'labels.text.fill', stylers: [{ color: '#6b7175' }] },
		{ elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
		{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
		{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
		{ featureType: 'road', elementType: 'geometry', stylers: [{ color: '#c0281c' }] },
		{ featureType: 'road', elementType: 'geometry.stroke', stylers: [{ visibility: 'off' }] },
		{ featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8c1a10' }] },
		{ featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#c0281c' }] },
		{ featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e2e6e8' }] },
		{ featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#ffffff' }] }
	];

	// Classic-marker pin: the white eagle nested in a red badge, as an SVG
	// data URI (the DOM-based AdvancedMarker requires a Map ID).
	const eagleInner = orolMarkRaw
		.replace(/<\?xml[^?]*\?>/, '')
		.replace(/<!--[\s\S]*?-->/, '')
		.replace(/width="[^"]*"/, 'x="9" width="26"')
		.replace(/height="[^"]*"/, 'y="16" height="12.4"');
	const pinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"><circle cx="22" cy="22" r="20" fill="#c0281c" stroke="#ffffff" stroke-width="3"/>${eagleInner}</svg>`;
	const pinUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(pinSvg)}`;

	function initMap(el: HTMLElement) {
		let cancelled = false;

		(async () => {
			await loadMapsApi();
			if (cancelled) return;

			const gmaps = getGoogleMaps();
			if (!gmaps) return;
			const { Map, InfoWindow } = (await gmaps.importLibrary('maps')) as {
				Map: new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
				InfoWindow: new (opts: Record<string, unknown>) => {
					open: (opts: Record<string, unknown>) => void;
				};
			};
			const markerLib = (await gmaps.importLibrary('marker')) as {
				Marker: new (opts: Record<string, unknown>) => unknown;
				AdvancedMarkerElement: new (opts: Record<string, unknown>) => unknown;
			};
			if (cancelled) return;

			const map = new Map(el, {
				center,
				zoom: 13,
				gestureHandling: 'cooperative',
				// Keep only zoom — the default widget chrome fights the page design.
				disableDefaultUI: true,
				zoomControl: true,
				...(MAP_ID ? { mapId: MAP_ID } : { styles: inlineStyles })
			});

			let marker: unknown;
			if (MAP_ID) {
				const pin = document.createElement('div');
				pin.className = 'orol-pin';
				const img = document.createElement('img');
				img.src = orolMark;
				img.alt = '';
				pin.appendChild(img);
				marker = new markerLib.AdvancedMarkerElement({ map, position: center, content: pin });
			} else {
				marker = new markerLib.Marker({
					map,
					position: center,
					title: company.name,
					icon: gmaps.Point ? { url: pinUrl, anchor: new gmaps.Point(22, 22) } : { url: pinUrl }
				});
			}

			// The firm's card sits open on the pin; closing it is not final —
			// clicking the pin brings it back.
			const info = new InfoWindow({ content: infoHtml });
			const openInfo = () => info.open({ map, anchor: marker });
			openInfo();
			(marker as { addListener?: (ev: string, cb: () => void) => void }).addListener?.(
				'click',
				openInfo
			);
		})().catch((e) => console.error('GoogleMap init failed:', e));

		return () => {
			cancelled = true;
			el.replaceChildren();
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

	/* Info window — Google mounts it outside the component tree, hence :global */
	.map :global(.gm-card) {
		font-family: var(--font-body);
		font-size: var(--font-size-small);
		line-height: 1.5;
		color: var(--color-iron);
	}

	.map :global(.gm-card strong) {
		display: block;
		margin-bottom: 0.3rem;
		font-family: var(--font-display);
		font-size: 1.05rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-brand-primary);
	}

	.map :global(.gm-card p) {
		margin: 0.15rem 0;
	}

	.map :global(.gm-card a) {
		color: var(--color-brand-primary);
		font-weight: 600;
	}

	@media (max-width: 900px) {
		.map {
			min-height: 320px;
		}
	}
</style>
