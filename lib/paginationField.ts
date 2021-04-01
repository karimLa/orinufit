import { FieldMergeFunction, FieldReadFunction } from "@apollo/client"
import { KeyArgsFunction } from "@apollo/client/cache/inmemory/policies"

import { PAGINATION_QUERY } from "@/components/Pagination"

type PaginationField = () => {
	keyArgs: KeyArgsFunction | false
	read: FieldReadFunction,
	merge: FieldMergeFunction,
}

type Args = {
	first: number,
	skip: number
}

const paginationField: PaginationField = () => {
	return {
		keyArgs: false,
		read(existing: [] = [], { args, cache }) {
			const { skip, first } = args as Args

			// Read the number of items on the page from the cache
			const data: any = cache.readQuery({ query: PAGINATION_QUERY })
			const count = data?._allProductsMeta?.count
			const page = skip / first + 1
			const pages = Math.ceil(count / first)

			// Check if we have existing items
			const items = existing.slice(skip, skip + first).filter((x) => x)

			// If there are items
			// AND there aren't enough items to satisfy how many were requested
			// AND we are on the last page
			// THEN JUST SEND IT
			if (items.length && items.length !== first && page === pages) return items;

			// We don't have any items, we must go to the network to fetch them
			if (items.length !== first) return false


			// If there are items, just reutrn them from the cache,
			// and we don't need to go to the network
			if (items.length) return items

			return false // fallback to network
		},
		merge(existing: [], incoming, { args }) {
			const { skip } = args as Args

			// This runs when the Apollo client comes back from the network with our product
			// console.log(`MErging items from the network ${incoming.length}`);
			const merged = existing ? existing.slice(0) : [];
			for (let i = skip; i < skip + incoming.length; ++i) {
				// @ts-ignore
				merged[i] = incoming[i - skip];
			}
			// Finally we return the merged items from the cache,
			return merged;
		}
	}
}

export default paginationField