import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { Home } from '@/components/Home';
import { Layout } from '@/components/Layout';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Index = () => {
  return (
    <Layout title="Home">
      <Home />
    </Layout>
  );
};

export default Index;
