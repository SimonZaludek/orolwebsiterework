<script lang="ts">
	import { resolve } from '$app/paths';
	import { env } from '$env/dynamic/public';
	import { navLinks, contact, socials, legalLinks, company } from '$lib/site';
	import InstagramIcon from './icons/InstagramIcon.svelte';
	import FacebookIcon from './icons/FacebookIcon.svelte';
	import GoogleMap from './GoogleMap.svelte';
	import OrolMap from './OrolMap.svelte';
	import logoMark from '$lib/assets/used_orol_logos/orol_all_white.svg';

	const useGoogleMap = Boolean(env.PUBLIC_GOOGLE_MAPS_KEY);
</script>

<footer>
	<div class="mondrian">
		<a href={resolve('/')} class="cell cell--brand" aria-label="Stavebniny Orol — domov">
			<img src={logoMark} alt="Stavebniny Orol logo" class="brand-logo" />
		</a>

		<div class="cell cell--hours">
			<span class="cell-heading">Otváracie hodiny</span>
			<dl class="hours">
				<div class="hours-row">
					<dt>Pondelok – Piatok</dt>
					<dd>7:00 – 16:00</dd>
				</div>
				<div class="hours-row">
					<dt>Sobota</dt>
					<dd>7:00 – 12:00</dd>
				</div>
				<div class="hours-row">
					<dt>Nedeľa</dt>
					<dd>zatvorené</dd>
				</div>
			</dl>
		</div>

		<div class="cell cell--contact">
			<span class="cell-heading">Kontakt</span>
			<a href={contact.phoneHref} rel="external" class="contact-phone">{contact.phone}</a>
			<a href={contact.emailHref} rel="external" class="contact-email">{contact.email}</a>
			<div class="contact-social">
				<a
					href={socials.instagram}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="Instagram"
				>
					<InstagramIcon size={24} />
				</a>
				<a
					href={socials.facebook}
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="Facebook"
				>
					<FacebookIcon size={24} />
				</a>
			</div>
		</div>

		<nav class="cell cell--nav" aria-label="Pätičková navigácia">
			<span class="cell-heading">Navigácia</span>
			<div class="nav-links">
				{#each navLinks as link (link.href)}
					<a href={resolve(link.href)}>{link.label}</a>
				{/each}
			</div>
		</nav>

		<div class="cell cell--top1" aria-hidden="true"></div>
		<div class="cell cell--top2" aria-hidden="true"></div>
		<div class="cell cell--top3" aria-hidden="true"></div>
		<div class="cell cell--top4" aria-hidden="true"></div>
		<div class="cell cell--top5" aria-hidden="true"></div>

		<div class="cell cell--map">
			{#if useGoogleMap}
				<GoogleMap />
			{:else}
				<OrolMap />
			{/if}
		</div>

		<div class="cell cell--acc1" aria-hidden="true"></div>
		<div class="cell cell--acc2" aria-hidden="true"></div>
		<div class="cell cell--acc3" aria-hidden="true"></div>
		<div class="cell cell--acc4" aria-hidden="true"></div>
		<div class="cell cell--acc5" aria-hidden="true"></div>
	</div>

	<div class="footer-legal">
		<div class="legal-inner">
			<div class="legal-links">
				{#each legalLinks as link (link.href)}
					<a href={resolve(link.href)}>{link.label}</a>
				{/each}
			</div>
			<p class="legal-ids">
				IČO: {company.ico} · DIČ: {company.dic} · IČ DPH: {company.icDph}
			</p>
			<p class="legal-copy">© {company.copyrightYear} {company.name}</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-iron);
	}

	/* The Mondrian composition — iron shows through the gaps as the grid lines. */
	.mondrian {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-template-areas:
			'top1 top1 top2 top2 top2 top3 top4 top4 top4 top5 top5 top5'
			'map   map   map   map   map   map   map   map   map map map map'
			'brand brand hours hours contact contact nav nav nav nav nav nav'
			'acc1 acc1 acc1 acc2 acc2 acc3 acc3 acc3 acc4 acc5 acc5 acc5';
		gap: 5px;
		/* Heavier top edge separates the footer canvas from page content. */
		padding-top: 6px;
		background-color: var(--color-iron);
	}

	.cell {
		padding: 1.6rem 1.8rem;
		min-height: 72px;
		/* Deliberately NOT min-width: 0 — a cell must never become narrower than
		   its own content, or nowrap text runs straight through the padding and
		   touches the edge of the block. */
	}

	.cell-heading {
		display: block;
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-iron);
		margin-bottom: 0.7rem;
	}

	/* Brand — red block */
	.cell--brand {
		grid-area: brand;
		background-color: var(--color-brand-primary);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1.6rem 1.4rem;
		text-decoration: none;
	}

	.brand-logo {
		width: 100%;
		max-width: 200px;
		height: auto;
	}

	/* Hours — white block */
	.cell--hours {
		grid-area: hours;
		background-color: var(--color-white);
	}

	.hours {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.hours-row {
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		font-size: var(--font-size-small);
		max-width: 320px;
		/* Day and time never break across lines. */
		white-space: nowrap;
	}

	.hours-row dt {
		color: var(--text-muted);
	}

	.hours-row dd {
		margin: 0;
		font-weight: 600;
		color: var(--color-iron);
		font-variant-numeric: tabular-nums;
	}

	/* Navigation — white block */
	.cell--nav {
		grid-area: nav;
		background-color: var(--color-white);
	}

	/* One line only: the gap tightens as the cell narrows rather than letting a
	   link drop to a second row. */
	.nav-links {
		display: flex;
		flex-wrap: nowrap;
		align-items: baseline;
		column-gap: clamp(0.6rem, 1.6vw, 1.5rem);
	}

	.nav-links a {
		white-space: nowrap;
	}

	/* Map — its own cell in the composition */
	.cell--map {
		grid-area: map;
		position: relative;
		padding: 0;
		min-height: 460px;
		background-color: var(--color-white);
	}

	.cell--map :global(.map) {
		position: absolute;
		inset: 0;
		min-height: 0;
	}

	.cell--nav a {
		font-size: var(--font-size-small);
		font-weight: 500;
		color: var(--color-steel);
		text-decoration: none;
		line-height: 2;
		transition: color var(--transition-fast);
	}

	.cell--nav a:hover {
		color: var(--color-brand-primary);
	}

	/* Contact — red block beside the hours: phone, mail and socials in one cell */
	.cell--contact {
		grid-area: contact;
		background-color: var(--color-brand-primary);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 0.3rem;
	}

	/* Phone and mail each stay on a single line — the layout folds to two rows
	   before this cell ever gets narrow enough to break them. */
	.cell--contact a {
		max-width: 100%;
		white-space: nowrap;
	}

	.cell--contact .cell-heading {
		color: rgba(255, 255, 255, 0.75);
		margin-bottom: 0.45rem;
	}

	.contact-phone {
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 2.5vw, 1.9rem);
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--color-white);
		text-decoration: none;
		font-variant-numeric: tabular-nums;
	}

	.contact-phone:hover {
		text-decoration: underline;
	}

	.contact-email {
		font-size: var(--font-size-small);
		color: rgba(255, 255, 255, 0.85);
		text-decoration: none;
	}

	.contact-email:hover {
		color: var(--color-white);
		text-decoration: underline;
	}

	.contact-social {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		margin-top: 0.75rem;
	}

	.contact-social a {
		color: var(--color-white);
		line-height: 1;
		transition: color var(--transition-fast);
	}

	.contact-social a:hover {
		color: var(--color-accent-yellow);
	}

	/* Pure accent blocks */

	/* Opening row — five blocks above the map. Its breaks (2/5/6/9)
	   deliberately differ from the closing row's (3/5/8/9). */
	.cell--top1,
	.cell--top2,
	.cell--top3,
	.cell--top4,
	.cell--top5,
	.cell--acc1,
	.cell--acc2,
	.cell--acc3,
	.cell--acc4,
	.cell--acc5 {
		min-height: 56px;
		padding: 0;
	}

	.cell--top1 {
		grid-area: top1;
		background-color: var(--color-accent-blue);
	}

	.cell--top2 {
		grid-area: top2;
		background-color: var(--color-white);
	}

	.cell--top3 {
		grid-area: top3;
		background-color: var(--color-accent-yellow);
	}

	.cell--top4 {
		grid-area: top4;
		background-color: var(--color-brand-primary);
	}

	.cell--top5 {
		grid-area: top5;
		background-color: var(--color-white);
	}

	/* Closing row — five blocks of unequal width that close the canvas. */

	.cell--acc1 {
		grid-area: acc1;
		background-color: var(--color-accent-yellow);
	}

	.cell--acc2 {
		grid-area: acc2;
		background-color: var(--color-white);
	}

	.cell--acc3 {
		grid-area: acc3;
		background-color: var(--color-brand-primary);
	}

	.cell--acc4 {
		grid-area: acc4;
		background-color: var(--color-white);
	}

	.cell--acc5 {
		grid-area: acc5;
		background-color: var(--color-accent-blue);
	}

	/* Legal bar — the dark edge below the canvas */
	.footer-legal {
		background-color: var(--color-iron);
		font-size: var(--font-size-xs);
	}

	.legal-inner {
		max-width: var(--container-default);
		margin: 0 auto;
		padding: 0.9rem var(--container-px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.legal-links {
		display: flex;
		gap: 1.25rem;
	}

	.legal-links a {
		color: var(--color-concrete);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.legal-links a:hover {
		color: var(--color-brand-hover);
	}

	.legal-ids,
	.legal-copy {
		margin: 0;
		color: var(--color-slate);
		font-variant-numeric: tabular-nums;
	}

	/* Eight nav links on one line need roughly half the row; below this the four
	   cells can no longer all hold their content, so fold to two rows while the
	   phone, mail, hours and nav each still fit on a single line. */
	@media (max-width: 1600px) and (min-width: 761px) {
		.mondrian {
			grid-template-areas:
				'top1 top1 top2 top2 top2 top3 top4 top4 top4 top5 top5 top5'
				'map   map   map   map   map   map   map   map   map map map map'
				'brand brand brand hours hours hours hours hours hours hours hours hours'
				'contact contact contact contact nav nav nav nav nav nav nav nav'
				'acc1 acc1 acc1 acc2 acc2 acc3 acc3 acc3 acc4 acc5 acc5 acc5';
		}
	}

	@media (max-width: 760px) {
		.mondrian {
			grid-template-columns: repeat(4, 1fr);
			grid-template-areas:
				'top1 top1 top2 top3'
				'map map map map'
				'brand brand brand brand'
				'hours hours hours hours'
				'contact contact contact contact'
				'nav nav nav nav'
				'acc1 acc1 acc2 acc3';
			gap: 4px;
			padding-top: 14px;
		}

		.cell--map {
			min-height: 260px;
		}

		.cell--top4,
		.cell--top5,
		.cell--acc4,
		.cell--acc5 {
			display: none;
		}

		.cell--top1,
		.cell--top2,
		.cell--top3,
		.cell--acc1,
		.cell--acc2,
		.cell--acc3 {
			min-height: 34px;
		}

		.cell {
			padding: 1.2rem 1.3rem;
		}

		/* On a phone the row of links would overflow, so they stack instead. */
		.nav-links {
			flex-direction: column;
			row-gap: 0.1rem;
		}

		.legal-inner {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.4rem;
		}
	}
</style>
