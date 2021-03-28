function checkEnv(env: string | undefined, name: string) {
	if (!env) {
		throw new Error(
			`Please define the ${name} environment variable inside .env.local`
		)
	}

	return env
}

export function getEndpoint() {
	const ENDPOINT = process.env.ENDPOINT
	return checkEnv(ENDPOINT, 'ENDPOINT')
}