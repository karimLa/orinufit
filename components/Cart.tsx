import useCart from '@/lib/useCart';
import useUser from '@/lib/useUser';
import calcTotalPrice from '@/utils/calcTotalPrice';
import formatMoney from '@/utils/formatMoney';
import CartItem from './CartItem';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';

function Cart() {
  const { cartOpen, closeCart } = useCart();
  const user = useUser();
  if (!user) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{user.name}'s Cart</Supreme>
        <CloseButton onClick={closeCart}>&times;</CloseButton>
      </header>
      <ul>
        {user.cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(user.cart))}</p>
      </footer>
    </CartStyles>
  );
}

export default Cart;
