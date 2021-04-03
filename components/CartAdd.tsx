import { useMutation, gql } from '@apollo/client';

import { CURRENT_USER_QUERY } from '@/lib/useUser';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

type Props = {
  id: string;
};

function CartAdd({ id }: Props) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type='button' onClick={() => addToCart()} disabled={loading}>
      Add{loading && 'ing'} To Cart!
    </button>
  );
}

export default CartAdd;
