import { env } from '$env/dynamic/private';
import { contact } from '$lib/site';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export type QuoteSubmission = {
	name: string;
	phone: string;
	email: string;
	location: string;
	transport: string;
	category: string;
	description: string;
};

const FIELD_LABELS: Array<[keyof QuoteSubmission, string]> = [
	['name', 'Meno a priezvisko'],
	['phone', 'Telefón'],
	['email', 'E-mail'],
	['location', 'Lokalita stavby'],
	['transport', 'Doprava'],
	['category', 'Kategória materiálu'],
	['description', 'Popis požiadavky']
];

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function buildHtml(values: QuoteSubmission): string {
	const rows = FIELD_LABELS.map(
		([key, label]) =>
			`<tr>
				<th align="left" style="padding:6px 16px 6px 0;vertical-align:top;color:#5a6165;font-weight:600;white-space:nowrap;">${label}</th>
				<td style="padding:6px 0;vertical-align:top;color:#1e2022;">${escapeHtml(values[key]).replace(/\n/g, '<br />')}</td>
			</tr>`
	).join('');

	return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1e2022;">
		<h1 style="margin:0 0 4px;font-size:19px;color:#8c1a10;">Nová žiadosť o cenovú ponuku</h1>
		<p style="margin:0 0 16px;color:#5a6165;">Odoslané z formulára na webe.</p>
		<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
	</div>`;
}

function buildText(values: QuoteSubmission): string {
	return [
		'Nová žiadosť o cenovú ponuku (formulár na webe)',
		'',
		...FIELD_LABELS.map(([key, label]) => `${label}: ${values[key]}`)
	].join('\n');
}

/**
 * Sends one quote submission to the company inbox through Resend.
 *
 * Needs RESEND_API_KEY and QUOTE_EMAIL_FROM (a sender on a domain verified in
 * Resend). Without them we only log — dev and preview stay usable offline.
 * Throws when Resend rejects the request so the action can tell the visitor.
 */
export async function sendQuoteEmail(values: QuoteSubmission): Promise<void> {
	const apiKey = env.RESEND_API_KEY;
	const from = env.QUOTE_EMAIL_FROM;

	if (!apiKey || !from) {
		console.log('[quote] e-mail not configured, submission only logged', values);
		return;
	}

	const response = await fetch(RESEND_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from,
			to: [env.QUOTE_EMAIL_TO || contact.email],
			reply_to: values.email,
			subject: `Cenová ponuka – ${values.name} (${values.category})`,
			html: buildHtml(values),
			text: buildText(values)
		})
	});

	if (!response.ok) {
		const detail = await response.text();
		throw new Error(`Resend responded ${response.status}: ${detail}`);
	}
}
