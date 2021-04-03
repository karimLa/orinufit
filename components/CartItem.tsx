import Image from 'next/image';
import styled from 'styled-components';

import { ICart } from '@/types/models';
import formatMoney from '@/utils/formatMoney';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  .img-container {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

type Props = {
  item: ICart;
};

function CartItem({ item }: Props) {
  const { product } = item;
  if (!product) return null;

  return (
    <CartItemStyles>
      <div className='img-container'>
        <Image
          src={product.photo!.image.publicUrlTransformed}
          width='100'
          height='90'
        />
      </div>
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * item.quantity)} -{' '}
          <em>
            {item.quantity} &times; {formatMoney(product.price)} each
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

export default CartItem;
