import Head from 'next/head';

import SickButton from '@/components/styles/SickButton';

export default function Home() {
	return (
		<main>
			<Head>
				<title>OrinuFit</title>
				<link rel='icon' href='/static/favicon.png' />
			</Head>

			<SickButton>Click me</SickButton>
		</main>
	);
}
