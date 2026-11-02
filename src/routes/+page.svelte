<script lang="ts">
	import { resolve } from '$app/paths';
	import ownerPhoto from '$lib/assets/koloman_zaludek_no_text.jpg';
	import presentationTruckJpg from '$lib/assets/home/presentation/doprava-orol.jpg';
	import presentationHouseJpg from '$lib/assets/home/presentation/realizacia-dom.jpg';
	import presentationYardVideo from '$lib/assets/home/video/sklad-materialu-2026.mp4';
	import presentationYardPoster from '$lib/assets/home/video/sklad-materialu-2026-poster.jpg';
	import presentationEntranceVideo from '$lib/assets/home/video/areal-vstup-2026.mp4';
	import presentationEntrancePoster from '$lib/assets/home/video/areal-vstup-2026-poster.jpg';
	import presentationAisleVideo from '$lib/assets/home/video/skladova-alej-2026.mp4';
	import presentationAislePoster from '$lib/assets/home/video/skladova-alej-2026-poster.jpg';
	import presentationCoveredStoreVideo from '$lib/assets/home/video/kryty-sklad-2026.mp4';
	import presentationCoveredStorePoster from '$lib/assets/home/video/kryty-sklad-2026-poster.jpg';
	import presentationPalletsVideo from '$lib/assets/home/video/palety-materialu-2026.mp4';
	import presentationPalletsPoster from '$lib/assets/home/video/palety-materialu-2026-poster.jpg';
	import presentationWarehouseTruckVideo from '$lib/assets/home/video/nakladne-auto-sklad-2026.mp4';
	import presentationWarehouseTruckPoster from '$lib/assets/home/video/nakladne-auto-sklad-2026-poster.jpg';

	import ResponsiveServiceImage from '$lib/components/ResponsiveServiceImage.svelte';
	import { serviceMedia } from '$lib/serviceMedia';

	import prodHruba from '$lib/assets/products/hruba-stavba-generated.jpg';
	import prodZmesy from '$lib/assets/products/suche-zmesy-malty-omietky-generated.jpg';
	import prodIzolacie from '$lib/assets/products/tepelne-izolacie-generated.jpg';
	import prodFarby from '$lib/assets/products/fasadne-a-interierove-farby-generated.jpg';
	import prodKrytiny from '$lib/assets/products/stresne-krytiny-generated.jpg';
	import prodHydroizolacia from '$lib/assets/products/hydroizolacia-generated.jpg';
	import prodChemia from '$lib/assets/products/stavebna-chemia-generated.jpg';
	import prodDlazby from '$lib/assets/products/dlazby-betonove-tvarnice-generated.jpg';
	import prodOcel from '$lib/assets/products/betonarska-ocel-generated.jpg';
	import prodOkna from '$lib/assets/products/okna-a-dvere-generated.jpg';
	import prodSanita from '$lib/assets/products/kanalizacia-voda-sanita-generated.jpg';
	import prodNaradie from '$lib/assets/products/naradie-a-doplnky-generated.jpg';

	import { fade } from 'svelte/transition';
	import { galleryPhotos } from '$lib/gallery';
	import { company, contact, products, services } from '$lib/site';
	import { reveal } from '$lib/reveal';
	import { partners } from '$lib/partners';
	import { categoryIcons, serviceIcons } from '$lib/icons';
	import hiltiLogo from '$lib/assets/logos/Hilti.svg';
	import { rentalTools, type RentalTool } from '$lib/rentalTools';

	// Požičovňa náradia is the featured service; the main offer row follows.
	const featuredService = services.find((s) => s.href === '/services/pozicovna-naradia');
	const mainServiceOrder = [
		'/services/cenova-ponuka',
		'/services/doprava',
		'/services/poradenstvo',
		'/services/stavbyveduci'
	];
	const mainServices = mainServiceOrder
		.map((href) => services.find((s) => s.href === href))
		.filter((s): s is (typeof services)[number] => s !== undefined);
	const secondaryServices = services.filter(
		(s) => s.href !== '/services/pozicovna-naradia' && !mainServiceOrder.includes(s.href)
	);

	// Monochrome background photos for the service tiles (own photos from the
	// old site's gallery).
	const serviceBg = serviceMedia;

	const productBg: Record<string, string> = {
		'/products/hruba-stavba': prodHruba,
		'/products/suche-zmesy-malty-omietky': prodZmesy,
		'/products/tepelne-izolacie': prodIzolacie,
		'/products/fasadne-a-interierove-farby': prodFarby,
		'/products/stresne-krytiny': prodKrytiny,
		'/products/hydroizolacia': prodHydroizolacia,
		'/products/stavebna-chemia': prodChemia,
		'/products/dlazby-betonove-tvarnice': prodDlazby,
		'/products/betonarska-ocel': prodOcel,
		'/products/okna-a-dvere': prodOkna,
		'/products/kanalizacia-voda-sanita': prodSanita,
		'/products/naradie-a-doplnky': prodNaradie
	};

	let galleryIndex = $state(0);
	let presentationVideoElement = $state<HTMLVideoElement | null>(null);
	let presentationVideoIndex = $state(0);
	let presentationVideoPaused = $state(false);
	let rentalToolIndex = $state(0);
	let rentalRotationPaused = $state(false);

	const rotatingRentalTools = rentalTools.filter(
		(tool): tool is RentalTool & { productImage: string } => Boolean(tool.productImage)
	);
	const currentRentalTool = $derived(rotatingRentalTools[rentalToolIndex]);

	const presentationVideos = [
		// DJI_0371 and DJI_0382 are exported in reverse so both moves invite
		// the viewer into the site instead of backing away from the subject.
		{
			src: presentationEntranceVideo,
			poster: presentationEntrancePoster,
			number: '01A',
			label: 'Vstup do areálu · smerom k predajni'
		},
		{
			src: presentationAisleVideo,
			poster: presentationAislePoster,
			number: '01B',
			label: 'Skladová alej · medzi materiálom'
		},
		{
			src: presentationCoveredStoreVideo,
			poster: presentationCoveredStorePoster,
			number: '01C',
			label: 'Krytý sklad · sortiment na sklade'
		},
		{
			src: presentationPalletsVideo,
			poster: presentationPalletsPoster,
			number: '01D',
			label: 'Palety materiálu · pripravené na odber'
		},
		{
			src: presentationWarehouseTruckVideo,
			poster: presentationWarehouseTruckPoster,
			number: '01E',
			label: 'Vlastná doprava · vozidlo v sklade'
		},
		{
			src: presentationYardVideo,
			poster: presentationYardPoster,
			number: '01F',
			label: 'Sklad materiálu · priamo v areáli'
		}
	];
	const currentPresentationVideo = $derived(presentationVideos[presentationVideoIndex]);

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => {
			galleryIndex = (galleryIndex + 1) % galleryPhotos.length;
			// Warm the next slide so the crossfade never waits on the network.
			const upcoming = new Image();
			upcoming.src = galleryPhotos[(galleryIndex + 1) % galleryPhotos.length].src;
		}, 5000);
		return () => clearInterval(id);
	});

	$effect(() => {
		if (rotatingRentalTools.length <= 1 || rentalRotationPaused) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const id = setInterval(() => {
			rentalToolIndex = (rentalToolIndex + 1) % rotatingRentalTools.length;
			const nextTool = rotatingRentalTools[(rentalToolIndex + 1) % rotatingRentalTools.length];
			const upcoming = new Image();
			upcoming.src = nextTool.productImage;
		}, 1800);

		return () => clearInterval(id);
	});

	$effect(() => {
		const video = presentationVideoElement;
		if (!video) return;

		const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
		const syncPlayback = () => {
			if (motionPreference.matches) {
				video.pause();
				return;
			}
			void video.play().catch(() => undefined);
		};

		syncPlayback();
		motionPreference.addEventListener('change', syncPlayback);
		return () => motionPreference.removeEventListener('change', syncPlayback);
	});

	function playNextPresentationVideo() {
		selectPresentationVideo((presentationVideoIndex + 1) % presentationVideos.length);
	}

	function selectPresentationVideo(index: number, userInitiated = false) {
		presentationVideoIndex = index;
		requestAnimationFrame(() => {
			const video = presentationVideoElement;
			if (!video) return;
			if (!userInitiated && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			video.currentTime = 0;
			void video.play().catch(() => undefined);
		});
	}

	function togglePresentationVideo() {
		const video = presentationVideoElement;
		if (!video) return;
		if (video.paused) {
			void video.play().catch(() => undefined);
		} else {
			video.pause();
		}
	}

	// Bento rows of four — on desktop the hovered tile flex-expands within its
	// row; below 700px the rows flatten into one horizontal snap carousel.
	const bentoRows = [products.slice(0, 4), products.slice(4, 8), products.slice(8, 12)];

	// Uneven widths and row heights so the bento reads as a composition rather than
	// a table — no vertical seam runs straight through all three rows.
	const tileWeights = [1.5, 1, 0.85, 1.15, 0.95, 1.4, 1.2, 0.9, 1.25, 0.85, 1, 1.4];
	const bentoRowHeights = ['240px', '272px', '216px'];

	const heroHighlights = [
		'Doprava s hydraulickou rukou',
		'Miešanie farieb na počkanie',
		'Požičovňa náradia',
		'Bezplatná cenová ponuka'
	];

	// Cycling supplier logos per category tile, resolved from the partner list.
	const partnerByName = new Map(partners.map((p) => [p.name, p]));
	const supplierLogos: Record<string, { name: string; logo: string; light?: boolean }[]> =
		Object.fromEntries(
			products.map((p) => [
				p.href,
				p.suppliers
					.map((name: string) => partnerByName.get(name))
					.filter((s) => s !== undefined)
					.map((s) => ({ name: s.name, logo: s.logo, light: s.light }))
			])
		);

	const stats = [
		{ value: company.foundedYear, label: 'rok založenia' },
		{ value: products.length, label: 'kategórií materiálu' },
		{ value: partners.length, label: 'partnerských značiek' },
		{ value: services.length, label: 'služieb pre stavebníkov' }
	];

	const motto =
		'Spokojný zákazník je zárukou prosperity firmy. Prosperujúca firma je zárukou spokojnosti pracovníkov. Spokojný a aktívny pracovník je zárukou spokojnosti zákazníkov.';

	const presentationPhotos = [
		{
			jpg: presentationTruckJpg,
			alt: 'Modré nákladné vozidlo Stavebnín Orol s hydraulickou rukou a pracovníkom',
			label: 'Vlastná doprava',
			text: 'Materiál privezieme a hydraulickou rukou zložíme priamo na stavbe.'
		},
		{
			jpg: presentationHouseJpg,
			alt: 'Dokončený rodinný dom so škridlovou strechou a upravenou záhradou',
			label: 'Od materiálu po výsledok',
			text: 'Náš materiál je súčasťou domov a stavieb naprieč Liptovom.'
		}
	];
</script>

<svelte:head>
	<title>Stavebniny Orol – stavebný materiál a služby</title>
	<meta
		name="description"
		content="Stavebniny Orol – kompletný sortiment stavebného materiálu, poradenstvo, doprava a ďalšie služby pre Vašu stavbu."
	/>
</svelte:head>

<!-- 1. Hero — Mondrian composition -->
<section class="hero" aria-label="Stavebniny Orol">
	<div class="hero-mondrian">
		<div class="hero-copy cell">
			<span class="eyebrow">Stavebniny · Liptovský Mikuláš</span>
			<h1 class="hero-title">
				Všetko pre<br />vašu <span class="hero-accent">stavbu.</span>
			</h1>
			<p class="hero-lead">
				Kompletný sortiment stavebného materiálu, odborné poradenstvo a vlastná doprava s
				hydraulickou rukou priamo na vašu stavbu.
			</p>
			<div class="hero-actions">
				<a href={resolve('/quote')} class="btn btn--primary">Cenová ponuka</a>
				<a href={contact.phoneHref} rel="external" class="btn btn--ghost">{contact.phone}</a>
			</div>
			<ul class="hero-highlights">
				{#each heroHighlights as item (item)}
					<li>
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
						{item}
					</li>
				{/each}
			</ul>
		</div>
		<div class="hero-media cell">
			<video
				bind:this={presentationVideoElement}
				muted
				autoplay
				playsinline
				preload="metadata"
				src={currentPresentationVideo.src}
				poster={currentPresentationVideo.poster}
				class="hero-video"
				onended={playNextPresentationVideo}
				onplay={() => (presentationVideoPaused = false)}
				onpause={() => (presentationVideoPaused = true)}
				aria-label={currentPresentationVideo.label}
			></video>
			<div class="hero-video-controls">
				<button
					type="button"
					class="hero-video-toggle"
					onclick={togglePresentationVideo}
					aria-label={presentationVideoPaused ? 'Prehrať video' : 'Pozastaviť video'}
				>
					{#if presentationVideoPaused}
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
					{:else}
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M7 5h4v14H7zm6 0h4v14h-4z" />
						</svg>
					{/if}
				</button>
				<div class="hero-video-steps" aria-label="Vybrať záber">
					{#each presentationVideos as video, i (video.src)}
						<button
							type="button"
							class:active={i === presentationVideoIndex}
							onclick={() => selectPresentationVideo(i, true)}
							aria-label={`Prehrať: ${video.label}`}
							aria-current={i === presentationVideoIndex ? 'true' : undefined}
						>
							{i + 1}
						</button>
					{/each}
				</div>
			</div>
			{#key presentationVideoIndex}
				<span class="hero-photo-caption" in:fade={{ duration: 300, delay: 200 }}>
					{currentPresentationVideo.label}
				</span>
			{/key}
		</div>
		<div class="hero-acc hero-acc--yellow cell" aria-hidden="true"></div>
		<div class="hero-acc hero-acc--white cell" aria-hidden="true"></div>
		<div class="hero-acc hero-acc--red cell" aria-hidden="true"></div>
		<div class="hero-acc hero-acc--white2 cell" aria-hidden="true"></div>
		<div class="hero-acc hero-acc--blue cell" aria-hidden="true"></div>
	</div>
</section>

<!-- 2. Partner brands — scrolling strip straight after the hero composition -->
<div class="partner-strip" aria-label="Naši partneri">
	<div class="partner-track">
		{#each [...partners, ...partners] as partner, i (i)}
			<a
				href={partner.href}
				class:dup={i >= partners.length}
				target="_blank"
				rel="external noopener noreferrer"
				aria-label={partner.name}
				aria-hidden={i >= partners.length ? 'true' : undefined}
				tabindex={i >= partners.length ? -1 : 0}
			>
				<img src={partner.logo} alt={partner.name} class:logo-chip={partner.light} loading="lazy" />
			</a>
		{/each}
	</div>
</div>

<div class="mondrian-strip" aria-hidden="true">
	<span class="ms1"></span>
	<span class="ms2"></span>
	<span class="ms3"></span>
	<span class="ms4"></span>
	<span class="ms5"></span>
</div>

<!-- 3. Services -->
<section class="section" id="sluzby" aria-label="Služby">
	<div class="services-grid">
		<div class="services-row services-row--head">
			<header class="head-cell" data-reveal {@attach reveal()}>
				<span class="eyebrow">Služby</span>
				<h2 class="section-title">Viac než predajňa</h2>
			</header>
			<a href={resolve('/services')} class="head-link-cell">Všetky služby →</a>
			<div class="head-acc head-acc--yellow" aria-hidden="true"></div>
		</div>
		{#if featuredService}
			{@const FeaturedIcon = serviceIcons[featuredService.href]}
			<a
				href={resolve(featuredService.href)}
				class="featured-cell"
				aria-label="Požičovňa náradia – pozrieť ponuku profesionálneho náradia"
				onmouseenter={() => (rentalRotationPaused = true)}
				onmouseleave={() => (rentalRotationPaused = false)}
				onfocus={() => (rentalRotationPaused = true)}
				onblur={() => (rentalRotationPaused = false)}
				data-reveal
				{@attach reveal()}
			>
				<div class="featured-body">
					<span class="featured-icon" aria-hidden="true">
						<FeaturedIcon />
					</span>
					<span class="featured-title">{featuredService.short}</span>
					<p class="featured-desc">{featuredService.description}</p>
					<span class="featured-cta">Pozrieť ponuku náradia →</span>
				</div>

				{#if currentRentalTool}
					<div class="featured-tool-stage" aria-hidden="true">
						<img src={hiltiLogo} alt="" class="featured-hilti-logo" />
						{#key currentRentalTool.slug}
							<div class="featured-tool-frame" transition:fade={{ duration: 420 }}>
								<div class="featured-tool-visual">
									<img
										src={currentRentalTool.productImage}
										alt=""
										class="featured-tool-image"
										decoding="async"
									/>
								</div>
								<div class="featured-tool-meta">
									<strong>{currentRentalTool.model}</strong>
									<span>{currentRentalTool.category}</span>
								</div>
							</div>
						{/key}
						<div class="featured-tool-progress">
							<span class="featured-tool-count">
								{String(rentalToolIndex + 1).padStart(2, '0')} / {String(
									rotatingRentalTools.length
								).padStart(2, '0')}
							</span>
							<span class="featured-tool-dots">
								{#each rotatingRentalTools as tool, index (tool.slug)}
									<i class:active={index === rentalToolIndex}></i>
								{/each}
							</span>
						</div>
					</div>
				{/if}
			</a>
		{/if}
		<div class="services-row">
			{#each mainServices as service, i (service.href)}
				{@const ServiceIcon = serviceIcons[service.href]}
				<a
					href={resolve(service.href)}
					class="tile"
					data-reveal
					{@attach reveal(Math.min(i * 50, 300))}
				>
					{#if serviceBg[service.href]}
						<ResponsiveServiceImage
							media={serviceBg[service.href]}
							fit="cover"
							alt=""
							class="tile-bg"
						/>
					{/if}
					{#if ServiceIcon}
						<span class="tile-icon" aria-hidden="true"><ServiceIcon /></span>
						{#if !serviceBg[service.href]}
							<span class="tile-watermark" aria-hidden="true">
								<ServiceIcon />
							</span>
						{/if}
					{/if}
					<span class="tile-label">{service.short}</span>
					<span class="tile-desc">{service.description}</span>
					<svg class="tile-arrow" viewBox="0 0 24 24" aria-hidden="true">
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</a>
			{/each}
		</div>
		<div class="services-row">
			{#each secondaryServices as service, i (service.href)}
				{@const ServiceIcon = serviceIcons[service.href]}
				<a
					href={resolve(service.href)}
					class="tile"
					data-reveal
					{@attach reveal(Math.min(i * 50, 300))}
				>
					{#if serviceBg[service.href]}
						<ResponsiveServiceImage
							media={serviceBg[service.href]}
							fit="cover"
							alt=""
							class="tile-bg"
						/>
					{/if}
					{#if ServiceIcon}
						<span class="tile-icon" aria-hidden="true"><ServiceIcon /></span>
						{#if !serviceBg[service.href]}
							<span class="tile-watermark" aria-hidden="true">
								<ServiceIcon />
							</span>
						{/if}
					{/if}
					<span class="tile-label">{service.short}</span>
					<span class="tile-desc">{service.description}</span>
					<svg class="tile-arrow" viewBox="0 0 24 24" aria-hidden="true">
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
					</svg>
				</a>
			{/each}
			<div class="service-accent service-accent--yellow" aria-hidden="true"></div>
			<div class="service-accent service-accent--blue" aria-hidden="true"></div>
		</div>
	</div>
</section>

<div class="sep" aria-hidden="true"></div>

<!-- 3. Category bento -->
<section class="section" id="sortiment" aria-label="Sortiment">
	<div class="bento">
		<div class="bento-row bento-row--head">
			<header class="head-cell" data-reveal {@attach reveal()}>
				<span class="eyebrow">Sortiment</span>
				<h2 class="section-title">Materiál na celú stavbu</h2>
				<p class="head-note">Od základov po strechu – 12 kategórií pod jednou strechou.</p>
			</header>
			<a href={resolve('/products')} class="head-link-cell">Všetky produkty →</a>
			<div class="head-acc head-acc--yellow" aria-hidden="true"></div>
		</div>
		{#each bentoRows as row, r (r)}
			<div class="bento-row" style:--row-h={bentoRowHeights[r]}>
				{#each row as product, c (product.href)}
					{@const i = r * 4 + c}
					{@const CategoryIcon = categoryIcons[product.href]}
					<a
						href={resolve(product.href)}
						class="tile"
						style:--tile-w={tileWeights[i]}
						data-reveal
						{@attach reveal(Math.min(i * 45, 360))}
					>
						<img src={productBg[product.href]} alt="" class="tile-bg" loading="lazy" />
						{#if CategoryIcon}
							<span class="tile-icon" aria-hidden="true"><CategoryIcon /></span>
						{/if}
						<span class="tile-label">{product.title}</span>
						<span class="tile-desc">{product.description}</span>
						{#if supplierLogos[product.href].length > 0}
							{@const logos = supplierLogos[product.href]}
							<span class="tile-logo-slot" aria-hidden="true">
								<span class="tile-logo-track">
									{#each logos as s (s.name)}
										<img
											src={s.logo}
											alt=""
											class="tile-logo-item"
											class:logo-chip={s.light}
											loading="lazy"
										/>
									{/each}
								</span>
							</span>
							<span class="tile-logos-all" aria-hidden="true">
								{#each logos as s (s.name)}
									<img
										src={s.logo}
										alt=""
										class="tile-logo-mini"
										class:logo-chip={s.light}
										loading="lazy"
									/>
								{/each}
							</span>
							<span class="visually-hidden">Značky: {product.suppliers.join(', ')}</span>
						{/if}
						<svg class="tile-arrow" viewBox="0 0 24 24" aria-hidden="true">
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					</a>
				{/each}
			</div>
		{/each}
	</div>
</section>

<div class="sep" aria-hidden="true"></div>

<!-- 4. Curated presentation -->
<section
	class="section presentation-section"
	id="prezentacia"
	aria-label="Stavebniny Orol v obraze"
>
	<div class="presentation-grid">
		<header class="presentation-copy" data-reveal {@attach reveal()}>
			<span class="eyebrow">Priamo z Orolu</span>
			<h2 class="section-title">Predajňa, doprava, výsledok.</h2>
			<p>
				Pohľady na to, čo robíme každý deň: držíme materiál skladom, vozíme ho vlastnými autami a
				pomáhame, aby sa z neho stala hotová stavba.
			</p>
			<a href={resolve('/gallery')} class="section-link">Pozrieť celú galériu →</a>
		</header>

		<figure class="presentation-rotator" data-reveal {@attach reveal(80)}>
			{#key galleryIndex}
				<img
					src={galleryPhotos[galleryIndex].src}
					alt={galleryPhotos[galleryIndex].alt}
					transition:fade={{ duration: 600 }}
					decoding="async"
				/>
			{/key}
			<figcaption>
				<span>01</span>
				{#key galleryIndex}
					<em in:fade={{ duration: 300, delay: 300 }}>{galleryPhotos[galleryIndex].title}</em>
				{/key}
			</figcaption>
		</figure>

		{#each presentationPhotos as photo, i (photo.jpg)}
			<figure class="presentation-photo" data-reveal {@attach reveal(140 + i * 60)}>
				<img src={photo.jpg} alt={photo.alt} loading="eager" decoding="async" />
				<figcaption>
					<span>0{i + 2}</span>
					<strong>{photo.label}</strong>
					<small>{photo.text}</small>
				</figcaption>
			</figure>
		{/each}

		<div class="presentation-accent presentation-accent--yellow" aria-hidden="true"></div>
		<div class="presentation-accent presentation-accent--blue" aria-hidden="true"></div>
	</div>
</section>

<div class="sep" aria-hidden="true"></div>

<!-- 5. Stats band -->
<section class="stats" aria-label="Stavebniny Orol v číslach">
	<div class="stats-grid">
		{#each stats as stat, i (stat.label)}
			<div class="stat stat--{i}" data-reveal {@attach reveal(i * 80)}>
				<span class="stat-value">{stat.value}</span>
				<span class="stat-label">{stat.label}</span>
			</div>
		{/each}
		<div class="stat-acc stat-acc--yellow" aria-hidden="true"></div>
		<div class="stat-acc stat-acc--red" aria-hidden="true"></div>
		<div class="stat-acc stat-acc--blue" aria-hidden="true"></div>
	</div>
</section>

<div class="sep" aria-hidden="true"></div>

<!-- 6. O nás -->
<section class="about-section" id="o-nas" aria-label="O nás">
	<div class="about-canvas">
		<div class="about-copy" data-reveal {@attach reveal()}>
			<span class="eyebrow">O nás</span>
			<h2 class="section-title">Na trhu od roku {company.foundedYear}</h2>
			<p class="about-text">
				Stavebniny OROL predávajú stavebný materiál a poskytujú doplnkové služby pre stavebníkov od
				roku {company.foundedYear}. Za ten čas sme si získali stálych zákazníkov po celom
				Mikulášskom a Ružomberskom okrese – naše materiály nájdete na rodinných domoch aj
				priemyselných stavbách.
			</p>
			<a href={resolve('/about')} class="section-link">Celý príbeh →</a>
		</div>

		<blockquote class="about-motto" data-reveal {@attach reveal(80)}>{motto}</blockquote>

		<div class="about-photo" data-reveal {@attach reveal(120)}>
			<img
				src={ownerPhoto}
				alt="Ing. Koloman Žalúdek, majiteľ spoločnosti Stavebniny Orol"
				loading="lazy"
			/>
			<span class="hero-photo-caption">Ing. Koloman Žalúdek · Majiteľ</span>
		</div>

		<div class="about-acc about-acc--yellow" aria-hidden="true"></div>
		<div class="about-acc about-acc--blue" aria-hidden="true"></div>

		<!-- Vertical bars framing the portrait on both sides. -->
		<div class="about-bar about-bar--a" aria-hidden="true"></div>
		<div class="about-bar about-bar--b" aria-hidden="true"></div>
		<div class="about-bar about-bar--c" aria-hidden="true"></div>
		<div class="about-bar about-bar--d" aria-hidden="true"></div>
		<div class="about-bar about-bar--e" aria-hidden="true"></div>
		<div class="about-bar about-bar--f" aria-hidden="true"></div>
	</div>
</section>

<style>
	.container {
		max-width: var(--container-default);
		margin: 0 auto;
		padding-inline: var(--container-px);
	}

	/* ===== Shared vocabulary ===== */
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--color-brand-primary);
	}

	.eyebrow::before {
		content: '';
		width: 24px;
		height: 3px;
		background-color: var(--color-brand-primary);
	}

	/* Every content block shares one ground and one vertical rhythm; the iron strip
	   between them marks where each section ends. */
	.section,
	.stats,
	.about-section {
		padding: var(--space-section-y) 0;
		background-color: var(--color-white);
	}

	/* Matches the footer's own iron top edge, so every break on the page — including
	   the one into the footer — is the same weight. */
	.sep {
		height: 6px;
		background-color: var(--color-iron);
	}

	/* Section headers live inside the compositions as their own cells. */
	.head-cell {
		flex: 4 1 0;
		min-width: 0;
		background-color: var(--color-white);
		padding: 1.75rem clamp(1.25rem, 3vw, 2.5rem) 1.9rem;
	}

	.head-note {
		margin: 0.6rem 0 0;
		font-size: var(--font-size-small);
		color: var(--text-muted);
		max-width: 44ch;
		line-height: 1.55;
	}

	.head-link-cell {
		flex: 1 1 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background-color: var(--color-brand-primary);
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		text-align: center;
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.head-link-cell:hover {
		background-color: var(--color-brand-hover);
	}

	.head-acc {
		flex: 0 0 110px;
	}

	.head-acc--yellow {
		background-color: var(--color-accent-yellow);
	}

	.section-title {
		margin: 0.35rem 0 0;
		font-family: var(--font-display);
		font-size: var(--font-size-display-lg);
		font-weight: 700;
		line-height: 1.02;
		text-transform: uppercase;
		letter-spacing: 0.015em;
		color: var(--color-iron);
	}

	.section-link {
		flex-shrink: 0;
		font-weight: 600;
		font-size: var(--font-size-small);
		color: var(--color-brand-primary);
		text-decoration: none;
	}

	.section-link:hover {
		color: var(--color-brand-hover);
		text-decoration: underline;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.85rem 1.75rem;
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		text-decoration: none;
		border-radius: var(--radius-sm);
		transition:
			background-color var(--transition-fast),
			border-color var(--transition-fast),
			color var(--transition-fast),
			transform var(--transition-fast);
	}

	.btn:hover {
		transform: translateY(-2px);
	}

	.btn--primary {
		background-color: var(--color-brand-primary);
		color: var(--color-white);
	}

	.btn--primary:hover {
		background-color: var(--color-brand-hover);
	}

	.btn--ghost {
		border: 2px solid var(--color-iron);
		color: var(--color-iron);
	}

	.btn--ghost:hover {
		border-color: var(--color-brand-primary);
		color: var(--color-brand-primary);
	}

	/* ===== Section anchors ===== */
	section[id] {
		/* Mondrian header: 72px cells + 5px grid line + 7px breathing room */
		scroll-margin-top: 84px;
	}

	/* ===== Scroll reveal ===== */
	/* Hidden only while the reveal script is armed (see app.html) — a
	   blocked bundle can never leave content permanently invisible. */
	:global(html[data-reveal-ready]) [data-reveal] {
		opacity: 0;
		transform: translateY(18px);
		transition:
			opacity var(--transition-reveal),
			transform var(--transition-reveal);
		transition-delay: var(--reveal-delay, 0ms);
	}

	:global(html[data-reveal-ready]) [data-reveal]:global(.is-revealed) {
		opacity: 1;
		transform: none;
	}

	/* ===== 1. Hero — Mondrian composition ===== */
	.hero-mondrian {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-areas:
			'copy copy copy copy copy photo photo photo photo photo photo photo'
			'copy copy copy copy copy photo photo photo photo photo photo photo'
			'yell yell white white red red red red red white2 white2 blue';
		gap: 5px;
		padding-bottom: 5px;
		background-color: var(--color-iron);
	}

	.hero-mondrian .cell {
		background-color: var(--color-white);
	}

	.hero-copy {
		grid-area: copy;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.25rem;
		padding: clamp(2.5rem, 5vw, 4.5rem) clamp(1.5rem, 5vw, 5rem);
	}

	.hero-media {
		grid-area: photo;
		position: relative;
		overflow: hidden;
		min-height: 320px;
	}

	.hero-video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background-color: var(--color-onyx);
	}

	.hero-video-controls {
		position: absolute;
		top: 0.9rem;
		right: 0.9rem;
		z-index: 2;
		display: flex;
		gap: 3px;
		padding: 3px;
		background-color: rgba(17, 19, 21, 0.78);
		backdrop-filter: blur(8px);
	}

	.hero-video-toggle,
	.hero-video-steps button {
		display: grid;
		width: 34px;
		height: 34px;
		place-items: center;
		border: 0;
		background: transparent;
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 0.72rem;
		font-weight: 700;
		cursor: pointer;
	}

	.hero-video-toggle {
		background-color: var(--color-white);
		color: var(--color-iron);
	}

	.hero-video-toggle svg {
		width: 15px;
		height: 15px;
		fill: currentColor;
	}

	.hero-video-steps {
		display: flex;
		gap: 2px;
	}

	.hero-video-steps button.active {
		background-color: var(--color-accent-yellow);
		color: var(--color-iron);
	}

	.hero-video-toggle:focus-visible,
	.hero-video-steps button:focus-visible {
		outline: 2px solid var(--color-white);
		outline-offset: 2px;
	}

	/* Six numbered buttons plus the play toggle eat a lot of a phone's width,
	   so the whole strip shrinks rather than the digits alone. */
	@media (max-width: 700px) {
		.hero-video-toggle,
		.hero-video-steps button {
			width: 26px;
			height: 26px;
			font-size: 0.62rem;
		}

		.hero-video-toggle svg {
			width: 12px;
			height: 12px;
		}

		.hero-video-controls {
			gap: 2px;
			padding: 2px;
		}
	}

	.hero-acc {
		min-height: 44px;
	}

	.hero-acc--yellow {
		grid-area: yell;
	}

	.hero-mondrian .hero-acc--yellow {
		background-color: var(--color-accent-yellow);
	}

	.hero-acc--white {
		grid-area: white;
	}

	.hero-acc--red {
		grid-area: red;
	}

	.hero-mondrian .hero-acc--red {
		background-color: var(--color-brand-primary);
	}

	.hero-acc--white2 {
		grid-area: white2;
	}

	.hero-acc--blue {
		grid-area: blue;
	}

	.hero-mondrian .hero-acc--blue {
		background-color: var(--color-accent-blue);
	}

	.hero-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-display-xl);
		font-weight: 700;
		line-height: 0.95;
		text-transform: uppercase;
		letter-spacing: 0.01em;
		color: var(--color-iron);
	}

	.hero-accent {
		color: var(--color-brand-primary);
	}

	.hero-lead {
		margin: 0;
		max-width: 46ch;
		font-size: 1.05rem;
		line-height: 1.65;
		color: var(--text-muted);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		margin-top: 0.25rem;
	}

	.hero-highlights {
		list-style: none;
		margin: 1rem 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, auto);
		gap: 0.55rem 2rem;
	}

	.hero-highlights li {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		font-size: var(--font-size-small);
		font-weight: 500;
		color: var(--color-steel);
	}

	.hero-highlights svg {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		fill: none;
		stroke: var(--color-brand-primary);
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.hero-media {
		min-width: 0;
	}

	.hero-photo-caption {
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
		background-color: var(--color-iron);
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 0.95rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.5rem 1rem;
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-copy > *,
		.hero-media {
			animation: hero-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) backwards;
		}

		.hero-copy > :nth-child(2) {
			animation-delay: 0.06s;
		}
		.hero-copy > :nth-child(3) {
			animation-delay: 0.12s;
		}
		.hero-copy > :nth-child(4) {
			animation-delay: 0.18s;
		}
		.hero-copy > :nth-child(5) {
			animation-delay: 0.24s;
		}
		.hero-media {
			animation-delay: 0.2s;
		}
	}

	@keyframes hero-in {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
	}

	/* ===== 2. Partner brands — scrolling strip ===== */
	.partner-strip {
		overflow: hidden;
		padding: 1.6rem 0;
		background-color: var(--color-white);
	}

	.partner-track {
		display: flex;
		align-items: center;
		width: max-content;
		animation: partner-scroll 140s linear infinite;
	}

	/* Travels leftwards, so brands enter on the right and read left to right. */
	@keyframes partner-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.partner-strip:hover .partner-track {
		animation-play-state: paused;
	}

	.partner-track a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 190px;
		height: 72px;
		margin-right: 2.75rem;
		flex-shrink: 0;
		filter: grayscale(100%);
		opacity: 0.6;
		transition:
			filter var(--transition-fast),
			opacity var(--transition-fast);
	}

	.partner-track a:hover,
	.partner-track a:focus-visible {
		filter: grayscale(0);
		opacity: 1;
	}

	.partner-track img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		display: block;
	}

	/* Mondrian bar closing the partner strip. Its proportions (4-1-2-3-2) differ
	   from both footer rows so no two bars on the site repeat. */
	.mondrian-strip {
		display: flex;
		gap: 5px;
		padding: 5px;
		height: 68px;
		background-color: var(--color-iron);
	}

	.mondrian-strip span {
		display: block;
		min-width: 0;
	}

	.ms1 {
		flex: 4;
		background-color: var(--color-brand-primary);
	}

	.ms2 {
		flex: 1;
		background-color: var(--color-accent-yellow);
	}

	.ms3 {
		flex: 2;
		background-color: var(--color-white);
	}

	.ms4 {
		flex: 3;
		background-color: var(--color-accent-blue);
	}

	.ms5 {
		flex: 2;
		background-color: var(--color-white);
	}

	/* ===== 3. Category bento — Mondrian composition ===== */
	.bento {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	.bento-row {
		display: flex;
		gap: 5px;
	}

	.tile {
		position: relative;
		flex: var(--tile-w, 1) 1 0;
		min-width: 0;
		height: var(--row-h, 240px);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		/* Top padding reserves the icon zone so expanded content never overlaps it. */
		padding: 3.6rem 1.2rem 1.1rem;
		background-color: var(--color-white);
		text-decoration: none;
		overflow: hidden;
		transition:
			flex-grow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			height 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			background-color var(--transition-fast),
			opacity var(--transition-reveal) var(--reveal-delay, 0ms),
			transform var(--transition-reveal) var(--reveal-delay, 0ms);
	}

	.tile:hover {
		flex-grow: 3.2;
		background-color: var(--color-chalk);
	}

	/* The row with the hovered tile grows taller, so the selected tile
	   expands on both axes while the composition stays gap-sealed. */
	@media (hover: hover) {
		.bento-row:has(.tile:hover) .tile,
		.services-row:has(.tile:hover) .tile {
			height: calc(var(--row-h, 240px) + 72px);
		}
	}

	/* Monochrome photo backdrop for tiles that carry one */
	.tile :global(.tile-bg) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%) contrast(1.05);
		opacity: 0.16;
		transition:
			opacity var(--transition-medium),
			filter var(--transition-medium),
			transform var(--transition-medium);
	}

	/* The selected tile's photo regains full color. */
	.tile:hover :global(.tile-bg) {
		opacity: 0.45;
		filter: grayscale(0%) contrast(1.02);
		transform: scale(1.03);
	}

	/* White scrim under the text zone keeps copy readable over the colored photo. */
	.tile::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;
		background: linear-gradient(
			to top,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(255, 255, 255, 0.8) 42%,
			rgba(255, 255, 255, 0) 80%
		);
		opacity: 0;
		transition: opacity var(--transition-medium);
		pointer-events: none;
	}

	.tile:hover::after {
		opacity: 1;
	}

	.tile-desc {
		position: relative;
		z-index: 1;
		margin-top: 0.35rem;
		padding-right: 2rem;
		font-size: 0.8rem;
		line-height: 1.5;
		color: var(--text-muted);
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		transition:
			max-height 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.3s ease 0.12s;
	}

	.tile:hover .tile-desc {
		max-height: 3.2em;
		opacity: 1;
	}

	.tile-label {
		position: relative;
		z-index: 1;
		font-family: var(--font-display);
		font-size: 1.3rem;
		font-weight: 600;
		line-height: 1.05;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-iron);
		padding-right: 2rem;
	}

	.tile-logo-slot {
		position: relative;
		z-index: 1;
		margin-top: 0.5rem;
		height: 22px;
		width: calc(100% - 2.25rem);
		overflow: hidden;
		/* Only the left edge fades — the right end is where the strip is anchored. */
		mask-image: linear-gradient(to right, transparent, #000 18%);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 18%);
	}

	/* Static and right-aligned: `row-reverse` packs the first brand hard against
	   the arrow, the second to its left, and so on. Brands that no longer fit are
	   clipped off the left edge — each one still appears exactly once. */
	.tile-logo-track {
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
		align-items: center;
		gap: 1.2rem;
		width: 100%;
		height: 100%;
	}

	.tile-logo-item {
		height: 18px;
		max-width: 84px;
		object-fit: contain;
		filter: grayscale(100%) contrast(1.15);
		opacity: 0.7;
	}

	/* On hover the expanded tile swaps the cycling logo for the full brand row. */
	.tile:hover .tile-logo-slot {
		display: none;
	}

	.tile-logos-all {
		position: relative;
		z-index: 1;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem 0.9rem;
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		transition:
			max-height 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.3s ease 0.12s;
	}

	.tile:hover .tile-logos-all {
		margin-top: 0.6rem;
		max-height: 6em;
		opacity: 1;
	}

	.tile-logo-mini {
		height: 22px;
		max-width: 96px;
		object-fit: contain;
	}

	.tile-arrow {
		position: absolute;
		right: 1rem;
		bottom: 1.1rem;
		z-index: 1;
		width: 20px;
		height: 20px;
		fill: none;
		stroke: var(--color-brand-primary);
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform var(--transition-fast);
	}

	.tile-icon {
		position: absolute;
		top: 1rem;
		left: 1.15rem;
		z-index: 1;
		display: block;
		width: 34px;
		height: 34px;
	}

	.tile-icon :global(svg) {
		width: 100%;
		height: 100%;
		stroke: var(--color-brand-primary);
		stroke-width: 1.7;
	}

	.tile:hover .tile-arrow {
		transform: translateX(4px);
	}

	.tile-watermark {
		position: absolute;
		right: -16px;
		bottom: -18px;
		display: block;
		width: 120px;
		height: 120px;
		opacity: 0.9;
		pointer-events: none;
	}

	.tile-watermark :global(svg) {
		width: 100%;
		height: 100%;
		stroke: var(--color-mist);
		stroke-width: 0.6;
		transition: stroke var(--transition-fast);
	}

	.tile:hover .tile-watermark :global(svg) {
		stroke: color-mix(in srgb, var(--color-brand-primary) 30%, var(--color-white));
	}

	/* Mobile: plain vertical list — icon, name, cycling brand logo, arrow. */
	@media (max-width: 700px) {
		.bento {
			flex-direction: column;
			gap: 4px;
			padding: 4px;
		}

		.bento-row {
			display: contents;
		}

		.tile {
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			gap: 0.8rem;
			height: auto;
			min-height: 58px;
			padding: 0.75rem 0.9rem;
		}

		.tile:hover {
			flex-grow: 1;
		}

		.tile-icon {
			position: static;
			width: 28px;
			height: 28px;
			flex-shrink: 0;
		}

		.tile-watermark,
		.tile-desc,
		.tile-logos-all,
		.tile :global(.tile-bg) {
			display: none;
		}

		/* The name takes only what it needs so the brand strip gets the rest. */
		.tile-label {
			flex: 0 1 auto;
			padding-right: 0;
			font-size: 1rem;
		}

		.tile:hover .tile-logo-slot {
			display: block;
		}

		/* Wide enough for several brands at once rather than one at a time. */
		.tile-logo-slot {
			margin: 0;
			height: 18px;
			width: auto;
			flex: 1 1 0;
			min-width: 0;
		}

		.tile-logo-track {
			gap: 0.9rem;
		}

		.tile-logo-item {
			height: 16px;
			max-width: 62px;
		}

		.tile-arrow {
			position: static;
			width: 18px;
			height: 18px;
			flex-shrink: 0;
		}
	}

	@media (max-width: 360px) {
		.tile-logo-slot {
			display: none;
		}
	}

	/* ===== 4. Services — Mondrian composition with hover-expanding rows ===== */
	.services-grid {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	.services-row {
		display: flex;
		gap: 5px;
	}

	.service-accent {
		flex: 1 1 0;
	}

	.service-accent--yellow {
		background-color: var(--color-accent-yellow);
	}

	.service-accent--blue {
		background-color: var(--color-accent-blue);
	}

	@media (max-width: 700px) {
		.services-grid {
			gap: 4px;
			padding: 4px;
		}

		.services-row {
			display: contents;
		}

		/* Keep every service visually identifiable without turning the compact
		   mobile list back into a stack of oversized image cards. */
		.services-grid .tile {
			min-height: 76px;
			padding-right: 38%;
		}

		.services-grid .tile :global(.tile-bg) {
			display: block;
			left: auto;
			width: 42%;
			opacity: 0.32;
			filter: grayscale(100%) contrast(1.08);
			mask-image: linear-gradient(to left, #000 62%, transparent 100%);
			-webkit-mask-image: linear-gradient(to left, #000 62%, transparent 100%);
		}

		.services-grid .tile:hover :global(.tile-bg) {
			opacity: 0.44;
			filter: grayscale(0%) contrast(1.04);
		}

		.service-accent {
			flex: none;
			min-height: 24px;
		}
	}

	/* Featured service: a live Hilti equipment stage inside the red bento cell. */
	.featured-cell {
		position: relative;
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(22rem, 0.95fr);
		gap: 5px;
		min-height: 300px;
		background-color: var(--color-iron);
		text-decoration: none;
		transition:
			opacity var(--transition-reveal) var(--reveal-delay, 0ms),
			transform var(--transition-reveal) var(--reveal-delay, 0ms);
	}

	.featured-cell:hover .featured-body,
	.featured-cell:focus-visible .featured-body {
		background-color: var(--color-brand-hover);
	}

	.featured-cell:focus-visible {
		outline: 3px solid var(--color-accent-yellow);
		outline-offset: -3px;
	}

	.featured-body {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.6rem;
		padding: 1.9rem;
		background-color: var(--color-brand-primary);
		transition: background-color var(--transition-fast);
	}

	.featured-icon {
		display: block;
		width: 40px;
		height: 40px;
	}

	.featured-icon :global(svg) {
		width: 100%;
		height: 100%;
		stroke: var(--color-white);
		stroke-width: 1.8;
	}

	.featured-title {
		font-family: var(--font-display);
		font-size: 1.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		line-height: 1.1;
		color: var(--color-white);
	}

	.featured-desc {
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.88);
	}

	.featured-cta {
		margin-top: 0.25rem;
		font-size: var(--font-size-small);
		font-weight: 700;
		color: var(--color-white);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.featured-tool-stage {
		position: relative;
		min-width: 0;
		min-height: 300px;
		overflow: hidden;
		background-color: var(--color-white);
		background-image:
			linear-gradient(rgba(30, 32, 34, 0.045) 1px, transparent 1px),
			linear-gradient(90deg, rgba(30, 32, 34, 0.045) 1px, transparent 1px);
		background-size: 24px 24px;
	}

	.featured-hilti-logo {
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 3;
		display: block;
		width: 88px;
		height: auto;
	}

	.featured-tool-frame {
		position: absolute;
		inset: 0;
	}

	/* Near-full-bleed: the photo is `contain`, so its own empty margins keep the
	   logo and the meta row clear even at this inset. */
	.featured-tool-visual {
		position: absolute;
		inset: 0.6rem 0.2rem 2.2rem;
		display: block;
		min-width: 0;
		min-height: 0;
	}

	.featured-tool-image {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: transform var(--transition-medium);
	}

	.featured-cell:hover .featured-tool-image,
	.featured-cell:focus-visible .featured-tool-image {
		transform: translateY(-3px);
	}

	.featured-tool-meta {
		position: absolute;
		left: 1rem;
		bottom: 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 0.05rem;
		max-width: calc(100% - 9rem);
		color: var(--color-iron);
	}

	.featured-tool-meta strong {
		font-family: var(--font-display);
		font-size: 1.05rem;
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.featured-tool-meta span {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-slate);
	}

	.featured-tool-progress {
		position: absolute;
		right: 1rem;
		bottom: 0.9rem;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.35rem;
	}

	.featured-tool-count {
		font-family: var(--font-display);
		font-size: 0.7rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		letter-spacing: 0.1em;
		color: var(--color-brand-primary);
	}

	.featured-tool-dots {
		display: flex;
		gap: 3px;
	}

	.featured-tool-dots i {
		display: block;
		width: 11px;
		height: 3px;
		background-color: var(--color-concrete);
	}

	.featured-tool-dots i.active {
		background-color: var(--color-brand-primary);
	}

	.featured-tool-stage::after {
		content: 'NÁRADIE NA PRENÁJOM';
		position: absolute;
		top: 1.1rem;
		right: 1rem;
		z-index: 3;
		font-family: var(--font-display);
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-slate);
	}

	/* ===== Curated presentation — one real moving moment, two full-frame proofs ===== */
	.presentation-grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-template-areas:
			'copy copy copy copy video video video video video video video video'
			'photoa photoa photoa photoa photoa photob photob photob photob photob yellow blue';
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	.presentation-copy {
		grid-area: copy;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 1rem;
		padding: clamp(2rem, 4vw, 3.75rem);
		background-color: var(--color-white);
	}

	.presentation-copy p {
		margin: 0;
		max-width: 48ch;
		line-height: 1.7;
		color: var(--text-muted);
	}

	.presentation-rotator,
	.presentation-photo {
		position: relative;
		min-width: 0;
		margin: 0;
		overflow: hidden;
		background-color: var(--color-onyx);
	}

	.presentation-rotator {
		grid-area: video;
		min-height: 430px;
	}

	.presentation-photo:nth-of-type(2) {
		grid-area: photoa;
	}

	.presentation-photo:nth-of-type(3) {
		grid-area: photob;
	}

	.presentation-rotator img,
	.presentation-photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		background-color: var(--color-onyx);
	}

	/* Rotator photos crossfade in place (Svelte fade handles the opacity). */
	.presentation-rotator img {
		position: absolute;
		inset: 0;
	}

	.presentation-rotator figcaption em {
		font-style: normal;
	}

	.presentation-photo {
		min-height: 320px;
	}

	.presentation-rotator::after,
	.presentation-photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(15, 17, 19, 0.82), transparent 38%);
		pointer-events: none;
	}

	.presentation-rotator figcaption,
	.presentation-photo figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.15rem 0.75rem;
		align-items: baseline;
		padding: 1rem 1.15rem;
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.presentation-rotator figcaption span,
	.presentation-photo figcaption span {
		grid-row: 1 / span 2;
		color: var(--color-accent-yellow);
		font-size: 0.8rem;
		letter-spacing: 0.12em;
	}

	.presentation-photo figcaption small {
		font-family: var(--font-body);
		font-size: 0.72rem;
		font-weight: 400;
		line-height: 1.45;
		letter-spacing: 0;
		text-transform: none;
		color: rgba(255, 255, 255, 0.82);
	}

	.presentation-accent--yellow {
		grid-area: yellow;
		background-color: var(--color-accent-yellow);
	}

	.presentation-accent--blue {
		grid-area: blue;
		background-color: var(--color-accent-blue);
	}

	@media (max-width: 900px) {
		.presentation-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-areas:
				'copy copy'
				'video video'
				'photoa photob'
				'yellow blue';
			gap: 4px;
			padding: 4px;
		}

		.presentation-rotator {
			min-height: 0;
			aspect-ratio: 16 / 9;
		}

		.presentation-photo {
			min-height: 0;
			aspect-ratio: 4 / 3;
		}

		.presentation-accent {
			min-height: 24px;
		}
	}

	@media (max-width: 640px) {
		.presentation-grid {
			grid-template-columns: 1fr;
			grid-template-areas: 'copy' 'video' 'photoa' 'photob' 'yellow' 'blue';
		}

		.presentation-copy {
			padding: 1.75rem 1.25rem;
		}

		.presentation-photo {
			aspect-ratio: auto;
		}

		.presentation-photo img {
			height: auto;
		}
	}

	@media (max-width: 700px) {
		.featured-cell {
			grid-template-columns: 1fr;
			gap: 4px;
		}

		.featured-body {
			padding: 1.4rem;
		}

		.featured-tool-stage {
			min-height: 260px;
		}

		.featured-tool-visual {
			inset: 2.65rem 0.75rem 3.75rem;
		}
	}

	/* ===== 5. Stats — Mondrian composition =====
	   Two rows of unequal blocks rather than one even strip: the founding year
	   anchors the composition as a red block, the rest fall around it. */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: minmax(200px, auto);
		/* One edge-to-edge row; the four figures sit in blocks of unequal width,
		   with the colour accents wedged between them. */
		grid-template-areas: 'year year year yell cat cat red part part blue serv serv';
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	.stat {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.4rem;
		background-color: var(--color-white);
		padding: 1.6rem 1.75rem;
	}

	.stat--0 {
		grid-area: year;
		background-color: var(--color-brand-primary);
	}

	.stat--1 {
		grid-area: cat;
	}

	.stat--2 {
		grid-area: part;
	}

	.stat--3 {
		grid-area: serv;
	}

	.stat-value {
		font-family: var(--font-display);
		font-size: clamp(3rem, 5.5vw, 4.6rem);
		font-weight: 700;
		line-height: 0.95;
		color: var(--color-brand-primary);
		font-variant-numeric: tabular-nums;
	}

	.stat--0 .stat-value {
		font-size: clamp(3.6rem, 7vw, 5.8rem);
		color: var(--color-white);
	}

	.stat-label {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		line-height: 1.2;
		color: var(--text-muted);
	}

	.stat--0 .stat-label {
		color: rgba(255, 255, 255, 0.88);
	}

	.stat-acc--yellow {
		grid-area: yell;
		background-color: var(--color-accent-yellow);
	}

	.stat-acc--red {
		grid-area: red;
		background-color: var(--color-brand-primary);
	}

	.stat-acc--blue {
		grid-area: blue;
		background-color: var(--color-accent-blue);
	}

	@media (max-width: 1000px) and (min-width: 701px) {
		.stats-grid {
			grid-template-columns: repeat(6, 1fr);
			grid-template-rows: minmax(190px, auto) minmax(150px, auto);
			grid-template-areas:
				'year year year year cat  cat'
				'part part serv serv yell blue';
		}
	}

	@media (max-width: 700px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: auto auto auto 40px;
			grid-template-areas:
				'year year'
				'cat  part'
				'serv yell'
				'red  blue';
			gap: 4px;
			padding: 4px;
		}

		.stat {
			padding: 1.25rem 1.2rem;
		}
	}

	/* ===== 7. O nás — Mondrian composition ===== */
	.about-canvas {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: auto auto 56px;
		/* Every named area stays rectangular. Vertical bars flank the portrait on
		   both sides, so no iron ground is left showing beside the photo. */
		grid-template-areas:
			'copy  copy  copy  copy  copy  copy  bara photo photo photo barc bard'
			'motto motto motto motto motto motto bara photo photo photo bare bard'
			'yacc  yacc  yacc  bacc  bacc  bacc  barb photo photo photo bare barf';
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	.about-copy {
		grid-area: copy;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 1.1rem;
		padding: clamp(1.75rem, 3.5vw, 3.25rem);
		background-color: var(--color-white);
	}

	.about-text {
		margin: 0;
		max-width: 56ch;
		line-height: 1.7;
		color: var(--text-muted);
	}

	/* The company motto — one statement, its own red cell. */
	.about-motto {
		grid-area: motto;
		margin: 0;
		padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.75rem, 3.5vw, 3.25rem);
		background-color: var(--color-brand-primary);
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: clamp(1.1rem, 1.7vw, 1.45rem);
		font-weight: 500;
		line-height: 1.45;
	}

	/* The portrait is never cropped, so whatever the 200×269 source does not fill
	   is painted as Mondrian bands rather than left as dead ground. */
	.about-photo {
		grid-area: photo;
		position: relative;
		overflow: hidden;
		min-width: 0;
		min-height: 460px;
		/* White, not iron: the portrait is `contain`, so whatever it does not fill
		   should read as part of the white cell rather than as a black band. */
		background-color: var(--color-white);
	}

	/* Vertical Mondrian bars flanking the portrait — two columns left, two right. */
	.about-bar {
		min-width: 0;
	}

	.about-bar--a {
		grid-area: bara;
		background-color: var(--color-accent-yellow);
	}

	.about-bar--b {
		grid-area: barb;
		background-color: var(--color-white);
	}

	.about-bar--c {
		grid-area: barc;
		background-color: var(--color-accent-blue);
	}

	.about-bar--d {
		grid-area: bard;
		background-color: var(--color-brand-primary);
	}

	.about-bar--e {
		grid-area: bare;
		background-color: var(--color-white);
	}

	.about-bar--f {
		grid-area: barf;
		background-color: var(--color-accent-yellow);
	}

	.about-photo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		filter: grayscale(100%) contrast(1.06);
		transition:
			filter var(--transition-medium),
			transform var(--transition-medium);
	}

	@media (hover: hover) {
		.about-photo:hover img {
			filter: grayscale(0%) contrast(1.02);
			transform: scale(1.02);
		}
	}

	.about-acc {
		min-width: 0;
	}

	.about-acc--yellow {
		grid-area: yacc;
		background-color: var(--color-accent-yellow);
	}

	.about-acc--blue {
		grid-area: bacc;
		background-color: var(--color-accent-blue);
	}

	@media (max-width: 800px) {
		.about-canvas {
			display: flex;
			flex-direction: column;
			gap: 4px;
			padding: 4px;
		}

		.about-copy {
			padding: 1.5rem 1.2rem 1.6rem;
		}

		.about-motto {
			padding: 1.4rem 1.2rem 1.5rem;
		}

		.about-photo {
			min-height: 340px;
		}

		/* Stacked layout has no column beside the photo, so the bars would become
		   a row of stray blocks — drop them entirely. */
		.about-bar {
			display: none;
		}

		.about-acc {
			min-height: 22px;
		}
	}

	/* ===== Responsive: hero ===== */
	@media (max-width: 900px) {
		.hero-mondrian {
			grid-template-columns: repeat(4, 1fr);
			grid-template-areas:
				'photo photo photo photo'
				'copy copy copy copy'
				'yell red red blue';
			gap: 4px;
			padding-bottom: 4px;
		}

		.hero-media {
			min-height: 220px;
		}

		.hero-acc--white,
		.hero-acc--white2 {
			display: none;
		}

		.hero-acc {
			min-height: 32px;
		}
	}

	@media (max-width: 640px) {
		.hero-highlights {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 700px) {
		.head-cell {
			padding: 1.25rem 1rem 1.4rem;
		}

		.head-link-cell {
			padding: 0.9rem;
		}

		.head-acc {
			flex: none;
			min-height: 24px;
		}
	}

	/* ===== Reduced motion ===== */
	@media (prefers-reduced-motion: reduce) {
		[data-reveal] {
			opacity: 1;
			transform: none;
			transition: none;
		}

		/* The strip becomes a static wrapped grid; the duplicate half that only
		   exists to make the loop seamless is dropped. */
		.partner-track {
			animation: none;
			flex-wrap: wrap;
			width: auto;
			justify-content: center;
		}

		.partner-track a.dup {
			display: none;
		}

		.tile,
		.tile-desc,
		.btn {
			transition: none;
		}
	}
</style>
