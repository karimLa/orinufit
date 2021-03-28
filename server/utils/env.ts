import dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(__dirname, '..', '.env.local') })

function checkEnv(env: string | undefined, name: string) {
	if (!env) {
		throw new Error(
			`Please define the ${name} environment variable inside .env.local`
		)
	}

	return env
}

export function getDB() {
	const env = process.env.DATABASE_URL
	return checkEnv(env, 'DATABASE_URL')
}
