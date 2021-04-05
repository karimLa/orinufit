import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useQuery, gql } from '@apollo/client';

import { OrderQuery } from '@/types/queries';
import OrderStyles from '@/components/styles/OrderStyles';
import formatMoney from '@/utils/formatMoney';
import SignInPlease from '@/components/SignInPlease';
import DisplayError from '@/components/ErrorMessage';

export const SIGNLE_ORDER_QUERY = gql`
  query SIGNLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      total
      charge
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          altText
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

function SingleOrder() {
  const { query } = useRouter();
  const { data, error, loading } = useQuery<OrderQuery>(SIGNLE_ORDER_QUERY, {
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { order } = data!;

  return (
    <SignInPlease>
      <OrderStyles>
        <Head>
          <title>OrinuFits - {order.id}</title>
        </Head>
        <p>
          <span>Order Id:</span>
          <span>{order.id}</span>
        </p>
        <p>
          <span>Charge:</span>
          <span>{order.charge}</span>
        </p>
        <p>
          <span>Total:</span>
          <span>{formatMoney(order.total)}</span>
        </p>
        <p>
          <span>ItemCount:</span>
          <span>{order.items.length}</span>
        </p>
        <div className='items'>
          {order.items.map((item) => (
            <div className='order-item' key={item.id}>
              <div className='img-container'>
                <Image
                  src={item.photo!.image.publicUrlTransformed}
                  alt={item.photo?.altText}
                  width='240'
                  height='250'
                />
              </div>
              <div className='item-details'>
                <h2>{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Each: {formatMoney(item.price)}</p>
                <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </OrderStyles>
    </SignInPlease>
  );
}

export default SingleOrder;
