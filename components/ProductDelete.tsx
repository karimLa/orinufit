import { FC } from 'react';
import gql from 'graphql-tag';
import { MutationUpdaterFn, useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const update: MutationUpdaterFn = (cache, { data }) => {
  if (data) {
    // @ts-ignore
    cache.evict(cache.identify(data.deleteProduct));
  }
};

type Props = {
  id: string;
};

const ProductDelete: FC<Props> = ({ children, id }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  async function deleteItem() {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteProduct().catch((err) => alert(err.message));
    }
  }

  return (
    <button type='button' onClick={deleteItem} disabled={loading}>
      {children}
    </button>
  );
};

export default ProductDelete;
