import { env } from '$env/dynamic/private';
import { linksToString, tagsToString } from '$lib/participants/util';
import type { Participant } from '$lib/types';
import mariadb from 'mariadb';

console.log('hello world');
console.log(env.DB_HOST);

const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	database: 'bwh_participants',
	password: env.MARIADB_ROOT_PASSWORD,
	connectionLimit: 5
});

export async function getParticipants(): Promise<Array<Participant>> {
	let conn: mariadb.PoolConnection | undefined;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query('SELECT * FROM participants');
		return rows;
	} catch (err) {
		console.error('Error getting participants from database', err);
		throw err;
	} finally {
		if (conn) conn.end();
	}
}

export async function updateParticipant(participant: Participant): Promise<Array<Participant>> {
	let conn: mariadb.PoolConnection | undefined;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query(
			'UPDATE participants SET name=?,team=?,bio=?,show_on_page=?,extras=? WHERE email=? AND token=?',
			[
				participant.name,
				participant.team,
				participant.bio,
				participant.show_on_page,
				JSON.stringify(participant.extras),
				participant.email,
				participant.token
			]
		);
		return rows;
	} catch (err) {
		console.error('Error getting participants from database', err);
		throw err;
	} finally {
		if (conn) conn.end();
	}
}
