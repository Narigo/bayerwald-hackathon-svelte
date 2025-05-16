import { error } from '@sveltejs/kit';
import * as db from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const participants = await db.getParticipants();
	const email = url.searchParams.get('email');
	const token = url.searchParams.get('token');
	const user = participants.find((p) => p.email === email && p.token === token);
	const filteredParticipants = participants.filter((p) => p.show_on_page);
	if (!user) {
		error(400, 'Unauthorized or credentials not found in database.');
	}
	return {
		participants: filteredParticipants,
		user
	};
};
