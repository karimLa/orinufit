import { ApolloClient, ApolloLink, HttpOptions, InMemoryCache } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';

import { getEndpoint } from '@/utils/env';

type createClientArgs = {
	headers?: HttpOptions['headers']
	initialState: any
}

function createClient({ headers, initialState }: createClientArgs) {
	return new ApolloClient({
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }) => {
				if (graphQLErrors)
					graphQLErrors.forEach(({ message, locations, path }) =>
						console.log(
							`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
						)
					);
				if (networkError)
					console.log(
						`[Network error]: ${networkError}. Backend is unreachable. Is it running?`
					);
			}),
			// this uses apollo-link-http under the hood, so all the options here come from that package
			createUploadLink({
				uri: getEndpoint(),
				fetchOptions: {
					credentials: 'include',
				},
				// pass the headers along from this request. This enables SSR with logged in state
				headers,
			}),
		]),
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						// TODO: added Fields
						// allProducts: paginationField(),
					},
				},
			},
		}).restore(initialState || {}),
	});
}

// @ts-ignore
export default withApollo(createClient, { getDataFromTree });