import { config } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';

import keystoneConfig from './config';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

// @ts-ignore
export default withAuth(config(keystoneConfig));
