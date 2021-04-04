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

export function getFrontend() {
	const env = process.env.NEXT_PUBLIC_FRONTEND
	return checkEnv(env, 'NEXT_PUBLIC_FRONTEND')
}

export function getPerPage() {
	const env = process.env.NEXT_PUBLIC_PER_PAGE
	return checkEnv(env || '4', 'NEXT_PUBLIC_PER_PAGE')
}

export function getStripeKey() {
	const env = process.env.NEXT_PUBLIC_STRIPE_KEY
	return checkEnv(env, 'NEXT_PUBLIC_STRIPE_KEY')
}
