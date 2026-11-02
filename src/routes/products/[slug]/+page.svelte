<script lang="ts">
	import { resolve } from '$app/paths';
	import prodOcel from '$lib/assets/products/betonarska-ocel-generated.jpg';
	import prodDlazby from '$lib/assets/products/dlazby-betonove-tvarnice-generated.jpg';
	import prodFarby from '$lib/assets/products/fasadne-a-interierove-farby-generated.jpg';
	import prodHruba from '$lib/assets/products/hruba-stavba-generated.jpg';
	import prodHydroizolacia from '$lib/assets/products/hydroizolacia-generated.jpg';
	import prodSanita from '$lib/assets/products/kanalizacia-voda-sanita-generated.jpg';
	import prodNaradie from '$lib/assets/products/naradie-a-doplnky-generated.jpg';
	import prodOkna from '$lib/assets/products/okna-a-dvere-generated.jpg';
	import prodChemia from '$lib/assets/products/stavebna-chemia-generated.jpg';
	import prodKrytiny from '$lib/assets/products/stresne-krytiny-generated.jpg';
	import prodZmesy from '$lib/assets/products/suche-zmesy-malty-omietky-generated.jpg';
	import prodIzolacie from '$lib/assets/products/tepelne-izolacie-generated.jpg';

	import { categoryIcons } from '$lib/icons';
	import { partners } from '$lib/partners';
	import { productDetails } from '$lib/productDetails';
	import { reveal } from '$lib/reveal';
	import { contact } from '$lib/site';

	let { data } = $props();

	const photos: Record<string, string> = {
		'betonarska-ocel': prodOcel,
		'dlazby-betonove-tvarnice': prodDlazby,
		'fasadne-a-interierove-farby': prodFarby,
		'hruba-stavba': prodHruba,
		hydroizolacia: prodHydroizolacia,
		'kanalizacia-voda-sanita': prodSanita,
		'naradie-a-doplnky': prodNaradie,
		'okna-a-dvere': prodOkna,
		'stavebna-chemia': prodChemia,
		'stresne-krytiny': prodKrytiny,
		'suche-zmesy-malty-omietky': prodZmesy,
		'tepelne-izolacie': prodIzolacie
	};

	const partnerByName = new Map(partners.map((p) => [p.name, p]));

	const slug = $derived(data.product.href.replace('/products/', ''));
	const detail = $derived(productDetails[slug]);
	const photo = $derived(photos[slug]);
	const CategoryIcon = $derived(categoryIcons[data.product.href]);
	const supplierLogos = $derived(
		data.product.suppliers
			.map((name: string) => partnerByName.get(name))
			.filter((s) => s !== undefined)
			.map((s) => ({ name: s.name, logo: s.logo, light: s.light }))
	);
</script>

<svelte:head>
	<title>{detail.metaTitle ?? data.product.title} – Produkty – Stavebniny Orol</title>
	<meta name="description" content={detail.meta} />
</svelte:head>

