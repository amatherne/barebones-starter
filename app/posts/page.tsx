// ../app/post/page.tsx

import React from 'react';
// import PostList from './client-page';
import { client } from '../../tina/__generated__/client';

export default async function Page() {
  const response = await client.queries.postConnection();
  const data = response.data?.postConnection || { edges: [], pageInfo: { hasPreviousPage: false, hasNextPage: false, startCursor: '', endCursor: '' }, totalCount: 0 };
  // return <PostList data={data} />;
}
