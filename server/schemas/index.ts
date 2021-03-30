import { createSchema } from '@keystone-next/keystone/schema';

import { User } from './User';
import { Product } from './Product';

const lists = createSchema({
  User,
  Product,
});

export default lists
