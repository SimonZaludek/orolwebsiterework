<script lang="ts">
	import { resolve } from '$app/paths';
	import demolitionPhoto from '$lib/assets/rental/hilti-demolition.jpg';
	import cuttingPhoto from '$lib/assets/rental/hilti-cutting.png';
	import masonryPhoto from '$lib/assets/rental/masonry-saw.jpg';
	import measuringPhoto from '$lib/assets/rental/measuring-level.jpg';
	import mixingPhoto from '$lib/assets/rental/mixing-plastering.jpg';
	import scaffoldingPhoto from '$lib/assets/rental/scaffolding.jpg';
	import seasonalPhoto from '$lib/assets/rental/seasonal-log-splitter.jpg';
	import ResponsiveServiceImage from '$lib/components/ResponsiveServiceImage.svelte';
	import { serviceMedia } from '$lib/serviceMedia';
	import hiltiLogo from '$lib/assets/logos/Hilti.svg';
	import { contact } from '$lib/site';
	import { reveal } from '$lib/reveal';
	import { rentalTools, toolForItem } from '$lib/rentalTools';

	const heroPhoto = serviceMedia['/services/pozicovna-naradia'];

	// Bento rows — the hovered tile expands sideways and its row grows taller.
	const hiltiRows = [rentalTools.slice(0, 4), rentalTools.slice(4)];

	const categories = [
		{
			title: 'Búranie a vŕtanie',
			image: demolitionPhoto,
			alt: 'Hilti búracie kladivo pri práci',
			items: [
				'Búracie kladivo Hilti TE 3000-AVR',
				'Búracie kladivo Hilti TE 1000-AVR',
				'Sekacie kladivo Hilti TE 500-AVR',
				'Kombinované kladivo Hilti TE 70'
			]
		},
		{
			title: 'Rezanie a brúsenie',
			image: cuttingPhoto,
			alt: 'Ručná okružná a rozbrusovacia píla Hilti',
			items: [
				'Uhlová brúska Hilti AG230',
				'Brúska na betón Hilti DGH 130',
				'Drážkovací stroj Hilti DC-SE20',
				'Brúska na steny a stropy Dedra DED7748'
			]
		},
		{
			title: 'Miešanie a betón',
			image: mixingPhoto,
			alt: 'Strojová omietačka pripravená na použitie',
			items: [
				'Miešačka Scheppach MIX 180',
				'Miešač Nuova Battipav MIXER 50 SUPER',
				'Strojová omietačka MAI PUMP M4G economy',
				'Ponorný vibrátor betónu Herman HVE 113',
				'Vibračný stôl'
			]
		},
		{
			title: 'Murivo a dlažba',
			image: masonryPhoto,
			alt: 'Stolová píla na rezanie tehál',
			items: [
				'Vibračná doska Dedra DED8830',
				'Stolová píla Herman HSE-265 na tehly',
				'Mechanická rezačka zámkovej dlažby',
				'Rezačka obkladov a dlažby Dedra DED7823'
			]
		},
		{
			title: 'Meranie a čistenie',
			image: measuringPhoto,
			alt: 'Optický nivelačný prístroj Sokkia C41',
			items: [
				'Optický nivelačný prístroj Sokkia C41',
				'Meracia lata Sokkia',
				'Merač vlhkosti v murive',
				'Stavebný vysávač Hilti VC 40L-X',
				'Vysokotlakový čistič Dedra DED8825',
				'Vysokotlakový čistič Dedra DED8821'
			]
		},
		{
			title: 'Lešenie a manipulácia',
			image: scaffoldingPhoto,
			alt: 'Oceľové stavebné lešenie osadené na dome',
			items: ['Lešenie trubkové', 'Lešenie GRAF', 'Ručný hydraulický paletový vozík']
		},
		{
			title: 'Sezónna technika',
			image: seasonalPhoto,
			alt: 'Štiepačka dreva s tlakom štrnásť ton',
			items: [
				'Štiepačka dreva s tlakom 10 ton',
				'Snehová fréza Honda HSM1390i',
				'Plynový ohrievač Dedra DED9943'
			]
		}
	];

	const steps = [
		{
			title: 'Overte dostupnosť',
			text: 'Zavolajte nám alebo sa zastavte na predajni. Podľa práce Vám odporučíme vhodný stroj a overíme voľný termín.'
		},
		{
			title: 'Rezervácia a prevzatie',
			text: 'Náradie Vám rezervujeme. Pri prevzatí podpíšete zmluvu o prenájme a vysvetlíme Vám bezpečné používanie.'
		},
		{
			title: 'Vrátenie a záloha',
			text: 'Po skončení prenájmu vrátite náradie vyčistené a po kontrole Vám vrátime zálohu.'
		}
	];

	const conditions = [
		'Krátkodobý aj dlhodobý prenájom podľa typu stroja',
		'Výška vratnej zálohy závisí od zapožičaného náradia',
		'Pri prevzatí je potrebný občiansky preukaz a ďalší doklad totožnosti',
		'Náradie sa vracia vyčistené a v stave, v akom ste ho prevzali'
	];
