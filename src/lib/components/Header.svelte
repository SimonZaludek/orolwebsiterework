<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import logo from '$lib/assets/used_orol_logos/orol_logo_all_white_with_text.svg';
	import logoMark from '$lib/assets/used_orol_logos/orol_all_white.svg';
	import { navLinks, contact, socials } from '$lib/site';
	import InstagramIcon from './icons/InstagramIcon.svelte';
	import FacebookIcon from './icons/FacebookIcon.svelte';
	import MenuIcon from './icons/MenuIcon.svelte';
	import CloseIcon from './icons/CloseIcon.svelte';

	let menuOpen = $state(false);
	let compact = $state(false);
	let hidden = $state(false);
	let activeSection = $state('');

	$effect(() => {
		let lastY = window.scrollY;

		const onScroll = () => {
			const y = window.scrollY;
			// Always show near the very top; keep visible while the mobile menu is open.
			if (y < 80 || menuOpen) {
				hidden = false;
			} else if (y > lastY) {
				hidden = true; // scrolling down → hide
			} else if (y < lastY) {
				hidden = false; // scrolling up → show
			}
			lastY = y;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// Scroll-spy: on the homepage, highlight the nav link of the section in view.
	$effect(() => {
		if (page.url.pathname !== '/') {
			activeSection = '';
			return;
		}

		const ids = navLinks
			.map((l) => l.href)
			.filter((href) => href.startsWith('/#'))
			.map((href) => href.slice(2));
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;

		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			// A slim horizontal band ~1/3 down the viewport decides the active section.
			{ rootMargin: '-30% 0px -65% 0px' }
		);
		for (const el of sections) io.observe(el);
		return () => io.disconnect();
	});

	function isActive(href: string): boolean {
		if (href.startsWith('/#')) {
			return activeSection === href.slice(2);
		}
		if (href === '/') {
			return page.url.pathname === '/';
		}
		if (!page.url.pathname.startsWith(href)) {
			return false;
		}
		// The most specific nav match wins (Požičovňa over Služby on the rental page).
		return !navLinks.some(
			(l) => l.href.length > href.length && page.url.pathname.startsWith(l.href)
		);
	}

	function closeMenu() {
		menuOpen = false;
	}

	function observeOverflow(el: HTMLElement) {
		let naturalWidth = 0;
		let isCompact = false;

		const measure = () => {
			if (!isCompact) {
				naturalWidth = el.scrollWidth;
			}
			if (naturalWidth > 0) {
				const shouldCompact = el.clientWidth < naturalWidth;
				if (shouldCompact !== isCompact) {
					isCompact = shouldCompact;
					compact = shouldCompact;
				}
			}
		};

		measure();
		document.fonts?.ready.then(measure);

		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}
</script>

<header class:hidden>
	<div class="header-inner" class:compact {@attach observeOverflow}>
		<!-- Logo + Site name -->
		<a href={resolve('/')} class="brand" onclick={closeMenu}>
			<img src={logo} alt="Stavebniny Orol logo" class="logo logo-full" />
			<img src={logoMark} alt="" aria-hidden="true" class="logo logo-mark" />
		</a>

		<!-- Desktop navigation -->
		<nav class="desktop-nav" aria-label="Hlavná navigácia">
			{#each navLinks as link (link.href)}
				<a
					href={resolve(link.href)}
					class="nav-link"
					class:active={isActive(link.href)}
					aria-current={isActive(link.href) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Persistent CTA — red cell -->
		<a href={resolve('/quote')} class="desktop-cta">Cenová ponuka</a>

		<!-- Desktop contact + social -->
		<div class="desktop-contact">
			<a href={contact.phoneHref} rel="external" class="phone">{contact.phone}</a>
			<div class="social-links">
				<a
					href={socials.instagram}
					class="social-link"
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="Instagram"
				>
					<InstagramIcon size={22} />
				</a>
				<a
					href={socials.facebook}
					class="social-link"
					target="_blank"
					rel="external noopener noreferrer"
					aria-label="Facebook"
				>
					<FacebookIcon size={22} />
				</a>
			</div>
		</div>

		<!-- Fills the gap between brand and hamburger once the nav collapses,
		     so the iron ground never shows as a dark band across the header. -->
		<div class="brand-fill" aria-hidden="true"></div>

		<!-- Hamburger button (mobile) -->
		<button
			class="hamburger"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label={menuOpen ? 'Zavrieť menu' : 'Otvoriť menu'}
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
		>
			{#if menuOpen}
				<CloseIcon />
			{:else}
				<MenuIcon />
			{/if}
		</button>
	</div>

	<!-- Mobile drawer -->
	{#if menuOpen}
		<div class="mobile-menu" id="mobile-menu" role="dialog" aria-label="Mobilné menu">
			<nav aria-label="Mobilná navigácia">
				{#each navLinks as link (link.href)}
					<a
						href={resolve(link.href)}
						class="mobile-nav-link"
						class:active={isActive(link.href)}
						aria-current={isActive(link.href) ? 'page' : undefined}
						onclick={closeMenu}
					>
						{link.label}
					</a>
				{/each}
				<div class="mobile-index-links">
					<a
						href={resolve('/quote')}
						class="mobile-index-link mobile-index-link--cta"
						onclick={closeMenu}
					>
						Cenová ponuka →
					</a>
				</div>
			</nav>
			<div class="mobile-contact">
				<a href={contact.phoneHref} rel="external" class="mobile-phone">{contact.phone}</a>
				<div class="mobile-social">
					<a
						href={socials.instagram}
						class="social-link"
						target="_blank"
						rel="external noopener noreferrer"
						aria-label="Instagram"
						onclick={closeMenu}
					>
						<InstagramIcon size={24} />
						Instagram
					</a>
					<a
						href={socials.facebook}
						class="social-link"
						target="_blank"
						rel="external noopener noreferrer"
						aria-label="Facebook"
						onclick={closeMenu}
					>
						<FacebookIcon size={24} />
						Facebook
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	header {
		/* Shared by the header row and the mobile drawer's height cap. */
		--header-row-height: 72px;
		position: sticky;
		top: 0;
		z-index: var(--z-header);
		/* The iron ground shows through cell gaps as the Mondrian grid lines. */
		background-color: var(--color-iron);
		color: var(--text-on-dark);
		/* Never let header content push the page wider than the viewport
		   (e.g. before the overflow-observer switches to the hamburger). */
		overflow-x: hidden;
		/* Hide on scroll-down, reveal on scroll-up. */
		transition: transform 0.3s ease;
	}

	header.hidden {
		transform: translateY(-100%);
	}

	@media (prefers-reduced-motion: reduce) {
		header {
			transition: none;
		}
	}

	.header-inner {
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		height: var(--header-row-height);
		gap: 5px;
		padding-bottom: 5px;
	}

	/* ---- Brand — red cell ---- */
	.brand {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0 clamp(1rem, 3vw, 2rem);
		background-color: var(--color-brand-primary);
		text-decoration: none;
		/* Must NOT shrink: the overflow observer decides to collapse the nav by
		   comparing scrollWidth against clientWidth, and a brand that shrinks to
		   fit absorbs the overflow silently — the row never reports being too
		   narrow, so the hamburger never appears and the logo is squashed
		   instead. Holding its natural width makes the row genuinely overflow. */
		min-width: 0;
		flex: 0 0 auto;
		overflow: hidden;
	}

	.logo {
		/* ============================================================
		   HEADER LOGO SCALING — adjust this value to resize the logo.

		   Responsive order as the header narrows:
		     1. logo shrinks 40px → 30px
		     2. desktop nav collapses into the hamburger (1280px), which frees
		        the whole row — the logo stops shrinking and holds 40px
		     3. logo swaps to the icon-only mark (below 420px), floor 34px
		   ============================================================ */
		height: clamp(30px, 3.2vw, 40px);
		width: auto;
		display: block;
		/* Never wider than the space the flex row leaves for the brand. */
		max-width: 100%;
		object-fit: contain;
		object-position: left center;
	}

	/* Narrow viewports show the icon-only mark instead of the logo with text. */
	.logo-mark {
		display: none;
	}

	/* ---- Desktop nav — white cell ---- */
	.desktop-nav {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.25rem;
		flex: 1;
		background-color: var(--color-white);
		padding: 0 1.25rem;
	}

	.nav-link {
		position: relative;
		padding: 0.45rem 0.85rem;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-steel);
		text-decoration: none;
		transition: color var(--transition-fast);
		white-space: nowrap;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0.85rem;
		right: 0.85rem;
		height: 2px;
		background-color: var(--color-brand-primary);
		border-radius: 2px;
		transform: scaleX(0);
		transition: transform 0.18s ease;
	}

	.nav-link:hover {
		color: var(--color-brand-primary);
	}

	.nav-link:hover::after {
		transform: scaleX(1);
	}

	.nav-link.active {
		color: var(--color-brand-primary);
	}

	.nav-link.active::after {
		transform: scaleX(1);
	}

	/* ---- Persistent CTA — red cell ---- */
	.desktop-cta {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		padding: 0 clamp(1rem, 2.5vw, 1.75rem);
		background-color: var(--color-brand-primary);
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		text-decoration: none;
		white-space: nowrap;
		transition: background-color var(--transition-fast);
	}

	.desktop-cta:hover {
		background-color: var(--color-brand-hover);
	}

	/* ---- Desktop contact — white cell ---- */
	.desktop-contact {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;
		background-color: var(--color-white);
		padding: 0 clamp(1rem, 2.5vw, 1.75rem);
	}

	.phone {
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--color-iron);
		text-decoration: none;
		letter-spacing: 0.04em;
		white-space: nowrap;
		transition: color var(--transition-fast);
		font-variant-numeric: tabular-nums;
	}

	.phone:hover {
		color: var(--color-brand-primary);
	}

	.social-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--color-steel);
		text-decoration: none;
		transition: color var(--transition-fast);
		line-height: 1;
	}

	.social-link:hover {
		color: var(--color-brand-primary);
	}

	/* ---- Filler cell — only present once the nav has collapsed ---- */
	.brand-fill {
		display: none;
		flex: 1 1 auto;
		min-width: 0;
		background-color: var(--color-white);
	}

	/* ---- Hamburger — red cell ---- */
	.hamburger {
		display: none;
		background-color: var(--color-brand-primary);
		border: none;
		color: var(--color-white);
		cursor: pointer;
		padding: 0 1.2rem;
		line-height: 1;
		transition: background-color var(--transition-fast);
		flex-shrink: 0;
	}

	.hamburger:hover {
		background-color: var(--color-brand-hover);
	}

	/* ---- Mobile menu — white cell ---- */
	/* Iron canvas, same as every other Mondrian block on the site: the ground
	   shows through as 5px grid lines around and between the white cells. */
	.mobile-menu {
		background-color: var(--color-iron);
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 0 5px 5px;
		/* On short phones the drawer is taller than what is left below the
		   pinned header row — scroll inside it instead of running off screen.
		   dvh accounts for the mobile browser chrome collapsing on scroll. */
		max-height: calc(100vh - var(--header-row-height));
		max-height: calc(100dvh - var(--header-row-height));
		overflow-y: auto;
		/* Don't chain the scroll to the page once the drawer hits its end. */
		overscroll-behavior: contain;
		-webkit-overflow-scrolling: touch;
	}

	.mobile-menu nav {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		background-color: var(--color-white);
		padding: 1rem 1.25rem 1.25rem;
	}

	.mobile-nav-link {
		display: block;
		padding: 0.65rem 0.75rem;
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-steel);
		text-decoration: none;
		border-left: 3px solid transparent;
		transition:
			color var(--transition-fast),
			border-color var(--transition-fast),
			background-color var(--transition-fast);
	}

	.mobile-nav-link:hover {
		color: var(--color-brand-primary);
		background-color: var(--color-chalk);
		border-left-color: var(--color-brand-hover);
	}

	.mobile-nav-link.active {
		color: var(--color-brand-primary);
		border-left-color: var(--color-brand-primary);
		background-color: rgba(192, 40, 28, 0.06);
	}

	.mobile-index-links {
		display: grid;
		gap: 5px;
		margin-top: 0.85rem;
	}

	.mobile-index-link {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.85rem 0.5rem;
		background-color: var(--color-brand-primary);
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 0.95rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-align: center;
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.mobile-index-link:hover {
		background-color: var(--color-brand-hover);
	}

	/* The quote CTA spans the full drawer width above the two index links. */
	.mobile-index-link--cta {
		grid-column: 1 / -1;
		font-size: 1.05rem;
	}

	.mobile-contact {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		background-color: var(--color-white);
		padding: 1.1rem 1.25rem 1.25rem;
	}

	.mobile-phone {
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-iron);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition: color var(--transition-fast);
	}

	.mobile-phone:hover {
		color: var(--color-brand-primary);
	}

	.mobile-social {
		display: flex;
		gap: 1.25rem;
	}

	.mobile-social .social-link {
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--color-steel);
	}

	/* ---- Dynamic collapse (JS sets .compact when content would overflow) ---- */
	.header-inner.compact .desktop-nav,
	.header-inner.compact .desktop-cta,
	.header-inner.compact .desktop-contact {
		display: none;
	}

	.header-inner.compact .hamburger {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-inner.compact .brand-fill {
		display: block;
	}

	/* No-JS / very narrow fallback */
	@media (max-width: 1280px) {
		.desktop-nav,
		.desktop-cta,
		.desktop-contact {
			display: none;
		}

		.hamburger {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.brand-fill {
			display: block;
		}

		/* Below here the hamburger is shown unconditionally, so the brand may
		   shrink again — on a phone the row is only brand + hamburger, and
		   letterboxing the logo beats overflowing the header. */
		.brand {
			flex: 0 1 auto;
		}

		/* The nav is gone, so the row has room again — hold the logo at full
		   size instead of letting it keep shrinking with the viewport. */
		.logo {
			height: clamp(34px, 4.5vw, 40px);
		}
	}

	/* ---- Logo swap — independent of the nav collapse above ---- */
	@media (max-width: 420px) {
		/* The 5px gap is the Mondrian grid line — it stays 5px at every width,
		   including after the logo swaps to the icon-only mark. */

		.logo-full {
			display: none;
		}

		.logo-mark {
			display: block;
			height: 34px;
		}
	}
</style>
