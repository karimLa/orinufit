import { config } from '@keystone-next/keystone/schema';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';

import { getDB, getSecret, getWebUrl } from './utils/env'
import { lists } from './schemas/schema';

const auth = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export default auth.withAuth(
  config({
    server: {
      cors: {
        origin: [getWebUrl()],
        credentials: true
      }
    },
    db: {
      adapter: 'mongoose',
      url: getDB()
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session: withItemData(
      statelessSessions({
        maxAge: 60 * 60 * 24 * 30, // 30 days
        secret: getSecret(),
      }),
      { User: 'name' }
    ),
  })
);
