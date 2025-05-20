import { error, fail } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import type { Actions, PageServerLoad } from './$types';
import { stringToLinks, stringToTags } from '$lib/participants/util';

export const load: PageServerLoad = async ({ url, locals }) => {
	locals.email ??= url.searchParams.get('email') ?? undefined;
	locals.token ??= url.searchParams.get('token') ?? undefined;
	if (!(locals.email && locals.token)) {
		error(400, 'Missing email or token.');
	}
	const participants = await db.getParticipants();
	const user = participants.find((p) => p.email === locals.email && p.token === locals.token);
	const filteredParticipants = participants.filter((p) => p.show_on_page);
	if (!user) {
		error(400, 'Unauthorized or credentials not found in database.');
	}
	return {
		participants: filteredParticipants,
		user
	};
};

export const actions = {
	update: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = (locals.email = locals.email ?? formData.get('email')?.toString());
		const token = (locals.token = locals.token ?? formData.get('token')?.toString());
		const name = formData.get('name')?.toString();
		const team = formData.get('team')?.toString();
		const show_on_page = formData.get('show_on_page')?.toString() === '1';
		const bio = formData.get('bio')?.toString();
		const tagsAsString = formData.get('tags')?.toString();
		const linksAsString = formData.get('links')?.toString();
		if (!email || !token || !name) {
			return { success: false, message: 'E-Mail, Token or Name missing!' };
		}
		try {
			await db.updateParticipant({
				email,
				token,
				name,
				team,
				bio,
				show_on_page,
				extras: {
					tags: stringToTags(tagsAsString ?? ''),
					links: stringToLinks(linksAsString ?? '')
				}
			});
			return { success: true, email, token };
		} catch (error) {
			console.error('Exception occurred', error);
			return fail(500, { message: 'Exception in server' });
		}
	}
} satisfies Actions;
