import { useRouter } from 'next/router';

import RequestReset from '@/components/RequestReset';
import Reset from '@/components/Reset';

function ResetPasswordPage() {
  const { query } = useRouter();

  if (!query?.token) {
    return (
      <>
        <p>Invalid Token</p>
        <RequestReset />
      </>
    );
  }

  return <Reset token={query.token as string} />;
}

export default ResetPasswordPage;
