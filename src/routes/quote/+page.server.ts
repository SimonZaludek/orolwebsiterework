import { fail, type Actions } from '@sveltejs/kit';
import { sendQuoteEmail } from '$lib/server/email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const name = (data.get('name')?.toString() ?? '').trim();
		const phone = (data.get('phone')?.toString() ?? '').trim();
		const email = (data.get('email')?.toString() ?? '').trim();
		const location = (data.get('location')?.toString() ?? '').trim();
		const transport = (data.get('transport')?.toString() ?? '').trim();
		const category = (data.get('category')?.toString() ?? '').trim();
		const description = (data.get('description')?.toString() ?? '').trim();

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'Zadajte prosím meno a priezvisko.';
		if (!phone) errors.phone = 'Zadajte prosím telefónne číslo.';
		if (!email) errors.email = 'Zadajte prosím e-mailovú adresu.';
		else if (!EMAIL_RE.test(email)) errors.email = 'E-mailová adresa nie je platná.';
		if (!location) errors.location = 'Zadajte prosím lokalitu stavby.';
		if (!transport) errors.transport = 'Vyberte prosím možnosť dopravy.';
		if (!category) errors.category = 'Vyberte prosím kategóriu materiálu.';
		if (!description) errors.description = 'Opíšte prosím Vašu požiadavku.';

		const values = { name, phone, email, location, transport, category, description };

		if (Object.keys(errors).length > 0) {
			return fail(400, { values, errors });
		}

		try {
			await sendQuoteEmail(values);
		} catch (error) {
			console.error('[quote] delivery failed', error);
			return fail(502, {
				values,
				errors,
				sendError: 'Požiadavku sa nepodarilo odoslať. Skúste to prosím znova alebo nám zavolajte.'
			});
		}

		return { success: true };
	}
};
