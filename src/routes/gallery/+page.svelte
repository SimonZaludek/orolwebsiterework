<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		galleryFilters,
		galleryGroups,
		type GalleryFilter,
		type GalleryPhoto
	} from '$lib/gallery';
	import { reveal } from '$lib/reveal';

	// The filter grid is four columns wide, so the categories rarely fill the last
	// row exactly. Whatever they leave over becomes a De Stijl block instead of
	// bare backdrop, the same way the rentals catalogue closes its grid.
	const filterColumns = 4;
	const filterFillSpan = (filterColumns - (galleryFilters.length % filterColumns)) % filterColumns;

	let activeCategory = $state<GalleryFilter>('all');
	let dialog = $state<HTMLDialogElement | null>(null);
	let currentIndex = $state(0);
	let isOpen = $state(false);

	const visibleGroups = $derived(
		activeCategory === 'all'
			? galleryGroups
			: galleryGroups.filter((group) => group.category === activeCategory)
	);
	const visiblePhotos = $derived<GalleryPhoto[]>(visibleGroups.flatMap((group) => group.photos));
	const currentPhoto = $derived<GalleryPhoto | null>(visiblePhotos[currentIndex] ?? null);
	const currentCategory = $derived(
		currentPhoto
			? (galleryGroups.find((group) => group.category === currentPhoto.category)?.label ?? '')
			: ''
	);

	function selectCategory(category: GalleryFilter) {
		if (isOpen) dialog?.close();
		activeCategory = category;
		currentIndex = 0;
	}

	function openLightbox(photo: GalleryPhoto) {
		const photoIndex = visiblePhotos.findIndex((candidate) => candidate.src === photo.src);
		if (photoIndex < 0) return;

		currentIndex = photoIndex;
		isOpen = true;
		dialog?.showModal();
	}

	function closeLightbox() {
		dialog?.close();
	}

	function showPrev() {
		if (visiblePhotos.length === 0) return;
		currentIndex = (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
	}

	function showNext() {
		if (visiblePhotos.length === 0) return;
		currentIndex = (currentIndex + 1) % visiblePhotos.length;
	}

	function onDialogKeydown(event: KeyboardEvent) {
		if (!isOpen) return;

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			showPrev();
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			showNext();
		}
	}

	function onLightboxClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closeLightbox();
	}

	function onDialogClose() {
		isOpen = false;
	}
</script>

<svelte:head>
	<title>Galéria predajne, skladu a realizácií – Stavebniny Orol</title>
	<meta
		name="description"
		content="Pozrite si predajňu a sklad Stavebnín Orol v Liptovskom Mikuláši, vlastnú dopravu materiálu aj vybrané realizácie."
	/>
</svelte:head>

