import { createSchema } from '@keystone-next/keystone/schema';

import { User } from './User';

const lists = createSchema({
  User,
});

export default lists
