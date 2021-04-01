import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthResponse } from '@/types/queries';

const CURRENT_ISER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # TODO(soramon0): Query the cart once we have it
      }
    }
  }
`;

export default function useUser() {
	const { data } = useQuery<AuthResponse>(CURRENT_ISER_QUERY);
	return data?.authenticatedItem;
}
