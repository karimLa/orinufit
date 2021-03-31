function checkEnv(env: string | undefined, name: string) {
	if (!env) {
		throw new Error(
			`Please define the ${name} environment variable inside .env.local`
		)
	}

	return env
}

export function getEndpoint() {
	const env = process.env.NEXT_PUBLIC_ENDPOINT
	return checkEnv(env, 'NEXT_PUBLIC_ENDPOINT')
}