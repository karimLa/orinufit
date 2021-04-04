import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import gql from 'graphql-tag';

import { addApolloState, initializeApollo } from '@/lib/apolloClient';
import { OrdersQuery, OrderQuery } from '@/types/queries';
import { IOrder } from '@/types/models';
import { ALL_ORDERS_QUERY } from '.';
import OrderStyles from '@/components/styles/OrderStyles';
import formatMoney from '@/utils/formatMoney';

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

type Props = {
  order: IOrder;
};

function SingleOrder({ order }: Props) {
  return (
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
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<OrdersQuery>({
    query: ALL_ORDERS_QUERY,
  });

  const paths = data.allOrders.map((p) => ({ params: { id: p.id } }));

  return addApolloState(apolloClient, {
    paths,
    fallback: 'blocking',
  });
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id;

  if (!id || Array.isArray(id)) {
    // TODO(soramon0): check if id is valid
    return {
      notFound: true,
    };
  }

  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query<OrderQuery>({
      query: SIGNLE_ORDER_QUERY,
      variables: { id },
    });

    return addApolloState(apolloClient, {
      props: {
        order: data.order,
      },
      revalidate: 1,
    });
  } catch {
    return {
      notFound: true,
    };
  }
};

export default SingleOrder;
