// ../app/posts/page.tsx

import PostList from "./client-page";
import { client } from "../../tina/__generated__/client";
import { PostConnectionQuery } from "../../tina/__generated__/types";

export interface Props {
  data: PostConnectionQuery;
}

export default async function Page() {
  const response = await client.queries.postConnection();

  // Provide default values if needed
  const props: Props = {
    data: response.data || { postConnection: { edges: [] } },
  };

  return <PostList data={props.data} />;
}
