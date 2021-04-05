import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

import { OrdersQuery } from '@/types/queries';
import formatMoney from '@/utils/formatMoney';
import countItemsInAnOrder from '@/utils/countItemsInAnOrder';
import OrderItemStyles from '@/components/styles/OrderItemStyles';
import SignInPlease from '@/components/SignInPlease';
import DisplayError from '@/components/ErrorMessage';

export const ALL_ORDERS_QUERY = gql`
  query {
    allOrders {
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

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function OrdersPage() {
  const { data, loading, error } = useQuery<OrdersQuery>(ALL_ORDERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders: orders } = data!;

  return (
    <SignInPlease>
      <Head>
        <title>Your Orders ({orders.length})</title>
      </Head>

      <h2>You have {orders.length} orders!</h2>
      <OrderUl>
        {orders.map((order) => {
          const itemsCount = countItemsInAnOrder(order);
          const productsCount = order.items.length;

          return (
            <OrderItemStyles key={order.id}>
              <Link href={`/orders/${order.id}`}>
                <a>
                  <div className='order-meta'>
                    <p>
                      {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                    </p>
                    {}
                    <p>
                      {productsCount} Product{productsCount > 1 && 's'}
                    </p>
                    <p>{formatMoney(order.total)}</p>
                  </div>
                  <div className='images'>
                    {order.items.map((item) => (
                      <div className='img-container' key={item.id}>
                        <Image
                          key={item.id}
                          src={item.photo!.image.publicUrlTransformed}
                          alt={item.photo?.altText}
                          width='150'
                          height='200'
                        />
                      </div>
                    ))}
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          );
        })}
      </OrderUl>
    </SignInPlease>
  );
}

export default OrdersPage;
