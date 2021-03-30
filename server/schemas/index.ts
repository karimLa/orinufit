import { createSchema } from '@keystone-next/keystone/schema';

import { User } from './User';
import { Product } from './Product';
import { ProductImage } from './ProductImage';

const lists = createSchema({
  User,
  Product,
  ProductImage,
});

export default lists
