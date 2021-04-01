import Image from 'next/image';
import Link from 'next/link';

import { IProduct } from '@/types/models';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '@/utils/formatMoney';
import ProductDelete from './ProductDelete';

type Props = {
  product: IProduct;
};

function ProductCard({ product }: Props) {
  return (
    <ItemStyles>
      {product.photo?.image && (
        <Image
          src={product.photo?.image.publicUrlTransformed}
          alt={product.photo?.altText}
          width='1000'
          height='1200'
        />
      )}
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>

      <div className='buttonList'>
        <Link href={`product/update?id=${product.id}`}>Edit</Link>
        <ProductDelete id={product.id}>Delete</ProductDelete>
      </div>
    </ItemStyles>
  );
}

export default ProductCard;
