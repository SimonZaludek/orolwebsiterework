<script lang="ts">
	import { resolve } from '$app/paths';
	import hiltiLogo from '$lib/assets/logos/Hilti.svg';
	import { contact } from '$lib/site';
	import { reveal } from '$lib/reveal';

	let { data } = $props();
	const tool = $derived(data.tool);
	const related = $derived(data.related);

	// The YouTube embed is only loaded after a click, so no request leaves the
	// page to a third party until the visitor asks for the video.
	let videoPlaying = $state(false);
	$effect(() => {
		void tool.slug;
		videoPlaying = false;
	});
</script>

<svelte:head>
	<title>{tool.name} – Požičovňa náradia – Stavebniny Orol</title>
	<meta name="description" content={tool.lead} />
</svelte:head>

<section class="section" aria-label={tool.name}>
	<!-- 1. Hero -->
	<div class="canvas hero-canvas">
		<div class="copy-cell" data-reveal {@attach reveal()}>
			<a href={resolve('/services/pozicovna-naradia')} class="back-link">← Späť na požičovňu</a>
			<span class="eyebrow">Požičovňa · {tool.category}</span>
			<h1 class="hero-title">{tool.name}</h1>
			<p class="hero-lead">{tool.lead}</p>
			<div class="hero-actions">
				<a href={contact.phoneHref} rel="external" class="btn btn--primary">Overiť dostupnosť</a>
				{#if tool.hiltiUrl}
					<a href={tool.hiltiUrl} class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
						{tool.hiltiSuccessor ? 'Nástupca na Hilti.sk →' : 'Detail na Hilti.sk →'}
					</a>
				{:else if tool.brand?.url}
					<a href={tool.brand.url} class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
						Detail u výrobcu →
					</a>
				{/if}
			</div>
		</div>

		<div class="photo-cell" data-reveal {@attach reveal(80)}>
			<img
				src={tool.useImage ?? tool.image}
				alt={tool.useImage ? `${tool.model} pri práci` : tool.name}
				loading="eager"
			/>
		</div>

		<div class="model-cell" data-reveal {@attach reveal(140)}>
			{#if tool.productImage}
				<img src={tool.productImage} alt={tool.model} class="model-shot" />
			{/if}
			{#if !tool.brand}
				<img src={hiltiLogo} alt="Hilti" class="model-logo" />
			{:else if tool.brand.logo}
				<img src={tool.brand.logo} alt={tool.brand.name} class="model-logo" />
			{:else}
				<span class="model-brand">{tool.brand.name}</span>
			{/if}
			<span class="model-text">
				<span class="model-code">{tool.model}</span>
				{#if tool.photoIsSuccessor && tool.productImage}
					<small class="model-note">Na fotografii nástupca {tool.hiltiSuccessor}</small>
				{/if}
			</span>
		</div>

		<div class="acc acc--hy" aria-hidden="true"></div>
		<div class="acc acc--hb" aria-hidden="true"></div>
	</div>

	<!-- 2. Použitie -->
	<div class="canvas use-canvas">
		<header class="head-cell" data-reveal {@attach reveal()}>
			<span class="eyebrow">Na čo sa hodí</span>
			<h2 class="section-title">Typické použitie</h2>
		</header>
		<div class="acc acc--uy" aria-hidden="true"></div>
		<div class="use-cell" data-reveal {@attach reveal(80)}>
			<ul class="use-list">
				{#each tool.uses as use (use)}
					<li>
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
						{use}
					</li>
				{/each}
			</ul>
			{#if tool.specs.length > 0}
				<ul class="spec-list">
					{#each tool.specs as spec (spec)}
						<li>{spec}</li>
					{/each}
				</ul>
			{/if}
			{#if tool.hiltiSuccessor}
				<p class="successor-note">
					Tento model už výrobca nevyrába – u nás si ho stále požičiate. Na Hilti.sk nájdete jeho
					nástupcu <strong>{tool.hiltiSuccessor}</strong>.
				</p>
			{/if}
		</div>
	</div>

	{#if tool.youtubeId}
		<!-- 3. Inštruktážne video (loaded on demand) -->
		<div class="canvas video-canvas">
			<div class="video-cell" data-reveal {@attach reveal()}>
				{#if videoPlaying}
					<iframe
						src="https://www.youtube-nocookie.com/embed/{tool.youtubeId}?autoplay=1&rel=0"
						title="Inštruktážne video – {tool.name}"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				{:else}
					<button type="button" class="video-play" onclick={() => (videoPlaying = true)}>
						<img src={tool.image} alt="" />
						<span class="video-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
						</span>
						<span class="video-label">
							Inštruktážne video · {tool.model}
							<small>Prehrá sa z YouTube</small>
						</span>
					</button>
				{/if}
			</div>
			<div class="acc acc--vy" aria-hidden="true"></div>
		</div>
	{/if}

	<!-- 4. Ďalšie náradie -->
	<div class="canvas related-canvas">
		<header class="related-head" data-reveal {@attach reveal()}>
			<span class="eyebrow">Ďalej v ponuke</span>
		</header>
		{#each related as item, i (item.slug)}
			<a
				href={resolve('/services/pozicovna-naradia/[slug]', { slug: item.slug })}
				class="related-cell"
				data-reveal
				{@attach reveal(Math.min(i * 60, 240))}
			>
				{#if item.productImage}
					<img src={item.productImage} alt="" class="related-thumb" loading="lazy" />
				{/if}
				<span class="related-model">{item.model}</span>
				<span class="related-name">{item.name}</span>
			</a>
		{/each}
		<div class="acc acc--rb" aria-hidden="true"></div>
	</div>

	<!-- 4. CTA -->
	<div class="canvas cta-canvas">
		<div class="cta-cell" data-reveal {@attach reveal()}>
			<div>
				<h2 class="cta-title">Máte o toto náradie záujem?</h2>
				<p class="cta-sub">Overíme dostupnosť a povieme podmienky prenájmu.</p>
			</div>
			<div class="cta-actions">
				<a href={contact.phoneHref} rel="external" class="cta-phone">{contact.phone}</a>
				<a href={resolve('/contact')} class="cta-link">Kontaktné údaje</a>
			</div>
		</div>
		<div class="acc acc--ty" aria-hidden="true"></div>
	</div>
</section>

<style>
	.section {
		padding: 0 0 var(--space-section-y-end);
		display: flex;
		flex-direction: column;
		gap: var(--space-section-y-end, 4rem);
	}

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
		background-color: currentColor;
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

	.canvas {
		display: grid;
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	/* ===== 1. Hero ===== */
	.hero-canvas {
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: minmax(400px, auto) 104px;
		grid-template-areas:
			'copy copy copy copy copy copy photo photo photo photo photo photo'
			'copy copy copy copy copy copy model model model model hy    hb';
	}

	.copy-cell {
		grid-area: copy;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 1.1rem;
		padding: clamp(1.75rem, 3.5vw, 3.25rem);
		background-color: var(--color-white);
	}

	.back-link {
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--color-brand-primary);
	}

	.hero-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-display-lg);
		font-weight: 700;
		line-height: 1.02;
		text-transform: uppercase;
		letter-spacing: 0.01em;
		color: var(--color-iron);
	}

	.hero-lead {
		margin: 0;
		max-width: 54ch;
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

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.85rem 1.5rem;
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		text-decoration: none;
		transition:
			background-color var(--transition-fast),
			border-color var(--transition-fast),
			color var(--transition-fast);
	}

	.btn:focus-visible,
	.back-link:focus-visible,
	.related-cell:focus-visible,
	.cta-phone:focus-visible,
	.cta-link:focus-visible {
		outline: 3px solid var(--color-brand-hover);
		outline-offset: 3px;
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

	.photo-cell {
		grid-area: photo;
		position: relative;
		overflow: hidden;
		min-width: 0;
		background-color: var(--color-white);
	}

	/* Tool photos arrive in wildly different ratios (2.2:1 panoramas through to
	   portrait), so every one is fitted whole inside the cell rather than
	   cropped to it — the cell is the fixed rectangle, the picture scales to
	   sit inside it. They rest monochrome and take their colour on hover. */
	.photo-cell img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		padding: clamp(0.5rem, 1.5vw, 1.25rem);
		box-sizing: border-box;
		filter: grayscale(100%) contrast(1.06);
		transition: filter var(--transition-medium);
	}

	@media (hover: hover) {
		.photo-cell:hover img {
			filter: grayscale(0%) contrast(1.02);
		}
	}

	/* Model plate — the Hilti mark next to the model code. */
	.model-cell {
		grid-area: model;
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 0.75rem clamp(1rem, 2.5vw, 2rem);
		background-color: var(--color-white);
	}

	.model-shot {
		height: 74px;
		width: auto;
		max-width: 150px;
		object-fit: contain;
		object-position: left center;
		flex: 0 0 auto;
	}

	.model-logo {
		height: 26px;
		width: auto;
	}

	/* Makers we have no logo file for stand in the logo's place as a wordmark,
	   so the plate keeps its two-part rhythm: maker, then model code. */
	.model-brand {
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: var(--color-iron);
	}

	.model-text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.model-note {
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0;
		text-transform: none;
		color: var(--text-muted);
	}

	.model-code {
		font-family: var(--font-display);
		font-size: clamp(1.2rem, 2vw, 1.7rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-iron);
	}

	/* ===== 2. Použitie ===== */
	.use-canvas {
		grid-template-columns: repeat(12, 1fr);
	}

	.head-cell {
		grid-column: span 10;
		background-color: var(--color-white);
		padding: 1.75rem clamp(1.25rem, 3vw, 2.5rem) 1.9rem;
	}

	.use-cell {
		grid-column: span 12;
		background-color: var(--color-white);
		padding: clamp(1.25rem, 3vw, 2.25rem) clamp(1.25rem, 3vw, 2.5rem);
	}

	.use-list,
	.spec-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.use-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.7rem;
		padding: 0.8rem 0;
		border-bottom: 1px solid var(--border-default);
		font-weight: 500;
		line-height: 1.55;
		color: var(--color-steel);
	}

	.use-list li:last-child {
		border-bottom: 0;
	}

	.use-list svg {
		width: 22px;
		height: 22px;
		flex: 0 0 auto;
		margin-top: 0.1em;
		fill: none;
		stroke: var(--color-brand-primary);
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.spec-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1.25rem;
	}

	.spec-list li {
		padding: 0.4rem 0.85rem;
		background-color: var(--color-chalk);
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--color-iron);
	}

	.successor-note {
		margin: 1.25rem 0 0;
		padding-left: 1rem;
		border-left: 3px solid var(--color-accent-yellow);
		font-size: var(--font-size-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.successor-note strong {
		color: var(--color-iron);
	}

	/* ===== 3. Video ===== */
	.video-canvas {
		grid-template-columns: repeat(12, 1fr);
	}

	.video-cell {
		grid-column: span 11;
		position: relative;
		aspect-ratio: 16 / 9;
		min-width: 0;
		background-color: var(--color-onyx);
	}

	.video-cell iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	.video-play {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		gap: 1rem;
		padding: clamp(1.25rem, 3vw, 2.25rem);
		border: 0;
		background: transparent;
		cursor: pointer;
		text-align: left;
	}

	.video-play img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: grayscale(100%) contrast(1.05) brightness(0.72);
		transition: filter var(--transition-medium);
	}

	.video-play:hover img {
		filter: grayscale(60%) contrast(1.02) brightness(0.82);
	}

	.video-icon {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 64px;
		height: 64px;
		flex: 0 0 auto;
		background-color: var(--color-brand-primary);
		transition: background-color var(--transition-fast);
	}

	.video-play:hover .video-icon {
		background-color: var(--color-brand-hover);
	}

	.video-icon svg {
		width: 26px;
		height: 26px;
		fill: var(--color-white);
	}

	.video-label {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-white);
	}

	.video-label small {
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-weight: 400;
		letter-spacing: 0;
		text-transform: none;
		color: rgba(255, 255, 255, 0.75);
	}

	.video-play:focus-visible {
		outline: 3px solid var(--color-brand-hover);
		outline-offset: -3px;
	}

	.acc--vy {
		grid-column: span 1;
		background-color: var(--color-accent-yellow);
	}

	/* ===== 4. Ďalšie náradie ===== */
	.related-canvas {
		grid-template-columns: repeat(12, 1fr);
	}

	.related-head {
		grid-column: span 12;
		background-color: var(--color-white);
		padding: 1.1rem clamp(1.25rem, 3vw, 2.5rem);
	}

	.related-cell {
		grid-column: span 3;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		min-width: 0;
		padding: 1.25rem 1.3rem 1.4rem;
		background-color: var(--color-white);
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.related-cell:hover {
		background-color: var(--color-chalk);
	}

	.related-thumb {
		width: 100%;
		height: 72px;
		object-fit: contain;
		object-position: left center;
		margin-bottom: 0.5rem;
	}

	.related-model {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-brand-primary);
	}

	.related-name {
		font-size: var(--font-size-small);
		line-height: 1.5;
		color: var(--text-muted);
	}

	/* ===== 4. CTA ===== */
	.cta-canvas {
		grid-template-columns: repeat(12, 1fr);
	}

	.cta-cell {
		grid-column: span 10;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: clamp(1.75rem, 3.5vw, 2.75rem) clamp(1.5rem, 4vw, 3.5rem);
		background-color: var(--color-brand-primary);
	}

	.cta-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-display-md);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-white);
	}

	.cta-sub {
		margin: 0.35rem 0 0;
		font-size: var(--font-size-small);
		color: rgba(255, 255, 255, 0.88);
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.5rem;
	}

	.cta-phone {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--color-white);
		text-decoration: none;
		font-variant-numeric: tabular-nums;
	}

	.cta-phone:hover {
		text-decoration: underline;
	}

	.cta-link {
		font-size: var(--font-size-small);
		font-weight: 700;
		color: var(--color-white);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	/* ===== Accents ===== */
	.acc {
		min-width: 0;
	}

	.acc--hy {
		grid-area: hy;
		background-color: var(--color-accent-yellow);
	}

	.acc--hb {
		grid-area: hb;
		background-color: var(--color-accent-blue);
	}

	.acc--uy {
		grid-column: span 2;
		background-color: var(--color-accent-yellow);
	}

	.acc--rb {
		grid-column: span 12;
		min-height: 22px;
		background-color: var(--color-accent-blue);
	}

	.acc--ty {
		grid-column: span 2;
		background-color: var(--color-accent-yellow);
	}

	/* ===== Scroll reveal ===== */
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

	/* ===== Responsive ===== */
	@media (max-width: 1000px) {
		.related-cell {
			grid-column: span 6;
		}
	}

	@media (max-width: 800px) {
		.canvas {
			display: flex;
			flex-direction: column;
			gap: 4px;
			padding: 4px;
		}

		.section {
			gap: 2.5rem;
		}

		.copy-cell {
			padding: 1.5rem 1.2rem 1.6rem;
		}

		.photo-cell {
			min-height: 300px;
		}

		.head-cell,
		.use-cell,
		.related-head {
			padding: 1.25rem 1.2rem 1.4rem;
		}

		.cta-cell {
			padding: 1.75rem 1.2rem 1.9rem;
		}

		.acc {
			min-height: 22px;
		}
	}

	/* ===== Reduced motion ===== */
	@media (prefers-reduced-motion: reduce) {
		[data-reveal] {
			opacity: 1;
			transform: none;
			transition: none;
		}

		.photo-cell img,
		.btn {
			transition: none;
		}
	}
</style>
