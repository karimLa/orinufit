import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { OrdersQuery } from '@/types/queries';
import { IOrder } from '@/types/models';
import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import formatMoney from '@/utils/formatMoney';
import countItemsInAnOrder from '@/utils/countItemsInAnOrder';
import OrderItemStyles from '@/components/styles/OrderItemStyles';
import SignInPlease from '@/components/SignInPlease';

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

type Props = {
  orders: IOrder[];
};

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function OrdersPage({ orders }: Props) {
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
                      <div className='img-container'>
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

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<OrdersQuery>({
    query: ALL_ORDERS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {
      orders: data.allOrders,
    },
    revalidate: 1,
  });
};

export default OrdersPage;