<section class="section" aria-labelledby="gallery-title">
	<div class="gallery-shell">
		<div class="gallery-head">
			<header class="head-cell" data-reveal {@attach reveal()}>
				<div>
					<span class="eyebrow">Fotogaléria</span>
					<h1 id="gallery-title" class="section-title">Predajňa, materiál a hotové stavby</h1>
				</div>
				<p class="head-copy">
					Pozrite si náš sortiment, zázemie v Liptovskom Mikuláši a výber realizácií, pri ktorých
					sme dodávali materiál a technické riešenia.
				</p>
			</header>
			<a href={resolve('/contact')} class="head-link-cell"
				>Kde nás nájdete <span aria-hidden="true">→</span></a
			>
			<div class="head-accent" aria-hidden="true"></div>
		</div>

		<nav class="filter-bar" aria-label="Filtrovať galériu">
			<span class="filter-label">Vyberte tému</span>
			<div class="filter-options">
				{#each galleryFilters as filter (filter.id)}
					<button
						type="button"
						class:active={activeCategory === filter.id}
						onclick={() => selectCategory(filter.id)}
						aria-pressed={activeCategory === filter.id}
					>
						<span>{filter.label}</span>
						<small>{filter.count.toString().padStart(2, '0')}</small>
					</button>
				{/each}
				{#if filterFillSpan > 0}
					<div class="filter-fill" style:grid-column={`span ${filterFillSpan}`} aria-hidden="true">
						<span class="ff ff--a"></span>
						<span class="ff ff--b"></span>
						<span class="ff ff--c"></span>
						<span class="ff ff--d"></span>
					</div>
				{/if}
			</div>
		</nav>

		<div class="stories" aria-live="polite">
			{#each visibleGroups as group, groupIndex (group.category)}
				{@const leadPhoto = group.photos[0]}
				<section class="story" aria-labelledby={`gallery-${group.category}`}>
					<header class="story-head" data-reveal {@attach reveal(Math.min(groupIndex * 70, 140))}>
						<div class="story-kicker">
							<span>{group.index}</span>
							<strong>{group.label}</strong>
						</div>
						<div class="story-heading">
							<h2 id={`gallery-${group.category}`}>{group.title}</h2>
							<p>{group.description}</p>
						</div>
					</header>

					<button
						type="button"
						class="lead-card"
						onclick={() => openLightbox(leadPhoto)}
						aria-label={`Otvoriť fotografiu: ${leadPhoto.title}`}
						data-reveal
						{@attach reveal(80)}
					>
						<span class="lead-image-wrap">
							<img
								src={leadPhoto.thumb}
								srcset={`${leadPhoto.thumb} 960w, ${leadPhoto.src} 2000w`}
								sizes="(max-width: 760px) 100vw, 72vw"
								alt={leadPhoto.alt}
								width={leadPhoto.width}
								height={leadPhoto.height}
								loading={groupIndex === 0 ? 'eager' : 'lazy'}
								fetchpriority={groupIndex === 0 ? 'high' : 'auto'}
							/>
						</span>
						<span class="lead-copy">
							<small>Výber z kategórie</small>
							<strong>{leadPhoto.title}</strong>
							<i aria-hidden="true">Zväčšiť ↗</i>
						</span>
					</button>

					<div class="support-grid" class:support-grid--two={group.category !== 'shop'}>
						{#each group.photos.slice(1) as photo, photoIndex (photo.src)}
							<button
								type="button"
								class="photo-card"
								onclick={() => openLightbox(photo)}
								aria-label={`Otvoriť fotografiu: ${photo.title}`}
								data-reveal
								{@attach reveal(Math.min(photoIndex * 55, 220))}
							>
								<span class="photo-image-wrap">
									<img
										src={photo.thumb}
										srcset={`${photo.thumb} 960w, ${photo.src} 2000w`}
										sizes={group.category === 'shop'
											? '(max-width: 720px) 100vw, (max-width: 1000px) 50vw, 33vw'
											: '(max-width: 720px) 100vw, 50vw'}
										alt={photo.alt}
										width={photo.width}
										height={photo.height}
										loading="lazy"
									/>
								</span>
								<span class="photo-copy">
									<strong>{photo.title}</strong>
									<span aria-hidden="true">↗</span>
								</span>
							</button>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</div>
</section>

<dialog
	bind:this={dialog}
	class="lightbox"
	aria-labelledby="lightbox-title"
	onkeydown={onDialogKeydown}
	onclose={onDialogClose}
>
	{#if currentPhoto}
		<div class="lightbox-inner" role="presentation" onclick={onLightboxClick}>
			<button type="button" class="lightbox-close" onclick={closeLightbox} aria-label="Zavrieť">
				&times;
			</button>

			{#if visiblePhotos.length > 1}
				<button
					type="button"
					class="lightbox-nav lightbox-prev"
					onclick={showPrev}
					aria-label="Predchádzajúca fotografia"
				>
					&#8249;
				</button>
			{/if}

			<div class="lightbox-stage">
				<img src={currentPhoto.src} alt={currentPhoto.alt} class="lightbox-image" />
			</div>

			{#if visiblePhotos.length > 1}
				<button
					type="button"
					class="lightbox-nav lightbox-next"
					onclick={showNext}
					aria-label="Nasledujúca fotografia"
				>
					&#8250;
				</button>
			{/if}

			<div class="lightbox-caption">
				<div>
					<small>{currentCategory}</small>
					<strong id="lightbox-title">{currentPhoto.title}</strong>
				</div>
				<span>{currentIndex + 1} / {visiblePhotos.length}</span>
			</div>
		</div>
	{/if}
</dialog>

<style>
	.section {
		padding: 0 0 var(--space-section-y-end);
	}

	.gallery-shell {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	.gallery-head {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(15rem, 20rem) 90px;
		gap: 5px;
	}

	.head-cell {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(18rem, 0.7fr);
		align-items: end;
		gap: clamp(1.5rem, 4vw, 4rem);
		min-width: 0;
		padding: clamp(1.5rem, 3vw, 2.5rem);
		background-color: var(--color-white);
	}

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--font-display);
		font-size: 0.88rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: var(--color-brand-primary);
	}

	.eyebrow::before {
		content: '';
		width: 24px;
		height: 3px;
		background-color: currentColor;
	}

	.section-title {
		max-width: 14ch;
		margin: 0.4rem 0 0;
		font-family: var(--font-display);
		font-size: var(--font-size-display-lg);
		font-weight: 700;
		line-height: 1;
		text-transform: uppercase;
		letter-spacing: 0.01em;
		color: var(--color-iron);
	}

	.head-copy {
		max-width: 38rem;
		margin: 0;
		font-size: 1rem;
		line-height: 1.65;
		color: var(--text-muted);
	}

	.head-link-cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.4rem;
		background-color: var(--color-brand-primary);
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.head-link-cell span {
		font-size: 1.45rem;
	}

	.head-link-cell:hover,
	.head-link-cell:focus-visible {
		background-color: var(--color-brand-hover);
	}

	.head-link-cell:focus-visible {
		outline: 3px solid var(--color-accent-yellow);
		outline-offset: -3px;
	}

	.head-accent {
		background-color: var(--color-accent-yellow);
	}

	.filter-bar {
		display: flex;
		align-items: stretch;
		gap: 5px;
		background-color: var(--color-iron);
	}

	.filter-label {
		display: inline-flex;
		align-items: center;
		flex: 0 0 auto;
		padding: 0.8rem 1.25rem;
		background-color: var(--color-iron);
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 0.78rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.14em;
	}

	.filter-options {
		display: grid;
		grid-template-columns: repeat(4, minmax(9rem, 1fr));
		flex: 1;
		gap: 5px;
		min-width: 0;
	}

	.filter-options::-webkit-scrollbar {
		display: none;
	}

	.filter-fill {
		display: grid;
		gap: 5px;
		min-width: 0;
		grid-template-columns: 1.15fr 0.6fr 0.8fr;
		grid-template-rows: 1fr 0.85fr;
		grid-template-areas:
			'a b d'
			'a c d';
	}

	.ff {
		min-width: 0;
		background-color: var(--color-white);
	}

	.ff--a {
		grid-area: a;
		background-color: var(--color-brand-primary);
	}

	.ff--b {
		grid-area: b;
	}

	.ff--c {
		grid-area: c;
		background-color: var(--color-accent-yellow);
	}

	.ff--d {
		grid-area: d;
		background-color: var(--color-accent-blue);
	}

	.filter-options button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 3.7rem;
		padding: 0.75rem 1rem;
		border: 0;
		background-color: var(--color-white);
		color: var(--color-iron);
		font: inherit;
		cursor: pointer;
		transition:
			background-color var(--transition-fast),
			color var(--transition-fast);
	}

	.filter-options button span {
		font-family: var(--font-display);
		font-size: 0.92rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.filter-options button small {
		font-size: 0.7rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--color-slate);
	}

	.filter-options button:hover,
	.filter-options button:focus-visible {
		background-color: var(--color-chalk);
	}

	.filter-options button:focus-visible {
		outline: 3px solid var(--color-accent-yellow);
		outline-offset: -3px;
	}

	.filter-options button.active {
		background-color: var(--color-brand-primary);
		color: var(--color-white);
	}

	.filter-options button.active small {
		color: var(--color-white);
	}

	.stories {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.story {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: clamp(1rem, 2.6vw, 2.5rem);
		background-color: var(--color-chalk);
	}

	.story-head {
		display: grid;
		grid-template-columns: minmax(11rem, 0.35fr) minmax(0, 1fr);
		gap: clamp(1.25rem, 4vw, 5rem);
		align-items: start;
		padding: 0 0 clamp(1rem, 2vw, 1.8rem);
		border-bottom: 1px solid var(--color-concrete);
	}

	.story-kicker {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		font-family: var(--font-display);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.story-kicker span {
		display: inline-grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		background-color: var(--color-brand-primary);
		color: var(--color-white);
		font-size: 0.74rem;
		font-weight: 700;
	}

	.story-kicker strong {
		font-size: 0.85rem;
		color: var(--color-iron);
	}

	.story-heading {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(17rem, 0.65fr);
		gap: clamp(1.5rem, 4vw, 4rem);
		align-items: end;
	}

	.story-heading h2 {
		max-width: 18ch;
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.65rem, 3.2vw, 3.2rem);
		line-height: 1.02;
		text-transform: uppercase;
		color: var(--color-iron);
	}

	.story-heading p {
		margin: 0;
		line-height: 1.6;
		color: var(--text-muted);
	}

	.lead-card,
	.photo-card {
		padding: 0;
		border: 0;
		background-color: var(--color-white);
		color: var(--color-iron);
		font: inherit;
		text-align: left;
		cursor: zoom-in;
	}

	.lead-card:focus-visible,
	.photo-card:focus-visible {
		outline: 4px solid var(--color-accent-yellow);
		outline-offset: -4px;
	}

	.lead-card {
		display: grid;
		grid-template-columns: minmax(0, 2.25fr) minmax(16rem, 0.75fr);
		align-items: stretch;
		margin-top: clamp(0.5rem, 1.5vw, 1.25rem);
	}

	.lead-image-wrap,
	.photo-image-wrap {
		display: block;
		min-width: 0;
		background-color: var(--color-iron);
	}

	.lead-image-wrap img,
	.photo-image-wrap img {
		display: block;
		width: 100%;
		height: auto;
		transition: filter var(--transition-medium);
	}

	.lead-card:hover img,
	.lead-card:focus-visible img,
	.photo-card:hover img,
	.photo-card:focus-visible img {
		filter: saturate(1.06) contrast(1.04);
	}

	.lead-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: clamp(1.4rem, 3vw, 3rem);
		border-left: 5px solid var(--color-iron);
	}

	.lead-copy small {
		font-family: var(--font-display);
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--color-brand-primary);
	}

	.lead-copy strong {
		margin-top: 0.7rem;
		font-family: var(--font-display);
		font-size: clamp(1.35rem, 2.2vw, 2.25rem);
		line-height: 1.05;
		text-transform: uppercase;
	}

	.lead-copy i {
		margin-top: auto;
		padding-top: 2rem;
		font-family: var(--font-display);
		font-size: 0.76rem;
		font-style: normal;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-brand-primary);
	}

	.support-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		align-items: start;
		gap: 5px;
	}

	.support-grid--two {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.photo-card {
		display: flex;
		flex-direction: column;
	}

	.photo-copy {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		min-height: 4.25rem;
		padding: 0.95rem 1.1rem;
		border-top: 5px solid var(--color-iron);
	}

	.photo-copy strong {
		font-family: var(--font-display);
		font-size: 0.88rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.photo-copy > span {
		flex: 0 0 auto;
		font-size: 1.1rem;
		color: var(--color-brand-primary);
	}

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

	.lightbox {
		width: 100vw;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--color-white);
		overflow: hidden;
	}

	.lightbox::backdrop {
		background-color: rgba(20, 22, 24, 0.96);
	}

	.lightbox-inner {
		display: grid;
		grid-template-rows: minmax(0, 1fr) auto;
		width: 100%;
		height: 100%;
		padding: clamp(3.75rem, 7vw, 5.5rem) clamp(1rem, 7vw, 7rem) 1rem;
	}

	.lightbox-stage {
		display: grid;
		place-items: center;
		min-width: 0;
		min-height: 0;
	}

	.lightbox-image {
		display: block;
		/* Grid items default to `min-height: auto`, which would let the photo keep
		   its intrinsic height and overflow the stage instead of honouring the
		   max-height cap below. */
		min-width: 0;
		min-height: 0;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.lightbox-close,
	.lightbox-nav {
		position: absolute;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: var(--color-iron);
		color: var(--color-white);
		cursor: pointer;
		z-index: var(--z-float);
		transition:
			background-color var(--transition-fast),
			transform var(--transition-fast);
	}

	.lightbox-close:hover,
	.lightbox-close:focus-visible,
	.lightbox-nav:hover,
	.lightbox-nav:focus-visible {
		background-color: var(--color-brand-primary);
		outline: 2px solid var(--color-white);
		outline-offset: -2px;
	}

	.lightbox-close {
		top: 1rem;
		right: 1rem;
		width: 2.75rem;
		height: 2.75rem;
		font-size: 1.75rem;
		line-height: 1;
	}

	.lightbox-nav {
		top: 50%;
		width: 3rem;
		height: 3rem;
		font-size: 2rem;
		line-height: 1;
		transform: translateY(-50%);
	}

	.lightbox-nav:hover,
	.lightbox-nav:focus-visible {
		transform: translateY(-50%) scale(1.04);
	}

	.lightbox-prev {
		left: 1rem;
	}

	.lightbox-next {
		right: 1rem;
	}

	.lightbox-caption {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 1.5rem;
		align-items: center;
		width: min(100%, 74rem);
		margin: 1rem auto 0;
		padding: 0.85rem 1rem;
		background-color: var(--color-iron);
	}

	.lightbox-caption div {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.lightbox-caption small {
		font-family: var(--font-display);
		font-size: 0.66rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--color-accent-yellow);
	}

	.lightbox-caption strong {
		font-family: var(--font-display);
		font-size: 0.92rem;
		text-transform: uppercase;
	}

	.lightbox-caption > span {
		font-family: var(--font-display);
		font-size: 0.78rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 1120px) {
		.gallery-head {
			grid-template-columns: minmax(0, 1fr) 15rem 55px;
		}

		.head-cell {
			grid-template-columns: 1fr;
			gap: 1.15rem;
		}

		.story-heading {
			grid-template-columns: 1fr;
			gap: 0.8rem;
		}

		.filter-label {
			display: none;
		}
	}

	@media (max-width: 820px) {
		.gallery-shell {
			gap: 4px;
			padding: 4px;
		}

		.gallery-head {
			grid-template-columns: 1fr;
			gap: 4px;
		}

		.head-accent {
			min-height: 20px;
		}

		.head-link-cell {
			min-height: 3.75rem;
		}

		.filter-options {
			gap: 4px;
			overflow-x: auto;
			scrollbar-width: none;
		}

		.filter-options button {
			min-width: 9.5rem;
		}

		.filter-fill {
			display: none;
		}

		.stories,
		.story {
			gap: 4px;
		}

		.story-head {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}

		.lead-card {
			grid-template-columns: 1fr;
		}

		.lead-copy {
			border-top: 5px solid var(--color-iron);
			border-left: 0;
		}

		.lead-copy i {
			padding-top: 1.25rem;
		}

		.support-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 4px;
		}
	}

	@media (max-width: 580px) {
		.head-cell {
			padding: 1.3rem 1rem 1.45rem;
		}

		.section-title {
			font-size: clamp(2.2rem, 12vw, 3.35rem);
		}

		.story {
			padding: 1rem;
		}

		.story-heading h2 {
			font-size: clamp(1.7rem, 9vw, 2.35rem);
		}

		.support-grid,
		.support-grid--two {
			grid-template-columns: 1fr;
		}

		.photo-copy {
			min-height: 3.75rem;
		}

		.lightbox-inner {
			padding: 3.6rem 0.5rem 0.5rem;
		}

		.lightbox-close {
			top: 0.5rem;
			right: 0.5rem;
		}

		.lightbox-nav {
			top: 46%;
			width: 2.7rem;
			height: 2.7rem;
			background-color: rgba(30, 32, 34, 0.86);
		}

		.lightbox-prev {
			left: 0.5rem;
		}

		.lightbox-next {
			right: 0.5rem;
		}

		.lightbox-caption {
			grid-template-columns: 1fr auto;
			gap: 0.75rem;
			margin-top: 0.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		[data-reveal] {
			opacity: 1;
			transform: none;
			transition: none;
		}

		.lead-image-wrap img,
		.photo-image-wrap img,
		.lightbox-close,
		.lightbox-nav {
			transition: none;
		}
	}
</style>
