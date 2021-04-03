import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { AuthResponse } from '@/types/queries';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            name
            price
            photo {
              altText
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export default function useUser() {
  const { data } = useQuery<AuthResponse>(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
