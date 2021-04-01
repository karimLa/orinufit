import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { getPerPage } from '@/utils/env';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

const perPage = parseInt(getPerPage(), 10);

type Props = {
  page: number;
};

function Pagination({ page }: Props) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>OrinuFits - Page {page} of ___</title>
      </Head>

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>

      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>

      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next</a>
      </Link>
    </PaginationStyles>
  );
}

export default Pagination;
