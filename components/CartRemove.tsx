import { useMutation, gql, MutationUpdaterFn } from '@apollo/client';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_CART_ITEM_MUTATION = gql`
  mutation REMOVE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

type Props = {
  id: string;
};

const update: MutationUpdaterFn = (cache, { data }) => {
  if (data) {
    // @ts-ignore
    cache.evict(cache.identify(data.deleteCartItem));
  }
};

function CartRemove({ id }: Props) {
  const [removeCartItem, { loading }] = useMutation(REMOVE_CART_ITEM_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <BigButton
      type='button'
      title='Remove this item from cart'
      onClick={() => removeCartItem()}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

export default CartRemove;
