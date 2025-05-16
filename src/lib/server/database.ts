import { env } from '$env/dynamic/private';
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