<section class="section" aria-label={data.product.title}>
	<div class="flow">
		<!-- Head band -->
		<div class="flow-row flow-row--head">
			<header class="head-cell" data-reveal {@attach reveal()}>
				<a href={resolve('/products')} class="back-link">← Späť na produkty</a>
				<span class="eyebrow">Sortiment</span>
				<h1 class="section-title">{data.product.title}</h1>
				<p class="lead">{detail.lead}</p>
			</header>
			<div class="acc acc--yellow" aria-hidden="true"></div>
		</div>

		<!-- Photo band -->
		<div class="flow-row">
			{#if photo}
				<div class="flow-photo" data-reveal {@attach reveal()}>
					<img src={photo} alt="" />
				</div>
			{:else}
				<div class="flow-photo flow-photo--mark" data-reveal {@attach reveal()}>
					<CategoryIcon />
				</div>
			{/if}
		</div>

		<!-- Ponúkame band -->
		<div class="flow-row">
			<div class="offer-cell" data-reveal {@attach reveal()}>
				<h2 class="cell-title">Ponúkame</h2>
				<ul class="check-grid">
					{#each detail.bullets as item, i (item)}
						<li data-reveal {@attach reveal(Math.min(i * 45, 270))}>
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
							{item}
						</li>
					{/each}
				</ul>
			</div>
			<div class="acc acc--blue" aria-hidden="true"></div>
		</div>

		<!-- Suppliers band -->
		<div class="flow-row">
			<div class="suppliers-cell" data-reveal {@attach reveal()}>
				<h2 class="cell-title">Naši dodávatelia</h2>
				<p class="suppliers-note">{detail.note}</p>
				{#if supplierLogos.length > 0}
					<div class="flow-brands" aria-hidden="true">
						{#each supplierLogos as s (s.name)}
							<img src={s.logo} alt="" class:logo-chip={s.light} loading="lazy" />
						{/each}
					</div>
					<span class="visually-hidden">Značky: {data.product.suppliers.join(', ')}</span>
				{/if}
			</div>
			<div class="acc acc--yellow" aria-hidden="true"></div>
		</div>

		<!-- CTA band -->
		<div class="flow-row">
			<div class="cta-cell" data-reveal {@attach reveal()}>
				<h2 class="cta-title">{detail.cta ?? 'Záujem o materiál?'}</h2>
				<div class="cta-actions">
					<a href={resolve('/quote')} class="btn btn--white">Cenová ponuka</a>
					<a href={contact.phoneHref} rel="external" class="cta-link cta-link--phone"
						>{contact.phone}</a
					>
					<a href={resolve('/contact')} class="cta-link">Kontaktné údaje</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		padding: 0 0 var(--space-section-y-end);
	}

	.eyebrow {
		display: flex;
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

	/* ===== Composition canvas ===== */
	.flow {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	.flow-row {
		display: flex;
		gap: 5px;
	}

	/* Head band */
	.head-cell {
		flex: 4 1 0;
		min-width: 0;
		background-color: var(--color-white);
		padding: 1.75rem clamp(1.25rem, 3vw, 2.5rem) 1.9rem;
	}

	.back-link {
		display: inline-block;
		margin-bottom: 0.9rem;
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.back-link:hover {
		color: var(--color-brand-primary);
	}

	.lead {
		margin: 0.85rem 0 0;
		max-width: 62ch;
		font-size: 1rem;
		line-height: 1.65;
		color: var(--text-muted);
	}

	/* Photo band */
	.flow-photo {
		flex: 1 1 0;
		min-width: 0;
		position: relative;
		overflow: hidden;
		min-height: clamp(240px, 34vw, 400px);
		background-color: var(--color-white);
	}

	.flow-photo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: grayscale(100%) contrast(1.08) brightness(0.97);
	}

	.flow-photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(160deg, rgba(192, 40, 28, 0.24) 0%, rgba(30, 32, 34, 0.35) 100%);
		mix-blend-mode: multiply;
		pointer-events: none;
	}

	/* Photo-less category: the pictogram as a large watermark cell */
	.flow-photo--mark {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--color-chalk);
	}

	.flow-photo--mark::after {
		display: none;
	}

	.flow-photo--mark :global(svg) {
		width: 140px;
		height: 140px;
		stroke: var(--color-brand-primary);
		stroke-width: 0.8;
		opacity: 0.55;
	}

	/* Content cells */
	.offer-cell,
	.suppliers-cell {
		flex: 1 1 0;
		min-width: 0;
		background-color: var(--color-white);
		padding: clamp(1.75rem, 4vw, 2.6rem) clamp(1.25rem, 3vw, 2.5rem) clamp(2rem, 4vw, 2.8rem);
	}

	.cell-title {
		margin: 0 0 1.25rem;
		font-family: var(--font-display);
		font-size: var(--font-size-display-md);
		font-weight: 700;
		line-height: 1.05;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-iron);
	}

	/* Ponúkame checklist */
	.check-grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.85rem clamp(1.5rem, 4vw, 3rem);
	}

	.check-grid li {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		font-weight: 500;
		line-height: 1.5;
		color: var(--color-steel);
	}

	.check-grid svg {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		margin-top: 0.15rem;
		fill: none;
		stroke: var(--color-brand-primary);
		stroke-width: 3;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* Suppliers */
	.suppliers-note {
		margin: 0;
		max-width: 62ch;
		font-size: var(--font-size-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.flow-brands {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1.4rem;
		margin-top: 1.4rem;
	}

	.flow-brands img {
		height: 26px;
		max-width: 110px;
		object-fit: contain;
	}

	/* CTA band */
	.cta-cell {
		flex: 1 1 0;
		min-width: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1rem 2.5rem;
		background-color: var(--color-brand-primary);
		padding: clamp(1.75rem, 4vw, 2.4rem) clamp(1.25rem, 3vw, 2.5rem);
	}

	.cta-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-display-md);
		font-weight: 700;
		line-height: 1.05;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-white);
	}

	.cta-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 2rem;
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
			color var(--transition-fast);
	}

	.btn:focus-visible {
		outline: 3px solid var(--color-white);
		outline-offset: 3px;
	}

	.btn--white {
		background-color: var(--color-white);
		color: var(--color-brand-primary);
	}

	.btn--white:hover {
		background-color: var(--color-chalk);
	}

	.cta-link {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-white);
		text-decoration: underline;
		text-underline-offset: 4px;
		transition: color var(--transition-fast);
	}

	.cta-link:hover {
		color: var(--color-chalk);
	}

	.cta-link--phone {
		font-size: 1.5rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	/* Accent cells */
	.acc {
		flex: 0 0 90px;
	}

	.acc--yellow {
		background-color: var(--color-accent-yellow);
	}

	.acc--blue {
		background-color: var(--color-accent-blue);
	}

	/* ===== Mobile: bands stack ===== */
	@media (max-width: 800px) {
		.flow {
			gap: 4px;
			padding: 4px;
		}

		.flow-row {
			flex-direction: column;
			gap: 4px;
		}

		.head-cell {
			padding: 1.25rem 1rem 1.4rem;
		}

		.flow-photo {
			min-height: 180px;
		}

		.flow-photo--mark {
			min-height: 140px;
		}

		.flow-photo--mark :global(svg) {
			width: 90px;
			height: 90px;
		}

		.offer-cell,
		.suppliers-cell {
			padding: 1.4rem 1.2rem 1.6rem;
		}

		.check-grid {
			grid-template-columns: 1fr;
		}

		.cta-cell {
			padding: 1.4rem 1.2rem 1.6rem;
		}

		.acc {
			flex: none;
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

		.back-link,
		.btn,
		.cta-link {
			transition: none;
		}
	}
</style>
