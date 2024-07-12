// ../app/websites/page.tsx

import WebsiteList from "./client-page";
import { client } from "../../tina/__generated__/client";



export default async function Page() {

  const pages = await client.queries.websiteConnection();

  return <WebsiteList {...pages} />
}