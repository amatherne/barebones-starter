// ../app/[...filename]/client-page.tsx

'use client';

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { PageQuery } from '../../tina/__generated__/types';
import Blocks from '../components/blocks';

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: { page: PageQuery['page'] };
  params: { filename: string[] };
}

const ClientPage: React.FC<ClientPageProps> = (props) => {
  
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  
  // console.log(props)

  const settings = data.page.blocks || [];

  return (
    <>
      {settings && (
        <Blocks settings={settings} content={data} />
      )}
    </>
  );
};

export default ClientPage;
