<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import { contact, quoteCategories, transportOptions } from '$lib/site';
	import { reveal } from '$lib/reveal';

	let { form } = $props();

	let submitting = $state(false);

	function fieldValue(field: string): string {
		return (form?.values as Record<string, string> | undefined)?.[field] ?? '';
	}

	function fieldError(field: string): string | undefined {
		return (form?.errors as Record<string, string> | undefined)?.[field];
	}

	function sendError(): string | undefined {
		return (form as { sendError?: string } | undefined)?.sendError;
	}
</script>

<svelte:head>
	<title>Cenová ponuka – Stavebniny Orol</title>
	<meta
		name="description"
		content="Vyplňte formulár a my Vám pripravíme nezáväznú cenovú ponuku na stavebný materiál šitú na mieru Vášho projektu."
	/>
</svelte:head>

<section class="section" aria-label="Cenová ponuka">
	<div class="comp">
		<div class="comp-row comp-row--head">
			<header class="head-cell" data-reveal {@attach reveal()}>
				<span class="eyebrow">Služby</span>
				<h1 class="section-title">Cenová ponuka</h1>
				<p class="head-note">
					Vyplňte stručný formulár a my Vás kontaktujeme s nezáväznou cenovou ponukou. Polia
					označené hviezdičkou sú povinné.
				</p>
			</header>
			<div class="head-accent-cell" aria-hidden="true"></div>
			<div class="acc acc--yellow" aria-hidden="true"></div>
		</div>

		<div class="comp-row comp-row--body">
			<div class="form-cell">
				{#if form?.success}
					<div class="success" role="status" aria-live="polite">
						<h2>Ďakujeme za Vašu požiadavku!</h2>
						<p>
							Formulár sme prijali a čoskoro Vás budeme kontaktovať. V naliehavých prípadoch nám
							zavolajte na <a href={contact.phoneHref} rel="external">{contact.phone}</a>.
						</p>
						<a href={resolve('/')} class="success-link">Späť na úvod</a>
					</div>
				{:else}
					<form
						method="POST"
						class="quote-form"
						novalidate
						use:enhance={() => {
							submitting = true;
							return async ({ update }) => {
								await update();
								submitting = false;
							};
						}}
					>
						<div class="field">
							<label for="name"
								>Meno a priezvisko <span class="req" aria-hidden="true">*</span></label
							>
							<input
								id="name"
								name="name"
								type="text"
								autocomplete="name"
								required
								value={fieldValue('name')}
								aria-invalid={fieldError('name') ? 'true' : undefined}
								aria-describedby={fieldError('name') ? 'name-error' : undefined}
							/>
							{#if fieldError('name')}
								<p class="error" id="name-error">{fieldError('name')}</p>
							{/if}
						</div>

						<div class="row">
							<div class="field">
								<label for="phone"
									>Telefónne číslo <span class="req" aria-hidden="true">*</span></label
								>
								<input
									id="phone"
									name="phone"
									type="tel"
									autocomplete="tel"
									inputmode="tel"
									required
									value={fieldValue('phone')}
									aria-invalid={fieldError('phone') ? 'true' : undefined}
									aria-describedby={fieldError('phone') ? 'phone-error' : undefined}
								/>
								{#if fieldError('phone')}
									<p class="error" id="phone-error">{fieldError('phone')}</p>
								{/if}
							</div>

							<div class="field">
								<label for="email">E-mail <span class="req" aria-hidden="true">*</span></label>
								<input
									id="email"
									name="email"
									type="email"
									autocomplete="email"
									inputmode="email"
									required
									value={fieldValue('email')}
									aria-invalid={fieldError('email') ? 'true' : undefined}
									aria-describedby={fieldError('email') ? 'email-error' : undefined}
								/>
								{#if fieldError('email')}
									<p class="error" id="email-error">{fieldError('email')}</p>
								{/if}
							</div>
						</div>

						<div class="field">
							<label for="location"
								>Lokalita stavby <span class="req" aria-hidden="true">*</span></label
							>
							<input
								id="location"
								name="location"
								type="text"
								autocomplete="address-level2"
								required
								placeholder="Napr. Liptovský Mikuláš, Demänovská cesta"
								value={fieldValue('location')}
								aria-invalid={fieldError('location') ? 'true' : undefined}
								aria-describedby={fieldError('location') ? 'location-error' : undefined}
							/>
							{#if fieldError('location')}
								<p class="error" id="location-error">{fieldError('location')}</p>
							{/if}
						</div>

						<div class="row">
							<div class="field">
								<label for="transport">Doprava <span class="req" aria-hidden="true">*</span></label>
								<select
									id="transport"
									name="transport"
									required
									aria-invalid={fieldError('transport') ? 'true' : undefined}
									aria-describedby={fieldError('transport') ? 'transport-error' : undefined}
								>
									<option value="" disabled selected={!fieldValue('transport')}
										>Vyberte možnosť…</option
									>
									{#each transportOptions as opt (opt.value)}
										<option value={opt.value} selected={fieldValue('transport') === opt.value}>
											{opt.label}
										</option>
									{/each}
								</select>
								{#if fieldError('transport')}
									<p class="error" id="transport-error">{fieldError('transport')}</p>
								{/if}
							</div>

							<div class="field">
								<label for="category"
									>Kategória materiálu <span class="req" aria-hidden="true">*</span></label
								>
								<select
									id="category"
									name="category"
									required
									aria-invalid={fieldError('category') ? 'true' : undefined}
									aria-describedby={fieldError('category') ? 'category-error' : undefined}
								>
									<option value="" disabled selected={!fieldValue('category')}
										>Vyberte kategóriu…</option
									>
									{#each quoteCategories as cat (cat)}
										<option value={cat} selected={fieldValue('category') === cat}>{cat}</option>
									{/each}
								</select>
								{#if fieldError('category')}
									<p class="error" id="category-error">{fieldError('category')}</p>
								{/if}
							</div>
						</div>

						<div class="field">
							<label for="description">
								Stručný popis požiadavky <span class="req" aria-hidden="true">*</span>
							</label>
							<textarea
								id="description"
								name="description"
								rows="6"
								required
								placeholder="Napr. potrebujem cenovú ponuku na tehly a strop pre rodinný dom 120 m²…"
								aria-invalid={fieldError('description') ? 'true' : undefined}
								aria-describedby={fieldError('description') ? 'description-error' : undefined}
								>{fieldValue('description')}</textarea
							>
							{#if fieldError('description')}
								<p class="error" id="description-error">{fieldError('description')}</p>
							{/if}
						</div>

						{#if sendError()}
							<p class="error form-error" role="alert">
								{sendError()} Prípadne nám napíšte na
								<a href={contact.emailHref} rel="external">{contact.email}</a>.
							</p>
						{/if}

						<div class="actions">
							<button type="submit" class="submit" disabled={submitting}>
								{submitting ? 'Odosielam…' : 'Odoslať požiadavku'}
							</button>
						</div>
					</form>
				{/if}
			</div>

			<div class="side-col">
				<aside class="side-cell" data-reveal {@attach reveal(100)}>
					<h2 class="side-title">Radšej telefonicky?</h2>
					<a href={contact.phoneHref} rel="external" class="side-phone">{contact.phone}</a>
					<p class="side-hours">Po – Pia 7:00 – 16:00 · So 7:00 – 12:00</p>
				</aside>
				<div class="acc acc--blue" aria-hidden="true"></div>
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		padding: 0 0 var(--space-section-y-end);
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

	/* ===== Composition canvas ===== */
	.comp {
		display: flex;
		flex-direction: column;
		gap: 5px;
		padding: 5px;
		background-color: var(--color-iron);
	}

	.comp-row {
		display: flex;
		gap: 5px;
	}

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
		max-width: 60ch;
		line-height: 1.55;
	}

	.head-accent-cell {
		flex: 1 1 0;
		padding: 1rem;
		background-color: var(--color-brand-primary);
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

	/* ===== Form cell ===== */
	.form-cell {
		flex: 1 1 auto;
		min-width: 0;
		background-color: var(--color-white);
		padding: clamp(1.9rem, 4vw, 2.75rem) clamp(1.25rem, 3vw, 2.5rem);
	}

	.quote-form,
	.success {
		max-width: 820px;
		margin-inline: auto;
	}

	.quote-form {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.4rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}

	.field label {
		font-size: var(--font-size-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-iron);
	}

	.req {
		color: var(--color-brand-primary);
	}

	/* Forms are the exception where a border is allowed. */
	.field input,
	.field select,
	.field textarea {
		font: inherit;
		padding: 0.7rem 0.85rem;
		border: 1px solid var(--color-mist);
		border-radius: 0;
		background-color: var(--color-white);
		color: var(--color-iron);
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.field input:focus,
	.field select:focus,
	.field textarea:focus {
		outline: none;
		border-color: var(--color-brand-primary);
		box-shadow: 0 0 0 3px rgba(192, 40, 28, 0.15);
	}

	.field textarea {
		resize: vertical;
		min-height: 140px;
		line-height: 1.5;
	}

	.field [aria-invalid='true'] {
		border-color: var(--color-error);
	}

	.field [aria-invalid='true']:focus {
		box-shadow: 0 0 0 3px rgba(198, 40, 40, 0.15);
	}

	.error {
		margin: 0;
		font-size: 0.85rem;
		color: var(--color-error);
	}

	.form-error {
		padding: 0.75rem 1rem;
		border-left: 4px solid var(--color-error);
		background-color: rgba(198, 40, 40, 0.07);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-top: 0.5rem;
		flex-wrap: wrap;
	}

	.submit {
		background-color: var(--color-brand-primary);
		color: var(--color-white);
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.85rem 1.75rem;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background-color var(--transition-fast);
	}

	.submit:hover:not(:disabled) {
		background-color: var(--color-brand-hover);
	}

	.submit:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	/* ===== Success ===== */
	.success {
		background-color: var(--color-chalk);
		border-left: 4px solid var(--color-success);
		padding: 2rem 1.75rem;
	}

	.success h2 {
		margin: 0 0 0.5rem;
		font-family: var(--font-display);
		font-size: var(--font-size-display-md);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-success);
	}

	.success p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-iron);
	}

	.success a {
		color: var(--color-brand-primary);
		text-decoration: none;
		font-weight: 600;
	}

	.success a:hover {
		text-decoration: underline;
	}

	.success-link {
		display: inline-block;
		margin-top: 1rem;
	}

	/* ===== Side column ===== */
	.side-col {
		flex: 0 0 280px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.side-cell {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.6rem;
		background-color: var(--color-iron);
		padding: 1.75rem 1.5rem 1.9rem;
	}

	.side-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--font-size-display-md);
		font-weight: 700;
		line-height: 1.05;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-white);
	}

	.side-phone {
		font-family: var(--font-display);
		font-size: clamp(1.4rem, 2.2vw, 1.75rem);
		font-weight: 600;
		letter-spacing: 0.03em;
		font-variant-numeric: tabular-nums;
		color: var(--color-white);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.side-phone:hover {
		color: var(--color-brand-hover);
	}

	.side-hours {
		margin: 0;
		font-size: var(--font-size-small);
		line-height: 1.55;
		color: var(--color-concrete);
	}

	/* ===== Mobile ===== */
	@media (max-width: 800px) {
		.comp {
			gap: 4px;
			padding: 4px;
		}

		.comp-row {
			flex-direction: column;
			gap: 4px;
		}

		.head-cell {
			padding: 1.25rem 1rem 1.4rem;
		}

		.head-accent-cell {
			padding: 0.9rem;
		}

		.form-cell {
			padding: 1.5rem 1.2rem 1.75rem;
		}

		.side-col {
			flex: none;
			gap: 4px;
		}

		.side-cell {
			padding: 1.4rem 1.2rem 1.6rem;
		}

		.acc {
			flex: none;
			min-height: 22px;
		}
	}

	@media (max-width: 640px) {
		.row {
			grid-template-columns: 1fr;
		}
	}

	/* ===== Reduced motion ===== */
	@media (prefers-reduced-motion: reduce) {
		[data-reveal] {
			opacity: 1;
			transform: none;
			transition: none;
		}

		.submit {
			transition: none;
		}
	}
</style>
