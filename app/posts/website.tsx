import PostList from "./client-website";
import { client } from "../../tina/__generated__/client";



export default async function website() {

  const websites = await client.queries.postConnection();

  return <PostList {...pages} />
}