</script>

<svelte:head>
	<title>Požičovňa stavebného náradia – Stavebniny Orol</title>
	<meta
		name="description"
		content="Prenájom stavebného náradia v Liptovskom Mikuláši – búracie kladivá, píly, miešačky, omietačky, lešenie, meracia technika a ďalšie vybavenie."
	/>
</svelte:head>

<section class="section" aria-label="Požičovňa náradia">
	<!-- 1. Hero composition -->
	<div class="canvas hero-canvas">
		<div class="copy-cell" data-reveal {@attach reveal()}>
			<a href={resolve('/services')} class="back-link">← Späť na služby</a>
			<span class="eyebrow">Služby · Prenájom</span>
			<h1 class="hero-title">Náradie, ktoré <span class="hero-accent">odvedie robotu.</span></h1>
			<p class="hero-lead">
				Od búracieho kladiva po lešenie. Požičajte si profesionálne vybavenie na jeden deň, víkend
				alebo dlhšie — bez toho, aby ste ho museli kupovať.
			</p>
			<div class="hero-actions">
				<a href={contact.phoneHref} rel="external" class="btn btn--primary">Overiť dostupnosť</a>
				<a href="#hilti" class="btn btn--ghost">Náradie Hilti →</a>
			</div>
			<p class="hero-availability">Aktuálnu dostupnosť potvrdíme telefonicky</p>
		</div>
		<div class="photo-cell" data-reveal {@attach reveal(80)}>
			<ResponsiveServiceImage
				media={heroPhoto}
				alt="Profesionálne búracie kladivo s odsávaním pri práci"
				loading="eager"
				fetchpriority="high"
			/>
		</div>
		<div class="stat-cell" data-reveal {@attach reveal(140)}>
			<strong>20+</strong>
			<span>druhov<br />vybavenia</span>
		</div>
		<div class="acc acc--hy" aria-hidden="true"></div>
		<div class="acc acc--hb" aria-hidden="true"></div>
	</div>

	<!-- 2. Catalogue composition -->
	<div class="canvas cat-canvas" id="ponuka">
		<header class="head-cell" data-reveal {@attach reveal()}>
			<span class="eyebrow">Čo si požičiate</span>
			<h2 class="section-title">Vybavenie podľa práce</h2>
		</header>
		<div class="note-cell" data-reveal {@attach reveal(80)}>
			<p>
				Ponuka vychádza z nášho vybavenia. Konkrétny model a voľný termín si overte pred príchodom.
			</p>
		</div>
		<div class="acc acc--cy" aria-hidden="true"></div>

		{#each categories as category, i (category.title)}
			{@const carded = category.items.filter((it) => toolForItem(it)?.productImage)}
			{@const plain = category.items.filter((it) => !toolForItem(it)?.productImage)}
			<article class="equip-cell" data-reveal {@attach reveal(Math.min((i % 2) * 80, 160))}>
				<div class="equip-photo">
					<img src={category.image} alt={category.alt} loading="lazy" />
					<span class="equip-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
				</div>
				<div class="equip-copy">
					<h3>{category.title}</h3>
					{#if carded.length > 0}
						<div class="tool-cards">
							{#each carded as item (item)}
								{@const tool = toolForItem(item)}
								{#if tool?.productImage}
									<a
										href={resolve('/services/pozicovna-naradia/[slug]', { slug: tool.slug })}
										class="tool-card"
									>
										<img src={tool.productImage} alt="" loading="lazy" />
										<span class="tool-card-model">{tool.model}</span>
										<span class="tool-card-desc">{tool.short}</span>
									</a>
								{/if}
							{/each}
						</div>
					{/if}
					{#if plain.length > 0}
						<ul>
							{#each plain as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					{/if}
				</div>
			</article>
		{/each}

		<!-- Seven categories leave half a row open; a De Stijl block fills it so the
		     grid still closes on a full line. -->
		<div class="mondrian-cell" data-reveal {@attach reveal(80)} aria-hidden="true">
			<span class="mb mb--a"></span>
			<span class="mb mb--b"></span>
			<span class="mb mb--c"></span>
			<span class="mb mb--d"></span>
			<span class="mb mb--e"></span>
			<span class="mb mb--f"></span>
			<span class="mb mb--g"></span>
		</div>

		<div class="call-cell" data-reveal {@attach reveal()}>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path
					d="M12 9v4m0 4h.01M10.3 3.7 2.4 17.4A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.6L13.7 3.7a2 2 0 0 0-3.4 0Z"
				/>
			</svg>
			<p>
				Nenašli ste presne to, čo potrebujete?
				<a href={contact.phoneHref} rel="external">Zavolajte nám na {contact.phone}</a>
				— ponuka a dostupnosť vybavenia sa priebežne menia.
			</p>
		</div>
		<div class="acc acc--cr" aria-hidden="true"></div>
	</div>

	<!-- 3. Hilti bento — the professional line we stock -->
	<div class="canvas hilti-canvas" id="hilti">
		<div class="hilti-copy" data-reveal {@attach reveal()}>
			<img src={hiltiLogo} alt="Hilti" class="hilti-logo" />
			<h2 class="hilti-title">Profesionálne náradie Hilti</h2>
			<p class="hilti-lead">
				Jadro našej požičovne tvorí náradie Hilti – búracie a kombinované kladivá, píly, drážkovačky
				aj priemyselné vysávače. Sú to stroje, ktoré denne znesú zaťaženie na stavbe a my ich
				udržiavame v prevádzkyschopnom stave.
			</p>
		</div>

		{#each hiltiRows as row, r (r)}
			<div class="hilti-row">
				{#each row as tool, i (tool.slug)}
					<a
						href={resolve('/services/pozicovna-naradia/[slug]', { slug: tool.slug })}
						class="tool-tile"
						data-reveal
						{@attach reveal(Math.min((r * 4 + i) * 50, 320))}
					>
						<span class="tool-shot">
							{#if tool.productImage}
								<img src={tool.productImage} alt="" loading="lazy" />
							{/if}
						</span>
						<span class="tool-model">{tool.model}</span>
						<span class="tool-cat">{tool.category}</span>
						<svg class="tool-arrow" viewBox="0 0 24 24" aria-hidden="true">
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="13 6 19 12 13 18" />
						</svg>
					</a>
				{/each}
				{#if r === hiltiRows.length - 1}
					<div class="acc acc--hiy" aria-hidden="true"></div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- 4. Process + conditions composition -->
	<div class="canvas process-canvas">
		<div class="steps-cell" data-reveal {@attach reveal()}>
			<span class="eyebrow">Postup</span>
			<h2 class="section-title section-title--sm">Tri kroky a môžete pracovať</h2>
			<ol class="steps">
				{#each steps as step, i (step.title)}
					<li>
						<span class="step-no">{i + 1}</span>
						<div>
							<span class="step-title">{step.title}</span>
							<p class="step-text">{step.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
		<div class="cond-cell" data-reveal {@attach reveal(120)}>
			<span class="eyebrow eyebrow--light">Podmienky</span>
			<h2 class="section-title section-title--sm section-title--light">
				Čo potrebujete pri prevzatí
			</h2>
			<ul class="conditions">
				{#each conditions as condition (condition)}
					<li>{condition}</li>
				{/each}
			</ul>
		</div>
		<div class="acc acc--py" aria-hidden="true"></div>
	</div>

	<!-- 5. CTA composition -->
	<div class="canvas cta-canvas">
		<div class="cta-cell" data-reveal {@attach reveal()}>
			<h2 class="cta-title">Povedzte nám, čo idete robiť</h2>
			<p class="cta-sub">Pomôžeme vybrať správny stroj a overíme jeho dostupnosť.</p>
			<div class="cta-actions">
				<a href={contact.phoneHref} rel="external" class="cta-phone">{contact.phone}</a>
				<a href={contact.emailHref} rel="external" class="cta-mail">Napísať e-mail</a>
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

	.eyebrow--light {
		color: var(--color-white);
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

	.section-title--sm {
		font-size: var(--font-size-display-md);
		margin-bottom: 1.5rem;
	}

	.section-title--light {
		color: var(--color-white);
	}

	/* ===== Canvases — iron ground, cells paint themselves ===== */
	.canvas {
		/* Clears the sticky header when jumped to from the banner. */
		scroll-margin-top: 84px;
		display: grid;
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	/* ===== 1. Hero ===== */
	.hero-canvas {
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: minmax(430px, auto) 110px;
		grid-template-areas:
			'copy copy copy copy copy photo photo photo photo photo photo photo'
			'copy copy copy copy copy stat  stat  stat  stat  hy    hy    hb';
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
		max-width: 12ch;
		font-family: var(--font-display);
		font-size: var(--font-size-display-xl);
		font-weight: 700;
		line-height: 0.92;
		text-transform: uppercase;
		letter-spacing: 0.005em;
		color: var(--color-iron);
	}

	.hero-accent {
		color: var(--color-brand-primary);
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
	.call-cell a:focus-visible {
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

	.hero-availability {
		margin: 0.15rem 0 0;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--text-muted);
	}

	.photo-cell {
		grid-area: photo;
		position: relative;
		overflow: hidden;
		min-width: 0;
		background-color: var(--color-white);
	}

	.photo-cell :global(img) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		filter: grayscale(100%) contrast(1.06) brightness(0.98);
		transition:
			filter var(--transition-medium),
			transform var(--transition-medium);
	}

	@media (hover: hover) {
		.photo-cell:hover :global(img) {
			filter: grayscale(0%) contrast(1.02);
		}
	}

	.stat-cell {
		grid-area: stat;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.8rem;
		padding: 0.75rem 1rem;
		background-color: var(--color-brand-primary);
		color: var(--color-white);
		font-family: var(--font-display);
		text-transform: uppercase;
	}

	.stat-cell strong {
		/* Grows with the viewport but stays inside the 110px hero row. */
		font-size: clamp(3.25rem, 5.5vw, 4.5rem);
		line-height: 0.9;
		font-weight: 700;
	}

	.stat-cell span {
		font-size: 0.78rem;
		line-height: 1.1;
		letter-spacing: 0.1em;
	}

	/* ===== 2. Hilti bento ===== */
	.hilti-canvas {
		display: flex;
		flex-direction: column;
	}

	.hilti-copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
		padding: clamp(1.75rem, 3.5vw, 2.75rem) clamp(1.5rem, 3vw, 3rem);
		background-color: var(--color-white);
	}

	.hilti-logo {
		height: 34px;
		width: auto;
	}

	.hilti-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-display-md);
		font-weight: 700;
		line-height: 1.05;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-iron);
	}

	.hilti-lead {
		margin: 0;
		max-width: 70ch;
		line-height: 1.7;
		color: var(--text-muted);
	}

	.hilti-row {
		display: flex;
		gap: 5px;
		height: 232px;
		transition: height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.tool-tile {
		position: relative;
		flex: 1 1 0;
		min-width: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.15rem;
		padding: 1rem 1.2rem 1.1rem;
		background-color: var(--color-white);
		text-decoration: none;
		overflow: hidden;
		transition:
			flex-grow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			background-color var(--transition-fast),
			opacity var(--transition-reveal) var(--reveal-delay, 0ms),
			transform var(--transition-reveal) var(--reveal-delay, 0ms);
	}

	/* The product shot fills the free space above the label and grows with it. */
	/* Every product shot sits on the same 640×360 canvas, so the tiles show
	   them at one consistent size no matter the tool's real proportions. */
	.tool-shot {
		display: flex;
		align-items: center;
		justify-content: center;
		/* flex-basis 0 gives the box a definite height inside the fixed-height
		   row, so the shot scales to the tile instead of setting its height. */
		flex: 1 1 0;
		min-height: 0;
		width: 100%;
		margin-bottom: 0.35rem;
		overflow: hidden;
	}

	.tool-shot img {
		/* max-constraints, not width/height:100% — a percentage height inside the
		   flexed box resolves against the wrong thing and overflows on hover. */
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.tool-model {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-iron);
		transition: color var(--transition-fast);
	}

	.tool-cat {
		font-size: var(--font-size-small);
		color: var(--text-muted);
	}

	.tool-arrow {
		position: absolute;
		right: 1.1rem;
		bottom: 1.2rem;
		width: 20px;
		height: 20px;
		fill: none;
		stroke: var(--color-brand-primary);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		opacity: 0;
		transform: translateX(-6px);
		transition:
			opacity var(--transition-fast),
			transform var(--transition-fast);
	}

	@media (hover: hover) {
		.tool-tile:hover {
			flex-grow: 3;
			background-color: var(--color-chalk);
		}

		.tool-tile:hover .tool-model {
			color: var(--color-brand-primary);
		}

		.tool-tile:hover .tool-arrow {
			opacity: 1;
			transform: none;
		}

		/* The row grows with the selected tile, so the picture gets real room. */
		.hilti-row:has(.tool-tile:hover) {
			height: 320px;
		}
	}

	.acc--hiy {
		flex: 0 0 90px;
		background-color: var(--color-accent-yellow);
	}

	/* ===== 3. Catalogue ===== */
	.cat-canvas {
		grid-template-columns: repeat(12, 1fr);
	}

	.head-cell {
		grid-column: span 7;
		background-color: var(--color-white);
		padding: 1.75rem clamp(1.25rem, 3vw, 2.5rem) 1.9rem;
	}

	.note-cell {
		grid-column: span 3;
		display: flex;
		align-items: center;
		padding: 1.25rem 1.5rem;
		background-color: var(--color-white);
	}

	.note-cell p {
		margin: 0;
		font-size: var(--font-size-small);
		color: var(--text-muted);
		line-height: 1.55;
	}

	.equip-cell {
		grid-column: span 6;
		display: grid;
		grid-template-columns: minmax(150px, 0.72fr) minmax(0, 1.28fr);
		min-height: 320px;
		min-width: 0;
		background-color: var(--color-white);
	}

	.equip-photo {
		position: relative;
		overflow: hidden;
		background-color: var(--color-chalk);
	}

	.equip-photo img {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: grayscale(100%) contrast(1.06);
		transition:
			filter var(--transition-medium),
			transform var(--transition-medium);
	}

	@media (hover: hover) {
		.equip-cell:hover .equip-photo img {
			filter: grayscale(0%) contrast(1.02);
		}
	}

	.equip-photo::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 65%, rgba(30, 32, 34, 0.5));
		pointer-events: none;
	}

	.equip-no {
		position: absolute;
		left: 0.75rem;
		bottom: 0.5rem;
		z-index: 1;
		font-family: var(--font-display);
		font-size: 2.1rem;
		font-weight: 700;
		color: var(--color-white);
		/* Stays legible even before the photo behind it loads. */
		text-shadow: 0 1px 6px rgba(15, 17, 19, 0.75);
	}

	.equip-copy {
		padding: 1.55rem 1.4rem 1.35rem;
	}

	.equip-copy h3 {
		margin: 0 0 1rem;
		font-family: var(--font-display);
		font-size: 1.45rem;
		font-weight: 700;
		line-height: 1.05;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-iron);
	}

	.equip-copy ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.equip-copy li {
		position: relative;
		padding-left: 1rem;
		font-size: 0.87rem;
		line-height: 1.42;
		color: var(--color-steel);
	}

	/* Tools with a product photo become cards; anything else stays a dash row. */
	.tool-cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 5px;
		margin: 0 0 1rem;
	}

	.tool-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		padding: 0.75rem 0.6rem 0.8rem;
		background-color: var(--color-chalk);
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.tool-card:hover {
		background-color: #e6e9eb;
	}

	.tool-card img {
		width: 100%;
		height: 96px;
		object-fit: contain;
	}

	.tool-card-model {
		font-family: var(--font-display);
		font-size: 0.92rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		text-align: center;
		color: var(--color-iron);
		transition: color var(--transition-fast);
	}

	.tool-card:hover .tool-card-model {
		color: var(--color-brand-primary);
	}

	/* The model code is the headline; this says what the machine actually is,
	   set tight beneath it so the two read as one label. */
	.tool-card-desc {
		margin-top: -0.22rem;
		font-size: 0.76rem;
		line-height: 1.25;
		text-align: center;
		text-wrap: balance;
		color: color-mix(in srgb, var(--color-iron) 62%, var(--color-white));
	}

	.tool-card:focus-visible {
		outline: 3px solid var(--color-brand-hover);
		outline-offset: 2px;
	}

	.equip-copy li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.58em;
		width: 0.45rem;
		height: 2px;
		background-color: var(--color-brand-primary);
	}

	/* Same 5px iron gutters as the canvas, so the block reads as more grid
	   rather than as a picture dropped into one. */
	.mondrian-cell {
		grid-column: span 6;
		display: grid;
		gap: 5px;
		min-height: 320px;
		grid-template-columns: 1.35fr 0.75fr 0.75fr 0.6fr 0.75fr;
		grid-template-rows: 1fr 0.7fr 0.85fr 0.8fr;
		grid-template-areas:
			'a a a b b'
			'a a a c d'
			'e f f c d'
			'e f f g g';
		background-color: var(--color-iron);
	}

	.mb {
		min-width: 0;
		background-color: var(--color-white);
	}

	.mb--a {
		grid-area: a;
	}

	.mb--b {
		grid-area: b;
		background-color: var(--color-accent-blue);
	}

	.mb--c {
		grid-area: c;
	}

	.mb--d {
		grid-area: d;
		background-color: var(--color-accent-yellow);
	}

	.mb--e {
		grid-area: e;
		background-color: var(--color-brand-primary);
	}

	.mb--f {
		grid-area: f;
		background-color: var(--color-chalk);
	}

	.mb--g {
		grid-area: g;
	}

	.call-cell {
		grid-column: span 10;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.1rem 1.25rem;
		background-color: var(--color-iron);
		color: var(--color-white);
	}

	.call-cell svg {
		width: 24px;
		height: 24px;
		flex: 0 0 auto;
		fill: none;
		stroke: var(--color-brand-hover);
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.call-cell p {
		margin: 0;
		font-size: var(--font-size-small);
		line-height: 1.5;
	}

	.call-cell a {
		color: var(--color-white);
		font-weight: 700;
		text-decoration-color: var(--color-brand-hover);
		text-underline-offset: 3px;
	}

	/* ===== 3. Process + conditions ===== */
	.process-canvas {
		grid-template-columns: repeat(12, 1fr);
		/* Every named area must stay rectangular — an L-shaped area invalidates
		   the whole declaration and the cells fall back to auto-placement. */
		grid-template-areas:
			'steps steps steps steps steps steps steps cond cond cond cond cond'
			'py    py    py    py    py    py    py    cond cond cond cond cond';
		grid-template-rows: auto 42px;
	}

	.steps-cell {
		grid-area: steps;
		background-color: var(--color-white);
		padding: clamp(1.75rem, 3.5vw, 3rem);
	}

	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	.steps li {
		display: grid;
		grid-template-columns: 56px 1fr;
		gap: 1.1rem;
		padding: 1.15rem 0;
		border-bottom: 1px solid var(--border-default);
	}

	.steps li:last-child {
		border-bottom: 0;
		padding-bottom: 0;
	}

	.step-no {
		font-family: var(--font-display);
		font-size: 2.4rem;
		font-weight: 700;
		line-height: 1;
		color: var(--color-brand-primary);
		font-variant-numeric: tabular-nums;
	}

	.step-title {
		display: block;
		margin-bottom: 0.25rem;
		font-family: var(--font-display);
		font-size: 1.2rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: var(--color-iron);
	}

	.step-text {
		margin: 0;
		font-size: var(--font-size-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.cond-cell {
		grid-area: cond;
		padding: clamp(1.75rem, 4vw, 3rem);
		background-color: var(--color-iron);
		color: var(--color-white);
	}

	.conditions {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.conditions li {
		position: relative;
		padding: 0 0 1rem 1.35rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.14);
		font-size: var(--font-size-small);
		font-weight: 500;
		line-height: 1.55;
		color: var(--color-concrete);
	}

	.conditions li:last-child {
		padding-bottom: 0;
		border-bottom: 0;
	}

	.conditions li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55em;
		width: 0.55rem;
		height: 3px;
		background-color: var(--color-brand-hover);
	}

	/* ===== 4. CTA ===== */
	.cta-canvas {
		grid-template-columns: repeat(12, 1fr);
	}

	/* Grid, not space-between flex: three named columns hold their places
	   instead of the middle line drifting with its own text length. */
	.cta-cell {
		grid-column: span 10;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 1.25rem 2rem;
		padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3.5rem);
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

	/* Same condensed face as the title, one step down — the two lines read as a
	   single poster block instead of a heading with a caption stuck beneath it. */
	.cta-sub {
		margin: 0;
		justify-self: center;
		max-width: 34ch;
		text-align: center;
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 500;
		line-height: 1.25;
		color: rgba(255, 255, 255, 0.88);
	}

	/* Phone first, mail as a deliberate second line under it. */
	.cta-actions {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.4rem;
		text-align: right;
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

	.cta-mail {
		font-family: var(--font-display);
		font-size: 1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.85);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.cta-mail:hover {
		color: var(--color-white);
		text-decoration-thickness: 2px;
	}

	/* ===== Accent cells ===== */
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

	.acc--cy {
		grid-column: span 2;
		background-color: var(--color-accent-yellow);
	}

	.acc--cr {
		grid-column: span 2;
		background-color: var(--color-brand-primary);
	}

	.acc--py {
		grid-area: py;
		background-color: var(--color-accent-yellow);
	}

	.acc--ty {
		grid-column: span 2;
		background-color: var(--color-accent-yellow);
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

	/* ===== Responsive ===== */
	@media (max-width: 1000px) {
		.equip-cell {
			grid-column: span 12;
		}

		.cta-cell {
			grid-template-columns: 1fr;
			justify-items: start;
		}

		.cta-sub {
			justify-self: start;
			text-align: left;
		}

		.cta-actions {
			align-items: flex-start;
			text-align: left;
		}

		.mondrian-cell {
			grid-column: span 12;
			min-height: 220px;
		}

		.hero-canvas {
			grid-template-rows: minmax(380px, auto) 96px;
		}
	}

	@media (max-width: 800px) {
		.hilti-row {
			flex-direction: column;
			height: auto;
			gap: 4px;
		}

		.tool-tile {
			height: 190px;
		}

		.acc--hiy {
			flex: none;
			min-height: 22px;
		}

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
			padding: 1.5rem 1rem 1.6rem;
		}

		.photo-cell {
			min-height: 300px;
		}

		.stat-cell {
			padding: 1rem;
		}

		.head-cell,
		.note-cell {
			padding: 1.25rem 1rem 1.4rem;
		}

		.equip-cell {
			grid-template-columns: 1fr;
			min-height: 0;
		}

		.equip-photo {
			min-height: 240px;
		}

		.steps-cell,
		.cond-cell {
			padding: 1.5rem 1.2rem 1.6rem;
		}

		.cta-cell {
			padding: 1.75rem 1.2rem 1.9rem;
		}

		.acc {
			min-height: 22px;
		}

		.mondrian-cell {
			min-height: 180px;
		}
	}

	@media (max-width: 560px) {
		.hero-actions {
			width: 100%;
			flex-direction: column;
		}

		.hero-actions .btn {
			width: 100%;
		}
	}

	/* ===== Reduced motion ===== */
	@media (prefers-reduced-motion: reduce) {
		[data-reveal] {
			opacity: 1;
			transform: none;
			transition: none;
		}

		.btn,
		.photo-cell :global(img),
		.equip-photo img {
			transition: none;
		}
	}
</style>
