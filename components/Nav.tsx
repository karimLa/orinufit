import Link from 'next/link';

import NavStyles from './styles/NavStyles';
import useUser from '@/lib/useUser';
import SignOut from './SignOut';
import useCart from '@/lib/useCart';
import CartCount from './CartCount';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  const count =
    user?.cart.reduce((tally, item) => tally + item.quantity, 0) || 0;

  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <button type='button' onClick={openCart}>
            My Cart <CartCount count={count} />
          </button>
          <SignOut />
        </>
      )}

      {!user && (
        <>
          <Link href='/signin'>Sign in</Link>
        </>
      )}
    </NavStyles>
  );
}
